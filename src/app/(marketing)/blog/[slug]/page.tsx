import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { JsonLd } from '@/components/seo/JsonLd';
import { mdxComponents } from '@/components/seo/mdx-components';
import { CtaBand } from '@/components/sections/cta-band';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { formatDate, getAllPosts, getPost } from '@/lib/blog';
import { blogPostingLd, breadcrumbLd, buildMetadata, graph, type Crumb } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.seoTitle ?? post.title, path: `/blog/${post.slug}` },
  ];
  const showToc = post.headings.length >= 4;

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="page-hero">
          <div className="wrap">
            <Breadcrumbs items={crumbs} />
            <div className="page-hero__copy">
              <p className="mp-eyebrow" style={{ marginTop: 28 }}>
                {post.tags[0]}
              </p>
              <h1 id="page-title">{post.title}</h1>
              <p className="lead">{post.description}</p>
              <div className="post-meta">
                <span>By {post.author}</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updated !== post.date ? (
                  <span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                ) : null}
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>
          </div>
        </header>
        <div className="wrap" style={{ paddingBottom: 96 }}>
          <div className={showToc ? 'post-layout' : undefined}>
            <div className="prose">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
              <aside className="author-box" aria-label="About the author">
                <Image src="/brand/MaamulPlus-Icon-v2.svg" width={48} height={48} alt="" className="author-icon" />
                <div>
                  <strong>{post.author}</strong>
                  <p>Written by the MaamulPlus team in Hargeisa, who set up and support the software for traders across Somaliland.</p>
                </div>
              </aside>
            </div>
            {showToc ? (
              <nav className="toc" aria-labelledby="toc-title">
                <h2 id="toc-title">On this page</h2>
                <ol>
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
        </div>
      </article>
      {related.length ? (
        <section className="alt" aria-labelledby="related-title">
          <div className="wrap">
            <div className="mp-section-head">
              <p className="mp-eyebrow">Keep reading</p>
              <h2 id="related-title">Related guides.</h2>
            </div>
            <div className="post-cards">
              {related.map((p) => (
                <article className="post-card" key={p.slug}>
                  <p className="mp-eyebrow">{p.tags[0]}</p>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p>{p.description}</p>
                  <div className="post-meta">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span>{p.readingMinutes} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand withForm={false} />
      <JsonLd data={graph(blogPostingLd(post), breadcrumbLd(crumbs))} />
    </>
  );
}
