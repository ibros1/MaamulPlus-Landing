import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus Lite: the essentials, without the jargon';

export default function Image() {
  return renderOg({ title: 'The essentials, without the jargon.', eyebrow: 'MaamulPlus Lite' });
}
