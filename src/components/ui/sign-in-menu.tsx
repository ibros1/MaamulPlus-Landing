'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import type { Edition } from '@/config/site';
import { navCopy } from '@/content/navigation';
import { track } from '@/lib/analytics';
import { buttonClass } from './button';

const editions: Edition[] = ['enterprise', 'lite'];

/** Header "Sign in": a disclosure that lets the customer pick the edition they use. */
export function SignInMenu({ appUrls }: { appUrls: Record<Edition, string> }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close on outside click or when focus leaves the menu.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  function onBlur(e: FocusEvent) {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  }

  return (
    <div className="signin-menu nav-signin" ref={rootRef} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        className={buttonClass({ variant: 'ghost', size: 'sm' })}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {navCopy.signIn}
        <ChevronDown className="signin-menu__chev" aria-hidden="true" strokeWidth={2} />
      </button>
      <div className="signin-menu__panel" id={panelId} hidden={!open}>
        <p className="signin-menu__title">{navCopy.signInMenu}</p>
        <ul>
          {editions.map((edition) => {
            const copy = navCopy.signInEditions[edition];
            return (
              <li key={edition}>
                <a
                  href={appUrls[edition]}
                  rel="nofollow"
                  onClick={() => track({ name: 'outbound_app_signin', props: { location: 'nav', edition } })}
                >
                  <span className="signin-menu__label">{copy.label}</span>
                  <span className="signin-menu__hint">{copy.hint}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
