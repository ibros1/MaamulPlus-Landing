import type { QA } from './faq';

export type ScreenKey =
  | 'dashboard'
  | 'sales'
  | 'customer'
  | 'finance'
  | 'cashflow'
  | 'people'
  | 'inventory'
  | 'accounts'
  | 'agents';

export type IconName =
  | 'book'
  | 'package'
  | 'receipt'
  | 'wallet'
  | 'route'
  | 'banknote'
  | 'file'
  | 'scale'
  | 'layers'
  | 'shield'
  | 'history'
  | 'calculator'
  | 'swap'
  | 'scan'
  | 'users'
  | 'printer'
  | 'smartphone'
  | 'coins'
  | 'check'
  | 'store'
  | 'truck'
  | 'tag'
  | 'warehouse'
  | 'chart'
  | 'sparkles'
  | 'landmark'
  | 'idcard'
  | 'building';

export interface Benefit {
  icon: IconName;
  title: string;
  body: string;
}

export interface DetailPage {
  slug: string;
  /** Short name used in navigation, footers and related links. */
  name: string;
  /** <title> before the " · MaamulPlus" template (≤ 47 chars). */
  title: string;
  /** Meta description, 140–160 characters. */
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  screen: ScreenKey;
  screenLabel: string;
  availability: 'enterprise' | 'both';
  availabilityNote: string;
  benefitsTitle: string;
  benefits: Benefit[];
  sections: { title: string; paragraphs: string[] }[];
  related: string[];
  faq: QA[];
}

export const features: DetailPage[] = [
  {
    slug: 'accounting',
    name: 'Accounting',
    title: 'Double-entry accounting software',
    description:
      'Double-entry accounting software for Somaliland traders: chart of accounts, journals posted automatically, trial balance and statements in USD and SLSH.',
    eyebrow: 'Accounting',
    h1: 'Every shilling, accounted for.',
    lead: 'MaamulPlus Enterprise is double-entry accounting software that keeps the books while you trade. Each sale, purchase, payment and payroll run posts its own journal to your chart of accounts, so the trial balance is ready whenever you ask for it.',
    screen: 'accounts',
    screenLabel:
      'The MaamulPlus chart of accounts: assets, liabilities, income and expenses with account codes, types and balances for Hargeisa Spare Parts.',
    availability: 'enterprise',
    availabilityNote:
      'Available in MaamulPlus Enterprise. MaamulPlus Lite keeps the essential statements without accounting terms.',
    benefitsTitle: 'Books that keep themselves.',
    benefits: [
      {
        icon: 'book',
        title: 'A chart of accounts that fits you',
        body: 'Start from a ready chart for trading businesses, then add your own banks, wallets and expense heads with your own codes.',
      },
      {
        icon: 'check',
        title: 'Posted automatically',
        body: 'Daily work posts its own balanced journal. No double typing, no end-of-month catch-up.',
      },
      {
        icon: 'file',
        title: 'Manual journals when needed',
        body: 'Your accountant can record accruals, corrections and opening balances with a clear reference and memo.',
      },
      {
        icon: 'scale',
        title: 'Trial balance on demand',
        body: 'Debits equal credits, every time. Check the trial balance for any period and any branch.',
      },
      {
        icon: 'chart',
        title: 'Statements in one click',
        body: 'Income statement, balance sheet and cash flow, filtered by period and branch, exported to PDF or CSV.',
      },
      {
        icon: 'history',
        title: 'A trail you can follow',
        body: 'Every journal line keeps the customer, branch and user, and links back to the invoice or payment behind it.',
      },
    ],
    sections: [
      {
        title: 'Real double-entry, without the extra work.',
        paragraphs: [
          'Most traders in Hargeisa keep two sets of records: the sales book at the counter and the accounts someone puts together later. The two rarely agree. MaamulPlus removes the second step. When a cashier writes a credit sale, the system debits accounts receivable, credits sales revenue, and moves the cost of the goods from inventory to cost of goods sold, all in the same moment.',
          'Because every entry is balanced at the source, the trial balance never needs fixing at the end of the month. Your accountant reviews instead of rebuilding.',
        ],
      },
      {
        title: 'Built around how money moves here.',
        paragraphs: [
          'Each cash drawer, bank account and mobile money wallet is its own account in the chart, with a code and a balance. Zaad Merchant and eDahab Merchant sit next to Premier Bank and the main cash drawer, so you can see exactly where the money is.',
          'Balances are kept in USD. When a customer pays in Somaliland shillings, the payment records the day’s rate, and the books show the USD value that was actually received. Old entries never change when the rate moves.',
        ],
      },
      {
        title: 'Ready for your accountant and your bank.',
        paragraphs: [
          'Close a period, run the statements and hand them over as PDF. Filter by branch to see which shop is profitable, or look at the whole business together. If a bank or partner asks for numbers, they are already there.',
        ],
      },
    ],
    related: ['reports', 'credit-and-payments', 'sales-and-invoicing'],
    faq: [
      {
        q: 'Do I need to know accounting to use it?',
        a: 'No. Daily work posts its own entries in the background. Accounting screens are there for the owner or accountant who wants them.',
      },
      {
        q: 'Can I import my opening balances?',
        a: 'Yes. During setup we import your opening balances for every account, customer and supplier so the books start correct.',
      },
      {
        q: 'Does it support more than one branch?',
        a: 'Yes. Every journal line records its branch, and every statement can be filtered by branch or shown for the whole business.',
      },
      {
        q: 'Can I export the books?',
        a: 'Yes. Journals, the trial balance and every statement export to CSV or PDF.',
      },
    ],
  },
  {
    slug: 'inventory',
    name: 'Inventory',
    title: 'Inventory management software Somaliland',
    description:
      'Inventory management software for Somaliland: stock levels per branch, transfers, adjustments, reorder alerts and unit conversions for wholesale and retail.',
    eyebrow: 'Inventory',
    h1: 'Stock you can trust, in every branch.',
    lead: 'MaamulPlus is inventory management software that knows what you have, where it is and what it cost. Sales and purchases move stock as they happen, and every transfer between branches is recorded on both sides.',
    screen: 'inventory',
    screenLabel:
      'The MaamulPlus stock screen: products with stock per branch, reorder levels, low stock warnings and stock value for a spare parts business.',
    availability: 'both',
    availabilityNote:
      'Products and stock levels are in both editions. Multiple branches, transfers and adjustments are in MaamulPlus Enterprise.',
    benefitsTitle: 'Know what is on the shelf.',
    benefits: [
      {
        icon: 'package',
        title: 'Stock that moves with sales',
        body: 'Each invoice reduces stock and each purchase adds it. No separate stock count to update.',
      },
      {
        icon: 'warehouse',
        title: 'Every branch, one view',
        body: 'See stock per branch side by side, or switch to one branch at a time.',
      },
      {
        icon: 'swap',
        title: 'Transfers on both sides',
        body: 'Send stock from the main store to a branch. It leaves one and arrives at the other with a reference.',
      },
      {
        icon: 'layers',
        title: 'Cartons and pieces',
        body: 'Buy by the carton, sell by the piece. Unit conversions keep the count right at both levels.',
      },
      {
        icon: 'tag',
        title: 'Reorder levels',
        body: 'Set a minimum for each product and see what is running low before a customer asks for it.',
      },
      {
        icon: 'file',
        title: 'Adjustments with a reason',
        body: 'Damaged, lost or found stock is adjusted with a reason and a user, so differences are explained.',
      },
    ],
    sections: [
      {
        title: 'Stock control without the notebook.',
        paragraphs: [
          'A spare parts shop can carry thousands of lines: filters, brake pads, belts, oils in several sizes. Counting by memory works until it does not. MaamulPlus keeps a running count for every product, updated by the same invoices and purchases your team already writes.',
          'Stock value is calculated from what you paid, so the dashboard shows the money sitting on your shelves next to the cash in your accounts.',
        ],
      },
      {
        title: 'Multi-branch inventory, accounted for.',
        paragraphs: [
          'With MaamulPlus Enterprise you can buy once for the whole business and send stock to each branch. A transfer is recorded as leaving the Main Branch and arriving at the Waaheen Branch, with the user and time. If the numbers differ on arrival, the adjustment is recorded with a reason.',
          'Owners can compare branches: which one sells the most of a product, where stock sits unused, and which branch needs a delivery this week.',
        ],
      },
      {
        title: 'Wholesale and retail units.',
        paragraphs: [
          'Set a product to be bought by the carton of 24 and sold by the piece, with a wholesale price and a retail price. The till picks the right price for the customer type, and stock is always counted in the smallest unit so nothing is lost in conversion.',
        ],
      },
    ],
    related: ['sales-and-invoicing', 'sales-agents', 'reports'],
    faq: [
      {
        q: 'Can I see stock for each branch?',
        a: 'Yes. Stock is kept per branch, and you can view all branches together or one at a time.',
      },
      {
        q: 'Does it warn me about low stock?',
        a: 'Yes. Set a reorder level per product and MaamulPlus lists everything that has fallen below it.',
      },
      {
        q: 'Can I sell by the piece and buy by the carton?',
        a: 'Yes. Unit conversions let you buy and sell in different units while keeping one accurate count.',
      },
      {
        q: 'How do I do a stock count?',
        a: 'Record the counted quantities and MaamulPlus creates adjustments for the differences, each with a reason.',
      },
    ],
  },
  {
    slug: 'sales-and-invoicing',
    name: 'Sales and invoicing',
    title: 'Invoicing and POS software for Hargeisa',
    description:
      'Invoicing and POS software for shops in Hargeisa: cash or credit invoices, quotations, returns and receipts that move stock and post to your books.',
    eyebrow: 'Sales and invoicing',
    h1: 'Invoices that move stock and post to your books.',
    lead: 'MaamulPlus is invoicing and sales management software built for the counter. Write a cash or credit invoice in seconds, take payment by cash, Zaad, eDahab or bank, and let stock and the books update themselves.',
    screen: 'sales',
    screenLabel:
      'The MaamulPlus sales list with invoice numbers, customers, branches, totals, balances and payment status for October.',
    availability: 'both',
    availabilityNote:
      'Sales, invoices and receipts are in both editions. Quotations, returns, held sales and barcode scanning are in MaamulPlus Enterprise.',
    benefitsTitle: 'Fast at the counter, right in the books.',
    benefits: [
      {
        icon: 'receipt',
        title: 'Cash or credit on every invoice',
        body: 'Take full payment, part payment or none. The balance is tracked to the cent against the customer.',
      },
      {
        icon: 'wallet',
        title: 'Pay any way',
        body: 'Cash, bank, Zaad, eDahab or Sahal. Each payment lands in the right account.',
      },
      {
        icon: 'printer',
        title: 'Print or share',
        body: 'A4 invoices, thermal receipts or PDF to send on WhatsApp.',
      },
      {
        icon: 'file',
        title: 'Quotations that become invoices',
        body: 'Send a quote, then turn it into an invoice with one click when the customer agrees.',
      },
      {
        icon: 'swap',
        title: 'Returns done properly',
        body: 'A sales return puts the stock back and reduces what the customer owes or refunds them.',
      },
      {
        icon: 'scan',
        title: 'Barcodes and held sales',
        body: 'Scan items, hold a sale while the customer decides, and serve the next person.',
      },
    ],
    sections: [
      {
        title: 'One invoice, everything updated.',
        paragraphs: [
          'When your cashier saves an invoice, three things happen. The stock for each item goes down in that branch. The customer’s balance goes up by whatever was not paid. And the sale, the payment and the cost of the goods are posted to the books. Nobody needs to copy the invoice into another register at the end of the day.',
          'The sales list shows every invoice with its branch, the person who sold it, the total, the balance and the payment status, so you can answer “who still owes us from last week?” in a few seconds.',
        ],
      },
      {
        title: 'A POS for how Hargeisa shops sell.',
        paragraphs: [
          'Prices are in USD and customers often pay in shillings. MaamulPlus shows the SLSH amount at the day’s rate and records the rate on the payment. A customer who pays half by Zaad and half in cash is one invoice with two payments, each in its own account.',
          'Walk-in customers do not need a record. Regular customers get credit limits that are checked before the invoice is saved, so the till warns you before credit goes too far.',
        ],
      },
      {
        title: 'Know how the day went.',
        paragraphs: [
          'The dashboard shows today’s takings, the number of invoices and how it compares with the same day last week. The sales summary report breaks it down by branch, by seller and by product.',
        ],
      },
    ],
    related: ['credit-and-payments', 'inventory', 'reports'],
    faq: [
      {
        q: 'Can I give a customer credit on an invoice?',
        a: 'Yes. Any invoice can be fully paid, partly paid or on credit. The balance is added to the customer’s statement.',
      },
      {
        q: 'Does it work with a receipt printer?',
        a: 'Yes. Print to a standard thermal receipt printer or an A4 printer, or save the invoice as a PDF.',
      },
      {
        q: 'Can I take payment in SLSH?',
        a: 'Yes. Accept shillings at the day’s rate. The rate is saved on the payment so the history never changes.',
      },
      {
        q: 'Can I see sales per cashier?',
        a: 'Yes. Every invoice records who sold it, and the sales summary groups totals by seller and branch.',
      },
    ],
  },
  {
    slug: 'credit-and-payments',
    name: 'Credit and payments',
    title: 'Customer credit and mobile money accounts',
    description:
      'Customer credit management with limits, statements and reminders, plus mobile money accounting for Zaad, eDahab and Sahal alongside cash and bank.',
    eyebrow: 'Credit and payments',
    h1: 'Customer credit under control.',
    lead: 'MaamulPlus tracks customer credit the way a careful shopkeeper would: a limit for each customer, a clear statement of every invoice and payment, and mobile money accounting for Zaad, eDahab and Sahal next to your cash and bank.',
    screen: 'customer',
    screenLabel:
      'A MaamulPlus customer page for Jamac Ahmed with balance owed, credit limit used, last payment by Zaad and a statement of invoices and payments.',
    availability: 'both',
    availabilityNote: 'Customer credit, statements and mobile money accounts are in both editions.',
    benefitsTitle: 'Know who owes what, and why.',
    benefits: [
      {
        icon: 'shield',
        title: 'Credit limits at the till',
        body: 'Set a limit per customer. The invoice warns before a sale takes them over it.',
      },
      {
        icon: 'file',
        title: 'A statement for every customer',
        body: 'Every invoice and payment, in date order, with the running balance. Print it or share it as PDF.',
      },
      {
        icon: 'smartphone',
        title: 'Zaad, eDahab and Sahal as accounts',
        body: 'Each merchant wallet has its own balance, so you always know where the money landed.',
      },
      {
        icon: 'coins',
        title: 'USD and SLSH',
        body: 'Balances stay in USD. Payments in shillings record the day’s rate.',
      },
      {
        icon: 'history',
        title: 'Oldest debt first',
        body: 'See how long each invoice has been unpaid and who to call today.',
      },
      {
        icon: 'truck',
        title: 'What you owe, too',
        body: 'Supplier bills and payments are tracked the same way, so you see money owed in both directions.',
      },
    ],
    sections: [
      {
        title: 'Credit without the notebook.',
        paragraphs: [
          'Selling on credit is part of trade in Somaliland. The trouble starts when the record is a notebook under the counter. Pages get lost, amounts are written twice, and nobody is sure whether last Tuesday’s payment was recorded. MaamulPlus keeps one statement per customer, built from the invoices and payments themselves.',
          'When Jamac Ahmed asks how much he owes, you open his page and see $207.18 on one open invoice, his last payment of $200.00 by Zaad on October 12, and that he has used 52% of his $400.00 limit.',
        ],
      },
      {
        title: 'Mobile money accounting that matches your wallet.',
        paragraphs: [
          'Each Zaad, eDahab or Sahal merchant number is an account in MaamulPlus with its own balance. When a customer pays by mobile money, the cashier picks the wallet and the balance moves. At the end of the day the balance on screen should match the balance on the phone, and if it does not, you know which day to check.',
          'Transfers between accounts, such as moving money from Zaad to the bank, are recorded as transfers, not as income, so your reports stay honest.',
        ],
      },
      {
        title: 'Owed both ways.',
        paragraphs: [
          'The finance dashboard shows what customers owe you and what you owe suppliers side by side, with staff advances alongside. It is the clearest picture of the money that is yours but not yet in your hands.',
        ],
      },
    ],
    related: ['sales-and-invoicing', 'accounting', 'reports'],
    faq: [
      {
        q: 'Can I set a different credit limit for each customer?',
        a: 'Yes. Each customer has their own limit, and the till checks it before saving a credit invoice.',
      },
      {
        q: 'Can a customer pay part of what they owe?',
        a: 'Yes. Record any amount. It is applied to the oldest open invoices first, or to the invoice you choose.',
      },
      {
        q: 'How are Zaad and eDahab recorded?',
        a: 'Each merchant wallet is an account with its own balance. Payments and transfers move money in and out of it.',
      },
      {
        q: 'Can I send a customer their statement?',
        a: 'Yes. Print the statement or share it as a PDF, for any date range.',
      },
    ],
  },
  {
    slug: 'sales-agents',
    name: 'Sales agents',
    title: 'Sales agent and van sales tracking',
    description:
      'Sales agent tracking software for van sales and field teams in Somaliland: stock out, sales, returns and cash settled per session, with every item counted.',
    eyebrow: 'Sales agents',
    h1: 'Agents in the field, every item accounted for.',
    lead: 'MaamulPlus Enterprise gives each sales agent a session: the stock they take out, the sales they make to known customers, what they bring back and the money they hand in. When the session closes, every item and every dollar is accounted for.',
    screen: 'agents',
    screenLabel:
      'A MaamulPlus sales agent session for Sahra Aden: items taken out, sold and returned, and cash, Zaad and credit collected on the route.',
    availability: 'enterprise',
    availabilityNote: 'Available in MaamulPlus Enterprise.',
    benefitsTitle: 'Van sales without the guesswork.',
    benefits: [
      {
        icon: 'route',
        title: 'A session per trip',
        body: 'Open a session with the stock the agent takes. Close it when they return.',
      },
      {
        icon: 'users',
        title: 'Known customers only',
        body: 'Agents sell to customers on their route, with the same credit limits as the shop.',
      },
      {
        icon: 'package',
        title: 'Out, sold, returned',
        body: 'For each item: how many went out, how many were sold and how many came back.',
      },
      {
        icon: 'wallet',
        title: 'Money settled',
        body: 'Cash, mobile money and credit collected on the route are settled into the right accounts.',
      },
      {
        icon: 'chart',
        title: 'Performance by agent',
        body: 'Compare agents by sales, returns and collections over any period.',
      },
    ],
    sections: [
      {
        title: 'The problem with van sales.',
        paragraphs: [
          'Wholesalers in Hargeisa send agents out with cartons of stock to shops across the city and beyond. At the end of the day, someone needs to match what went out against what was sold, what came back and the money handed in. On paper this takes hours and leaves gaps that are hard to explain.',
          'MaamulPlus turns each trip into a session. Opening it moves stock from the warehouse to the agent. Each sale on the route is a normal invoice to a known customer. Closing it returns the unsold stock and settles the money.',
        ],
      },
      {
        title: 'Every item, every dollar.',
        paragraphs: [
          'A closed session shows a simple equation for every product: out equals sold plus returned. If a carton is missing, it shows up straight away against the agent and the session, not weeks later in a stock count.',
          'Money is settled the same way. Cash goes to the cash account, Zaad payments to the Zaad wallet, and credit sales to each customer’s balance. Agent advances and shortages are recorded against the agent.',
        ],
      },
      {
        title: 'Better routes over time.',
        paragraphs: [
          'Because every session is recorded, you can see which routes sell, which products come back, and which agents collect well. That is the information you need to plan stock and set targets.',
        ],
      },
      {
        title: 'Getting started with agents.',
        paragraphs: [
          'Most distributors start with one or two agents and a short list of route customers. During setup we add your agents as users with the agent role, link each one to the customers on their route and set their credit limits. On the first day, each agent opens a session, takes stock out and starts selling from a phone or tablet.',
          'Agents only see what they need: their own session, their customers and the products they carry. Owners and supervisors see every session, open or closed, with the shortages and collections of each.',
        ],
      },
    ],
    related: ['inventory', 'credit-and-payments', 'hr-payroll'],
    faq: [
      {
        q: 'Can an agent sell on credit?',
        a: 'Yes, to known customers within their credit limit. The balance is added to the customer’s statement.',
      },
      {
        q: 'What happens to stock the agent brings back?',
        a: 'Returned stock goes back into the branch when the session closes, and the count per item is recorded.',
      },
      {
        q: 'Can I run several agents at once?',
        a: 'Yes. Each agent has their own session, and you can see all open sessions together.',
      },
    ],
  },
  {
    slug: 'hr-payroll',
    name: 'HR and payroll',
    title: 'Payroll software Somaliland',
    description:
      'Payroll software for Somaliland businesses: employees, salaries, advances and deductions, with payroll paid from the right account and posted to the books.',
    eyebrow: 'HR and payroll',
    h1: 'Payroll in one step.',
    lead: 'MaamulPlus Enterprise keeps your employees, salaries, advances and deductions in one place. Run payroll for the month in one step, pay from the right cash, bank or mobile money account, and the books are posted automatically.',
    screen: 'people',
    screenLabel:
      'The MaamulPlus People dashboard with the monthly salary bill, headcount by department and payroll status for each employee.',
    availability: 'enterprise',
    availabilityNote: 'Available in MaamulPlus Enterprise.',
    benefitsTitle: 'Staff costs, clear and on time.',
    benefits: [
      {
        icon: 'users',
        title: 'Employees and roles',
        body: 'Each employee with their branch, role, salary and start date.',
      },
      {
        icon: 'banknote',
        title: 'One-step payroll',
        body: 'Run the month’s payroll, review it and pay everyone from the account you choose.',
      },
      {
        icon: 'coins',
        title: 'Advances recovered',
        body: 'Advances are deducted from the next payslip automatically, so nothing is forgotten.',
      },
      {
        icon: 'calculator',
        title: 'Deductions and bonuses',
        body: 'Add deductions, bonuses and overtime per employee per month.',
      },
      { icon: 'printer', title: 'Payslips', body: 'Print or share a payslip for each employee.' },
      {
        icon: 'book',
        title: 'Posted to the books',
        body: 'Salaries, advances and payments post to the right expense and liability accounts.',
      },
    ],
    sections: [
      {
        title: 'Why payroll belongs in the same system.',
        paragraphs: [
          'Salaries are one of the largest costs in a trading business. When payroll is kept in a separate spreadsheet, the cash account and the books never quite agree. MaamulPlus runs payroll from the same records as the rest of the business, so paying staff moves money out of a real account and shows up in the cash flow report.',
          'The People dashboard shows the monthly salary bill, active staff, headcount by department and the payroll status of each person for the month.',
        ],
      },
      {
        title: 'Advances, handled properly.',
        paragraphs: [
          'Staff advances are common, and easy to lose track of. In MaamulPlus an advance is paid from an account and recorded against the employee. At the next payroll run it is deducted automatically, and the payslip shows it clearly.',
          'Outstanding advances appear on the finance dashboard next to what customers owe you, so the owner always sees the full picture.',
        ],
      },
      {
        title: 'Clear for staff, clear for you.',
        paragraphs: [
          'Each employee gets a payslip with their salary, deductions, advances and net pay. You get a payroll summary per branch and a full history for every person.',
        ],
      },
      {
        title: 'From the first employee to the whole team.',
        paragraphs: [
          'Setup is quick: add each employee with their branch, role, salary and start date, record any advances that are already outstanding, and choose the accounts you usually pay salaries from. The first payroll run then takes a few minutes.',
          'Each month MaamulPlus lists everyone due to be paid, with deductions, bonuses and advance recoveries already applied. You check the list, adjust anything that changed and confirm. Salaries are paid from the chosen cash, bank or mobile money account, payslips are ready to print or share, and the salary expense appears in the income statement for that month.',
          'When someone leaves, their history stays on record, so you can always answer questions about past pay.',
        ],
      },
    ],
    related: ['accounting', 'reports', 'sales-agents'],
    faq: [
      {
        q: 'Can I pay salaries by Zaad or bank?',
        a: 'Yes. Choose the account to pay from when you run payroll, or pay different employees from different accounts.',
      },
      {
        q: 'How are salary advances recovered?',
        a: 'The advance is recorded against the employee and deducted from the next payroll automatically.',
      },
      {
        q: 'Can I see payroll per branch?',
        a: 'Yes. Every employee belongs to a branch, and payroll reports can be filtered by branch.',
      },
    ],
  },
  {
    slug: 'reports',
    name: 'Reports',
    title: 'Cash flow, income statement and balance sheet',
    description:
      'Cash flow report, income statement and balance sheet software for Somaliland traders. Filter by period and branch and export to PDF or CSV in one click.',
    eyebrow: 'Reports',
    h1: 'Statements on demand.',
    lead: 'MaamulPlus produces the reports a business owner actually reads: a cash flow report that explains where money came from and went, an income statement that shows profit, and a balance sheet that shows what the business owns and owes.',
    screen: 'cashflow',
    screenLabel:
      'The MaamulPlus cash flow report with opening balance, cash in, cash out and closing balance, cash movement by source and the top accounts.',
    availability: 'both',
    availabilityNote:
      'Essential statements are in both editions. The full set, including the trial balance and journal reports, is in MaamulPlus Enterprise.',
    benefitsTitle: 'Numbers you can act on.',
    benefits: [
      {
        icon: 'banknote',
        title: 'Cash flow',
        body: 'Opening, money in, money out and closing, classified by what brought money in or took it out.',
      },
      {
        icon: 'chart',
        title: 'Income statement',
        body: 'Sales, cost of goods, expenses and profit for any period.',
      },
      {
        icon: 'scale',
        title: 'Balance sheet',
        body: 'What the business owns, what it owes and what is left for the owner.',
      },
      { icon: 'receipt', title: 'Sales summary', body: 'Sales by branch, by seller and by product.' },
      {
        icon: 'store',
        title: 'By branch',
        body: 'Every report filters by branch, or shows all branches together.',
      },
      {
        icon: 'file',
        title: 'PDF and CSV',
        body: 'Export any report to share with a partner, bank or accountant.',
      },
    ],
    sections: [
      {
        title: 'The cash flow report, explained.',
        paragraphs: [
          'For a trader, cash is what matters day to day. The MaamulPlus cash flow report starts with the opening balance across every cash, bank and mobile money account, adds what came in, subtracts what went out and arrives at the closing balance, which matches what is in the accounts now.',
          'In October, Hargeisa Spare Parts opened with $1,750.73, took in $9,820.40, paid out $4,135.10 and closed with $7,436.03. The report shows each source: cash sales, customer payments, deposits, purchases, supplier payments, expenses and payroll.',
        ],
      },
      {
        title: 'Profit and position.',
        paragraphs: [
          'The income statement answers “did we make money this month?” by setting sales against the cost of the goods sold and your expenses. The balance sheet answers “what is the business worth?” by listing cash, stock and money owed to you against what you owe.',
          'Both come straight from the books, so they are always up to date. No exporting to a spreadsheet and adding up by hand.',
        ],
      },
      {
        title: 'Filter, compare, share.',
        paragraphs: [
          'Pick any period, choose one branch or all of them, and export to PDF or CSV. Compare this month with last month, or one branch with another, in a few clicks.',
        ],
      },
      {
        title: 'Reports your partners and bank understand.',
        paragraphs: [
          'Many traders in Hargeisa are asked for numbers by a business partner, a family investor or a bank. MaamulPlus statements follow the standard layout an accountant expects, with your business name, the period and the branch on every page, so you can share them as they are.',
          'Because every figure links back to the invoices and payments behind it, you can answer follow-up questions in the meeting instead of promising to check later.',
        ],
      },
    ],
    related: ['accounting', 'credit-and-payments', 'inventory'],
    faq: [
      {
        q: 'Can I get reports for one branch?',
        a: 'Yes. Every report can be filtered by branch or shown for the whole business.',
      },
      {
        q: 'Which reports are in MaamulPlus Lite?',
        a: 'Lite includes the sales summary, cash flow, income statement and balance sheet in plain language. Enterprise adds the trial balance and journal reports.',
      },
      {
        q: 'Can I export to Excel?',
        a: 'Yes. Export any report to CSV, which opens in Excel or Google Sheets, or to PDF.',
      },
    ],
  },
];

export const featureBySlug = (slug: string): DetailPage | undefined => features.find((f) => f.slug === slug);
