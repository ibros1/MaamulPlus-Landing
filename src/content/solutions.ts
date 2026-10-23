import type { DetailPage } from './features';

export const solutions: DetailPage[] = [
  {
    slug: 'spare-parts',
    name: 'Spare parts traders',
    title: 'Spare parts shop software in Hargeisa',
    description:
      'Spare parts shop software for Hargeisa: thousands of part numbers, stock per branch, garage credit accounts and wholesale and retail prices in USD and SLSH.',
    eyebrow: 'Spare parts',
    h1: 'Built for spare parts traders.',
    lead: 'Spare parts shops carry thousands of lines, sell to garages on credit and to walk-in drivers for cash. MaamulPlus is spare parts shop software that keeps every part number, every branch and every garage account in order.',
    screen: 'inventory',
    screenLabel:
      'MaamulPlus stock for Hargeisa Spare Parts: brake pads, oil, filters, batteries, tyres and belts with stock per branch and low stock warnings.',
    availability: 'both',
    availabilityNote:
      'Single-shop parts dealers start with MaamulPlus Lite. Dealers with several branches or a warehouse choose MaamulPlus Enterprise.',
    benefitsTitle: 'Made for a parts counter.',
    benefits: [
      {
        icon: 'tag',
        title: 'Part numbers and search',
        body: 'Find a part by SKU, name or vehicle in seconds, even with thousands of lines.',
      },
      {
        icon: 'package',
        title: 'Low stock before it is gone',
        body: 'Reorder levels flag fast movers like filters and pads before you run out.',
      },
      {
        icon: 'users',
        title: 'Garage accounts',
        body: 'Garages buy on credit all month. Each has a limit and a statement.',
      },
      {
        icon: 'layers',
        title: 'Boxes and pieces',
        body: 'Buy spark plugs by the box, sell them one by one.',
      },
      {
        icon: 'warehouse',
        title: 'Warehouse and shops',
        body: 'Hold stock in a warehouse and transfer to each shop as it sells.',
      },
      {
        icon: 'coins',
        title: 'USD prices, SLSH payments',
        body: 'Price in dollars, accept shillings at the day’s rate.',
      },
    ],
    sections: [
      {
        title: 'Thousands of lines, one clear count.',
        paragraphs: [
          'A spare parts business lives or dies by what is on the shelf. Customers come in asking for an oil filter for a Toyota or brake pads for a Hilux, and you need to know in seconds whether you have it and at which branch. MaamulPlus keeps a live count for every part in every branch, updated by each sale and purchase.',
          'Stock value is calculated at cost, so you can see how much money is tied up in slow-moving parts and decide what to reorder and what to clear.',
        ],
      },
      {
        title: 'Garages on credit, under control.',
        paragraphs: [
          'Garages and fleet owners usually buy on account and settle weekly or monthly. In MaamulPlus each garage has a credit limit and a statement. The counter sees the balance before saving a credit invoice, and the owner sees which accounts are overdue.',
          'When a garage pays by Zaad or bank, the payment is applied to their oldest invoices, and the statement updates straight away.',
        ],
      },
      {
        title: 'From one shop to a network.',
        paragraphs: [
          'Many parts dealers in Hargeisa start with one shop and grow into a warehouse and two or three branches. Start with MaamulPlus Lite and move to Enterprise when you add branches. Your products, customers and history come with you.',
        ],
      },
      {
        title: 'Quotes for garages and fleets.',
        paragraphs: [
          'Garages and fleet owners often ask for a price before they commit. With MaamulPlus Enterprise you write a quotation with the parts, quantities and prices, share it as a PDF, and turn it into an invoice with one click when the customer agrees. Stock is only reserved when the invoice is saved, so quotes never block your shelf.',
        ],
      },
    ],
    related: ['inventory', 'credit-and-payments', 'sales-and-invoicing'],
    faq: [
      {
        q: 'Can I search parts by vehicle?',
        a: 'Yes. Add the vehicle models to the product name or description and search finds them at the counter.',
      },
      {
        q: 'Can garages buy on credit?',
        a: 'Yes. Each garage has a credit limit and a statement, and payments are applied to their oldest invoices.',
      },
      {
        q: 'Can I import my parts list?',
        a: 'Yes. We import your products, prices and opening stock from a spreadsheet during setup.',
      },
    ],
  },
  {
    slug: 'wholesale',
    name: 'Wholesale and distribution',
    title: 'Wholesale distribution software Somaliland',
    description:
      'Wholesale distribution software for Somaliland: carton and piece units, wholesale and retail prices, sales agents on routes, branches and customer credit.',
    eyebrow: 'Wholesale',
    h1: 'Wholesale and retail, in one system.',
    lead: 'MaamulPlus is wholesale distribution software for Somaliland traders who sell by the carton to shops and by the piece to walk-in customers, often from the same stock. Prices, units, agents and credit all live in one place.',
    screen: 'agents',
    screenLabel:
      'A MaamulPlus sales agent session showing stock taken out, sold and returned, with cash, Zaad and credit collected on the route.',
    availability: 'enterprise',
    availabilityNote:
      'Wholesale distributors usually choose MaamulPlus Enterprise for agents, branches and full accounting.',
    benefitsTitle: 'Sell by the carton and by the piece.',
    benefits: [
      {
        icon: 'layers',
        title: 'Unit conversions',
        body: 'One product, several units. Stock is always counted in the smallest one.',
      },
      {
        icon: 'tag',
        title: 'Two price lists',
        body: 'Wholesale and retail prices per product, picked by customer type.',
      },
      {
        icon: 'route',
        title: 'Agents on routes',
        body: 'Send stock out with agents and settle each session item by item.',
      },
      {
        icon: 'swap',
        title: 'Branch transfers',
        body: 'Buy once, then distribute stock to each branch with a reference.',
      },
      {
        icon: 'shield',
        title: 'Credit limits for shops',
        body: 'Retail shops buy on account within their limit.',
      },
      {
        icon: 'book',
        title: 'Full accounting',
        body: 'Margins, receivables and payables in real double-entry books.',
      },
    ],
    sections: [
      {
        title: 'Two ways of selling, one stock.',
        paragraphs: [
          'Wholesalers in Somaliland rarely sell only wholesale. The same warehouse serves shops that buy by the carton and individuals who buy a single item. MaamulPlus handles both with unit conversions and two price lists, so a carton of 24 and a single piece come out of the same count.',
          'When the till knows the customer is a retailer, it uses the wholesale price. For a walk-in customer it uses the retail price. No second system, no manual adjustments.',
        ],
      },
      {
        title: 'Agents, routes and collections.',
        paragraphs: [
          'Distribution depends on agents who visit shops across the city and in other regions. Each agent works in a session: the stock they take out, the invoices they write, the stock they bring back and the money they collect. Closing the session settles everything, so shortages appear the same day.',
          'Owners can compare routes and agents by sales, returns and collections, and plan stock for the next trip.',
        ],
      },
      {
        title: 'The books a distributor needs.',
        paragraphs: [
          'Margins in wholesale are thin, and credit to retailers is a large part of the balance sheet. MaamulPlus Enterprise keeps real double-entry books, so receivables, payables and stock value are always correct, and the income statement shows the margin you actually made.',
        ],
      },
      {
        title: 'Buying by the container.',
        paragraphs: [
          'Wholesalers buy in large lots, often by container through Berbera. MaamulPlus records each purchase against the supplier with the quantities received per branch, and what you still owe them. Supplier payments are recorded from the right cash, bank or mobile money account, and the balance with each supplier is always visible next to what your own customers owe you.',
          'When stock arrives, it can go straight to a warehouse and be transferred to branches as they need it, with every movement recorded.',
        ],
      },
    ],
    related: ['sales-agents', 'inventory', 'accounting'],
    faq: [
      {
        q: 'Can one product have a wholesale and a retail price?',
        a: 'Yes. Each product can have both, and the till picks the right one for the customer.',
      },
      {
        q: 'Can I track agents who sell outside Hargeisa?',
        a: 'Yes. Sessions work for any route. The agent’s stock and collections are settled when the session closes.',
      },
      {
        q: 'Which edition do distributors use?',
        a: 'Most choose MaamulPlus Enterprise for agents, branches and full accounting.',
      },
    ],
  },
  {
    slug: 'retail-shops',
    name: 'Retail shops',
    title: 'Retail shop software in Hargeisa',
    description:
      'Retail shop software for Hargeisa: a quick till, cash and mobile money payments, customer credit, stock levels and daily takings, without accounting jargon.',
    eyebrow: 'Retail shops',
    h1: 'A clear till for every shop.',
    lead: 'MaamulPlus Lite is retail shop software for owners in Hargeisa who want a quick till, an honest stock count and a clear view of the day’s takings, without accounting jargon and without installing anything.',
    screen: 'dashboard',
    screenLabel:
      'The MaamulPlus dashboard for a shop: takings today, sales this month, credit outstanding, stock value and cash on hand.',
    availability: 'both',
    availabilityNote:
      'Most single shops start with MaamulPlus Lite. Shops with several branches choose MaamulPlus Enterprise.',
    benefitsTitle: 'Everything the shop did today.',
    benefits: [
      {
        icon: 'receipt',
        title: 'A quick till',
        body: 'Find a product, set the quantity and take payment. Done.',
      },
      {
        icon: 'smartphone',
        title: 'Zaad and eDahab at the counter',
        body: 'Take mobile money and see it land in the right wallet.',
      },
      {
        icon: 'users',
        title: 'Regular customers on credit',
        body: 'A limit and a statement for each, instead of a notebook.',
      },
      {
        icon: 'package',
        title: 'Stock that adds up',
        body: 'Stock goes down with each sale and up with each purchase.',
      },
      { icon: 'chart', title: 'Takings at a glance', body: 'Today, this week and this month on one screen.' },
      {
        icon: 'smartphone',
        title: 'On your phone',
        body: 'Check the shop from anywhere in the browser on your phone.',
      },
    ],
    sections: [
      {
        title: 'A shop owner’s day, on one screen.',
        paragraphs: [
          'The MaamulPlus dashboard opens with today: takings so far, the number of invoices and how it compares with the same day last week. Below it are this month’s sales, what customers owe you, the value of your stock and the cash you hold across the drawer, the bank and mobile money.',
          'You can check it from the shop or from home on your phone. If a number looks wrong, every figure links to the invoices behind it.',
        ],
      },
      {
        title: 'Plain words, correct books.',
        paragraphs: [
          'MaamulPlus Lite never asks you to think about debits and credits. It talks about money in, money out, what customers owe and what you owe suppliers. In the background it still keeps the books correctly, so the income statement and balance sheet are ready when you need them.',
          'Your cashier learns the till in an afternoon. Setup is guided, and we import your products and customers for you.',
        ],
      },
      {
        title: 'Room to grow.',
        paragraphs: [
          'When you open a second shop or start selling wholesale, move to MaamulPlus Enterprise. Your products, customers and history come with you, and your team keeps the same screens.',
        ],
      },
      {
        title: 'Closing the day in minutes.',
        paragraphs: [
          'At the end of the day, the cashier counts the drawer and checks the Zaad and eDahab balances on the merchant phones. MaamulPlus shows what each one should hold, based on the day’s sales, payments and expenses. If the numbers agree, the day is closed. If they do not, the list of the day’s transactions makes it easy to find the sale or payment that was missed.',
          'Owners who are not in the shop can see the closed day from their phone, with takings by payment type and the credit given.',
        ],
      },
    ],
    related: ['sales-and-invoicing', 'credit-and-payments', 'inventory'],
    faq: [
      {
        q: 'Is it hard for my cashier to learn?',
        a: 'No. Most cashiers are writing invoices on the first day. We train your team during setup.',
      },
      {
        q: 'Can I use it on a tablet at the counter?',
        a: 'Yes. MaamulPlus runs in the browser on a tablet, phone or computer.',
      },
      {
        q: 'Do I need a separate POS machine?',
        a: 'No. A tablet or computer with a receipt printer is enough. A barcode scanner is optional.',
      },
    ],
  },
];

export const solutionBySlug = (slug: string): DetailPage | undefined =>
  solutions.find((s) => s.slug === slug);
