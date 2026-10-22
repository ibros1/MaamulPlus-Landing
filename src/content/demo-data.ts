/**
 * One sample dataset for every coded product screen, so the numbers agree everywhere.
 * A spare parts business in Hargeisa on Friday, October 23. Amounts are USD.
 * tests/demo-data.test.ts asserts that the headline figures add up.
 */

export type PillTone = 'ok' | 'due' | 'part' | 'info' | 'out';

export const business = {
  name: 'Hargeisa Spare Parts',
  initials: 'HS',
  branches: ['Main Branch', 'Waaheen Branch'] as const,
  user: { name: 'Ibrahim Mohamed', firstName: 'Ibrahim', initials: 'IM', role: 'Administrator' },
  today: 'Friday, October 23',
  todayShort: 'Oct 23, 2026',
  rate: '1 USD = 11,000 SLSH',
  footer: '© 2026 Hargeisa Spare Parts · MaamulPlus',
} as const;

export interface CashAccount {
  name: string;
  code: string;
  kind: 'Cash' | 'Bank' | 'Mobile money';
  /** Share of transactions this month, for the bar. */
  share: number;
  balance: number;
}

export const cashAccounts: CashAccount[] = [
  { name: 'Cash — Main Branch', code: '1010', kind: 'Cash', share: 62, balance: 4612.0 },
  { name: 'Main cash drawer', code: '1020', kind: 'Cash', share: 8, balance: 596.03 },
  { name: 'Premier Bank', code: '1031', kind: 'Bank', share: 14, balance: 1040.0 },
  { name: 'Salaam Bank', code: '1032', kind: 'Bank', share: 6, balance: 420.0 },
  { name: 'Zaad Merchant', code: '1041', kind: 'Mobile money', share: 7, balance: 512.0 },
  { name: 'eDahab Merchant', code: '1042', kind: 'Mobile money', share: 3, balance: 256.0 },
];

export const totals = {
  cashOnHand: 7436.03,
  creditOutstanding: 1284.36,
  creditInvoices: 9,
  monthRevenue: 24650.06,
  monthInvoices: 128,
  todayTakings: 1284.5,
  todayInvoices: 14,
  todayDelta: '+12.4%',
  stockValue: 17979.1,
  lowStockLines: 4,
  monthIn: 9820.4,
  monthOut: 4135.1,
  opening: 1750.73,
  expenses: 640.0,
  receiptsThisMonth: 42,
  paymentsThisMonth: 17,
  owedToSuppliers: 2310.0,
  supplierBills: 3,
  staffAdvances: 300.0,
  openAdvances: 2,
} as const;

/** Money in, by source, this month. Sums to totals.monthIn. */
export const cashInBySource = [
  { name: 'Sales (cash)', amount: 5200.4 },
  { name: 'Customer payments', amount: 3620.0 },
  { name: 'Deposits', amount: 1000.0 },
] as const;

/** Money out, by use, this month. Sums to totals.monthOut. */
export const cashOutByUse = [
  { name: 'Purchases (cash)', amount: 345.1 },
  { name: 'Supplier payments', amount: 300.0 },
  { name: 'Expenses', amount: 640.0 },
  { name: 'Payroll', amount: 2850.0 },
] as const;

export const topAccountsFlow = [
  { label: '1010 · Cash — Main Branch', opening: 1100.0, moneyIn: 6400.0, moneyOut: 2888.0, closing: 4612.0 },
  { label: '1031 · Premier Bank', opening: 300.0, moneyIn: 1900.0, moneyOut: 1160.0, closing: 1040.0 },
  { label: '1041 · Zaad Merchant', opening: 100.0, moneyIn: 980.0, moneyOut: 568.0, closing: 512.0 },
] as const;

/** Daily takings for the last 14 trading days (hundreds of USD), drawn on the dashboard chart. */
export const takingsTrend = [8, 6, 7, 4, 9, 12, 10, 7, 14, 16, 11, 13, 18, 21] as const;

/** In/out bars on the finance chart (relative units). */
export const financeBars: readonly (readonly [number, number])[] = [
  [3, 1], [5, 2], [2, 1], [6, 3], [4, 2], [7, 2], [5, 4], [8, 3], [6, 2], [9, 3], [7, 5], [10, 4],
];

export interface SaleRow {
  number: string;
  customer: string;
  branch: string;
  soldBy: string;
  date: string;
  time: string;
  total: number;
  balance: number;
  payment: { tone: PillTone; label: string };
}

export const recentSales: SaleRow[] = [
  { number: 'INV-000214', customer: 'Abdi Ahmed', branch: 'Main Branch', soldBy: 'Ibrahim M.', date: 'Oct 23, 2026', time: '03:21 PM', total: 950.0, balance: 520.0, payment: { tone: 'part', label: 'Partly paid' } },
  { number: 'INV-000213', customer: 'Walk-in', branch: 'Main Branch', soldBy: 'Khadar F.', date: 'Oct 23, 2026', time: '02:48 PM', total: 186.0, balance: 0, payment: { tone: 'ok', label: 'Paid' } },
  { number: 'INV-000212', customer: 'Omar Trading', branch: 'Waaheen Branch', soldBy: 'Ibrahim M.', date: 'Oct 23, 2026', time: '11:05 AM', total: 1420.0, balance: 0, payment: { tone: 'ok', label: 'Paid' } },
  { number: 'INV-000211', customer: 'Jamac Ahmed', branch: 'Main Branch', soldBy: 'Khadar F.', date: 'Oct 22, 2026', time: '05:12 PM', total: 207.18, balance: 207.18, payment: { tone: 'due', label: 'Credit' } },
  { number: 'INV-000210', customer: 'Walk-in', branch: 'Waaheen Branch', soldBy: 'Sahra A.', date: 'Oct 22, 2026', time: '01:40 PM', total: 64.5, balance: 0, payment: { tone: 'ok', label: 'Paid' } },
  { number: 'INV-000209', customer: 'Hodan Motors', branch: 'Main Branch', soldBy: 'Ibrahim M.', date: 'Oct 22, 2026', time: '10:02 AM', total: 3800.0, balance: 0, payment: { tone: 'ok', label: 'Paid' } },
  { number: 'INV-000208', customer: 'Abdi Ahmed', branch: 'Main Branch', soldBy: 'Khadar F.', date: 'Oct 21, 2026', time: '04:30 PM', total: 910.0, balance: 0, payment: { tone: 'ok', label: 'Paid' } },
  { number: 'INV-000207', customer: 'Ayaan Garage', branch: 'Waaheen Branch', soldBy: 'Sahra A.', date: 'Oct 21, 2026', time: '09:15 AM', total: 1250.0, balance: 300.0, payment: { tone: 'part', label: 'Partly paid' } },
];

export const customer = {
  name: 'Jamac Ahmed',
  initials: 'JA',
  phone: '+252 63 441 2290',
  email: 'jamac.ahmed@hargeisa.so',
  branch: 'Main Branch',
  owes: 207.18,
  openInvoice: 'INV-000211',
  creditLimit: 400.0,
  paidToDate: 1857.4,
  invoices: 12,
  averageInvoice: 281.9,
  lastPayment: { amount: 200.0, date: 'Oct 12', via: 'Zaad' },
  statement: [
    { doc: 'INV-000211', date: 'Oct 22, 2026', total: 207.18, paid: 0, balance: 207.18, tone: 'due', label: 'Unpaid' },
    { doc: 'INV-000196', date: 'Oct 14, 2026', total: 480.0, paid: 480.0, balance: 0, tone: 'ok', label: 'Paid' },
    { doc: 'PAY-000088', date: 'Oct 12, 2026', total: null, paid: 200.0, balance: null, tone: 'info', label: 'Payment · Zaad' },
    { doc: 'INV-000181', date: 'Oct 05, 2026', total: 320.0, paid: 320.0, balance: 0, tone: 'ok', label: 'Paid' },
    { doc: 'INV-000170', date: 'Sep 28, 2026', total: 150.0, paid: 150.0, balance: 0, tone: 'ok', label: 'Paid' },
    { doc: 'INV-000152', date: 'Sep 19, 2026', total: 612.4, paid: 612.4, balance: 0, tone: 'ok', label: 'Paid' },
    { doc: 'INV-000140', date: 'Sep 11, 2026', total: 95.0, paid: 95.0, balance: 0, tone: 'ok', label: 'Paid' },
  ] as { doc: string; date: string; total: number | null; paid: number; balance: number | null; tone: PillTone; label: string }[],
} as const;

export const payroll = {
  monthlyBill: 3450.0,
  activeStaff: 10,
  newHires: 1,
  paidThisMonth: 2850.0,
  deductions: 120.0,
  advancesOwed: 300.0,
  departments: [
    { name: 'Sales', count: 4 },
    { name: 'Store', count: 3 },
    { name: 'Delivery', count: 2 },
    { name: 'Finance', count: 1 },
  ],
  employees: [
    { name: 'Khadar Farah', role: 'Cashier', branch: 'Main Branch', salary: 350.0, tone: 'ok', label: 'Paid' },
    { name: 'Sahra Aden', role: 'Sales', branch: 'Waaheen Branch', salary: 380.0, tone: 'ok', label: 'Paid' },
    { name: 'Mohamed Yusuf', role: 'Store keeper', branch: 'Main Branch', salary: 320.0, tone: 'part', label: 'Advance' },
    { name: 'Ayaan Ali', role: 'Accountant', branch: 'Main Branch', salary: 520.0, tone: 'ok', label: 'Paid' },
    { name: 'Liban Hassan', role: 'Driver', branch: 'Main Branch', salary: 280.0, tone: 'info', label: 'Pending' },
  ] as { name: string; role: string; branch: string; salary: number; tone: PillTone; label: string }[],
} as const;

/** Journal for the credit sale INV-000214, shown in the accounting section. */
export const journal = {
  ref: 'INV-000214',
  title: 'Credit sale to Abdi Ahmed',
  lines: [
    { code: '1200', account: 'Accounts receivable', debit: 950.0, credit: 0 },
    { code: '4000', account: 'Sales revenue', debit: 0, credit: 950.0 },
    { code: '5000', account: 'Cost of goods sold', debit: 612.4, credit: 0 },
    { code: '1300', account: 'Inventory', debit: 0, credit: 612.4 },
  ],
} as const;

export const products = [
  { sku: 'BRK-PAD-HLX', name: 'Brake pads, Hilux (set)', main: 46, waaheen: 12, reorder: 20, cost: 18.5, unit: 'set' },
  { sku: 'OIL-5W30-4L', name: 'Engine oil 5W-30, 4 L', main: 120, waaheen: 48, reorder: 60, cost: 14.2, unit: 'can' },
  { sku: 'FLT-OIL-TYT', name: 'Oil filter, Toyota', main: 9, waaheen: 3, reorder: 25, cost: 3.1, unit: 'piece' },
  { sku: 'BAT-70AH', name: 'Battery 70 Ah', main: 14, waaheen: 6, reorder: 8, cost: 62.0, unit: 'piece' },
  { sku: 'TYR-195-65', name: 'Tyre 195/65 R15', main: 32, waaheen: 2, reorder: 12, cost: 41.0, unit: 'piece' },
  { sku: 'SPK-NGK-4', name: 'Spark plugs NGK (box of 4)', main: 5, waaheen: 0, reorder: 10, cost: 7.8, unit: 'box' },
  { sku: 'BLT-TMG-NVS', name: 'Timing belt, Noah', main: 11, waaheen: 4, reorder: 6, cost: 22.4, unit: 'piece' },
] as const;

export const chartOfAccounts = [
  { code: '1000', name: 'Assets', type: 'Group', balance: null, level: 0 },
  { code: '1010', name: 'Cash — Main Branch', type: 'Cash', balance: 4612.0, level: 1 },
  { code: '1031', name: 'Premier Bank', type: 'Bank', balance: 1040.0, level: 1 },
  { code: '1041', name: 'Zaad Merchant', type: 'Mobile money', balance: 512.0, level: 1 },
  { code: '1200', name: 'Accounts receivable', type: 'Receivable', balance: 1284.36, level: 1 },
  { code: '1300', name: 'Inventory', type: 'Stock', balance: 17979.1, level: 1 },
  { code: '2000', name: 'Liabilities', type: 'Group', balance: null, level: 0 },
  { code: '2100', name: 'Accounts payable', type: 'Payable', balance: 2310.0, level: 1 },
  { code: '4000', name: 'Sales revenue', type: 'Income', balance: 24650.06, level: 0 },
  { code: '5000', name: 'Cost of goods sold', type: 'Expense', balance: 15902.3, level: 0 },
  { code: '6100', name: 'Rent and utilities', type: 'Expense', balance: 640.0, level: 0 },
] as const;

export const agentSession = {
  agent: 'Sahra Aden',
  route: 'Gacan Libaax · Jigjiga Yar',
  opened: '07:40 AM',
  status: 'Open',
  lines: [
    { item: 'Engine oil 5W-30, 4 L', out: 24, sold: 18, returned: 6 },
    { item: 'Oil filter, Toyota', out: 30, sold: 26, returned: 4 },
    { item: 'Brake pads, Hilux (set)', out: 10, sold: 6, returned: 4 },
    { item: 'Spark plugs NGK (box of 4)', out: 12, sold: 9, returned: 3 },
  ],
  collected: { cash: 412.0, zaad: 236.5, credit: 180.0 },
} as const;

export const money = (n: number): string =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const sum = (xs: readonly number[]): number => Math.round(xs.reduce((a, b) => a + b, 0) * 100) / 100;
