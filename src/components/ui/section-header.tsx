import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  lead?: ReactNode;
  align?: 'start' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeader({ eyebrow, title, id, lead, align = 'start', as = 'h2', className }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={cn('mp-section-head', align === 'center' && 'mp-section-head--center', className)}>
      <p className="mp-eyebrow">{eyebrow}</p>
      <Heading id={id}>{title}</Heading>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
