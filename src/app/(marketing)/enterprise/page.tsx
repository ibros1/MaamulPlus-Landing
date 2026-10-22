import type { Metadata } from 'next';
import { EditionPageView } from '@/components/sections/edition-page';
import { editionPages } from '@/content/edition-pages';
import { buildMetadata } from '@/lib/seo';

const page = editionPages.enterprise;

export const metadata: Metadata = buildMetadata({ title: page.title, description: page.description, path: '/enterprise' });

export default function EnterprisePage() {
  return <EditionPageView edition="enterprise" />;
}
