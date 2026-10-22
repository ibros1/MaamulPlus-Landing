import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus: run your whole business from one screen';

export default function Image() {
  return renderOg({ title: 'Run your whole business from one screen.', eyebrow: 'Business management software for Somaliland' });
}
