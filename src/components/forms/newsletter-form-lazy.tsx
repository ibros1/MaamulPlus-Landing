'use client';

import dynamic from 'next/dynamic';

/** Newsletter signup below the blog list; loaded after the page is interactive. */
export const NewsletterFormLazy = dynamic(() => import('./newsletter-form').then((m) => m.NewsletterForm), {
  ssr: false,
  loading: () => <div className="newsletter" style={{ minHeight: 200 }} aria-busy="true" />,
});
