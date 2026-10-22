import type { Edition } from '@/lib/schemas';
import type { Benefit, ScreenKey } from './features';
import { enterpriseFaq, liteFaq, type QA } from './faq';

export interface EditionPage {
  edition: Edition;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  screen: ScreenKey;
  screenLabel: string;
  modulesTitle: string;
  modulesLead: string;
  modules: (Benefit & { href?: string })[];
  sections: { title: string; paragraphs: string[] }[];
  faq: QA[];
}

export const editionPages: Record<Edition, EditionPage> = {
  enterprise: {
    edition: 'enterprise',
    title: 'MaamulPlus Enterprise: ERP software',
    description:
      'MaamulPlus Enterprise is ERP software for Somaliland: double-entry accounting, multi-branch inventory, sales agents, payroll and an audit log in USD and SLSH.',
    eyebrow: 'MaamulPlus Enterprise',
    h1: 'MaamulPlus Enterprise: full accounting for growing businesses.',
    lead: 'ERP software for Somaliland traders with branches, agents and staff. Double-entry accounting, multi-branch inventory, sales agents, payroll, roles and an audit log, all in USD and SLSH and built around Zaad, eDahab and your bank.',
    screen: 'finance',
    screenLabel:
      'The MaamulPlus Enterprise finance dashboard with cash position across cash, bank and mobile money accounts, money in and out this month and money owed both ways.',
    modulesTitle: 'Everything in Lite, plus the depth to grow.',
    modulesLead: 'Each module works on the same records, so a sale, a transfer or a payroll run updates stock, money and the books at once.',
    modules: [
      { icon: 'book', title: 'Double-entry accounting', body: 'Chart of accounts, automatic journals, manual journals and the trial balance.', href: '/features/accounting' },
      { icon: 'warehouse', title: 'Multi-branch stock', body: 'Stock per branch, transfers with a reference on both sides, adjustments with a reason.', href: '/features/inventory' },
      { icon: 'route', title: 'Sales agents & sessions', body: 'Stock out, sales, returns and money in, settled item by item for every trip.', href: '/features/sales-agents' },
      { icon: 'banknote', title: 'HR & payroll', body: 'Employees, payroll runs, advances recovered from the next payslip.', href: '/features/hr-payroll' },
      { icon: 'shield', title: 'Roles, permissions & audit log', body: 'Decide who sees what in each branch. Every action is logged with user, device and time.' },
      { icon: 'sparkles', title: 'AI assistant', body: 'Ask in plain words: which products are low, who owes the most, how this week compares.' },
      { icon: 'scan', title: 'Faster at the counter', body: 'Barcodes, held sales, quotations and returns.', href: '/features/sales-and-invoicing' },
      { icon: 'chart', title: 'The full set of statements', body: 'Trial balance, income statement, balance sheet and cash flow by period and branch.', href: '/features/reports' },
      { icon: 'smartphone', title: 'Zaad, eDahab and Sahal', body: 'Each wallet is an account with its own balance.', href: '/features/credit-and-payments' },
    ],
    sections: [
      {
        title: 'One system for every branch.',
        paragraphs: [
          'Growing traders in Hargeisa often run a main store, a second shop and a warehouse, with agents on the road and a team on payroll. Each part usually has its own notebook or spreadsheet. MaamulPlus Enterprise brings them into one system, so the owner sees every branch on one screen and each branch manager sees their own.',
          'Stock moves between branches with a transfer that is recorded on both sides. Cash, bank and mobile money accounts belong to a branch, and every report filters by branch or shows the whole business.',
        ],
      },
      {
        title: 'Real books, kept for you.',
        paragraphs: [
          'Every sale, purchase, payment, transfer and payroll run posts a balanced journal to your chart of accounts. Your accountant reviews the trial balance instead of building it, and the income statement and balance sheet are ready for any period.',
          'Balances are in USD and payments in SLSH record the day’s rate, so history never changes when the rate moves.',
        ],
      },
      {
        title: 'Control without slowing the counter.',
        paragraphs: [
          'Roles decide who can give discounts, sell on credit, edit prices or see reports, per branch. The audit log records who did what, on which device and when. The counter stays fast because the rules are checked in the background.',
        ],
      },
    ],
    faq: enterpriseFaq,
  },
  lite: {
    edition: 'lite',
    title: 'MaamulPlus Lite: small business software',
    description:
      'MaamulPlus Lite is small business software for Somaliland: simple sales, stock and invoicing, customer credit, payments and statements, without the jargon.',
    eyebrow: 'MaamulPlus Lite',
    h1: 'MaamulPlus Lite: the essentials, without the jargon.',
    lead: 'Small business software for shops and traders in Somaliland. Simple sales and stock, invoicing that works at the counter in Hargeisa, customer credit, payments and the statements a small business needs, in plain language.',
    screen: 'dashboard',
    screenLabel:
      'The MaamulPlus Lite dashboard with takings today, sales this month, credit outstanding, stock value and cash on hand for a shop in Hargeisa.',
    modulesTitle: 'Focused on what a shop needs.',
    modulesLead: 'Six modules that cover the whole day, from the first sale to the last payment, without accounting terms.',
    modules: [
      { icon: 'receipt', title: 'Sales & invoices', body: 'Cash or credit, printed or shared as PDF. Stock moves with every sale.', href: '/features/sales-and-invoicing' },
      { icon: 'truck', title: 'Purchases', body: 'Record what you buy and from whom. Stock goes up and you see what you owe.' },
      { icon: 'package', title: 'Products & stock', body: 'Stock levels, reorder alerts and the value of what is on the shelf.', href: '/features/inventory' },
      { icon: 'users', title: 'Customers & vendors', body: 'Credit limits, statements and balances for everyone you trade with.', href: '/features/credit-and-payments' },
      { icon: 'wallet', title: 'Payments & expenses', body: 'Cash, bank, Zaad, eDahab and Sahal, each with its own balance.' },
      { icon: 'chart', title: 'Accounts & statements', body: 'Cash flow, income statement and balance sheet in plain words.', href: '/features/reports' },
    ],
    sections: [
      {
        title: 'Simple, not basic.',
        paragraphs: [
          'MaamulPlus Lite is built for one shop or a small trading business that wants clean records and clear numbers. It uses everyday words: money in, money out, what customers owe and what you owe suppliers. There are no debits, credits or journals to learn.',
          'Behind the plain words, the books are kept correctly. When you need an income statement or a balance sheet for a partner or a bank, it is ready.',
        ],
      },
      {
        title: 'Credit and mobile money, handled.',
        paragraphs: [
          'Most shops in Hargeisa sell on credit to regular customers and take payment by Zaad and eDahab. Lite gives each customer a credit limit and a statement, and each mobile money wallet its own balance, so the notebook under the counter can retire.',
        ],
      },
      {
        title: 'Ready when you grow.',
        paragraphs: [
          'When you open a second branch, send agents on the road or put staff on payroll, move to MaamulPlus Enterprise. Your products, customers and history come with you, and your team keeps the screens they know.',
        ],
      },
    ],
    faq: liteFaq,
  },
};
