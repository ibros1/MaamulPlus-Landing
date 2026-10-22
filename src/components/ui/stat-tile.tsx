import { cn } from '@/lib/cn';

interface StatTileProps {
  label: string;
  /** Formatted amount without the currency sign, e.g. "7,436.03". */
  value: string;
  currency?: string;
  note?: string;
  tone?: 'default' | 'danger' | 'in';
}

/** A money metric as the product shows it. Used inside product mocks only. */
export function StatTile({ label, value, currency = '$', note, tone = 'default' }: StatTileProps) {
  return (
    <div className="mp-stat">
      <div className="mp-stat__label">{label}</div>
      <div className={cn('mp-stat__value', tone === 'danger' && 'mp-stat__value--danger', tone === 'in' && 'mp-stat__value--in')}>
        {currency ? <small>{currency}</small> : null}
        {value}
      </div>
      {note ? <div className="mp-stat__note">{note}</div> : null}
    </div>
  );
}
