import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

function text(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(text).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return text((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

export function headingId(children: ReactNode): string {
  return text(children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Element overrides for blog MDX: anchored headings, internal links via next/link, scrollable tables. */
export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 id={headingId(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 id={headingId(children)} {...props}>
      {children}
    </h3>
  ),
  a: ({ href = '', children }: ComponentPropsWithoutRef<'a'>) =>
    href.startsWith('/') ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  ),
};
