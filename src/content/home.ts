import type { IconName, ScreenKey } from './features';

/** Copy for the home page sections, in page order. */

export const hero = {
  badge: 'Built for traders in Somaliland',
  titleStart: 'Run your whole business from',
  titleEmphasis: 'one screen.',
  lead: 'Sales, stock, credit, payments and accounting in one system that speaks USD and SLSH and knows your Zaad and eDahab accounts. Pick the edition that fits how you trade.',
  primaryCta: 'Book a demo',
  secondaryCta: 'Compare editions',
  /** [[CONFIRM]] "Local support in Hargeisa" is hidden when site.promises.localSupportInHargeisa is false. */
  meta: ['Guided setup and data import', 'Local support in Hargeisa', 'Works on any browser'],
  screenLabel:
    "The MaamulPlus dashboard: today's takings, this month, credit outstanding, stock value and cash on hand.",
};

export const rails = {
  title: 'Records money the way it actually moves in Somaliland',
  items: [
    { label: 'Cash', icon: 'banknote' },
    { label: 'Bank', icon: 'landmark' },
    { label: 'Zaad', icon: 'smartphone' },
    { label: 'eDahab', icon: 'smartphone' },
    { label: 'Sahal', icon: 'smartphone' },
    { label: 'USD · SLSH', icon: 'coins' },
  ],
} as const;

export const editionsSection = {
  eyebrow: 'Two editions',
  title: 'One family. Built for the size of your business.',
  lead: 'Both editions share the same design, the same speed and the same local support. The difference is how deep the accounting goes.',
  enterpriseSecondary: 'See all features',
  liteSecondary: 'Compare editions',
};

export interface TourTab {
  id: 'sales' | 'customer' | 'finance' | 'cashflow' | 'people';
  screen: ScreenKey;
  title: string;
  blurb: string;
  label: string;
  caption: { strong: string; rest: string }[];
}

export const tour = {
  eyebrow: 'Inside the product',
  title: 'Every part of the day, on one screen.',
  lead: 'The real MaamulPlus interface, shown with sample data from a spare parts business in Hargeisa.',
  tabs: [
    {
      id: 'sales',
      screen: 'sales',
      title: 'Sales & invoices',
      blurb: 'Invoices that move stock and post to your books.',
      label: 'The Sales list with invoice numbers, customers, branches, totals, balances and payment status.',
      caption: [
        { strong: 'Cash or credit', rest: ' on every invoice, with the balance tracked to the cent.' },
        { strong: 'Quotations, returns and held sales', rest: ' built in.' },
      ],
    },
    {
      id: 'customer',
      screen: 'customer',
      title: 'Customers & credit',
      blurb: 'Credit limits, balances and statements.',
      label: 'A customer page with balance owed, credit limit and statement of invoices and payments.',
      caption: [
        { strong: 'Every customer has a statement', rest: ' you can print or share.' },
        { strong: 'Credit limits', rest: ' are checked at the till.' },
      ],
    },
    {
      id: 'finance',
      screen: 'finance',
      title: 'Money & accounts',
      blurb: 'Where the money sits, and how it moved.',
      label: 'The Finance dashboard with cash position across cash, bank and mobile money accounts.',
      caption: [
        { strong: 'Every drawer, bank and wallet', rest: ' is an account with its own balance.' },
        { strong: 'Owed both ways:', rest: ' what customers owe you and what you owe suppliers.' },
      ],
    },
    {
      id: 'cashflow',
      screen: 'cashflow',
      title: 'Reports',
      blurb: 'Cash flow, statements and branch performance.',
      label: 'The Cash flow report with opening, cash in, cash out and closing, by source and by account.',
      caption: [
        { strong: 'Cash flow, income statement, balance sheet, trial balance', rest: ' and more.' },
        { strong: 'Filter by period and branch,', rest: ' export to CSV or PDF.' },
      ],
    },
    {
      id: 'people',
      screen: 'people',
      title: 'People & payroll',
      blurb: 'Staff, salaries, advances and payroll runs.',
      label: 'The People dashboard with salary bill, headcount by department and payroll status per employee.',
      caption: [
        { strong: 'Run payroll in one step', rest: ', paid from the right account.' },
        { strong: 'Advances are recovered', rest: ' automatically from the next payslip.' },
      ],
    },
  ] satisfies TourTab[],
};

export type TourTabId = TourTab['id'];

export const accounting = {
  eyebrow: 'Enterprise accounting',
  title: 'Every shilling, accounted for.',
  lead: 'MaamulPlus Enterprise keeps real double-entry books. Each sale, purchase, payment and payroll run posts its own journal, so your statements are always ready.',
  points: [
    {
      title: 'Chart of accounts that fits you',
      body: 'Start from a ready chart for trading businesses, then add your own banks, wallets and expense heads.',
    },
    {
      title: 'Posted automatically',
      body: 'No journal entries by hand for daily work. Manual journals are there when your accountant needs them.',
    },
    {
      title: 'Statements on demand',
      body: 'Trial balance, income statement, balance sheet and cash flow for any period and branch.',
    },
  ],
  ledgerLabel:
    'Example journal for a credit sale: accounts receivable and cost of goods sold debited, sales revenue and inventory credited, totals balanced.',
  ledgerFoot: 'Balanced. Customer and branch recorded on every line.',
  link: 'More about accounting',
};

export const enterpriseFeatures = {
  eyebrow: 'MaamulPlus Enterprise',
  title: 'Built for traders with branches, agents and staff.',
  lead: 'Everything in Lite, plus the depth a wholesale or multi-branch business needs to run with confidence.',
  cards: [
    {
      icon: 'route',
      title: 'Sales agents & sessions',
      body: 'Agents take stock out to known customers and settle at the end of each session. Every item is accounted for.',
      href: '/features/sales-agents',
    },
    {
      icon: 'building',
      title: 'Multi-branch stock',
      body: 'Buy once and send stock to many branches. Transfers, adjustments and movements are tracked per branch.',
      href: '/features/inventory',
    },
    {
      icon: 'idcard',
      title: 'HR & payroll',
      body: 'Employees, payroll runs, payslips and advances, paid from the right account and posted to the books.',
      href: '/features/hr-payroll',
    },
    {
      icon: 'shield',
      title: 'Roles & audit log',
      body: 'Fine-grained permissions per role and branch. Every action is logged with user, device and time.',
      href: '/enterprise',
    },
    {
      icon: 'sparkles',
      title: 'AI assistant',
      body: 'Ask about your business in plain words: which products are running low, who owes the most, how this week compares.',
      href: '/enterprise',
    },
    {
      icon: 'scan',
      title: 'Faster at the counter',
      body: 'Barcode scanning, held sales, unit conversions and quotations that turn into invoices with one click.',
      href: '/features/sales-and-invoicing',
    },
  ] as { icon: IconName; title: string; body: string; href: string }[],
};

export const market = {
  eyebrow: 'Made for here',
  title: 'Designed around how business works in Somaliland.',
  lead: 'Most software assumes one currency and card payments. MaamulPlus starts from cash, mobile money and customer credit.',
  cells: [
    {
      key: '1 USD = 11,000 SLSH',
      mono: true,
      title: 'Two currencies, one balance',
      body: "Prices and balances in USD. Take payment in SLSH at the day's rate, recorded on each payment.",
    },
    {
      key: 'Zaad · eDahab',
      mono: false,
      title: 'Mobile money as accounts',
      body: 'Each merchant wallet has its own balance, so you always know where the money landed.',
    },
    {
      key: 'Credit limits',
      mono: false,
      title: 'Customer credit under control',
      body: 'Opening balances, credit limits checked at the till and a clear statement for every customer.',
    },
    {
      key: 'Wholesale + retail',
      mono: false,
      title: 'Units that match the shelf',
      body: 'Sell by the carton or by the piece with unit conversions, at wholesale or retail prices.',
    },
  ],
};

export const pricingSection = {
  eyebrow: 'Pricing',
  title: 'A plan sized to your business.',
  lead: 'Pricing depends on the edition, your number of users and branches. Tell us about your business and we will send a quote within one working day.',
  compareCaption: 'Feature comparison between MaamulPlus Lite and MaamulPlus Enterprise',
};

export const steps = {
  eyebrow: 'Getting started',
  title: 'From first call to first invoice in days.',
  lead: 'We set MaamulPlus up with you, so your team starts on day one with real data.',
  items: [
    { title: 'Book a demo', body: 'We walk through MaamulPlus with your own products and the way you sell.' },
    { title: 'Choose your edition', body: 'Lite or Enterprise, with a quote for your users and branches.' },
    { title: 'Bring your data', body: 'We import products, customers, vendors and opening balances for you.' },
    { title: 'Go live', body: 'Your team is trained on site, and support stays a phone call away.' },
  ],
};

export const faqSection = {
  eyebrow: 'Questions',
  title: 'What business owners ask us.',
  leadStart: 'Something else on your mind?',
  leadLink: 'Send us a message.',
};

export const ctaBand = {
  eyebrow: 'Book a demo',
  title: 'See MaamulPlus with your own business in it.',
  lead: 'Tell us a little about what you sell. We will show you the right edition and send you a quote.',
  points: ['A 30-minute walkthrough, in person or online', 'A quote for your users and branches', 'No commitment'],
};
