import { features } from '../src/content/features';
import { solutions } from '../src/content/solutions';

/** Every indexable page, plus /thank-you. Blog slugs are listed from the MDX folder. */
export const blogSlugs = [
  'track-customer-credit-without-a-notebook',
  'usd-and-slsh-in-one-set-of-books',
  'double-entry-accounting-explained',
];

export const allPages = [
  '/',
  '/enterprise',
  '/lite',
  '/pricing',
  ...features.map((f) => `/features/${f.slug}`),
  ...solutions.map((s) => `/solutions/${s.slug}`),
  '/demo',
  '/contact',
  '/about',
  '/faq',
  '/blog',
  ...blogSlugs.map((s) => `/blog/${s}`),
  '/legal/privacy',
  '/legal/terms',
  '/thank-you',
];
