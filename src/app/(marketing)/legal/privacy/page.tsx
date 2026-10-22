import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { privacy } from '@/content/pages';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: privacy.title, description: privacy.description, path: '/legal/privacy' });

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path="/legal/privacy" />;
}
