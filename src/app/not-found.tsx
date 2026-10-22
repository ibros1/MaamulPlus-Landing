import type { Metadata } from 'next';
import { Footer } from '@/components/ui/footer';
import { NavBar } from '@/components/ui/nav-bar';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/** Real 404 status with links back into the site. */
export default function NotFound() {
  return (
    <div className="mp">
      <NavBar appUrl={site.appUrl} />
      <main id="main">
        <section className="page-hero page-hero--center" aria-labelledby="page-title">
          <div className="wrap">
            <div className="page-hero__copy">
              <p className="mp-eyebrow">404</p>
              <h1 id="page-title">This page is not on the shelf.</h1>
              <p className="lead">The link may be old or mistyped. These pages are a good place to continue.</p>
              <ul className="nf-links">
                <li>
                  <Button href="/">Home</Button>
                </li>
                <li>
                  <Button href="/enterprise" variant="outline">
                    MaamulPlus Enterprise
                  </Button>
                </li>
                <li>
                  <Button href="/lite" variant="outline">
                    MaamulPlus Lite
                  </Button>
                </li>
                <li>
                  <Button href="/pricing" variant="outline">
                    Pricing
                  </Button>
                </li>
                <li>
                  <Button href="/contact" variant="outline">
                    Contact
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
