/**
 * Fails a production deploy when the lead pipeline is not configured.
 * Runs in `prebuild`; only enforced on Vercel production builds or when REQUIRE_ENV=1,
 * so local `pnpm build` keeps working without secrets.
 */
const enforce = process.env.VERCEL_ENV === 'production' || process.env.REQUIRE_ENV === '1';
const has = (k: string) => (process.env[k] ?? '').trim() !== '';

const missing: string[] = [];
if (!has('TURNSTILE_SECRET_KEY') || !has('NEXT_PUBLIC_TURNSTILE_SITE_KEY')) missing.push('TURNSTILE_SECRET_KEY / NEXT_PUBLIC_TURNSTILE_SITE_KEY');
if (!has('LEADS_WEBHOOK_URL') && !(has('RESEND_API_KEY') && has('LEADS_TO_EMAIL') && has('LEADS_FROM_EMAIL'))) {
  missing.push('RESEND_API_KEY + LEADS_TO_EMAIL + LEADS_FROM_EMAIL (or LEADS_WEBHOOK_URL)');
}
if (!has('UPSTASH_REDIS_REST_URL') || !has('UPSTASH_REDIS_REST_TOKEN')) missing.push('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (rate limiting)');
if (!has('NEXT_PUBLIC_SITE_URL')) missing.push('NEXT_PUBLIC_SITE_URL');

if (missing.length) {
  const msg = `Missing production env:\n  - ${missing.join('\n  - ')}`;
  if (enforce) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(`[verify-env] ${msg}\n(not enforced for this build)`);
}
