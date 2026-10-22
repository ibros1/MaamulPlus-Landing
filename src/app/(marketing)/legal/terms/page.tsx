import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { terms } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: terms.title, description: terms.description, path: '/legal/terms' });

export default function TermsPage() {
  return <LegalPage doc={terms} path="/legal/terms" />;
}
