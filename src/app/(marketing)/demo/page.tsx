import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { DemoForm } from '@/components/forms/demo-form';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqSection } from '@/components/sections/faq-section';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Steps } from '@/components/ui/steps';
import { homeFaq } from '@/content/faq';
import { ctaBand, steps } from '@/content/home';
import { breadcrumbLd, buildMetadata, graph, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Book a MaamulPlus demo',
  description:
    'Book a MaamulPlus demo: a 30-minute walkthrough with your own products, in person in Hargeisa or online, and a quote for your users and branches. No commitment.',
  path: '/demo',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Book a demo', path: '/demo' },
];

export default function DemoPage() {
  return (
    <>
      <section className="cta demo-page" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className="cta-band on-inverse">
            <div style={{ position: 'relative' }}>
              <p className="mp-eyebrow">MaamulPlus demo</p>
              <h1 id="page-title">See MaamulPlus with your own business in it.</h1>
              <p className="lead">{ctaBand.lead}</p>
              <ul className="contact">
                {ctaBand.points.map((p) => (
                  <li key={p}>
                    <Check aria-hidden="true" strokeWidth={2} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <DemoForm redirectOnSuccess headingLevel="h2" />
          </div>
        </div>
      </section>
      <section className="alt" aria-labelledby="next-title">
        <div className="wrap">
          <div className="mp-section-head">
            <p className="mp-eyebrow">{steps.eyebrow}</p>
            <h2 id="next-title">What happens after you ask.</h2>
            <p>{steps.lead}</p>
          </div>
          <Steps items={steps.items} />
        </div>
      </section>
      <FaqSection items={homeFaq} alt={false} messageHref="/contact" />
      <JsonLd data={graph(breadcrumbLd(crumbs))} />
    </>
  );
}
