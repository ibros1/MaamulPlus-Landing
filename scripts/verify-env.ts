/**
 * Reports production env that is still missing. Runs in `prebuild`.
 * A missing lead pipeline never breaks the deploy: the site goes live and the forms answer 503
 * until the keys are set. Set REQUIRE_ENV=1 (e.g. in Vercel, once everything is configured)
 * to fail the build instead, so a removed key can never slip into production.
 */
const enforce = process.env.REQUIRE_ENV === '1';
const isProduction = process.env.VERCEL_ENV === 'production';
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
  const effect = isProduction
    ? 'The site will deploy; demo, contact and newsletter forms answer 503 until these are set.'
    : '(not enforced for this build)';
  console.warn(`[verify-env] ${msg}\n${effect}`);
}
