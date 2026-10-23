import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { features } from '@/content/features';
import { solutions } from '@/content/solutions';

/** Brand rules from the brief (§2) applied to every user-facing source file. */
const ROOTS = ['src/content', 'src/components', 'src/app'];
const BANNED = ['revolutionary', 'seamless', 'powerful', 'unlock', 'supercharge', 'all-in-one solution', 'cutting-edge', 'leverage'];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mdx)$/.test(p) ? [p] : [];
  });
}

const all = ROOTS.flatMap(files).map((p) => ({ p, text: readFileSync(p, 'utf8') }));

describe('brand and content rules', () => {
  it('never writes "deyn"', () => {
    expect(all.filter((f) => /deyn/i.test(f.text)).map((f) => f.p)).toEqual([]);
  });

  it.each(BANNED)('never uses the banned word "%s"', (word) => {
    const re = new RegExp(`\\b${word}\\b`, 'i');
    expect(all.filter((f) => re.test(f.text)).map((f) => f.p)).toEqual([]);
  });

  it('never misspells the product name', () => {
    expect(all.filter((f) => /Maamul Plus|MAAMULPLUS/.test(f.text)).map((f) => f.p)).toEqual([]);
  });

  it('describes Lite as focused, never cheap or basic', () => {
    expect(all.filter((f) => /\b(cheap|cheaper)\b/i.test(f.text)).map((f) => f.p)).toEqual([]);
  });

  it('feature and solution pages have at least 450 words of copy', () => {
    for (const page of [...features, ...solutions]) {
      const text = [
        page.lead,
        page.availabilityNote,
        ...page.benefits.flatMap((b) => [b.title, b.body]),
        ...page.sections.flatMap((s) => [s.title, ...s.paragraphs]),
        ...page.faq.flatMap((q) => [q.q, q.a]),
      ].join(' ');
      expect.soft(text.split(/\s+/).length, page.slug).toBeGreaterThanOrEqual(450);
    }
  });

  it('page titles fit in 60 characters with the template, descriptions are 140–160', () => {
    for (const page of [...features, ...solutions]) {
      expect.soft(`${page.title} · MaamulPlus`.length, page.slug).toBeLessThanOrEqual(60);
      expect.soft(page.description.length, page.slug).toBeGreaterThanOrEqual(140);
      expect.soft(page.description.length, page.slug).toBeLessThanOrEqual(160);
    }
  });
});
