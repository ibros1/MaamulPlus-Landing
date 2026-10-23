import type { ReactNode } from 'react';
import { Footer } from '@/components/ui/footer';
import { NavBar } from '@/components/ui/nav-bar';
import { site } from '@/config/site';
import { navCopy } from '@/content/navigation';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mp">
      <a className="skip-link" href="#main">
        {navCopy.skip}
      </a>
      <NavBar appUrls={site.appUrls} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
