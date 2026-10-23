import 'server-only';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { missingLeadEnv, serverEnv } from './env';
import { deliverLead, type Lead } from './leads';
import type { LeadKind } from './leads/types';
import { getLimiter } from './ratelimit';
import { MIN_FILL_MS, type ApiError, type ApiOk } from './schemas';
import { verifyTurnstile } from './turnstile';

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' };

type AntiSpam = { company_website?: string | undefined; startedAt: number; turnstileToken: string; page: string };

function clientIp(req: Request): string | null {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || null;
}

function json(body: ApiOk | ApiError, status: number, extra: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...NOINDEX, ...extra } });
}

/**
 * The shared pipeline for every lead form:
 * parse → validate (zod) → honeypot / minimum fill time → Turnstile → rate limit → deliver.
 */
export async function handleLead<S extends z.ZodType<AntiSpam & Record<string, unknown>>>(
  req: Request,
  kind: LeadKind,
  schema: S,
  toFields: (data: z.infer<S>) => Lead['fields'],
): Promise<NextResponse> {
  if (missingLeadEnv(serverEnv()).length) {
    return json({ ok: false, error: 'Online requests are not available yet. Please call or email us.' }, 503);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // Honeypot first: a bot that filled it gets a quiet "success" and nothing is sent.
  const honeypot = (raw as { company_website?: unknown } | null)?.company_website;
  if (typeof honeypot === 'string' && honeypot.length > 0) return json({ ok: true, id: randomUUID() }, 200);

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: 'Please check the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors }, 400);
  }
  const data = parsed.data;

  if (Date.now() - data.startedAt < MIN_FILL_MS) return json({ ok: true, id: randomUUID() }, 200);

  const ip = clientIp(req);
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json({ ok: false, error: 'We could not verify the request. Please reload the page and try again.' }, 403);
  }

  const { success, retryAfter } = await getLimiter(kind).limit(ip ?? 'unknown');
  if (!success) {
    return json(
      { ok: false, error: 'Too many requests. Please wait a few minutes and try again.' },
      429,
      { 'Retry-After': String(retryAfter) },
    );
  }

  const id = randomUUID();
  const lead: Lead = {
    id,
    kind,
    receivedAt: new Date().toISOString(),
    fields: toFields(data),
    page: data.page,
    utm: 'utm' in data ? (data.utm as Lead['utm']) : undefined,
  };

  try {
    await deliverLead(lead);
  } catch (err) {
    console.error(`[${kind}] delivery failed for ${id}:`, err instanceof Error ? err.message : 'unknown');
    return json({ ok: false, error: 'Something went wrong on our side. Please try again, or call us.' }, 502);
  }
  return json({ ok: true, id }, 201);
}
