'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { readStoredConsent, setConsent } from './consentSlice';
import { makeStore, type AppStore } from './store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    // Restore the analytics choice after hydration (localStorage is browser-only).
    const stored = readStoredConsent();
    if (stored !== 'unknown') storeRef.current?.dispatch(setConsent(stored));
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
