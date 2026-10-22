import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { FeatureCard } from '@/components/ui/feature-card';
import { SectionHeader } from '@/components/ui/section-header';
import { about } from '@/content/pages';
import { aboutPageLd, breadcrumbLd, buildMetadata, graph, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About MaamulPlus',
  description:
    'About MaamulPlus: business management software made in Hargeisa for traders in Somaliland, built around USD and SLSH, mobile money and customer credit.',
  path: '/about',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="About" title={about.h1} lead={about.lead} />
      <section className="flush-top" aria-label="Our story">
        <div className="wrap">
          {about.sections.map((s) => (
            <div className="copy-grid rv" key={s.title}>
              <h2>{s.title}</h2>
              <div>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="alt" aria-labelledby="values-title">
        <div className="wrap">
          <SectionHeader eyebrow="How we work" title={about.valuesTitle} id="values-title" />
          <div className="benefits rv">
            {about.values.map((v) => (
              <FeatureCard key={v.title} icon={v.icon} title={v.title} body={v.body} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand withForm={false} />
      {/* The Organization node is already in the root layout; AboutPage links to it by @id. */}
      <JsonLd data={graph(aboutPageLd(), breadcrumbLd(crumbs))} />
    </>
  );
}
