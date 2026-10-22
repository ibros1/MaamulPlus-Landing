import { solutions, solutionBySlug } from '@/content/solutions';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus solution';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = solutionBySlug((await params).slug);
  return renderOg({ title: page?.h1 ?? 'MaamulPlus', eyebrow: page?.eyebrow ?? 'Solutions' });
}
