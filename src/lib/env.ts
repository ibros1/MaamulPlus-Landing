import { z } from 'zod';

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  LEADS_TO_EMAIL: z.string().email().optional(),
  LEADS_FROM_EMAIL: z.string().optional(),
  LEADS_WEBHOOK_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
  BING_SITE_VERIFICATION: z.string().optional(),
  /** Set in e2e runs: leads are accepted without Turnstile or delivery. */
  E2E_MOCK_LEADS: z.literal('1').optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

/** Empty strings from .env files count as "not set". */
function clean(source: NodeJS.ProcessEnv): Record<string, string> {
  return Object.fromEntries(
    Object.entries(source).filter((e): e is [string, string] => typeof e[1] === 'string' && e[1].trim() !== ''),
  );
}

let cached: ServerEnv | undefined;

/** Lead-pipeline settings that production needs before the forms can accept requests. */
export function missingLeadEnv(env: ServerEnv): string[] {
  if (env.NODE_ENV !== 'production' || env.E2E_MOCK_LEADS) return [];
  const missing: string[] = [];
  if (!env.TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');
  if (!env.LEADS_WEBHOOK_URL && !(env.RESEND_API_KEY && env.LEADS_TO_EMAIL && env.LEADS_FROM_EMAIL)) {
    missing.push('RESEND_API_KEY + LEADS_TO_EMAIL + LEADS_FROM_EMAIL (or LEADS_WEBHOOK_URL)');
  }
  return missing;
}

/**
 * Reads and validates server env. A production deploy without the lead pipeline still serves the
 * site; the API routes answer 503 (see lead-handler) and this logs what is missing once per instance.
 */
export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.parse(clean(process.env));
  const missing = missingLeadEnv(parsed);
  if (missing.length) console.error(`[env] Lead forms are off until these are set: ${missing.join(', ')}`);
  cached = parsed;
  return parsed;
}
