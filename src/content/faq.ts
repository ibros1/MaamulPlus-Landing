/** FAQ content. The same arrays render the visible FAQ and the FAQPage JSON-LD, so the text always matches. */

export interface QA {
  q: string;
  a: string;
}

export const homeFaq: QA[] = [
  {
    q: 'Which edition is right for my business?',
    a: 'If you run one shop and want sales, stock, credit and money in one place, start with Lite. If you have several branches, sales agents, staff on payroll or need full accounting, choose Enterprise.',
  },
  {
    q: 'Does it work with Zaad, eDahab and my bank?',
    a: 'Yes. Every cash drawer, bank account and mobile money wallet is set up as an account, and each payment records which one the money went through.',
  },
  {
    q: 'Can I take payment in Somaliland shillings?',
    a: "Yes. Balances stay in USD, and you can accept SLSH at the day's exchange rate. The rate is saved on each payment, so history never changes.",
  },
  {
    q: 'Can I move from Lite to Enterprise later?',
    a: 'Yes. Talk to us when you are ready and we will move your products, customers and history across.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. MaamulPlus runs in the browser on your computer, tablet or phone. Your data is backed up in the cloud.',
  },
  {
    q: 'Why is there no price on the website?',
    a: 'Every business is different. Your price depends on the edition, the number of users and branches. Request a quote and we reply within one working day.',
  },
];

export const enterpriseFaq: QA[] = [
  {
    q: 'Do I need an accountant to use MaamulPlus Enterprise?',
    a: 'No. Daily work such as sales, purchases, payments and payroll posts its own journal entries. An accountant can add manual journals and review the trial balance when needed.',
  },
  {
    q: 'How many branches can I run?',
    a: 'As many as your business has. Each branch keeps its own stock and cash, and you see all of them together or one at a time.',
  },
  {
    q: 'Can I control what each person sees?',
    a: 'Yes. Roles decide which screens and actions a person can use, per branch. Every change is written to the audit log with the user, device and time.',
  },
  {
    q: 'Can my existing chart of accounts be used?',
    a: 'Yes. Start from the ready chart for trading businesses or bring your own codes. We import opening balances during setup.',
  },
];

export const liteFaq: QA[] = [
  {
    q: 'Is MaamulPlus Lite enough for a single shop?',
    a: 'Yes. Lite covers selling, buying, stock, customer credit, payments, expenses and the statements a small business needs, for one branch.',
  },
  {
    q: 'Will I see accounting terms like debit and credit?',
    a: 'No. Lite uses plain words: money in, money out, what customers owe you and what you owe suppliers. The books are kept correctly in the background.',
  },
  {
    q: 'Can my staff use it on a phone?',
    a: 'Yes. MaamulPlus runs in any modern browser on a phone, tablet or computer. Nothing to install.',
  },
  {
    q: 'What happens when my business grows?',
    a: 'Move to MaamulPlus Enterprise when you add branches, agents or payroll. Your products, customers and history come with you.',
  },
];

export const pricingFaq: QA[] = [
  {
    q: 'Why is there no price on the website?',
    a: 'Every business is different. Your price depends on the edition, the number of users and branches. Request a quote and we reply within one working day.',
  },
  {
    q: 'Can I pay monthly?',
    a: 'Yes. Both editions are available as a monthly or an annual subscription. Annual plans are quoted together with setup.',
  },
  {
    q: 'Is setup and data import included?',
    a: 'Every quote includes guided setup. We import your products, customers, vendors and opening balances so you start with real data.',
  },
  {
    q: 'Can I change edition later?',
    a: 'Yes. Move from Lite to Enterprise at any time and keep your history. Your quote is adjusted to the new edition.',
  },
  {
    q: 'Do you charge per user or per branch?',
    a: 'A quote takes both into account, together with the edition. Tell us how many people and branches you have and we will size it.',
  },
];

export const generalFaq: QA[] = [
  ...homeFaq,
  {
    q: 'Is my data safe?',
    a: 'Yes. Your data is stored in the cloud with daily backups, and access is protected by user accounts and roles. You can export your records at any time.',
  },
  {
    q: 'What happens if the internet goes down?',
    a: 'MaamulPlus needs a connection to save. Many shops keep a mobile data bundle as a backup, and the app works well on a phone connection.',
  },
  {
    q: 'Can I print invoices and receipts?',
    a: 'Yes. Print invoices, receipts and customer statements on A4 or thermal receipt printers, or share them as PDF.',
  },
  {
    q: 'Do you train my staff?',
    a: 'Yes. Your team is trained on site in Hargeisa or online, and support stays a phone call away after you go live.',
  },
  {
    q: 'Can I use barcodes?',
    a: 'Yes. MaamulPlus Enterprise supports barcode scanning at the counter with any standard USB or Bluetooth scanner.',
  },
];
