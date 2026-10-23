import { cn } from '@/lib/cn';

/** Reserves the form's space while its code loads, so nothing shifts (heights in site.css). */
export function FormPlaceholder({ title, sub, kind }: { title: string; sub: string; kind: 'demo' | 'contact' }) {
  return (
    <div className={cn('form', `form-ph--${kind}`, kind === 'contact' && 'form--plain')} aria-busy="true">
      <div className="full">
        <p className="form-title">{title}</p>
        <p className="sub">{sub}</p>
      </div>
    </div>
  );
}
