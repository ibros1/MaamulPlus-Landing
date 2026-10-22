import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { Accordion } from '@/components/ui/accordion';
import { generalFaq, pricingFaq } from '@/content/faq';
import { breadcrumbLd, buildMetadata, faqLd, graph, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'MaamulPlus questions and answers',
  description:
    'MaamulPlus questions answered: editions, Zaad and eDahab, SLSH payments, setup, training, data safety and pricing for businesses in Hargeisa and Somaliland.',
  path: '/faq',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
];

const pricingOnly = pricingFaq.filter((p) => !generalFaq.some((g) => g.q === p.q));

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Questions"
        title="What business owners ask us."
        lead="Straight answers about MaamulPlus Lite and Enterprise, payments in Somaliland, setup and pricing. If your question is not here, send us a message."
      />
      <section className="flush-top" aria-labelledby="faq-general">
        <div className="wrap faq-layout">
          <h2 id="faq-general" className="faq-group-title">
            The product
          </h2>
          <Accordion items={generalFaq} />
        </div>
      </section>
      <section className="alt" aria-labelledby="faq-pricing">
        <div className="wrap faq-layout">
          <h2 id="faq-pricing" className="faq-group-title">
            Pricing and setup
          </h2>
          <Accordion items={pricingOnly} firstOpen={false} />
        </div>
      </section>
      <CtaBand withForm={false} />
      <JsonLd data={graph(faqLd([...generalFaq, ...pricingOnly]), breadcrumbLd(crumbs))} />
    </>
  );
}
