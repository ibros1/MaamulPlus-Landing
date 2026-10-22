import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/lib/seo';

/** Visible breadcrumbs; the matching BreadcrumbList JSON-LD is rendered by the page. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path}>
              {last ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <>
                  <Link href={c.path}>{c.name}</Link>
                  <ChevronRight aria-hidden="true" strokeWidth={2} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
