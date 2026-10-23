import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterFormLazy } from '@/components/forms/newsletter-form-lazy';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHero } from '@/components/sections/page-hero';
import { formatDate, getAllPosts } from '@/lib/blog';
import { blogLd, breadcrumbLd, buildMetadata, graph, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guides for traders in Somaliland',
  description:
    'Practical guides for business owners in Somaliland on customer credit, USD and SLSH bookkeeping, stock and accounting, from the MaamulPlus team in Hargeisa.',
  path: '/blog',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Blog"
        title="Practical guides for traders."
        lead="Plain-language guides on credit, currency, stock and bookkeeping for businesses in Hargeisa and across Somaliland."
      />
      <section className="flush-top" aria-label="Articles">
        <div className="wrap">
          <div className="post-cards">
            {posts.map((p) => (
              <article className="post-card" key={p.slug}>
                <p className="mp-eyebrow">{p.tags[0]}</p>
                <h2>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                <p>{p.description}</p>
                <div className="post-meta">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span>{p.readingMinutes} min read</span>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <NewsletterFormLazy />
          </div>
        </div>
      </section>
      <CtaBand withForm={false} />
      <JsonLd data={graph(blogLd(posts), breadcrumbLd(crumbs))} />
    </>
  );
}
