import type { ReactNode } from 'react';
import type { PillTone } from '@/content/demo-data';
import { money } from '@/content/demo-data';
import { cn } from '@/lib/cn';

/** Small building blocks shared by the coded app screens (classes from app-screens.css). */

export function Money({ value, tone, xl = false }: { value: number; tone?: 'red' | 'green' | undefined; xl?: boolean }) {
  return (
    <div className={cn('uv', tone, xl && 'xl')}>
      <small>$</small>
      {money(value)}
    </div>
  );
}

export function Pill({ tone, children, className }: { tone: PillTone; children: ReactNode; className?: string }) {
  return <span className={cn('pill', tone, className)}>{children}</span>;
}

interface CardProps {
  label: string;
  /** A number renders as money; a string renders as-is (counts). */
  value: number | string;
  note?: string;
  icon?: ReactNode;
  well?: '' | 'red' | 'navy' | 'amber';
  tone?: 'red' | 'green';
}

export function UCard({ label, value, note, icon, well = '', tone }: CardProps) {
  return (
    <div className={cn('ucard', icon ? 'ico' : null)}>
      {icon ? <div className={cn('uw', well)}>{icon}</div> : null}
      <div>
        <div className="ul">{label}</div>
        {typeof value === 'number' ? <Money value={value} tone={tone} /> : <div className="uv">{value}</div>}
        {note ? <div className="un">{note}</div> : null}
      </div>
    </div>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="ucards" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
      {children}
    </div>
  );
}

export function Head({
  kicker,
  title,
  sub,
  actions,
}: {
  kicker?: string;
  title: ReactNode;
  sub: string;
  actions?: ReactNode;
}) {
  return (
    <div className="ui-head">
      <div>
        {kicker ? <small>{kicker}</small> : null}
        <h4>{title}</h4>
        <p>{sub}</p>
      </div>
      {actions ? <div className="act">{actions}</div> : null}
    </div>
  );
}

export function UButton({ go, ink, children }: { go?: boolean; ink?: boolean; children: ReactNode }) {
  return <span className={cn('ub', go && 'go', ink && 'go-ink')}>{children}</span>;
}

export const usd = (n: number) => `$${money(n)}`;
