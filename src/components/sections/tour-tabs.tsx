'use client';

import { ChartColumn, IdCard, ShoppingCart, Users, Wallet, type LucideIcon } from 'lucide-react';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import type { TourTabId } from '@/content/home';
import { track } from '@/lib/analytics';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveTourTab } from '@/store/uiSlice';

const ICONS: Record<TourTabId, LucideIcon> = {
  sales: ShoppingCart,
  customer: Users,
  finance: Wallet,
  cashflow: ChartColumn,
  people: IdCard,
};

interface TourTabsProps {
  tabs: readonly { id: TourTabId; title: string; blurb: string }[];
  /** Server-rendered panels, in the same order as tabs. All stay in the HTML; inactive ones are `hidden`. */
  panels: readonly ReactNode[];
  label: string;
}

/** WAI-ARIA tabs: arrow keys move and select, Home/End jump. Active tab lives in Redux (ui.activeTourTab). */
export function TourTabs({ tabs, panels, label }: TourTabsProps) {
  const active = useAppSelector((s) => s.ui.activeTourTab);
  const dispatch = useAppDispatch();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, focus: boolean) {
    const tab = tabs[i];
    if (!tab) return;
    dispatch(setActiveTourTab(tab.id));
    track({ name: 'tour_tab', props: { tab: tab.id } });
    if (focus) refs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  }

  return (
    <div className="tour rv">
      <div className="tabs" role="tablist" aria-label={label} aria-orientation="vertical">
        {tabs.map((t, i) => {
          const Icon = ICONS[t.id];
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="tab"
              role="tab"
              type="button"
              id={`t-${t.id}`}
              aria-controls={`p-${t.id}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i, false)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="ti">
                <Icon aria-hidden="true" strokeWidth={1.75} />
              </span>
              <strong>{t.title}</strong>
              <span>{t.blurb}</span>
            </button>
          );
        })}
      </div>
      <div className="panels showcase">
        {tabs.map((t, i) => (
          <div
            key={t.id}
            className="panel"
            role="tabpanel"
            id={`p-${t.id}`}
            aria-labelledby={`t-${t.id}`}
            hidden={t.id !== active}
            tabIndex={0}
          >
            {panels[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
