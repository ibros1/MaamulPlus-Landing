/**
 * Business facts used across the site, metadata and structured data.
 * Values marked FILL must be supplied by the owner before launch. Leave them `null`
 * until then: components and JSON-LD omit anything that is null, never invent it.
 */
type Fill<T> = T | null;

export type Edition = 'enterprise' | 'lite';

export interface SiteConfig {
  name: string;
  legalName: string;
  url: string;
  /** [[FILL]] Sign-in URL of each edition's web app. The header "Sign in" menu offers both. */
  appUrls: Record<Edition, string>;
  locale: string;
  description: string;
  city: string;
  region: string;
  countryCode: string;
  contact: {
    /** [[FILL]] Sales phone, e.g. +252 63 … */
    phone: Fill<string>;
    /** [[FILL]] Sales email */
    email: Fill<string>;
    /** [[FILL]] Street address in Hargeisa */
    street: Fill<string>;
    /** [[FILL]] Opening hours in schema.org format, e.g. ['Sa-Th 08:00-17:00'] */
    openingHours: Fill<string[]>;
    /** [[FILL]] Google Maps link to the office */
    mapsUrl: Fill<string>;
  };
  /** [[FILL]] Social profiles. Empty strings are skipped. */
  socials: { facebook: string; linkedin: string; x: string; tiktok: string; instagram: string };
  /** [[FILL]] X / Twitter handle including @ */
  twitterHandle: Fill<string>;
  /** [[CONFIRM]] Promises the site makes. Set to false to hide any that are not true. */
  promises: {
    replyWithinOneWorkingDay: boolean;
    localSupportInHargeisa: boolean;
    trainedOnSite: boolean;
    cloudBackup: boolean;
  };
}

export const site: SiteConfig = {
  name: 'MaamulPlus',
  legalName: 'MaamulPlus',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maamulplus.com').replace(/\/$/, ''),
  appUrls: {
    enterprise: process.env.NEXT_PUBLIC_ENTERPRISE_APP_URL ?? 'https://app.maamulplus.com',
    lite: process.env.NEXT_PUBLIC_LITE_APP_URL ?? 'https://lite.maamulplus.com',
  },
  locale: 'en_US',
  description:
    'Business management software for traders in Somaliland: sales, stock, credit, payments and accounting in USD and SLSH.',
  city: 'Hargeisa',
  region: 'Somaliland',
  countryCode: 'SO',
  contact: {
    phone: null,
    email: null,
    street: null,
    openingHours: null,
    mapsUrl: null,
  },
  socials: { facebook: '', linkedin: '', x: '', tiktok: '', instagram: '' },
  twitterHandle: null,
  promises: {
    replyWithinOneWorkingDay: true,
    localSupportInHargeisa: true,
    trainedOnSite: true,
    cloudBackup: true,
  },
};

export const sameAs = (): string[] => Object.values(site.socials).filter((u) => u.length > 0);
