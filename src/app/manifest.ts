import type { MetadataRoute } from 'next';
import { brandColors } from '@/config/brand-colors';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MaamulPlus',
    short_name: 'MaamulPlus',
    description: 'Business management software for traders in Somaliland.',
    start_url: '/',
    display: 'standalone',
    background_color: brandColors.white,
    theme_color: brandColors.navy900,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
