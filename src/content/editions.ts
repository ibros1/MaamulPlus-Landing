import type { Edition } from '@/lib/schemas';

export interface EditionInfo {
  id: Edition;
  name: string;
  short: string;
  path: string;
  badge: string;
  summary: string;
  modules: string[];
  /** Plan card copy for the pricing section. */
  plan: {
    badge: string;
    for: string;
    price: string;
    priceNote: string;
    groupLabel?: string;
    list: string[];
    cta: string;
  };
  featureList: string[];
  seoDescription: string;
}

export const editions: Record<Edition, EditionInfo> = {
  enterprise: {
    id: 'enterprise',
    name: 'MaamulPlus Enterprise',
    short: 'Enterprise',
    path: '/enterprise',
    badge: 'For growing and multi-branch businesses',
    summary:
      'The complete system. Real double-entry accounting, every branch in one place, sales agents in the field and payroll for your staff.',
    modules: [
      'Double-entry accounting',
      'Chart of accounts & journals',
      'Sales agents & field sessions',
      'Multi-branch stock & transfers',
      'HR, employees & payroll',
      'Roles, permissions & audit log',
    ],
    plan: {
      badge: 'Most complete',
      for: 'For wholesalers and multi-branch businesses that need full accounting and control.',
      price: 'Custom quote',
      priceNote: 'Sized to your branches and users',
      groupLabel: 'Everything in Lite, plus',
      list: [
        'Double-entry accounting & journals',
        'Chart of accounts & trial balance',
        'Sales agents & field sessions',
        'Multi-branch stock & transfers',
        'HR & payroll, roles & audit log',
      ],
      cta: 'Talk to sales',
    },
    featureList: [
      'Double-entry accounting',
      'Chart of accounts and journals',
      'Trial balance, income statement, balance sheet and cash flow',
      'Sales agents and field sessions',
      'Multi-branch stock, transfers and adjustments',
      'HR, employees and payroll',
      'Roles, permissions and audit log',
      'AI assistant',
      'USD and SLSH',
      'Zaad, eDahab and Sahal as accounts',
    ],
    seoDescription:
      'MaamulPlus Enterprise is ERP software for Somaliland: double-entry accounting, multi-branch inventory, sales agents, payroll and audit log in USD and SLSH.',
  },
  lite: {
    id: 'lite',
    name: 'MaamulPlus Lite',
    short: 'Lite',
    path: '/lite',
    badge: 'For small and medium businesses',
    summary:
      'Everything a shop or small trader needs to sell, buy and stay on top of money, in plain language without accounting jargon.',
    modules: [
      'Sales & invoices',
      'Purchases',
      'Products & stock',
      'Customers & vendors',
      'Payments & expenses',
      'Accounts & financial statements',
    ],
    plan: {
      badge: 'Small & medium',
      for: 'For shops and small traders who want clean records and clear numbers without the accounting jargon.',
      price: 'Pricing on request',
      priceNote: 'Monthly or annual subscription',
      list: [
        'Sales, invoices & purchases',
        'Products & stock levels',
        'Customers, vendors & credit',
        'Payments, expenses & accounts',
        'Financial statements',
        'Guided setup & local support',
      ],
      cta: 'Request pricing',
    },
    featureList: [
      'Sales and invoices',
      'Purchases',
      'Products and stock levels',
      'Customers, vendors and credit',
      'Payments and expenses',
      'Cash, bank and mobile money accounts',
      'Financial statements',
      'USD and SLSH',
    ],
    seoDescription:
      'MaamulPlus Lite is simple sales, stock and invoicing software for small businesses in Somaliland. Credit, payments and statements without accounting jargon.',
  },
};

export type CompareCell = { kind: 'yes' } | { kind: 'no' } | { kind: 'text'; text: string };

export interface CompareGroup {
  group: string;
  rows: { feature: string; lite: CompareCell; enterprise: CompareCell }[];
}

const yes: CompareCell = { kind: 'yes' };
const no: CompareCell = { kind: 'no' };
const text = (t: string): CompareCell => ({ kind: 'text', text: t });

export const comparison: CompareGroup[] = [
  {
    group: 'Selling & buying',
    rows: [
      { feature: 'Sales, invoices & receipts', lite: yes, enterprise: yes },
      { feature: 'Purchases & vendors', lite: yes, enterprise: yes },
      { feature: 'Customers & credit', lite: yes, enterprise: yes },
      { feature: 'Quotations, returns & held sales', lite: no, enterprise: yes },
      { feature: 'Sales agents & field sessions', lite: no, enterprise: yes },
    ],
  },
  {
    group: 'Stock',
    rows: [
      { feature: 'Products & stock levels', lite: yes, enterprise: yes },
      { feature: 'Branches', lite: text('One'), enterprise: text('Multiple') },
      { feature: 'Transfers, adjustments & movements', lite: no, enterprise: yes },
    ],
  },
  {
    group: 'Money & accounting',
    rows: [
      { feature: 'Payments, expenses & accounts', lite: yes, enterprise: yes },
      { feature: 'Financial statements', lite: text('Essential'), enterprise: text('Full set') },
      { feature: 'Double-entry, chart of accounts & journals', lite: no, enterprise: yes },
    ],
  },
  {
    group: 'Team',
    rows: [
      { feature: 'HR, employees & payroll', lite: no, enterprise: yes },
      { feature: 'Roles, permissions & audit log', lite: no, enterprise: yes },
      { feature: 'AI assistant', lite: no, enterprise: yes },
    ],
  },
];
