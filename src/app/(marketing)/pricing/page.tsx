import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqSection } from '@/components/sections/faq-section';
import { GettingStarted } from '@/components/sections/getting-started';
import { Pricing } from '@/components/sections/pricing';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { pricingFaq } from '@/content/faq';
import { breadcrumbLd, buildMetadata, faqLd, graph, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'MaamulPlus pricing: ERP pricing in Somaliland',
  description:
    'MaamulPlus pricing for Lite and Enterprise, sized to your users and branches. Request a quote for ERP software in Somaliland and we reply in one working day.',
  path: '/pricing',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
];

export default function PricingPage() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: 32 }}>
        <Breadcrumbs items={crumbs} />
      </div>
      <Pricing asPage alt={false} />
      <GettingStarted />
      <FaqSection items={pricingFaq} title="Pricing questions." />
      <CtaBand />
      <JsonLd data={graph(breadcrumbLd(crumbs), faqLd(pricingFaq))} />
    </>
  );
}
