import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { AccountingSplit } from '@/components/sections/accounting-split';
import { CtaBand } from '@/components/sections/cta-band';
import { Editions } from '@/components/sections/editions';
import { FaqSection } from '@/components/sections/faq-section';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { GettingStarted } from '@/components/sections/getting-started';
import { Hero } from '@/components/sections/hero';
import { MarketGrid } from '@/components/sections/market-grid';
import { MoneyRails } from '@/components/sections/money-rails';
import { Pricing } from '@/components/sections/pricing';
import { ProductTour } from '@/components/sections/product-tour';
import { SolutionLinks } from '@/components/sections/solution-links';
import { editions } from '@/content/editions';
import { homeFaq } from '@/content/faq';
import { buildMetadata, faqLd, graph, softwareLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'MaamulPlus: Business management software for Somaliland',
  absoluteTitle: true,
  description:
    'Business management software for Somaliland: sales, stock, credit, payments and accounting in USD and SLSH. ERP for traders in Hargeisa, in two editions.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <MoneyRails />
      <Editions />
      <ProductTour />
      <AccountingSplit />
      <FeatureGrid />
      <MarketGrid />
      <Pricing />
      <GettingStarted />
      <SolutionLinks />
      <FaqSection items={homeFaq} />
      <CtaBand />
      <JsonLd
        data={graph(
          softwareLd({
            edition: 'enterprise',
            name: editions.enterprise.name,
            description: editions.enterprise.seoDescription,
            featureList: editions.enterprise.featureList,
            path: '/enterprise',
          }),
          softwareLd({
            edition: 'lite',
            name: editions.lite.name,
            description: editions.lite.seoDescription,
            featureList: editions.lite.featureList,
            path: '/lite',
          }),
          faqLd(homeFaq),
        )}
      />
    </>
  );
}
