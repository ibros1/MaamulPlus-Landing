import 'server-only';
import { serverEnv } from '../env';
import { resendSink } from './resend-sink';
import type { Lead, LeadSink } from './types';
import { webhookSink } from './webhook-sink';

export type { Lead, LeadSink } from './types';

/** Accepts the lead and does nothing: development without keys, and e2e runs. */
const noopSink: LeadSink = { name: 'noop', send: async () => undefined };

export function getLeadSinks(): LeadSink[] {
  const env = serverEnv();
  if (env.E2E_MOCK_LEADS) return [noopSink];
  const sinks: LeadSink[] = [];
  if (env.RESEND_API_KEY && env.LEADS_TO_EMAIL && env.LEADS_FROM_EMAIL) {
    sinks.push(resendSink(env.RESEND_API_KEY, env.LEADS_TO_EMAIL, env.LEADS_FROM_EMAIL));
  }
  if (env.LEADS_WEBHOOK_URL) sinks.push(webhookSink(env.LEADS_WEBHOOK_URL));
  if (sinks.length === 0 && env.NODE_ENV !== 'production') {
    console.warn('[leads] No lead sink configured; lead accepted but not delivered (development only).');
    sinks.push(noopSink);
  }
  return sinks;
}

/** Delivers to every sink. Succeeds if at least one sink accepted the lead. */
export async function deliverLead(lead: Lead): Promise<void> {
  const sinks = getLeadSinks();
  if (sinks.length === 0) throw new Error('No lead sink configured');
  const results = await Promise.allSettled(sinks.map((s) => s.send(lead)));
  results.forEach((r, i) => {
    // Log the sink and reason only, never the lead's personal data.
    if (r.status === 'rejected') console.error(`[leads] ${sinks[i]?.name ?? 'sink'} failed for ${lead.id}:`, String(r.reason).slice(0, 200));
  });
  if (!results.some((r) => r.status === 'fulfilled')) throw new Error('All lead sinks failed');
}
