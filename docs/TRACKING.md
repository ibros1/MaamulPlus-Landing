# Tracking

All events go through `track()` in `src/lib/analytics.ts`, which sends to Plausible (custom events) and, if `NEXT_PUBLIC_GA_ID` is set and the visitor accepted, to GA4. Calls never throw.

- **Plausible** loads when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. It uses no cookies, so no banner.
- **GA4** loads only when `NEXT_PUBLIC_GA_ID` is set **and** the visitor clicks "Accept" in the consent banner. The choice lives in the Redux `consent` slice (`unknown | granted | denied`) and is saved in `localStorage`.

In Plausible, add each event name below as a custom-event goal. Mark `demo_submit_success` and `contact_submit_success` as conversions.

## Events

| Event | Props | Fires when | Source |
|---|---|---|---|
| `cta_click` | `location`, `label` | Any link or button with a `data-cta` attribute is clicked (every `<Button ctaLocation=…>`) | `src/components/ui/site-effects.tsx` |
| `edition_select` | `edition`, `location` | A plan / edition button is clicked; it also preselects the edition in the demo form | `src/components/ui/edition-cta.tsx` |
| `tour_tab` | `tab` | A product tour tab is chosen (mouse or keyboard) | `src/components/sections/tour-tabs.tsx` |
| `demo_submit_success` | `edition`, `branches` | The demo request API returned success | `src/components/forms/demo-form.tsx` |
| `demo_submit_error` | `status` | The demo request failed (`429`, `400`, `500`, network) | `src/components/forms/demo-form.tsx` |
| `contact_submit_success` | `topic` | The contact form was sent | `src/components/forms/contact-form.tsx` |
| `outbound_app_signin` | `location` (`nav` / `mobile-nav`), `edition` (`enterprise` / `lite`) | A visitor picks an edition from the Sign in menu | `src/components/ui/sign-in-menu.tsx`, `src/components/ui/nav-bar.tsx` |

## CTA locations

`location` values used by `ctaLocation`: `nav`, `mobile-nav`, `hero`, `hero-secondary`, `editions-enterprise`, `editions-lite`, `plan-<edition>`, `cta-band`, `cta-band-pricing`, `contact`, plus generated ones on edition, feature and solution pages. Search the code for `ctaLocation=` for the full list.

## UTM capture

UTM parameters on the landing URL are stored for the session and sent with demo and contact leads, so the lead email shows which campaign the visitor came from.

## Adding an event

1. Add a member to the `AnalyticsEvent` union in `src/lib/analytics.ts` (TypeScript then checks every call).
2. Call `track({ name, props })` from a client component.
3. Add a row to the table above and a goal in Plausible.
