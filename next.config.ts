import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content Security Policy.
 * Pages are statically generated (SSG), so a per-request nonce is not possible without making every
 * page dynamic. Scripts are therefore limited to 'self', Next's inline bootstrap ('unsafe-inline'),
 * Plausible, Google Analytics (only loaded with consent) and Cloudflare Turnstile.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://plausible.io https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://plausible.io https://www.google-analytics.com https://region1.google-analytics.com https://challenges.cloudflare.com",
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  // A separate output folder lets a production build/test run while `next dev` uses .next.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/thank-you', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    // Permanent (308) redirects for renamed URLs go here: { source: '/old', destination: '/new', permanent: true }.
    return [
      { source: '/features', destination: '/#enterprise', permanent: true },
      { source: '/solutions', destination: '/#editions', permanent: true },
      { source: '/legal', destination: '/legal/privacy', permanent: true },
    ];
  },
};

export default nextConfig;
