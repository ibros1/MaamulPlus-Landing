import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ConsentStatus = 'unknown' | 'granted' | 'denied';

export interface ConsentState {
  analytics: ConsentStatus;
}

export const CONSENT_STORAGE_KEY = 'mp-consent';

export function readStoredConsent(): ConsentStatus {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function writeStoredConsent(v: ConsentStatus): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, v);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this visit only.
  }
}

export const consentSlice = createSlice({
  name: 'consent',
  initialState: { analytics: 'unknown' } as ConsentState,
  reducers: {
    setConsent(state, action: PayloadAction<ConsentStatus>) {
      state.analytics = action.payload;
    },
  },
});

export const { setConsent } = consentSlice.actions;
