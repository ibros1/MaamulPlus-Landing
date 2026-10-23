// @vitest-environment node
import { escapeHtml } from '@/lib/leads/escape';
import { memoryLimiter } from '@/lib/ratelimit';

vi.mock('server-only', () => ({}));

const deliverLead = vi.fn<(lead: unknown) => Promise<void>>(async () => undefined);
vi.mock('@/lib/leads', () => ({ deliverLead: (l: unknown) => deliverLead(l) }));

const valid = () => ({
  edition: 'lite',
  name: 'Abdi Ahmed',
  business: 'Hargeisa Spare Parts',
  phone: '+252 63 441 2290',
  email: '',
  branches: '1',
  company_website: '',
  startedAt: Date.now() - 10_000,
  turnstileToken: 'dev-turnstile-disabled',
  page: '/',
});

function post(body: unknown, ip = '10.0.0.1') {
  return new Request('http://localhost/api/demo-request', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/demo-request', () => {
  beforeEach(() => {
    deliverLead.mockClear();
    vi.resetModules();
  });

  async function handler() {
    return (await import('@/app/api/demo-request/route')).POST;
  }

  it('accepts a valid request with 201 and delivers it', async () => {
    const res = await (await handler())(post(valid()));
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ ok: true });
    expect(deliverLead).toHaveBeenCalledTimes(1);
    expect(res.headers.get('x-robots-tag')).toContain('noindex');
  });

  it('returns 400 with field errors for invalid input', async () => {
    const res = await (await handler())(post({ ...valid(), phone: 'x' }));
    expect(res.status).toBe(400);
    const body = (await res.json()) as { fieldErrors: Record<string, string[]> };
    expect(body.fieldErrors.phone?.[0]).toMatch(/phone number/);
    expect(deliverLead).not.toHaveBeenCalled();
  });

  it('returns 400 for a body that is not JSON', async () => {
    expect((await (await handler())(post('{nope'))).status).toBe(400);
  });

  it('quietly drops honeypot and too-fast submissions', async () => {
    const h = await handler();
    const a = await h(post({ ...valid(), company_website: 'spam.example' }, '10.0.0.2'));
    const b = await h(post({ ...valid(), startedAt: Date.now() }, '10.0.0.3'));
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(deliverLead).not.toHaveBeenCalled();
  });

  it('rejects a bad Turnstile token', async () => {
    const res = await (await handler())(post({ ...valid(), turnstileToken: 'forged' }, '10.0.0.4'));
    expect(res.status).toBe(403);
  });

  it('rate limits to 5 per 10 minutes per IP with Retry-After', async () => {
    const h = await handler();
    for (let i = 0; i < 5; i++) expect((await h(post(valid(), '10.0.0.9'))).status).toBe(201);
    const res = await h(post(valid(), '10.0.0.9'));
    expect(res.status).toBe(429);
    expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('returns 502 when delivery fails, without echoing input', async () => {
    deliverLead.mockRejectedValueOnce(new Error('boom'));
    const res = await (await handler())(post(valid(), '10.0.0.10'));
    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toContain('Abdi');
  });
});

describe('helpers', () => {
  it('escapes HTML in lead emails', () => {
    expect(escapeHtml('<script>"x" & \'y\'</script>')).toBe('&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;');
  });

  it('memory limiter allows max then blocks', async () => {
    const l = memoryLimiter(2, 60_000);
    expect((await l.limit('a')).success).toBe(true);
    expect((await l.limit('a')).success).toBe(true);
    const third = await l.limit('a');
    expect(third.success).toBe(false);
    expect(third.retryAfter).toBeGreaterThan(0);
    expect((await l.limit('b')).success).toBe(true);
  });
});
