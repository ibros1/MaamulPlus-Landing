import { contactSchema, demoRequestSchema, newsletterSchema } from '@/lib/schemas';

const validDemo = {
  edition: 'enterprise',
  name: 'Abdi Ahmed',
  business: 'Hargeisa Spare Parts',
  phone: '+252 63 441 2290',
  email: '',
  branches: '2-3',
  message: 'Spare parts, two shops',
  company_website: '',
  startedAt: Date.now() - 10_000,
  turnstileToken: 'token',
  utm: { source: 'facebook' },
  page: '/',
};

describe('demoRequestSchema', () => {
  it('accepts a complete request', () => {
    expect(demoRequestSchema.safeParse(validDemo).success).toBe(true);
  });

  it('accepts an optional email when present and valid', () => {
    expect(demoRequestSchema.safeParse({ ...validDemo, email: 'abdi@example.com' }).success).toBe(true);
  });

  it.each([
    ['short name', { name: 'A' }],
    ['bad phone', { phone: 'call me' }],
    ['bad email', { email: 'not-an-email' }],
    ['unknown edition', { edition: 'gold' }],
    ['unknown branches', { branches: '50' }],
    ['filled honeypot', { company_website: 'http://spam.example' }],
    ['missing token', { turnstileToken: '' }],
    ['long message', { message: 'x'.repeat(1001) }],
  ])('rejects %s', (_label, patch) => {
    expect(demoRequestSchema.safeParse({ ...validDemo, ...patch }).success).toBe(false);
  });

  it('trims whitespace', () => {
    const r = demoRequestSchema.parse({ ...validDemo, name: '  Abdi Ahmed  ' });
    expect(r.name).toBe('Abdi Ahmed');
  });
});

describe('contactSchema', () => {
  const base = {
    name: 'Hodan Ali',
    email: 'hodan@example.com',
    phone: '',
    topic: 'sales',
    message: 'Please send me a quote for Lite.',
    startedAt: 1,
    turnstileToken: 't',
    page: '/contact',
  };
  it('accepts a valid message', () => expect(contactSchema.safeParse(base).success).toBe(true));
  it('requires an email', () => expect(contactSchema.safeParse({ ...base, email: '' }).success).toBe(false));
  it('requires a real message', () => expect(contactSchema.safeParse({ ...base, message: 'hi' }).success).toBe(false));
});

describe('newsletterSchema', () => {
  it('accepts an email', () =>
    expect(newsletterSchema.safeParse({ email: 'a@b.so', startedAt: 1, turnstileToken: 't', page: '/blog' }).success).toBe(true));
  it('rejects a bad email', () =>
    expect(newsletterSchema.safeParse({ email: 'nope', startedAt: 1, turnstileToken: 't', page: '/blog' }).success).toBe(false));
});
