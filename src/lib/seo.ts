import type { Metadata } from 'next';
import type {
  AboutPage,
  BlogPosting,
  Blog,
  BreadcrumbList,
  FAQPage,
  Graph,
  LocalBusiness,
  Organization,
  SoftwareApplication,
  WebSite,
} from 'schema-dts';
import { sameAs, site } from '@/config/site';

export const SITE_URL = site.url;

/** Absolute canonical URL for a path: no trailing slash, no query, no hash. */
export function absoluteUrl(path: string): string {
  const clean = path.split(/[?#]/)[0] ?? '/';
  const trimmed = clean === '/' ? '' : clean.replace(/\/+$/, '');
  return `${SITE_URL}${trimmed.startsWith('/') || trimmed === '' ? trimmed : `/${trimmed}`}`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Path of a custom OG image. Defaults to the route's opengraph-image file convention. */
  ogImage?: string;
  noindex?: boolean;
  /** Use the title as-is instead of the "%s · MaamulPlus" template. */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noindex = false,
  absoluteTitle = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  // Routes with their own opengraph-image file override this (file-based metadata wins);
  // every other page falls back to the site-wide image.
  const images = [{ url: ogImage ?? '/opengraph-image', width: 1200, height: 630, alt: title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url, 'x-default': url },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      images,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((i) => i.url),
      ...(site.twitterHandle ? { site: site.twitterHandle, creator: site.twitterHandle } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
  };
}

/* ---------- JSON-LD builders ---------- */

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  enterprise: `${SITE_URL}/#enterprise`,
  lite: `${SITE_URL}/#lite`,
} as const;

export function organizationLd(): Organization {
  const { contact } = site;
  return {
    '@type': 'Organization',
    '@id': ids.organization,
    name: site.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/logo-512.png`, width: '512', height: '512' },
    description: site.description,
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      areaServed: site.countryCode,
      availableLanguage: ['en', 'so'],
      ...(contact.phone ? { telephone: contact.phone } : {}),
      ...(contact.email ? { email: contact.email } : {}),
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
      ...(contact.street ? { streetAddress: contact.street } : {}),
    },
  };
}

export function websiteLd(): WebSite {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: SITE_URL,
    name: site.name,
    inLanguage: 'en',
    publisher: { '@id': ids.organization },
  };
}

interface SoftwareInput {
  edition: 'enterprise' | 'lite';
  name: string;
  description: string;
  featureList: string[];
  path: string;
}

/** Deliberately no `offers`: prices are never published. */
export function softwareLd({ edition, name, description, featureList, path }: SoftwareInput): SoftwareApplication {
  return {
    '@type': 'SoftwareApplication',
    '@id': ids[edition],
    name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: edition === 'enterprise' ? 'ERP' : 'Accounting & Inventory',
    operatingSystem: 'Web browser',
    description,
    featureList: featureList.join(', '),
    url: absoluteUrl(path),
    image: absoluteUrl(`${path === '/' ? '' : path}/opengraph-image`),
    screenshot: absoluteUrl(`${path === '/' ? '' : path}/opengraph-image`),
    publisher: { '@id': ids.organization },
  };
}

export function faqLd(items: readonly { q: string; a: string }[]): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbLd(crumbs: readonly Crumb[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Only emitted with the real address and phone. Returns null until those are filled in. */
export function localBusinessLd(): LocalBusiness | null {
  const { contact } = site;
  if (!contact.street || !contact.phone) return null;
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/contact#localbusiness`,
    name: site.name,
    url: absoluteUrl('/contact'),
    image: `${SITE_URL}/brand/logo-512.png`,
    telephone: contact.phone,
    ...(contact.email ? { email: contact.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.street,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    ...(contact.openingHours ? { openingHours: contact.openingHours } : {}),
    ...(contact.mapsUrl ? { hasMap: contact.mapsUrl } : {}),
    parentOrganization: { '@id': ids.organization },
  } as unknown as LocalBusiness;
  // schema-dts has no type for a multi-type node; the shape is checked by tests/jsonld.test.ts.
}

export function aboutPageLd(): AboutPage {
  return {
    '@type': 'AboutPage',
    url: absoluteUrl('/about'),
    name: 'About MaamulPlus',
    about: { '@id': ids.organization },
    isPartOf: { '@id': ids.website },
  };
}

export function blogLd(posts: readonly { title: string; slug: string; date: string }[]): Blog {
  return {
    '@type': 'Blog',
    url: absoluteUrl('/blog'),
    name: 'MaamulPlus blog',
    publisher: { '@id': ids.organization },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
    })),
  };
}

interface PostInput {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  author: string;
}

export function blogPostingLd(p: PostInput): BlogPosting {
  const url = absoluteUrl(`/blog/${p.slug}`);
  return {
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated,
    author: p.author === site.name ? { '@id': ids.organization } : { '@type': 'Person', name: p.author },
    publisher: { '@id': ids.organization },
    image: `${url}/opengraph-image`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en',
  };
}

export function graph(...nodes: (Graph['@graph'][number] | null)[]): Graph {
  return { '@context': 'https://schema.org', '@graph': nodes.filter((n) => n !== null) } as Graph;
}
