import { expect, test } from '@playwright/test';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Visual regression against the approved reference design.
 * For each home section, the reference HTML is screenshotted first and written as the baseline;
 * the build's section must then match it within 2%. Runs at 1440px in both themes.
 * Needs the kit unzipped in the project root (maamulplus-website-kit/, from maamulplus-website-kit.zip).
 */
const REFERENCE_FILE = resolve('maamulplus-website-kit/reference/maamulplus-site-reference.html');
const REFERENCE = pathToFileURL(REFERENCE_FILE).href;

const SECTIONS = [
  { name: 'hero', selector: 'section.hero' },
  { name: 'rails', selector: '.rails' },
  { name: 'editions', selector: '#editions' },
  { name: 'market', selector: 'section[aria-labelledby="mk-title"]' },
  { name: 'pricing', selector: '#pricing' },
  { name: 'steps', selector: 'section[aria-labelledby="on-title"]' },
];

test.describe('home matches the reference', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'compared at 1440px only');
  test.skip(!existsSync(REFERENCE_FILE), 'reference kit not unzipped');

  for (const scheme of ['light', 'dark'] as const) {
    for (const s of SECTIONS) {
      test(`${s.name} (${scheme})`, async ({ page }, testInfo) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });

        await page.goto(REFERENCE);
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        const reference = await page.locator(s.selector).first().screenshot({ animations: 'disabled' });
        const baseline = testInfo.snapshotPath(`${s.name}-${scheme}.png`);
        mkdirSync(dirname(baseline), { recursive: true });
        writeFileSync(baseline, reference);

        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => document.querySelectorAll('.rv').forEach((el) => el.classList.remove('pre')));
        await expect(page.locator(s.selector).first()).toHaveScreenshot(`${s.name}-${scheme}.png`, {
          maxDiffPixelRatio: 0.02,
          animations: 'disabled',
        });
      });
    }
  }
});
