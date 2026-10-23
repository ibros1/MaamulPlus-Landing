'use client';

import { useEffect, useRef } from 'react';
import { publicEnv } from '@/lib/public-env';

/** Token sent when no site key is configured (local dev). The server only accepts it outside production. */
export const DEV_TURNSTILE_TOKEN = 'dev-turnstile-disabled';

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      size: 'invisible' | 'flexible' | 'normal' | 'compact';
      appearance?: 'always' | 'execute' | 'interaction-only';
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';

function loadScript(): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    window.onTurnstileLoad = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error('turnstile'));
    document.head.appendChild(s);
  });
}

interface TurnstileProps {
  onToken: (token: string) => void;
  /** Changing this value resets the widget (after a failed submit). */
  resetKey?: number;
}

/** Invisible Cloudflare Turnstile. Loads only when the form is on screen. */
export function Turnstile({ onToken, resetKey = 0 }: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    const siteKey = publicEnv.turnstileSiteKey;
    if (!siteKey) {
      onTokenRef.current(DEV_TURNSTILE_TOKEN);
      return;
    }
    let cancelled = false;
    loadScript()
      .then((ts) => {
        if (cancelled || !ref.current || widgetId.current) return;
        widgetId.current = ts.render(ref.current, {
          sitekey: siteKey,
          size: 'flexible',
          appearance: 'interaction-only',
          callback: (t) => onTokenRef.current(t),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      })
      .catch(() => onTokenRef.current(''));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey > 0 && widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetKey]);

  return <div ref={ref} className="turnstile full" />;
}
