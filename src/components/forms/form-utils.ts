import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiError } from '@/lib/schemas';

const UTM_KEY = 'mp-utm';

export type Utm = { source?: string; medium?: string; campaign?: string };

/** Saves utm_* params from the landing URL for the rest of the visit (called once on load). */
export function captureUtm(search: string): void {
  try {
    const p = new URLSearchParams(search);
    const utm: Utm = {};
    const source = p.get('utm_source');
    const medium = p.get('utm_medium');
    const campaign = p.get('utm_campaign');
    if (source) utm.source = source.slice(0, 100);
    if (medium) utm.medium = medium.slice(0, 100);
    if (campaign) utm.campaign = campaign.slice(0, 100);
    if (Object.keys(utm).length && !window.sessionStorage.getItem(UTM_KEY)) {
      window.sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }
  } catch {
    // sessionStorage unavailable: attribution is optional.
  }
}

export function readUtm(): Utm | undefined {
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    if (!raw) return undefined;
    const v = JSON.parse(raw) as Utm;
    return typeof v === 'object' && v !== null ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Turns an RTK Query error into a message that says what to do next. */
export function errorMessage(error: FetchBaseQueryError | SerializedError | undefined): {
  message: string;
  status: number | string;
  fieldErrors?: ApiError['fieldErrors'];
} {
  if (error && 'status' in error) {
    const body = error.data as Partial<ApiError> | undefined;
    if (error.status === 429) {
      return { message: body?.error ?? 'Too many requests. Please wait a few minutes and try again.', status: 429 };
    }
    if (typeof error.status === 'number') {
      return {
        message: body?.error ?? 'Something went wrong. Please try again.',
        status: error.status,
        ...(body?.fieldErrors ? { fieldErrors: body.fieldErrors } : {}),
      };
    }
    return { message: 'We could not reach the server. Check your connection and try again.', status: String(error.status) };
  }
  return { message: 'Something went wrong. Please try again.', status: 'unknown' };
}
