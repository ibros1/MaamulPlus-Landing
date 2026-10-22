import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductScreen } from '@/components/app-ui/product-screen';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/ui/feature-card';
import { SectionHeader } from '@/components/ui/section-header';
import { editions } from '@/content/editions';
import { featureBySlug, type DetailPage } from '@/content/features';
import { solutionBySlug } from '@/content/solutions';
import { breadcrumbLd, faqLd, graph, type Crumb } from '@/lib/seo';
import { CtaBand } from './cta-band';
import { FaqSection } from './faq-section';
import { PageHero } from './page-hero';

interface DetailPageViewProps {
  page: DetailPage;
  kind: 'features' | 'solutions';
}

function relatedPage(slug: string): { name: string; href: string; lead: string } | null {
  const f = featureBySlug(slug);
  if (f) return { name: f.name, href: `/features/${f.slug}`, lead: f.h1 };
  const s = solutionBySlug(slug);
  if (s) return { name: s.name, href: `/solutions/${s.slug}`, lead: s.h1 };
  return null;
}

/** Shared layout for /features/[slug] and /solutions/[slug]. */
export function DetailPageView({ page, kind }: DetailPageViewProps) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: page.name, path: `/${kind}/${page.slug}` },
  ];
  const editionLinks =
    page.availability === 'enterprise' ? [editions.enterprise] : [editions.lite, editions.enterprise];
  const related = page.related.map(relatedPage).filter((r) => r !== null);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow}
        title={page.h1}
        lead={page.lead}
        note={page.availabilityNote}
        actions={
          <>
            <Button href="/demo" size="lg" arrow ctaLocation={`${kind}-${page.slug}-hero`}>
              Book a demo
            </Button>
            <Button href="/pricing" variant="outline" size="lg" ctaLocation={`${kind}-${page.slug}-pricing`}>
              Request pricing
            </Button>
          </>
        }
      >
        <ProductScreen screen={page.screen} label={page.screenLabel} />
      </PageHero>

      <section className="alt" aria-labelledby="benefits-title">
        <div className="wrap">
          <SectionHeader eyebrow="What you get" title={page.benefitsTitle} id="benefits-title" />
          <div className="benefits rv">
            {page.benefits.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label={`${page.name} in detail`}>
        <div className="wrap">
          {page.sections.map((s) => (
            <div className="copy-grid rv" key={s.title}>
              <h2>{s.title}</h2>
              <div>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="copy-grid rv">
            <h2>Which edition includes it.</h2>
            <div>
              <p>{page.availabilityNote}</p>
              <p>
                {editionLinks.map((e, i) => (
                  <span key={e.id}>
                    {i > 0 ? ' · ' : null}
                    <Link className="inline-link" href={e.path}>
                      See {e.name}
                    </Link>
                  </span>
                ))}
                {' · '}
                <Link className="inline-link" href="/pricing">
                  Compare editions and request pricing
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="links-band" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="links-band__title">
              Related
            </h2>
            <div className="related">
              <ul className="related-list">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>
                      {r.name}: {r.lead}
                      <ArrowRight aria-hidden="true" strokeWidth={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection items={page.faq} eyebrow="Questions" title={`${page.name}: common questions.`} messageHref="/contact" />
      <CtaBand withForm={false} />
      <JsonLd data={graph(breadcrumbLd(crumbs), faqLd(page.faq))} />
    </>
  );
}
