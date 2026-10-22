import { features, featureBySlug } from '@/content/features';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus feature';

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = featureBySlug((await params).slug);
  return renderOg({ title: page?.h1 ?? 'MaamulPlus', eyebrow: page?.eyebrow ?? 'Features' });
}
