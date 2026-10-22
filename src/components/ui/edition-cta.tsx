'use client';

import type { MouseEvent } from 'react';
import { track } from '@/lib/analytics';
import type { Edition } from '@/lib/schemas';
import { useAppDispatch } from '@/store/hooks';
import { setPreselectedEdition } from '@/store/uiSlice';
import { Button, type ButtonProps } from './button';

type EditionCtaProps = Extract<ButtonProps, { href: string }> & { edition: Edition };

/** A plan/edition button: preselects the edition in the demo form, then follows the link (#demo or /demo). */
export function EditionCta({ edition, onClick, ctaLocation, ...props }: EditionCtaProps) {
  const dispatch = useAppDispatch();
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    dispatch(setPreselectedEdition(edition));
    try {
      window.sessionStorage.setItem('mp-edition', edition);
    } catch {
      // Not critical: the /demo page falls back to Enterprise.
    }
    track({ name: 'edition_select', props: { edition, location: ctaLocation ?? 'unknown' } });
    onClick?.(e);
  }
  return <Button {...props} {...(ctaLocation ? { ctaLocation } : {})} onClick={handle} />;
}
