/**
 * Crawls the built site from its sitemap and checks every indexable page:
 * one H1, <title> ≤ 60, description 140–160, absolute canonical, og:image, valid JSON-LD,
 * no "deyn", no banned words, no prices.
 *
 * Usage: pnpm build && pnpm start -p 3100 & BASE_URL=http://localhost:3100 pnpm seo:check
 */
import { parse } from 'node-html-parser';

const BASE = (process.env.BASE_URL ?? 'http://localhost:3100').replace(/\/$/, '');
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maamulplus.com').replace(/\/$/, '');
const BANNED = ['revolutionary', 'seamless', 'powerful', 'unlock', 'supercharge', 'all-in-one solution', 'cutting-edge', 'leverage'];

interface Problem {
  url: string;
  issue: string;
}

async function get(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function checkJsonLd(raw: string, url: string, problems: Problem[]): void {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    problems.push({ url, issue: 'JSON-LD does not parse' });
    return;
  }
  const nodes = (data as { '@graph'?: unknown[] })['@graph'] ?? [data];
  if ((data as { '@context'?: string })['@context'] !== 'https://schema.org') {
    problems.push({ url, issue: 'JSON-LD missing @context https://schema.org' });
  }
  for (const n of nodes) {
    const node = n as Record<string, unknown>;
    if (!node['@type'] && !node['@id']) problems.push({ url, issue: 'JSON-LD node without @type' });
    if (node['@type'] === 'FAQPage' && !Array.isArray(node.mainEntity)) problems.push({ url, issue: 'FAQPage without mainEntity' });
    if (node['@type'] === 'BreadcrumbList') {
      for (const item of (node.itemListElement as { item?: string }[] | undefined) ?? []) {
        if (!item.item?.startsWith('https://')) problems.push({ url, issue: 'Breadcrumb item is not an absolute URL' });
      }
    }
  }
  if (/"offers"|"price"\s*:|priceCurrency/.test(raw)) problems.push({ url, issue: 'JSON-LD contains offers/price' });
}

async function main(): Promise<void> {
  const sitemap = await get(`${BASE}/sitemap.xml`);
  const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1] ?? '');
  if (urls.length === 0) throw new Error('Sitemap has no URLs');
  const problems: Problem[] = [];

  for (const canonicalUrl of urls) {
    const path = canonicalUrl.replace(SITE, '') || '/';
    const html = await get(`${BASE}${path}`);
    const doc = parse(html);
    const url = path;

    const h1s = doc.querySelectorAll('h1');
    if (h1s.length !== 1) problems.push({ url, issue: `expected 1 H1, found ${h1s.length}` });

    const title = doc.querySelector('title')?.text.trim() ?? '';
    if (!title) problems.push({ url, issue: 'missing <title>' });
    else if (title.length > 60) problems.push({ url, issue: `title is ${title.length} chars: "${title}"` });

    const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    if (desc.length < 140 || desc.length > 160) problems.push({ url, issue: `description is ${desc.length} chars` });

    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    if (canonical !== canonicalUrl) problems.push({ url, issue: `canonical "${canonical}" ≠ "${canonicalUrl}"` });

    if (!doc.querySelector('meta[property="og:image"]')?.getAttribute('content')?.startsWith('https://')) {
      problems.push({ url, issue: 'missing absolute og:image' });
    }
    if (doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex')) {
      problems.push({ url, issue: 'indexable page in sitemap is marked noindex' });
    }

    const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
    if (scripts.length === 0) problems.push({ url, issue: 'no JSON-LD' });
    for (const s of scripts) checkJsonLd(s.text, url, problems);

    const main = doc.querySelector('main');
    const text = (main?.text ?? '').replace(/\s+/g, ' ');
    if (/deyn/i.test(html)) problems.push({ url, issue: 'contains "deyn"' });
    for (const w of BANNED) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) problems.push({ url, issue: `banned word "${w}"` });
    for (const plan of doc.querySelectorAll('.mp-plan, .mp-plan__price')) {
      if (/\$\s?\d/.test(plan.text)) problems.push({ url, issue: 'a plan shows a price' });
    }
    const meta = doc.querySelectorAll('meta').map((m) => m.getAttribute('content') ?? '').join(' ');
    if (/\$\s?\d/.test(meta)) problems.push({ url, issue: 'metadata contains a price' });
  }

  const noindex = parse(await get(`${BASE}/thank-you`)).querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (!noindex.includes('noindex')) problems.push({ url: '/thank-you', issue: 'should be noindex' });

  if (problems.length) {
    console.error(`SEO check: ${problems.length} problem(s) on ${urls.length} pages`);
    for (const p of problems) console.error(`  ${p.url}: ${p.issue}`);
    process.exit(1);
  }
  console.log(`SEO check passed for ${urls.length} pages.`);
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
