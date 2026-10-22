import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'green' | 'on-inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  pill?: boolean | undefined;
  block?: boolean | undefined;
  /** Trailing arrow for forward-moving CTAs; nudges 3px on hover. */
  arrow?: boolean | undefined;
  /** Analytics: where the CTA sits (fires `cta_click`). */
  ctaLocation?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;
export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function buttonClass({
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'pill' | 'block' | 'className'>): string {
  return cn(
    'mp-btn',
    `mp-btn--${variant}`,
    size !== 'md' && `mp-btn--${size}`,
    pill && 'mp-btn--pill',
    block && 'mp-btn--block',
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, pill, block, arrow, ctaLocation, className, children, ...rest } = props;
  const cls = buttonClass({ variant, size, pill, block, className });
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="mp-arrow" aria-hidden="true" strokeWidth={2} /> : null}
    </>
  );
  const data = ctaLocation ? { 'data-cta': ctaLocation } : {};
  if (typeof rest.href === 'string') {
    const { href, ...rest2 } = rest as LinkButtonProps;
    // Optional DOM props may be explicitly undefined; spread them untyped onto the element.
    const anchor = rest2 as Record<string, unknown>;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...data} {...anchor}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...data} {...anchor}>
        {content}
      </Link>
    );
  }
  const { type = 'button', ...button } = rest as NativeButtonProps;
  return (
    <button type={type} className={cls} {...data} {...button}>
      {content}
    </button>
  );
}
