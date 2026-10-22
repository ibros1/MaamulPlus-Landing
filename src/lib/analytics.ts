/** Conversion events (see docs/TRACKING.md). Safe to call anywhere in the browser. */

export type AnalyticsEvent =
  | { name: 'cta_click'; props: { location: string; label: string } }
  | { name: 'edition_select'; props: { edition: string; location: string } }
  | { name: 'tour_tab'; props: { tab: string } }
  | { name: 'demo_submit_success'; props: { edition: string; branches: string } }
  | { name: 'demo_submit_error'; props: { status: string } }
  | { name: 'contact_submit_success'; props: { topic: string } }
  | { name: 'outbound_app_signin'; props: { location: string } };

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;
type GtagFn = (command: 'event', event: string, params?: Record<string, string>) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    gtag?: GtagFn;
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event.name, { props: event.props });
    window.gtag?.('event', event.name, event.props);
  } catch {
    // Analytics must never break the page.
  }
}
