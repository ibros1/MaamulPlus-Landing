# Editing content

All copy lives in typed TypeScript files in `src/content/` and MDX files in `src/content/blog/`. The pages read from them, so most text changes need no component code. TypeScript catches missing fields, and `pnpm test` checks the brand rules below.

## Where each piece of copy lives

| File | What it holds |
|---|---|
| `src/config/site.ts` | Business facts: phone, email, address, opening hours, socials, sign-in URLs, the promises the site makes |
| `src/content/home.ts` | Home page sections (hero, money rails, editions, tour, getting started…) |
| `src/content/editions.ts` | Edition names, plan cards, the comparison table |
| `src/content/edition-pages.ts` | `/enterprise` and `/lite` page copy |
| `src/content/features.ts` | Every `/features/<slug>` page |
| `src/content/solutions.ts` | Every `/solutions/<slug>` page |
| `src/content/faq.ts` | FAQ lists (home, enterprise, lite, pricing, general). The FAQPage JSON-LD is built from the same text |
| `src/content/pages.ts` | About, contact, demo, pricing, legal and other page copy |
| `src/content/forms.ts` | Form labels, help text, errors and success messages |
| `src/content/navigation.ts` | Header links, the Sign in menu, footer columns |
| `src/content/demo-data.ts` | Numbers inside the coded app screens. Totals must add up (tests check this) |
| `src/content/blog/*.mdx` | Blog articles |

## Brand rules (checked by `tests/content-rules.test.ts` and `pnpm seo:check`)

- English, sentence case. Headlines are short declaratives ending with a period.
- Say "credit" or "credit outstanding". Never "deyn".
- **No prices, ever.** Use "Pricing on request" (Lite), "Custom quote" (Enterprise), "Request pricing", "Talk to sales", "Book a demo".
- Names exactly: MaamulPlus, MaamulPlus Enterprise, MaamulPlus Lite. Local names as they are: Zaad, eDahab, Sahal, SLSH, USD.
- Lite is "focused", never "cheap" or "basic".
- Banned words: revolutionary, seamless, powerful, unlock, supercharge, all-in-one solution, cutting-edge, leverage. No emoji.

## SEO limits

- Page `title`: at most 47 characters (the site adds " · MaamulPlus", keeping the whole title ≤ 60).
- Meta `description`: 140–160 characters.
- One H1 per page. Feature and solution pages need at least 450 words of copy.

## Add a feature or solution page

1. Add an object to `features` (or `solutions`) in its file. Fill every field of `DetailPage`: `slug`, `name`, `title`, `description`, `eyebrow`, `h1`, `lead`, `screen` (which coded app screen to show), `screenLabel`, `availability` (`'enterprise'` or `'both'`), `availabilityNote`, `benefits` (3–6), `sections`, `related` (slugs of other features/solutions), `faq` (3–5).
2. That is all. The route, sitemap entry, footer link, OG image and breadcrumbs are generated from the list.
3. Run `pnpm test` to check word count, title and description lengths.

## Add a blog post

1. Create `src/content/blog/<slug>.mdx`. The file name is the URL.
2. Front matter (validated with zod when the site builds):

   ```yaml
   ---
   title: 'Full article title (10–110 chars)'
   seoTitle: Optional shorter title, max 47 chars
   description: 140–160 characters for search results.
   date: '2026-10-20'
   updated: '2026-10-20'
   author: MaamulPlus
   tags: [accounting, credit]
   ---
   ```

3. Write the article in Markdown. Use `##` for sections (the title is the H1). Tables, lists and links work (GitHub-flavoured Markdown).
4. Add the slug to `blogSlugs` in `e2e/pages.ts` so the e2e and axe checks cover it.

## Change the sign-in links

Set `NEXT_PUBLIC_ENTERPRISE_APP_URL` and `NEXT_PUBLIC_LITE_APP_URL` in the hosting environment. The menu labels and one-line descriptions are in `navCopy.signInEditions` in `src/content/navigation.ts`.

## Fill in business details

Open `src/config/site.ts` and replace each `null` with the real value. Anything still `null` is hidden on the page and left out of structured data, so nothing is ever invented.
