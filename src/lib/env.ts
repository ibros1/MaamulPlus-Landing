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

/**
 * Reads and validates server env. In production the lead pipeline must be configured,
 * otherwise this throws the first time an API route runs (and `pnpm verify:env` fails the deploy).
 */
export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.parse(clean(process.env));
  if (parsed.NODE_ENV === 'production' && !parsed.E2E_MOCK_LEADS) {
    const missing: string[] = [];
    if (!parsed.TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');
    if (!parsed.LEADS_WEBHOOK_URL && !(parsed.RESEND_API_KEY && parsed.LEADS_TO_EMAIL && parsed.LEADS_FROM_EMAIL)) {
      missing.push('RESEND_API_KEY + LEADS_TO_EMAIL + LEADS_FROM_EMAIL (or LEADS_WEBHOOK_URL)');
    }
    if (missing.length) throw new Error(`Missing required server env: ${missing.join(', ')}`);
  }
  cached = parsed;
  return parsed;
}
