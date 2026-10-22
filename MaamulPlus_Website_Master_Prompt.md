# MaamulPlus Website: Master Build Prompt

> **How to use this file:** give it to your AI coding agent (Claude Code, Cursor, etc.) together with the whole `maamulplus-website-kit/` folder. This prompt is the single source of truth. Where it conflicts with the reference HTML, this prompt wins. Where something is marked `[[FILL]]`, the owner will supply the value; leave a typed placeholder in `src/config/site.ts`, never invent it.

---

## 0. Your role and the job

You are a senior frontend engineer and technical SEO specialist. Build **maamulplus.com**, the public marketing website for **MaamulPlus**, a business-management SaaS for traders in Somaliland (Hargeisa first). The website sells two editions:

- **MaamulPlus Enterprise**: full double-entry accounting, chart of accounts and journals, sales agents and field sessions, multi-branch stock, HR and payroll, roles and permissions, audit log, AI assistant.
- **MaamulPlus Lite**: for small and medium businesses. Sales, purchases, products, customers, vendors, payments, expenses, accounts and the financial statements a small business needs. No accounting jargon.

The site's single job: **turn a visiting business owner into a demo or pricing request.**

A finished, approved visual reference already exists: `reference/maamulplus-site-reference.html`. Open it in a browser first and study it. Your build must look the same (layout, spacing, typography, colours, both themes), but be a real, production-grade, multi-page Next.js application with professional SEO.

### Definition of done (all must be true)

1. Every page in §6 exists, renders statically (SSG), and matches the reference design in light and dark themes.
2. Lighthouse (mobile, throttled) on every page: **Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100**.
3. Core Web Vitals budget: LCP < 2.0 s, CLS < 0.05, INP < 150 ms, first-load JS per route < 110 kB gzipped.
4. All SEO deliverables in §9 are present and valid (metadata, canonical, sitemap, robots, structured data validated in Google's Rich Results Test and the Schema.org validator, OG images).
5. The demo-request flow (§8) works end to end, with validation on client and server, spam protection and rate limiting.
6. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` all pass. No `any`, no ts-ignore, no console errors.
7. No prices appear anywhere on the site, in metadata, or in structured data.

---

## 1. Tech stack (fixed, don't substitute)

| Area | Choice |
|---|---|
| Framework | **Next.js 15 (App Router)**, React 19, Server Components by default |
| Language | **TypeScript** in `strict` mode (`noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`) |
| State + API | **Redux Toolkit** + **RTK Query** for every client-side API call and shared client UI state |
| Styling | **Tailwind CSS v4** with the design tokens from `design-system/tokens.json` mapped to CSS variables (§3). No other UI kit. |
| Forms | `react-hook-form` + `zod` (+ `@hookform/resolvers`). The same zod schema validates on the server. |
| Icons | `lucide-react` only. Stroke 1.75 at 20–22 px, stroke 2 at 16 px. |
| Fonts | `next/font/google`: **DM Sans** (400/500/600, opsz axis) and **Inter** (400/500/600). Self-hosted by Next, `display: swap`. |
| Content | Typed TS content files in `src/content/` for pages. **MDX** (`@next/mdx` or `next-mdx-remote/rsc`) for the blog and the case studies. |
| Email (lead delivery) | Adapter interface. Default implementation is **Resend**. Also an optional webhook adapter (CRM / Google Sheet / Slack). Chosen by env. |
| Rate limiting | `@upstash/ratelimit` + `@upstash/redis` (falls back to in-memory in dev) |
| Bot protection | Cloudflare **Turnstile** (invisible) + honeypot field + minimum fill time |
| Analytics | Privacy-friendly: **Plausible** (or GA4 if `NEXT_PUBLIC_GA_ID` is set). Load with `next/script` `strategy="afterInteractive"`. Track conversion events (§10). |
| Testing | **Vitest** + Testing Library (unit), **Playwright** (e2e + visual), `@axe-core/playwright` (a11y), **Lighthouse CI** |
| Lint/format | ESLint (next/core-web-vitals + typescript-eslint strict), Prettier, `eslint-plugin-jsx-a11y` |
| Package manager | **pnpm** |
| Hosting | Vercel (Edge network). Must also build with `next build && next start` anywhere. |

### Why Redux on a marketing site, and how much of it

Keep Redux **small and purposeful**. Server Components render all content; Redux exists only on the client for:

- `api` slice (**RTK Query**): `submitDemoRequest`, `submitContact`, `subscribeNewsletter`. All network calls from the browser go through RTK Query, never raw `fetch` in components.
- `ui` slice: `mobileNavOpen`, `activeTourTab`, `preselectedEdition` ('enterprise' | 'lite'). The plan buttons set it and the demo form reads it.
- `consent` slice: analytics consent state (`'unknown' | 'granted' | 'denied'`), persisted to `localStorage` with try/catch.

The theme (light/dark/system) uses `next-themes` (it must run before hydration to avoid a flash; Redux can't do that). Mirror the resolved theme into the `ui` slice only if a component needs it.

Store setup: `src/store/` with `makeStore()` per request pattern for the App Router (`StoreProvider` client component that creates the store once with `useRef`). Typed hooks `useAppDispatch`, `useAppSelector`. **Never** put content or SEO data in Redux.

---

## 2. Non-negotiable brand and content rules

1. **English only** for v1. Build i18n-ready though (§9.8), because a Somali version (`so`) is planned.
2. Say **"credit"** / **"credit outstanding"**. Never write "deyn" anywhere.
3. **Never show a price.** Use these exact phrases: "Pricing on request" (Lite), "Custom quote" (Enterprise), "Request pricing", "Talk to sales", "Book a demo". Structured data must not contain `price`/`offers` with amounts.
4. Voice: calm, plain, specific, like a capable shopkeeper's accountant. Sentence case everywhere. Headlines are short declaratives ending with a period. **Banned words:** revolutionary, seamless, powerful, unlock, supercharge, all-in-one solution, cutting-edge, leverage. No emoji.
5. Product names exactly: **MaamulPlus**, **MaamulPlus Enterprise**, **MaamulPlus Lite**. Never "Maamul Plus" or "MAAMULPLUS". Local names stay as they are: Zaad, eDahab, Sahal, SLSH, USD.
6. Lite is "focused", never "cheap" or "basic".
7. Typography: headings are DM Sans **500** (never 700+). The owner dislikes big, bold, default-looking type. Keep the tight tracking from the tokens.
8. Never use stock photos, 3D blobs or blue-purple gradients. Product visuals are **coded React UI inside a macOS window frame** (§7.3), not screenshots.
9. Use only the logo files in `brand/logos/`. Never redraw or recolour them, and never separate the M symbol from "aamulPlus".

---

## 3. Design system → code

Read `design-system/README.md` (the brand book), `design-system/tokens.json` and `design-system/components/*.md` completely before writing UI.

### 3.1 Tokens

Generate `src/styles/tokens.css` **from `tokens.json` with a script** (`scripts/build-tokens.ts`, run in `prebuild`). Do not hand-copy values. Output:

```css
:root { /* every color token (light), shadows, spacing, radius, font families */ }
@media (prefers-color-scheme: dark) { :root:not(.light) { /* dark overrides */ color-scheme: dark; } }
:root.dark { /* same dark overrides */ color-scheme: dark; }
```

(`next-themes` with `attribute="class"`.) Key values for orientation (the JSON is authoritative):

| Token | Light | Dark | Use |
|---|---|---|---|
| `navy-900` | `#0B2463` | same | brand navy (logo, headings, primary button) |
| `green-500` | `#16A765` | same | the plus; graphics/text ≥ 24 px only |
| `green-400` | `#2BC27D` | same | green on navy / dark |
| `green-700` | `#0E7A4A` | same | green text on white |
| `bg` | `#FFFFFF` | `#060E22` | page |
| `surface` | `#FFFFFF` | `#0C1838` | cards |
| `surface-alt` | `#F3F5F8` | `#091330` | alternating sections |
| `surface-inverse` | `#0B2463` | `#0F2152` | CTA band, featured plan |
| `heading` / `ink` / `ink-muted` | `#0B2463` / `#111827` / `#4B5563` | `#FFF` / `#E8ECF4` / `#A4AEC4` | text |
| `primary` / `on-primary` | `#0B2463` / `#FFF` | `#2BC27D` / `#0B2463` | primary button |
| `accent` / `accent-ink` / `accent-soft` | `#16A765` / `#0E7A4A` / `#E9F8F0` | `#2BC27D` / `#2BC27D` / `#0E2E2A` | green roles |
| `danger` | `#C2363B` | `#F2777B` | credit owed, errors |
| `line` / `line-strong` | `#E3E8EF` / `#8A94A6` | `#1E2C55` / `#5D6C94` | hairlines / control borders |
| radius | sm 8 · md 14 · lg 22 · pill 999 | | |

Map them into Tailwind v4 `@theme` (`--color-surface: var(--surface)` etc.) so classes like `bg-surface text-heading border-line` work in both themes. **No raw hex in components** (lint rule: forbid `#[0-9a-f]{3,6}` in `.tsx` except `src/components/app-ui/mac-frame.tsx` traffic lights).

### 3.2 Type scale (from tokens.json `type.groups`)

`display` 64/68 −0.035em (fluid: `clamp(40px, 6.4vw, 72px)` for the hero) · `h1` 48/54 · `h2` 36/42 −0.025em · `h3` 22/30 · `figure` 40/44 (tabular) · `body-lg` 18/30 · `body` 16/26 · `small` 14/22 · `label` 14/20 500 · `eyebrow` 12/16 600 uppercase +0.12em in `accent-ink` · `code` 13/20 system mono. Create Tailwind utilities or components for each; don't improvise sizes.

### 3.3 Components (port each spec in `design-system/components/*.md` and the CSS in `components/bundle.css` to typed React)

`Button` (variants primary/outline/ghost/green/on-inverse; sizes sm/md/lg; `pill`, `block`; renders `next/link` when `href` is set; arrow icon slides 3px on hover), `Badge`, `SectionHeader` (eyebrow + h2 + lead; `align`), `Field` (`Input`, `Select`, `Textarea`, `SegmentedRadio`, all wired to react-hook-form with `aria-invalid`, `aria-describedby` errors), `NavBar` (sticky, translucent, blur, `aria-current` from pathname, mobile sheet menu with focus trap and Escape), `FeatureCard`, `PlanCard` (featured variant), `StatTile`, `MacFrame` (§7.3), `Accordion` (native `<details>`, no JS), `CompareTable`, `Steps`, `CTABand`, `Footer`, `ThemeToggle`, `Logo` (inline SVG with `currentColor`-driven CSS vars so it switches navy/white per theme; use `MaamulPlus-Logo-NoTagline.svg` paths for the nav, full lockup in the footer).

Every component: typed props, no default exports for components, a Vitest render test, keyboard focus visible (2 px `focus` ring, 2 px offset), works at 360 px wide.

---

## 4. Project structure

```
maamulplus-web/
├─ public/
│  ├─ brand/                    # logos copied from kit (SVG)
│  ├─ favicon.ico, icon.svg, apple-touch-icon.png (180), icon-192.png, icon-512.png
│  └─ og/                       # fallback static OG image 1200×630
├─ scripts/build-tokens.ts
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ layout.tsx          # NavBar + Footer + StoreProvider + ThemeProvider
│  │  │  ├─ page.tsx            # /
│  │  │  ├─ enterprise/page.tsx
│  │  │  ├─ lite/page.tsx
│  │  │  ├─ pricing/page.tsx
│  │  │  ├─ features/[slug]/page.tsx   # generateStaticParams
│  │  │  ├─ solutions/[slug]/page.tsx  # generateStaticParams
│  │  │  ├─ demo/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ faq/page.tsx
│  │  │  ├─ blog/page.tsx, blog/[slug]/page.tsx
│  │  │  ├─ legal/privacy/page.tsx, legal/terms/page.tsx
│  │  │  └─ thank-you/page.tsx  # noindex
│  │  ├─ api/
│  │  │  ├─ demo-request/route.ts
│  │  │  ├─ contact/route.ts
│  │  │  └─ newsletter/route.ts
│  │  ├─ opengraph-image.tsx    # + per-route opengraph-image.tsx where noted
│  │  ├─ sitemap.ts, robots.ts, manifest.ts
│  │  ├─ not-found.tsx, error.tsx, global-error.tsx
│  │  └─ layout.tsx             # <html lang="en">, fonts, root metadata, JSON-LD Organization+WebSite
│  ├─ components/
│  │  ├─ ui/                    # design-system primitives (§3.3)
│  │  ├─ sections/              # Hero, MoneyRails, Editions, ProductTour, AccountingSplit, FeatureGrid, MarketGrid, Pricing, CompareTable, Steps, FAQ, CTABand
│  │  ├─ app-ui/                # coded product screens + MacFrame (§7.3)
│  │  └─ seo/JsonLd.tsx
│  ├─ content/                  # typed page content (§7), faq.ts, features.ts, solutions.ts, editions.ts, demo-data.ts
│  ├─ content/blog/*.mdx
│  ├─ config/site.ts            # name, url, contacts [[FILL]], socials [[FILL]], appUrl [[FILL]]
│  ├─ lib/
│  │  ├─ seo.ts                 # buildMetadata(), jsonLd builders
│  │  ├─ schemas.ts             # zod: demoRequest, contact, newsletter
│  │  ├─ leads/                 # LeadSink interface, resendSink, webhookSink
│  │  ├─ ratelimit.ts, turnstile.ts, analytics.ts
│  ├─ store/
│  │  ├─ store.ts, StoreProvider.tsx, hooks.ts
│  │  ├─ api.ts                 # RTK Query createApi
│  │  ├─ uiSlice.ts, consentSlice.ts
│  └─ styles/globals.css, tokens.css (generated)
├─ tests/ (unit), e2e/ (Playwright)
├─ lighthouserc.json, .env.example, next.config.ts, middleware.ts (security headers if not in next.config)
```

---

## 5. Global layout

- `<html lang="en" suppressHydrationWarning>`. Set the font CSS variables `--font-display` (DM Sans) and `--font-sans` (Inter).
- Skip link "Skip to content" as the first focusable element.
- Sticky header: logo · Product · Editions · Accounting · Pricing · FAQ · theme toggle · Sign in (→ `site.appUrl` `[[FILL]]`, `rel="nofollow"`) · **Book a demo** (pill primary). Below 960 px: a menu button opens the sheet.
- Footer: logo, one-line description, columns Product / Features / Solutions / Company, legal links, © year, "Hargeisa, Somaliland", contact details from `site.ts`.
- Respect `prefers-reduced-motion` globally.

---

## 6. Pages and their SEO intent

Each page gets a unique `<title>` (≤ 60 chars), meta description (140–160 chars), one H1, canonical, OG/Twitter, breadcrumbs (except home) and the JSON-LD listed. The keywords below are targets. Use them naturally in the H1, the first paragraph, H2s, alt text and the URL. **Never stuff them.**

| Route | H1 (use as given or very close) | Primary keywords | JSON-LD |
|---|---|---|---|
| `/` | Run your whole business from one screen. | business management software Somaliland, ERP Somaliland, inventory and accounting software Hargeisa | Organization, WebSite (SearchAction not needed), SoftwareApplication ×2 (no price), FAQPage (home FAQ) |
| `/enterprise` | MaamulPlus Enterprise: full accounting for growing businesses. | ERP software Somaliland, double-entry accounting software, multi-branch inventory | SoftwareApplication, BreadcrumbList, FAQPage |
| `/lite` | MaamulPlus Lite: the essentials, without the jargon. | small business software Somaliland, simple sales and stock software, invoicing app Hargeisa | SoftwareApplication, BreadcrumbList, FAQPage |
| `/pricing` | A plan sized to your business. | MaamulPlus pricing, ERP pricing Somaliland | BreadcrumbList, FAQPage (pricing questions) |
| `/features/accounting` | Every shilling, accounted for. | double-entry accounting software, chart of accounts, trial balance | BreadcrumbList |
| `/features/inventory` | Stock you can trust, in every branch. | inventory management software Somaliland, stock control | BreadcrumbList |
| `/features/sales-and-invoicing` | Invoices that move stock and post to your books. | invoicing software, POS Hargeisa, sales management | BreadcrumbList |
| `/features/credit-and-payments` | Customer credit under control. | customer credit management, mobile money accounting Zaad eDahab | BreadcrumbList |
| `/features/sales-agents` | Agents in the field, every item accounted for. | sales agent tracking software, van sales | BreadcrumbList |
| `/features/hr-payroll` | Payroll in one step. | payroll software Somaliland | BreadcrumbList |
| `/features/reports` | Statements on demand. | cash flow report, income statement, balance sheet software | BreadcrumbList |
| `/solutions/spare-parts` | Built for spare parts traders. | spare parts shop software | BreadcrumbList |
| `/solutions/wholesale` | Wholesale and retail, in one system. | wholesale distribution software Somaliland | BreadcrumbList |
| `/solutions/retail-shops` | A clear till for every shop. | retail shop software Hargeisa | BreadcrumbList |
| `/demo` | See MaamulPlus with your own business in it. | MaamulPlus demo | BreadcrumbList |
| `/contact` | Talk to the MaamulPlus team. | contact MaamulPlus | LocalBusiness (+ Organization ref), BreadcrumbList |
| `/about` | Making business simpler in Somaliland. | about MaamulPlus | AboutPage, Organization |
| `/faq` | What business owners ask us. | MaamulPlus questions | FAQPage, BreadcrumbList |
| `/blog`, `/blog/[slug]` | Blog index · article title | long-tail guides (§9.7) | Blog / BlogPosting + BreadcrumbList |
| `/legal/privacy`, `/legal/terms` | Privacy policy · Terms of service | none | none |
| `/thank-you` | Thank you, we have your request. | none, **noindex** | none |

Feature and solution pages are generated from `src/content/features.ts` / `solutions.ts`. Each has: hero (eyebrow, H1, lead, 2 CTAs), a coded app screen in a MacFrame, 3–6 benefit points, an edition availability note ("Available in Enterprise" / "In both editions"), related features (internal links), FAQ (3–5 Q&A), and the CTA band. Min. 450 words of unique, useful copy per page. No thin pages.

---

## 7. Home page: section by section (match the reference exactly)

Order and copy (final copy, use verbatim unless improving clarity):

1. **Hero**: badge "Built for traders in Somaliland" (green, dot). H1 "Run your whole business from *one screen.*" ("one screen." in `accent-ink`). Lead: "Sales, stock, credit, payments and accounting in one system that speaks USD and SLSH and knows your Zaad and eDahab accounts. Pick the edition that fits how you trade." CTAs: **Book a demo →** (`/demo`), **Compare editions** (`#editions`). Meta row with checks: "Guided setup and data import", "Local support in Hargeisa" `[[CONFIRM]]`, "Works on any browser". Below: the **Dashboard** coded screen in a MacFrame on a faint 40 px grid background masked to fade, with the bottom of the frame fading into the page. This is the LCP element: it is HTML, so no image priority is needed. Keep it server-rendered.
2. **Money rails**: "Records money the way it actually moves in Somaliland" + pills: Cash, Bank, Zaad, eDahab, Sahal, USD · SLSH. (Text pills with Lucide icons; never reproduce third-party logos.)
3. **Editions** (`#editions`): eyebrow "Two editions", H2 "One family. Built for the size of your business.", two cards: Enterprise (navy, featured, "Talk to sales" green + "See all features") and Lite ("Request pricing" + "Compare editions"), module checklists from §0.
4. **Product tour** (`#product`, alt background): H2 "Every part of the day, on one screen." Lead: "The real MaamulPlus interface, shown with sample data from a spare parts business in Hargeisa." Accessible **tabs** (WAI-ARIA tabs pattern, arrow keys, Home/End): Sales & invoices · Customers & credit · Money & accounts · Reports · People & payroll. Each panel = coded screen in MacFrame on the "showcase" backdrop + 2-line caption. Active tab lives in Redux `ui.activeTourTab`. Panels not shown are still in the HTML (for crawlers), using `hidden`.
5. **Accounting split** (`#accounting`): H2 "Every shilling, accounted for." + 3 points + a journal card (credit sale INV-000214, balanced debits/credits table).
6. **Enterprise features** (`#enterprise`, alt): 6 FeatureCards: Sales agents & sessions, Multi-branch stock, HR & payroll, Roles & audit log, AI assistant, Faster at the counter.
7. **Made for here**: 4-cell grid: `1 USD = 11,000 SLSH` (two currencies), Zaad · eDahab (mobile money as accounts), Credit limits, Wholesale + retail.
8. **Pricing** (`#pricing`, alt): two PlanCards (no prices) + a comparison table with Included/Not included icons and visually-hidden text for screen readers.
9. **Getting started**: ordered list of 4 steps (Book a demo → Choose your edition → Bring your data → Go live).
10. **FAQ** (`#faq`): 6 questions from `content/faq.ts` (same data feeds FAQPage JSON-LD).
11. **CTA band + demo form** (`#demo`): navy band, left copy + checklist, right form card (§8).

### 7.1 Sample data rules (`src/content/demo-data.ts`)

One typed dataset feeds every coded screen, so the numbers agree everywhere. Keep these anchors:
Business "Hargeisa Spare Parts", Main Branch / Waaheen Branch, user "Ibrahim Mohamed (IM)", date "Friday, October 23". Cash on hand **$7,436.03** (= sum of accounts: Cash–Main 4,612.00; Main cash drawer 596.03; Premier Bank 1,040.00; Salaam Bank 420.00; Zaad Merchant 512.00; eDahab Merchant 256.00). Credit outstanding **$1,284.36** (9 invoices). This month revenue **$24,650.06** on 128 invoices. Today **$1,284.50**, 14 invoices. In this month $9,820.40, out $4,135.10, opening $1,750.73. Customer Jamac Ahmed owes $207.18 (INV-000211), credit limit $400. Payroll bill $3,450, 10 staff. Add a unit test asserting these sums.

### 7.2 Animations

At most: fade-up 12 px on section entry (CSS + IntersectionObserver, content visible without JS), button arrow nudge, tab cross-fade 150 ms. Nothing else. All disabled under reduced motion.

### 7.3 Coded app screens + MacFrame (`src/components/app-ui/`)

Port `reference/app-screens-reference.py` + `reference/app-screens.css` into React Server Components:

- `MacFrame`: window with traffic lights (#FF5F57 / #FEBC2E / #28C840), back/forward chevrons, centered URL pill with lock "**app.maamulplus.com**/path", right toolbar icons, 14 px radius, layered shadow; theme-aware title-bar tokens (`--mac-top`, `--mac-bottom`, `--mac-edge`, `--mac-field`).
- `AppShell`: 1280×760 fixed canvas (sidebar 236 px with the **v2 logo**, business switcher, grouped nav with the active item, user footer; top bar with search ⌘K, rate chip `1 USD = 11,000 SLSH`, icons, avatar; body; footer bar).
- Scale the canvas to its container with `transform: scale(var(--s))`. Compute `--s` in a tiny client component using `ResizeObserver`. Before hydration, compute it with CSS: `aspect-ratio: 1280/760` on the viewport and a sensible default.
- Screens: `DashboardScreen`, `SalesScreen`, `CustomerScreen`, `FinanceScreen`, `CashFlowScreen`, `PeopleScreen` (+ one per feature page as needed: `InventoryScreen`, `ChartOfAccountsScreen`, `AgentSessionScreen`).
- Each frame is `role="img"` with a descriptive `aria-label` (it also serves as rich alt text for SEO). The inner UI is `aria-hidden`.
- Charts are inline SVG drawn to scale from the data (no chart library).

---

## 8. Demo request, contact and newsletter (the API)

### 8.1 Schema (`src/lib/schemas.ts`, shared client/server)

```ts
export const demoRequestSchema = z.object({
  edition: z.enum(['enterprise', 'lite']),
  name: z.string().trim().min(2).max(80),
  business: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, 'Enter a phone number we can call'),
  email: z.string().trim().email().max(120).optional().or(z.literal('')),
  branches: z.enum(['1', '2-3', '4-10', '10+']),
  message: z.string().trim().max(1000).optional(),
  // anti-spam
  company_website: z.string().max(0).optional(), // honeypot, must stay empty
  startedAt: z.number().int(),                    // ms timestamp; reject if submitted < 3 s after render
  turnstileToken: z.string().min(1),
  // attribution
  utm: z.object({ source: z.string().optional(), medium: z.string().optional(), campaign: z.string().optional() }).optional(),
  page: z.string().max(200),
});
```

### 8.2 Route handler `POST /api/demo-request`

`runtime = 'nodejs'`. Steps: parse JSON → zod `safeParse` (400 with field errors) → honeypot/min-time check (pretend success with 200, drop silently) → verify Turnstile server-side → rate limit by IP **5 requests / 10 min** (429 with `Retry-After`) → `LeadSink.send(lead)` (Resend email to `LEADS_TO_EMAIL`, plus the optional webhook) → 201 `{ ok: true, id }`. Never echo user input into HTML emails without escaping. Log errors server-side with no PII in logs. `contact` and `newsletter` follow the same pattern.

### 8.3 RTK Query

```ts
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (b) => ({
    submitDemoRequest: b.mutation<{ ok: true; id: string }, DemoRequestInput>({ query: (body) => ({ url: 'demo-request', method: 'POST', body }) }),
    submitContact: b.mutation<...>(...),
    subscribeNewsletter: b.mutation<...>(...),
  }),
});
```

The form uses `useSubmitDemoRequestMutation`. States: idle → submitting (button disabled, spinner, `aria-busy`) → success (inline thank-you card in the form with the name and edition, focus moved to it, analytics event, then `router.push('/thank-you')` on the standalone `/demo` page only) → error (inline message that says what to do, keeps the inputs). Field errors come from zod via react-hook-form. Plan buttons dispatch `setPreselectedEdition` before scrolling to `#demo`. Read UTM params from the URL on first load into sessionStorage and attach them to the payload.

### 8.4 Env (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://maamulplus.com
NEXT_PUBLIC_APP_URL=[[FILL]]            # e.g. https://app.maamulplus.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
LEADS_TO_EMAIL=[[FILL]]
LEADS_FROM_EMAIL=[[FILL]]               # verified sender domain
LEADS_WEBHOOK_URL=                      # optional
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=maamulplus.com
NEXT_PUBLIC_GA_ID=                      # optional
GOOGLE_SITE_VERIFICATION=[[FILL]]
BING_SITE_VERIFICATION=
```

Validate env at boot with zod (`src/lib/env.ts`); fail the build if required server keys are missing in production.

---

## 9. SEO: professional, complete

### 9.1 Metadata (`src/lib/seo.ts`)

- Root `layout.tsx` `metadata`: `metadataBase: new URL(SITE_URL)`, `title: { default: 'MaamulPlus: Business management software for Somaliland', template: '%s · MaamulPlus' }`, `description`, `applicationName`, `keywords` (short list), `authors`, `creator`, `publisher`, `formatDetection: { telephone: false }`, `alternates: { canonical: '/' }`, `openGraph` (type website, siteName, locale `en_US`, images), `twitter` (`summary_large_image`, `[[FILL]]` handle), `robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }`, `verification: { google, other: { 'msvalidate.01': bing } }`, `icons`, `manifest`.
- `viewport` export: `themeColor` light `#FFFFFF` / dark `#060E22`, `colorScheme: 'light dark'`.
- Each page: `buildMetadata({ title, description, path, ogImage?, noindex? })` returns a complete `Metadata` with canonical = absolute URL of `path` (no trailing slash, no query).
- `/thank-you`, `/api/*`, preview and draft routes: `noindex, nofollow`.

### 9.2 Open Graph images

`app/opengraph-image.tsx` with `next/og` `ImageResponse` (1200×630, edge runtime): navy background, white logo SVG, page title in DM Sans 500 (load the font file with `fetch` from `/public/fonts` or the Google Fonts TTF), green plus motif. Generate per-route images for `/enterprise`, `/lite`, `/pricing`, features, solutions and blog posts (title + eyebrow). Also add `twitter-image.tsx` re-exporting the same file. Alt text is required.

### 9.3 Structured data (`src/components/seo/JsonLd.tsx` + builders)

Render as `<script type="application/ld+json">` from Server Components, with `JSON.stringify` and `<` escaped. Use `@id` references so the entities link up:

- **Organization** (`@id: SITE_URL#organization`): name, url, logo (512 px PNG), `sameAs` socials `[[FILL]]`, `contactPoint` (`contactType: 'sales'`, telephone `[[FILL]]`, `areaServed: 'SO'`, `availableLanguage: ['en','so']`), `address` Hargeisa, Somaliland `[[FILL street]]`.
- **WebSite** (`#website`), with publisher → Organization.
- **SoftwareApplication** ×2 (`#enterprise`, `#lite`): `name`, `applicationCategory: 'BusinessApplication'`, `applicationSubCategory: 'ERP'` / `'Accounting & Inventory'`, `operatingSystem: 'Web browser'`, `description`, `featureList`, `publisher` → Organization, `url`, `image` / `screenshot` (OG image). **Do not include `offers` with a price.** (Add `aggregateRating` only when you have real reviews. Never invent them.)
- **FAQPage** on pages with an FAQ, generated from the same content array that renders the visible FAQ (the text must match exactly).
- **BreadcrumbList** on all inner pages (and visible breadcrumbs).
- **LocalBusiness** (`@type: ['LocalBusiness','ProfessionalService']`) on `/contact`, only with the real address/phone/hours `[[FILL]]`. Omit fields you don't have.
- **BlogPosting** for posts (headline, datePublished, dateModified, author Person/Organization, image, mainEntityOfPage).

Add a test that parses every page's JSON-LD and validates it with `schema-dts` types.

### 9.4 `sitemap.ts`, `robots.ts`, `manifest.ts`

- `sitemap.ts`: all indexable static routes + `features/*` + `solutions/*` + blog posts with real `lastModified` (from content front-matter / git), `changeFrequency`, `priority` (home 1.0, editions/pricing 0.9, features/solutions 0.8, blog 0.6, legal 0.2). Exclude noindex routes.
- `robots.ts`: allow `/`, disallow `/api/`, `/thank-you`. `sitemap: SITE_URL/sitemap.xml`, `host`.
- `manifest.ts`: name, short_name "MaamulPlus", theme/background colors, icons 192/512 + maskable, `display: 'standalone'`.

### 9.5 On-page and technical SEO checklist

- One H1 per page. Logical H2/H3 order. Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`).
- Descriptive internal links (no "click here"). Every feature page links to its edition page, pricing and the demo. Home links to all features/solutions. Breadcrumbs on inner pages.
- Canonicals absolute. Enforce one host: redirect `www` → apex (or the reverse, `[[DECIDE]]`), http → https, strip trailing slashes (`trailingSlash: false`) with 308s.
- Clean, lowercase, hyphenated URLs. Permanent redirects map in `next.config.ts` for any future renames.
- Images (if any are added later): `next/image`, explicit width/height, AVIF/WebP, meaningful `alt`, `priority` only for the LCP image.
- No content hidden behind client-only rendering. All copy is in the server HTML.
- `hreflang`: emit `alternates.languages` `{ 'en': url, 'x-default': url }` now. The structure must allow adding `so` later (§9.8).
- 404 page with helpful links, returning a real 404 status. `error.tsx` doesn't leak stack traces.
- Performance: Server Components first. Ship the client JS only for NavBar menu, ThemeToggle, Tabs, scale-fit, forms, consent and analytics. Use `next/dynamic` for the form below the fold. Fonts subset `latin` + `latin-ext`. Preconnect only what's needed. Avoid layout shift: reserve aspect-ratio for MacFrames.
- Accessibility = SEO: contrast pairs from tokens (already verified ≥ 4.5:1), focus states, form labels, reduced motion, `prefers-color-scheme`.

### 9.6 Local SEO (Somaliland)

- Organization/LocalBusiness with consistent NAP (name, address, phone), the same everywhere (site, Google Business Profile, Facebook, directories). Values `[[FILL]]`.
- Mention Hargeisa/Somaliland naturally in titles and copy where relevant (home, contact, solutions).
- Add a `/contact` map **link** (not an embed iframe, for performance) to Google Maps `[[FILL]]`.
- Prepare a written checklist in `docs/SEO_LAUNCH.md`: Google Search Console (domain property, submit sitemap), Bing Webmaster Tools, Google Business Profile, Facebook page link-in-bio, consistent citations.

### 9.7 Content plan (blog in MDX, ship with 3 real articles)

Front-matter: `title, description, date, updated, author, tags, ogTitle?`. Article page: H1, reading time, table of contents for long posts, author box, related posts, CTA band. Write the first 3 posts (900–1,400 words each, practical, no fluff):
1. "How to track customer credit without a notebook" (credit management for shops in Hargeisa).
2. "USD and SLSH in one set of books: a practical guide for Somaliland traders."
3. "Double-entry accounting explained for business owners (with a real sale as an example)."

### 9.8 i18n readiness

Keep all user-facing strings in `src/content/*` (no literals in components except aria fallbacks). Structure routes so `app/[locale]/(marketing)/...` can be introduced later with `en` as default (no prefix) and `so` added. Do not build the Somali version now.

---

## 10. Analytics and consent

- Events (Plausible custom events / GA4): `cta_click` (`location`, `label`), `edition_select`, `tour_tab` (`tab`), `demo_submit_success` (`edition`, `branches`), `demo_submit_error`, `contact_submit_success`, `outbound_app_signin`.
- A minimal consent banner (only if GA4 is enabled; Plausible needs no cookies). The choice lives in the Redux `consent` slice and persists.
- Add `docs/TRACKING.md` listing the events and where they fire.

---

## 11. Security and headers (`next.config.ts` `headers()`)

`Content-Security-Policy` (nonce-based for scripts, allow Plausible/GA, Turnstile `challenges.cloudflare.com`, Resend not needed client-side), `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`. `poweredByHeader: false`.

---

## 12. Quality gates

- **Unit (Vitest):** components render, schemas accept/reject, demo-data sums, `buildMetadata` canonical logic, JSON-LD builders.
- **E2E (Playwright, Chromium + WebKit, 360/768/1440 widths, light & dark):** nav and mobile menu, tabs keyboard support, plan button preselects edition, demo form validation errors, successful submit (mock route), 429 handling, 404 page, no horizontal scroll at 360 px, axe has zero violations on every page.
- **Visual regression:** Playwright screenshots of home sections vs. the reference HTML (tolerance 1–2%).
- **Lighthouse CI:** `lighthouserc.json` asserting the budgets in §0 on `/`, `/enterprise`, `/lite`, `/pricing`, `/features/accounting`, `/demo`.
- **SEO checks script** (`pnpm seo:check`): crawl the built site, assert each indexable page has exactly one H1, a title ≤ 60 chars, a description 140–160 chars, an absolute canonical, og:image, valid JSON-LD; and that no page contains the strings `deyn`, `$` followed by a plan price, or a banned word from §2.

---

## 13. Deliverables and order of work

1. Scaffold project, tooling, tokens script, fonts, ThemeProvider, StoreProvider. **Commit.**
2. UI primitives (§3.3) with tests. **Commit.**
3. AppShell + MacFrame + all coded screens with `demo-data.ts`. **Commit.**
4. Home page sections to match the reference in both themes. **Commit.**
5. API routes + RTK Query + forms + spam/rate-limit. **Commit.**
6. Remaining pages from content files. **Commit.**
7. SEO layer: metadata, OG images, JSON-LD, sitemap/robots/manifest, redirects, headers. **Commit.**
8. Blog (MDX) + 3 articles. **Commit.**
9. Tests, Lighthouse CI, `seo:check`, docs (`README.md`, `docs/SEO_LAUNCH.md`, `docs/TRACKING.md`, `docs/CONTENT.md` on how to edit copy). **Commit.**

At the end, report: what was built, Lighthouse scores per page, any `[[FILL]]` / `[[CONFIRM]]` values still needed, and anything you could not do.

### Values the owner must supply (`[[FILL]]` / `[[CONFIRM]]`)

- App sign-in URL · sales phone (+252 …) · sales/lead email · sender domain for email · office address in Hargeisa · opening hours · social profile URLs (Facebook, LinkedIn, X, TikTok, Instagram) · Google Maps link · Search Console verification · www vs apex domain
- Confirm the promises: "We reply within one working day", "Local support in Hargeisa", "trained on site", "data backed up in the cloud".

## 14. Kit contents (provided with this prompt)

```
maamulplus-website-kit/
├─ MASTER_PROMPT.md                         ← this file
├─ brand/logos/        MaamulPlus-Logo-v2(.svg, -white.svg), Logo-NoTagline(.svg, -white.svg), M-mark-v2.svg, Icon-v2.svg, Social-Profile.png
├─ brand/favicons/     favicon.svg, favicon-16/32/48/180/512.png
├─ design-system/      README.md (brand book), tokens.json, components/bundle.css, components/*.md (guidelines)
└─ reference/          maamulplus-site-reference.html (approved design: open in a browser),
                       page.css, app-screens.css, app-screens-reference.py (markup + data of coded screens)
```

Use the reference for **look and behaviour**, not for code structure: rebuild everything as typed React components following this prompt.
