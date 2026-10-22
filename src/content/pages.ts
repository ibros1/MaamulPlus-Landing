import { site } from '@/config/site';
import type { IconName } from './features';

export const about = {
  h1: 'Making business simpler in Somaliland.',
  lead: 'MaamulPlus is business management software built in Hargeisa for the way Somaliland trades: in dollars and shillings, through cash, banks and mobile money, and on trust and credit between people who know each other.',
  sections: [
    {
      title: 'Why we built MaamulPlus.',
      paragraphs: [
        'Most business software is designed for markets with one currency, card payments and accountants on staff. Traders in Somaliland work differently. Prices are in USD, customers pay in SLSH, money moves through Zaad and eDahab as often as through a bank, and a large part of every month’s sales is on credit to regular customers.',
        'We kept meeting owners who ran good businesses on notebooks and spreadsheets, and who knew the numbers were not quite right. MaamulPlus is our answer: one system for sales, stock, credit, payments and accounting, designed around how money actually moves here.',
      ],
    },
    {
      title: 'Two editions, one family.',
      paragraphs: [
        'MaamulPlus Lite gives a shop or small trader the essentials in plain language. MaamulPlus Enterprise adds real double-entry accounting, multiple branches, sales agents and payroll for businesses that have grown into them. Both share the same design and the same local support, and moving from one to the other keeps your history.',
      ],
    },
    {
      title: 'Local, and staying that way.',
      paragraphs: [
        'We set MaamulPlus up with every customer, import their data, and train their team. When something is unclear, support is a phone call away, from people who understand the business. The product improves from what our customers in Hargeisa tell us every week.',
      ],
    },
  ],
  valuesTitle: 'What you can expect from us.',
  values: [
    { icon: 'check', title: 'Plain, specific answers', body: 'We say what the software does and what it does not, and we put prices in writing for your business.' },
    { icon: 'users', title: 'Setup done with you', body: 'We import products, customers and opening balances so you start with real data.' },
    { icon: 'shield', title: 'Your data stays yours', body: 'Backed up in the cloud, protected by user roles, and exportable at any time.' },
  ] satisfies { icon: IconName; title: string; body: string }[],
};

export interface LegalDoc {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}

const contactLine = site.contact.email
  ? `Contact us at ${site.contact.email} or through the contact page.`
  : 'Contact us through the contact page on this website.';

/**
 * [[CONFIRM]] Legal text is a plain-language starting point for the marketing website.
 * Have it reviewed by a lawyer before launch.
 */
export const privacy: LegalDoc = {
  title: 'Privacy policy',
  description:
    'How MaamulPlus collects, uses and protects the personal information you share through maamulplus.com, including demo requests, contact messages and analytics.',
  updated: '2026-10-23',
  intro:
    'This policy explains what information MaamulPlus collects through this website, why we collect it and what we do with it. It covers maamulplus.com only. Data inside the MaamulPlus app is covered by your customer agreement.',
  sections: [
    {
      title: 'What we collect',
      paragraphs: [
        'When you request a demo, ask for pricing or send a message, we collect the details you enter: your name, business name, phone number, email address if you give it, the number of branches and your message.',
        'We also record which page you sent the form from and, if you arrived from a campaign link, the campaign name. We do not collect payment details on this website.',
      ],
    },
    {
      title: 'How we use it',
      paragraphs: [
        'We use your details only to reply to you: to arrange a demo, send a quote or answer your question. We do not sell your information and we do not share it with anyone outside MaamulPlus, except the service providers listed below who help us run the website.',
      ],
    },
    {
      title: 'Service providers',
      paragraphs: [
        'Form submissions are delivered to our team by email (Resend) and may be stored in our customer records. Cloudflare Turnstile checks that forms are sent by people and not bots. Website statistics are counted with Plausible Analytics, which does not use cookies or collect personal data.',
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        'We keep enquiry details for as long as we are in contact with you and for up to 24 months afterwards, unless you ask us to delete them sooner.',
      ],
    },
    {
      title: 'Your choices',
      paragraphs: [`You can ask us what information we hold about you, ask us to correct it or ask us to delete it. ${contactLine}`],
    },
    {
      title: 'Changes',
      paragraphs: ['If we change this policy, we will update the date at the top of this page.'],
    },
  ],
};

export const terms: LegalDoc = {
  title: 'Terms of service',
  description:
    'The terms for using maamulplus.com, the MaamulPlus marketing website: what the information on the site means, acceptable use and how to contact MaamulPlus.',
  updated: '2026-10-23',
  intro:
    'These terms cover your use of maamulplus.com. Your use of the MaamulPlus software itself is covered by the customer agreement you sign when you subscribe.',
  sections: [
    {
      title: 'Information on this website',
      paragraphs: [
        'We describe MaamulPlus Lite and MaamulPlus Enterprise as accurately as we can. Product screens on this website use sample data from a fictional business. Features and editions may change; your quote and customer agreement set out exactly what you receive.',
      ],
    },
    {
      title: 'Prices and quotes',
      paragraphs: [
        'Prices are not published on this website. A quote we send you is valid for the period stated on it and becomes binding only when both sides sign the customer agreement.',
      ],
    },
    {
      title: 'Acceptable use',
      paragraphs: [
        'Please do not misuse the forms on this website, attempt to access parts of it that are not public, or interfere with how it works. We may block traffic that does.',
      ],
    },
    {
      title: 'Trademarks',
      paragraphs: [
        'MaamulPlus, MaamulPlus Enterprise, MaamulPlus Lite and the MaamulPlus logo are our trademarks. Zaad, eDahab, Sahal and other names belong to their owners and are mentioned only to describe what MaamulPlus works with.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [contactLine],
    },
  ],
};
