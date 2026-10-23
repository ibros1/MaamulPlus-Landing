'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureUtm } from '@/components/forms/form-utils';
import { track } from '@/lib/analytics';
import { publicEnv } from '@/lib/public-env';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setConsent } from '@/store/consentSlice';
import { Button } from './button';

/** Analytics scripts, CTA click tracking, UTM capture and (for GA4 only) the consent banner. */
export function SiteEffects() {
  const consent = useAppSelector((s) => s.consent.analytics);
  const dispatch = useAppDispatch();
  const { plausibleDomain, gaId } = publicEnv;

  useEffect(() => {
    captureUtm(window.location.search);
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-cta]');
      if (!el) return;
      track({ name: 'cta_click', props: { location: el.dataset.cta ?? 'unknown', label: (el.textContent ?? '').trim().slice(0, 60) } });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      {plausibleDomain ? (
        <Script
          src="https://plausible.io/js/script.tagged-events.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
      ) : null}
      {gaId && consent === 'granted' ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {gaId && consent === 'unknown' ? (
        <div className="consent" role="region" aria-label="Analytics consent">
          <p>We use Google Analytics to understand which pages help business owners. Is that all right?</p>
          <div className="consent__actions">
            <Button size="sm" variant="outline" onClick={() => dispatch(setConsent('denied'))}>
              No thanks
            </Button>
            <Button size="sm" variant="primary" onClick={() => dispatch(setConsent('granted'))}>
              Allow analytics
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
