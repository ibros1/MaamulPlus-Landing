import { getAllPosts, getPost } from '@/lib/blog';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MaamulPlus blog article';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOg({ title: post?.ogTitle ?? post?.seoTitle ?? post?.title ?? 'MaamulPlus blog', eyebrow: 'MaamulPlus blog' });
}
