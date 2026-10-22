import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  tone?: 'neutral' | 'green' | 'outline' | 'inverse';
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

/** A small pill label. Not a link, never a button. */
export function Badge({ tone = 'neutral', dot = false, className, children }: BadgeProps) {
  return (
    <span className={cn('mp-badge', tone !== 'neutral' && `mp-badge--${tone}`, dot && 'mp-badge--dot', className)}>
      {children}
    </span>
  );
}
