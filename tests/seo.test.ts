import type { WithContext, Thing } from 'schema-dts';
import { editions } from '@/content/editions';
import { homeFaq } from '@/content/faq';
import {
  absoluteUrl,
  breadcrumbLd,
  buildMetadata,
  faqLd,
  graph,
  ids,
  localBusinessLd,
  organizationLd,
  softwareLd,
  SITE_URL,
  websiteLd,
} from '@/lib/seo';

describe('absoluteUrl / canonical', () => {
  it.each([
    ['/', SITE_URL],
    ['/pricing', `${SITE_URL}/pricing`],
    ['/pricing/', `${SITE_URL}/pricing`],
    ['/pricing?utm_source=x', `${SITE_URL}/pricing`],
    ['/features/accounting#faq', `${SITE_URL}/features/accounting`],
  ])('%s → %s', (path, url) => {
    expect(absoluteUrl(path)).toBe(url);
  });
});

describe('buildMetadata', () => {
  it('builds canonical, hreflang, OG and Twitter', () => {
    const m = buildMetadata({ title: 'Pricing', description: 'd', path: '/pricing/' });
    expect(m.alternates?.canonical).toBe(`${SITE_URL}/pricing`);
    expect(m.alternates?.languages).toEqual({ en: `${SITE_URL}/pricing`, 'x-default': `${SITE_URL}/pricing` });
    expect(m.openGraph?.url).toBe(`${SITE_URL}/pricing`);
    expect(m.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(m.robots).toBeUndefined();
  });

  it('marks pages noindex, nofollow', () => {
    const m = buildMetadata({ title: 'Thank you', description: 'd', path: '/thank-you', noindex: true });
    expect(m.robots).toMatchObject({ index: false, follow: false });
  });
});

describe('JSON-LD builders', () => {
  it('links entities with @id', () => {
    expect(organizationLd()['@id' as never]).toBe(ids.organization);
    expect(websiteLd()).toMatchObject({ publisher: { '@id': ids.organization } });
  });

  it('never includes a price or offers', () => {
    const app = softwareLd({
      edition: 'enterprise',
      name: editions.enterprise.name,
      description: editions.enterprise.seoDescription,
      featureList: editions.enterprise.featureList,
      path: '/enterprise',
    });
    const json = JSON.stringify(app);
    expect(json).not.toMatch(/offers|"price"|priceCurrency/);
    expect(app).toMatchObject({ applicationCategory: 'BusinessApplication', operatingSystem: 'Web browser' });
  });

  it('FAQPage text matches the visible FAQ exactly', () => {
    const ld = faqLd(homeFaq) as unknown as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(ld.mainEntity.map((q) => q.name)).toEqual(homeFaq.map((q) => q.q));
    expect(ld.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(homeFaq.map((q) => q.a));
  });

  it('breadcrumbs use absolute URLs and 1-based positions', () => {
    const ld = breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]) as unknown as { itemListElement: { position: number; item: string }[] };
    expect(ld.itemListElement).toEqual([
      expect.objectContaining({ position: 1, item: SITE_URL }),
      expect.objectContaining({ position: 2, item: `${SITE_URL}/pricing` }),
    ]);
  });

  it('omits LocalBusiness until the real address and phone are filled in', () => {
    expect(localBusinessLd()).toBeNull();
  });

  it('graph() drops null nodes and sets the context', () => {
    const g = graph(organizationLd(), null) as WithContext<Thing> & { '@graph': unknown[] };
    expect(g['@context']).toBe('https://schema.org');
    expect(g['@graph']).toHaveLength(1);
  });
});
