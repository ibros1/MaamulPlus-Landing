import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPageView } from '@/components/sections/detail-page';
import { featureBySlug, features } from '@/content/features';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = featureBySlug((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.description, path: `/features/${page.slug}` });
}

export default async function FeaturePage({ params }: Props) {
  const page = featureBySlug((await params).slug);
  if (!page) notFound();
  return <DetailPageView page={page} kind="features" />;
}
