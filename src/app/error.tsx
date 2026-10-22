'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

/** Never shows the error itself: only a way forward. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Page error', error.digest ?? '');
  }, [error]);
  return (
    <main id="main" className="mp">
      <section className="page-hero page-hero--center" aria-labelledby="page-title">
        <div className="wrap">
          <div className="page-hero__copy">
            <p className="mp-eyebrow">Something went wrong</p>
            <h1 id="page-title">This page did not load.</h1>
            <p className="lead">Please try again. If it keeps happening, contact us and we will look into it.</p>
            <div className="hero-cta">
              <Button onClick={reset}>Try again</Button>
              <Button href="/" variant="outline">
                Go to the home page
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
