import { combineSlices, configureStore, createDynamicMiddleware } from '@reduxjs/toolkit';
import { consentSlice, writeStoredConsent } from './consentSlice';
import { uiSlice } from './uiSlice';

/**
 * The always-loaded state is tiny (ui + consent). The RTK Query `api` slice is injected
 * by src/store/api.ts when a form loads, so its code stays out of the first page load.
 */
export const rootReducer = combineSlices(uiSlice, consentSlice);
export const dynamicMiddleware = createDynamicMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

/** A new store per request on the server, one per tab in the browser (see StoreProvider). */
export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    ...(preloadedState ? { preloadedState } : {}),
    middleware: (getDefault) => getDefault().concat(dynamicMiddleware.middleware),
  });
  // Persist the consent choice whenever it changes.
  let last = store.getState().consent.analytics;
  store.subscribe(() => {
    const now = store.getState().consent.analytics;
    if (now !== last) {
      last = now;
      if (typeof window !== 'undefined') writeStoredConsent(now);
    }
  });
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
