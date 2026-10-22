import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { consentSlice, writeStoredConsent } from './consentSlice';
import { uiSlice } from './uiSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  ui: uiSlice.reducer,
  consent: consentSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/** A new store per request on the server, one per tab in the browser (see StoreProvider). */
export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    ...(preloadedState ? { preloadedState } : {}),
    middleware: (getDefault) => getDefault().concat(api.middleware),
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
