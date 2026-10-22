import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus Enterprise: full accounting for growing businesses';

export default function Image() {
  return renderOg({ title: 'Full accounting for growing businesses.', eyebrow: 'MaamulPlus Enterprise' });
}
