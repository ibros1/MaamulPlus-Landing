import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPageView } from '@/components/sections/detail-page';
import { solutionBySlug, solutions } from '@/content/solutions';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = solutionBySlug((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: `/solutions/${page.slug}` });
}

export default async function SolutionPage({ params }: Props) {
  const page = solutionBySlug((await params).slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="solutions" />;
}
