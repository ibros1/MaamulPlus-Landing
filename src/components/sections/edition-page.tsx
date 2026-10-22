import { ProductScreen } from '@/components/app-ui/product-screen';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { CompareTable } from '@/components/ui/compare-table';
import { EditionCta } from '@/components/ui/edition-cta';
import { FeatureCard } from '@/components/ui/feature-card';
import { SectionHeader } from '@/components/ui/section-header';
import { comparison, editions } from '@/content/editions';
import { editionPages } from '@/content/edition-pages';
import type { Edition } from '@/lib/schemas';
import { breadcrumbLd, faqLd, graph, softwareLd, type Crumb } from '@/lib/seo';
import { CtaBand } from './cta-band';
import { FaqSection } from './faq-section';
import { PageHero } from './page-hero';

/** /enterprise and /lite. */
export function EditionPageView({ edition }: { edition: Edition }) {
  const page = editionPages[edition];
  const info = editions[edition];
  const other = editions[edition === 'enterprise' ? 'lite' : 'enterprise'];
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: info.name, path: info.path },
  ];
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow}
        title={page.h1}
        lead={page.lead}
        actions={
          <>
            <EditionCta edition={edition} href="/demo" size="lg" arrow ctaLocation={`${edition}-hero`}>
              {edition === 'enterprise' ? 'Talk to sales' : 'Book a demo'}
            </EditionCta>
            <EditionCta edition={edition} href="/pricing" variant="outline" size="lg" ctaLocation={`${edition}-hero-pricing`}>
              {info.plan.price}
            </EditionCta>
          </>
        }
      >
        <ProductScreen screen={page.screen} label={page.screenLabel} />
      </PageHero>

      <section className="alt" aria-labelledby="mods-title">
        <div className="wrap">
          <SectionHeader eyebrow="Modules" title={page.modulesTitle} id="mods-title" lead={page.modulesLead} />
          <div className="benefits rv">
            {page.modules.map((m) => (
              <FeatureCard key={m.title} icon={m.icon} title={m.title} body={m.body} {...(m.href ? { href: m.href } : {})} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label={`${info.name} in detail`}>
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
        </div>
      </section>

      <section className="alt" aria-labelledby="cmp-title">
        <div className="wrap">
          <SectionHeader
            align="center"
            eyebrow="Compare"
            title={`${info.short} and ${other.short}, side by side.`}
            id="cmp-title"
            lead={`${info.plan.price}. ${info.plan.priceNote}.`}
          />
          <CompareTable groups={comparison} caption="Feature comparison between MaamulPlus Lite and MaamulPlus Enterprise" />
          <div className="hero-cta" style={{ marginTop: 32 }}>
            <Button href="/pricing" variant="primary" ctaLocation={`${edition}-compare`}>
              Request pricing
            </Button>
            <Button href={other.path} variant="outline">
              See {other.name}
            </Button>
          </div>
        </div>
      </section>

      <FaqSection items={page.faq} title={`${info.name}: common questions.`} messageHref="/contact" alt={false} />
      <CtaBand withForm={false} />
      <JsonLd
        data={graph(
          softwareLd({
            edition,
            name: info.name,
            description: info.seoDescription,
            featureList: info.featureList,
            path: info.path,
          }),
          breadcrumbLd(crumbs),
          faqLd(page.faq),
        )}
      />
    </>
  );
}
