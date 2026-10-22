import type { Metadata } from 'next';
import { EditionPageView } from '@/components/sections/edition-page';
import { editionPages } from '@/content/edition-pages';
import { buildMetadata } from '@/lib/seo';

const page = editionPages.lite;

export const metadata: Metadata = buildMetadata({ title: page.title, description: page.description, path: '/lite' });

export default function LitePage() {
  return <EditionPageView edition="lite" />;
}
