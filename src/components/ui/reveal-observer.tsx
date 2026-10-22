'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Fade-up 12px on section entry. Content is visible without JS: only elements below the fold
 * get the `.pre` class, and only when motion is allowed.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('js');
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove('pre');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add('pre');
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
