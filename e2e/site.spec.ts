import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { allPages } from './pages';

const isMobile = (w: number | undefined) => (w ?? 1440) < 960;

test.describe('every page', () => {
  for (const path of allPages) {
    test(`${path}: renders, one H1, no horizontal scroll, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(String(e)));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    for (const scheme of ['light', 'dark'] as const) {
      test(`${path}: axe finds no violations (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
});

test('404 returns a real 404 with helpful links', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not on the shelf');
  await expect(page.getByRole('link', { name: 'MaamulPlus Enterprise' }).first()).toBeVisible();
});

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Skip to content');
});

test.describe('navigation', () => {
  test('desktop links mark the current page', async ({ page, viewport }) => {
    test.skip(isMobile(viewport?.width), 'desktop only');
    await page.goto('/pricing');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
  });

  test('mobile menu opens, traps focus and closes with Escape', async ({ page, viewport }) => {
    test.skip(!isMobile(viewport?.width), 'mobile only');
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Open menu' });
    await button.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });

  test('sign in offers both editions', async ({ page, viewport }) => {
    await page.goto('/');
    if (isMobile(viewport?.width)) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      const menu = page.locator('#mobile-menu');
      await expect(menu.getByRole('link', { name: 'Sign in to Enterprise' })).toHaveAttribute('rel', 'nofollow');
      await expect(menu.getByRole('link', { name: 'Sign in to Lite' })).toHaveAttribute('rel', 'nofollow');
      return;
    }
    const signIn = page.getByRole('button', { name: 'Sign in' });
    await signIn.click();
    await expect(signIn).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /MaamulPlus Enterprise/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /MaamulPlus Lite/ }).first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(signIn).toHaveAttribute('aria-expanded', 'false');
    await expect(signIn).toBeFocused();
  });
});

test('product tour tabs work with the keyboard', async ({ page }) => {
  await page.goto('/');
  const first = page.getByRole('tab', { name: /Sales & invoices/ });
  await first.focus();
  await page.keyboard.press('ArrowDown');
  const second = page.getByRole('tab', { name: /Customers & credit/ });
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(second).toBeFocused();
  await expect(page.locator('#p-customer')).toBeVisible();
  await expect(page.locator('#p-sales')).toBeHidden();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: /People & payroll/ })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(first).toHaveAttribute('aria-selected', 'true');
});

test.describe('demo request form', () => {
  test('a plan button preselects the edition', async ({ page }) => {
    await page.goto('/');
    await page.locator('#pricing').getByRole('link', { name: 'Request pricing' }).click();
    await expect(page.locator('#demo form')).toBeVisible();
    await expect(page.locator('#edition-lite')).toBeChecked();
    await page.locator('#pricing').getByRole('link', { name: 'Talk to sales' }).click();
    await expect(page.locator('#edition-enterprise')).toBeChecked();
  });

  test('shows validation errors and focuses the first invalid field', async ({ page }) => {
    await page.goto('/demo');
    await page.getByRole('button', { name: 'Request a demo' }).click();
    await expect(page.getByText('Please add your name.')).toBeVisible();
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Your name')).toBeFocused();
  });

  async function fill(page: import('@playwright/test').Page) {
    await page.getByLabel('Your name', { exact: true }).fill('Abdi Ahmed');
    await page.getByLabel('Business name', { exact: true }).fill('Hargeisa Spare Parts');
    await page.getByLabel('Phone', { exact: true }).fill('+252 63 441 2290');
    await page.getByLabel('Branches', { exact: true }).selectOption('2-3');
  }

  test('successful submit shows the thank-you card (home)', async ({ page }) => {
    await page.route('**/api/demo-request', (route) =>
      route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ ok: true, id: 'test' }) }),
    );
    await page.goto('/#demo');
    await fill(page);
    await page.getByRole('button', { name: 'Request a demo' }).click();
    const done = page.getByRole('status');
    await expect(done).toContainText('Thank you, we have your request.');
    await expect(done).toContainText('Our team will call Abdi about MaamulPlus Enterprise');
    await expect(done).toBeFocused();
  });

  test('successful submit on /demo continues to /thank-you', async ({ page }) => {
    await page.route('**/api/demo-request', (route) =>
      route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ ok: true, id: 'test' }) }),
    );
    await page.goto('/demo');
    await fill(page);
    await page.getByRole('button', { name: 'Request a demo' }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('handles 429 with a clear message and keeps the inputs', async ({ page }) => {
    await page.route('**/api/demo-request', (route) =>
      route.fulfill({
        status: 429,
        headers: { 'Retry-After': '600' },
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Too many requests. Please wait a few minutes and try again.' }),
      }),
    );
    await page.goto('/demo');
    await fill(page);
    await page.getByRole('button', { name: 'Request a demo' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'Too many requests' })).toBeVisible();
    await expect(page.getByLabel('Your name')).toHaveValue('Abdi Ahmed');
  });

  test('the real API accepts a request end to end (mock lead sink)', async ({ request }) => {
    const res = await request.post('/api/demo-request', {
      data: {
        edition: 'lite',
        name: 'E2E Test',
        business: 'E2E Shop',
        phone: '+252 63 000 0000',
        email: '',
        branches: '1',
        company_website: '',
        startedAt: Date.now() - 10_000,
        turnstileToken: 'e2e',
        page: '/e2e',
      },
      headers: { 'x-forwarded-for': `10.9.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}` },
    });
    expect(res.status()).toBe(201);
  });
});

test.describe('SEO basics', () => {
  test('robots.txt and sitemap.xml', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Disallow: /api/');
    expect(robots).toContain('Sitemap: https://maamulplus.com/sitemap.xml');
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('<loc>https://maamulplus.com/features/accounting</loc>');
    expect(sitemap).not.toContain('thank-you');
  });

  test('security headers are set', async ({ request }) => {
    const res = await request.get('/');
    const h = res.headers();
    expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(h['strict-transport-security']).toContain('max-age=63072000');
    expect(h['x-frame-options']).toBe('DENY');
    expect(h['x-powered-by']).toBeUndefined();
  });

  test('trailing slashes redirect permanently', async ({ request }) => {
    const res = await request.get('/pricing/', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
  });
});
