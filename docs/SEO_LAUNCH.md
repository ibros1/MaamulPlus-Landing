# SEO launch checklist

Work through this list before and right after maamulplus.com goes live.

## Before launch

- [ ] Fill every `null` in `src/config/site.ts`: phone, email, street address, opening hours, Maps link, socials, X handle. These feed the footer, contact page and the Organization / LocalBusiness JSON-LD.
- [ ] Confirm the promises in `site.promises` (set any that are not true to `false`).
- [ ] Decide apex vs www. Apex (`maamulplus.com`) is the default. For www, set `NEXT_PUBLIC_SITE_URL=https://www.maamulplus.com` and `CANONICAL_HOST=www.maamulplus.com`. The other host redirects with a 308.
- [ ] Set production env (see `README.md`). The build fails on Vercel production if the lead pipeline, Turnstile or rate limiting are missing.
- [ ] Set `NEXT_PUBLIC_ENTERPRISE_APP_URL` and `NEXT_PUBLIC_LITE_APP_URL`.
- [ ] Run the gates on the production build:

  ```bash
  pnpm lint && pnpm typecheck && pnpm test
  pnpm build && pnpm start -p 3100      # in one terminal
  BASE_URL=http://localhost:3100 pnpm seo:check
  pnpm lhci
  pnpm test:e2e
  ```

- [ ] Validate structured data for `/`, `/enterprise`, `/lite`, `/pricing`, `/contact`, `/faq` and one blog post in [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema.org validator](https://validator.schema.org/). There must be no `offers` or `price` anywhere.
- [ ] Share `/`, `/enterprise` and one blog post in a WhatsApp / Facebook / LinkedIn preview and check the OG image and title.

## Launch day

- [ ] Point DNS at Vercel, confirm HTTPS on both apex and www, and that the non-canonical host 308s to the canonical one.
- [ ] Check `https://maamulplus.com/robots.txt` allows crawling and lists the sitemap, and that `https://maamulplus.com/sitemap.xml` lists every page except `/thank-you`.
- [ ] Check the security headers at [securityheaders.com](https://securityheaders.com/) (CSP, HSTS, nosniff, referrer policy, permissions policy, frame options).
- [ ] Submit a test demo request and confirm the lead arrives (email and/or webhook).

## Search consoles

- [ ] **Google Search Console**: add a Domain property (DNS TXT) or URL-prefix property with `GOOGLE_SITE_VERIFICATION`. Submit `sitemap.xml`. Use URL Inspection → Request indexing for `/`, `/enterprise`, `/lite`, `/pricing`.
- [ ] **Bing Webmaster Tools**: import from Google Search Console or verify with `BING_SITE_VERIFICATION`. Submit the sitemap.

## Local SEO (Somaliland)

- [ ] Create or claim the **Google Business Profile** for the Hargeisa office. Use the exact name "MaamulPlus", the same address, phone and opening hours as `site.ts` (NAP must match everywhere), category "Software company", and the website URL.
- [ ] Put the Business Profile Maps link in `site.contact.mapsUrl`.
- [ ] Use the same name, address and phone on Facebook, LinkedIn and any local directories, and add those profile URLs to `site.socials`.
- [ ] Ask the first customers for Google reviews. Do not add review markup to the site until there are real, visible reviews.

## After launch (first 4–8 weeks)

- [ ] Check Search Console → Pages weekly for "Crawled – currently not indexed" or "Duplicate without user-selected canonical".
- [ ] Check Core Web Vitals in Search Console once field data appears (LCP < 2.0 s, CLS < 0.05, INP < 150 ms).
- [ ] Watch queries in Performance and write the next blog articles around what people actually search (see the content plan in the master prompt §9.7).
- [ ] When a URL changes, add a 308 in `redirects()` in `next.config.ts`. Never just delete a page.
