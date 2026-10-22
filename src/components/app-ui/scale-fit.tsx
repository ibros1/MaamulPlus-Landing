'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

const CANVAS_WIDTH = 1280;

/**
 * Scales the fixed 1280px app canvas to its container with transform: scale(var(--s)).
 * Before hydration the viewport keeps its aspect-ratio (no layout shift) and --s falls back to a CSS default.
 */
export function ScaleFit({ tall = false, children }: { tall?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      if (w) el.style.setProperty('--s', String(w / CANVAS_WIDTH));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn('ui-view', tall && 'ui-view--tall')} aria-hidden="true">
      {children}
    </div>
  );
}
