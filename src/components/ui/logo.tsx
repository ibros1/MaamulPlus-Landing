import { LOGO_VIEWBOX, type LogoSymbolId } from './logo-sprite';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** `full` is the lockup with tagline (footer, app sidebar); `compact` is the nav logo without tagline. */
  variant?: 'full' | 'compact';
  className?: string;
  /** Accessible name. Omit when the logo sits inside a link that already has a label. */
  title?: string;
}

/**
 * The official MaamulPlus logo, referenced from the inline sprite.
 * Colours follow --logo-ink / --logo-plus, so it is navy on light grounds and white on dark/navy.
 */
export function Logo({ variant = 'compact', className, title }: LogoProps) {
  const id: LogoSymbolId = variant === 'full' ? 'mp-logo' : 'mp-logo-notagline';
  return (
    <svg
      className={cn('logo-svg', className)}
      viewBox={LOGO_VIEWBOX[id]}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href={`#${id}`} />
    </svg>
  );
}
