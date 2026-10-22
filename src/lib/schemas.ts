import { z } from 'zod';

/** Shared by the browser forms (react-hook-form) and the API route handlers. */

const antiSpam = {
  /** Honeypot: hidden from people, bots fill it. Must stay empty. */
  company_website: z.string().max(0).optional(),
  /** ms timestamp of when the form rendered; submissions under 3 s are dropped. */
  startedAt: z.number().int(),
  turnstileToken: z.string().min(1),
};

const attribution = {
  utm: z
    .object({ source: z.string().max(100).optional(), medium: z.string().max(100).optional(), campaign: z.string().max(100).optional() })
    .optional(),
  page: z.string().max(200),
};

export const editionSchema = z.enum(['enterprise', 'lite']);
export type Edition = z.infer<typeof editionSchema>;

export const branchOptions = ['1', '2-3', '4-10', '10+'] as const;

export const demoRequestSchema = z.object({
  edition: editionSchema,
  name: z.string().trim().min(2, 'Please add your name.').max(80),
  business: z.string().trim().min(2, 'Please add your business name.').max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, 'Enter a phone number we can call'),
  email: z.string().trim().email('Enter a valid email, or leave it empty').max(120).optional().or(z.literal('')),
  branches: z.enum(branchOptions),
  message: z.string().trim().max(1000).optional(),
  ...antiSpam,
  ...attribution,
});
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please add your name.').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, 'Enter a phone number we can call')
    .optional()
    .or(z.literal('')),
  email: z.string().trim().email('Enter a valid email').max(120),
  topic: z.enum(['sales', 'support', 'partnership', 'other']),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters).').max(2000),
  ...antiSpam,
  ...attribution,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(120),
  ...antiSpam,
  page: z.string().max(200),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export type ApiOk = { ok: true; id: string };
export type ApiError = { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };

export const MIN_FILL_MS = 3000;
