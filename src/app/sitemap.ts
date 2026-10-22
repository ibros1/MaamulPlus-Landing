import type { MetadataRoute } from 'next';
import { features } from '@/content/features';
import { solutions } from '@/content/solutions';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';

/** Date of the last content change for static pages. Update when page copy changes. */
const CONTENT_UPDATED = '2026-10-23';

type Entry = MetadataRoute.Sitemap[number];
const entry = (path: string, priority: number, changeFrequency: Entry['changeFrequency'], lastModified = CONTENT_UPDATED): Entry => ({
  url: absoluteUrl(path),
  lastModified,
  changeFrequency,
  priority,
});

/** Indexable routes only: /thank-you and /api are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    entry('/', 1.0, 'weekly'),
    entry('/enterprise', 0.9, 'monthly'),
    entry('/lite', 0.9, 'monthly'),
    entry('/pricing', 0.9, 'monthly'),
    ...features.map((f) => entry(`/features/${f.slug}`, 0.8, 'monthly')),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8, 'monthly')),
    entry('/demo', 0.7, 'yearly'),
    entry('/contact', 0.6, 'yearly'),
    entry('/about', 0.5, 'yearly'),
    entry('/faq', 0.6, 'monthly'),
    entry('/blog', 0.6, 'weekly', posts[0]?.updated ?? CONTENT_UPDATED),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.6, 'monthly', p.updated)),
    entry('/legal/privacy', 0.2, 'yearly'),
    entry('/legal/terms', 0.2, 'yearly'),
  ];
}
