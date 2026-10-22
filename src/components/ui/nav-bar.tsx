'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { mainNav, navCopy } from '@/content/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMobileNavOpen } from '@/store/uiSlice';
import { Button } from './button';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

function isCurrent(pathname: string, href: string): boolean {
  if (href.startsWith('/#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar({ appUrl }: { appUrl: string }) {
  const pathname = usePathname();
  const open = useAppSelector((s) => s.ui.mobileNavOpen);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(
    (restoreFocus: boolean) => {
      dispatch(setMobileNavOpen(false));
      if (restoreFocus) buttonRef.current?.focus();
    },
    [dispatch],
  );

  // Close the sheet on navigation.
  useEffect(() => {
    dispatch(setMobileNavOpen(false));
  }, [pathname, dispatch]);

  // Focus trap + Escape while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).concat(
        buttonRef.current ? [buttonRef.current] : [],
      );
    focusables()[0]?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const onSignIn = () => track({ name: 'outbound_app_signin', props: { location: 'nav' } });

  return (
    <header className={cn('site-head', open && 'open')}>
      <nav className="mp-nav" aria-label={navCopy.mainLabel}>
        <div className="wrap">
          <Link className="mp-nav__logo" href="/" aria-label={navCopy.home}>
            <Logo variant="compact" />
          </Link>
          <ul className="mp-nav__links">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isCurrent(pathname, l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mp-nav__end">
            <ThemeToggle label={navCopy.theme} />
            <Button href={appUrl} variant="ghost" size="sm" className="nav-signin" rel="nofollow" onClick={onSignIn}>
              {navCopy.signIn}
            </Button>
            <Button href="/demo" variant="primary" size="sm" pill className="nav-cta" ctaLocation="nav">
              {navCopy.cta}
            </Button>
            <button
              ref={buttonRef}
              className="icon-btn menu-btn"
              type="button"
              aria-label={open ? navCopy.closeMenu : navCopy.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => dispatch(setMobileNavOpen(!open))}
            >
              {open ? <X aria-hidden="true" strokeWidth={1.75} /> : <Menu aria-hidden="true" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </nav>
      <div className="mobile-menu" id="mobile-menu" ref={menuRef} hidden={!open}>
        <div className="wrap">
          <ul>
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(pathname, l.href) ? 'page' : undefined}
                  onClick={() => close(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={appUrl} rel="nofollow" onClick={onSignIn}>
                {navCopy.signIn}
              </a>
            </li>
          </ul>
          <Button href="/demo" variant="primary" block ctaLocation="mobile-nav" onClick={() => close(false)}>
            {navCopy.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}
