import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    // Permanent redirects for renamed URLs go here, e.g. { source: '/old', destination: '/new', permanent: true }.
    // Host canonicalisation ([[DECIDE]] www → apex) is configured in middleware.ts.
    return [
      { source: '/features', destination: '/#enterprise', permanent: true },
      { source: '/solutions', destination: '/#enterprise', permanent: true },
      { source: '/legal', destination: '/legal/privacy', permanent: true },
    ];
  },
};

export default nextConfig;
