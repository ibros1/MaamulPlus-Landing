import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus pricing: a plan sized to your business';

export default function Image() {
  return renderOg({ title: 'A plan sized to your business.', eyebrow: 'Pricing' });
}
