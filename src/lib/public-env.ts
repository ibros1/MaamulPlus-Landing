/** Browser-safe env values (NEXT_PUBLIC_*). Kept separate from env.ts so zod stays out of the shared bundle. */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maamulplus.com',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
} as const;
