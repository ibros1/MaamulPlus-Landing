import { CircleCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { cn } from '@/lib/cn';
import type { Crumb } from '@/lib/seo';

interface PageHeroProps {
  crumbs: readonly Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  note?: string;
  center?: boolean;
  /** Visual below the copy, e.g. a product screen. */
  children?: ReactNode;
}

/** The top of every inner page: breadcrumbs, eyebrow, the page H1, lead and CTAs. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, note, center = false, children }: PageHeroProps) {
  return (
    <section className={cn('page-hero', center && 'page-hero--center')} aria-labelledby="page-title">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero__copy">
          <p className="mp-eyebrow" style={{ marginTop: 28 }}>
            {eyebrow}
          </p>
          <h1 id="page-title">{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {actions ? <div className="hero-cta">{actions}</div> : null}
          {note ? (
            <p className="avail">
              <CircleCheck aria-hidden="true" strokeWidth={2} />
              {note}
            </p>
          ) : null}
        </div>
        {children ? <div className="stage">{children}</div> : null}
      </div>
    </section>
  );
}
