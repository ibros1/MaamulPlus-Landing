import { Building2, ChevronLeft, FileText, Mail, Pencil, Phone, Printer, Receipt, Shield, Wallet } from 'lucide-react';
import { customer } from '@/content/demo-data';
import { cn } from '@/lib/cn';
import { AppShell } from '../app-shell';
import { Cards, Pill, UButton, UCard, usd } from '../parts';

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;
const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;

export function CustomerScreen() {
  const used = Math.round((customer.owes / customer.creditLimit) * 100);
  const available = customer.creditLimit - customer.owes;
  return (
    <AppShell active="Customers" startGroup={3}>
      <div style={{ fontSize: 12, color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <ChevronLeft {...I2} />
        Back to customers
      </div>
      <div className="uprof">
        <div className="big">{customer.initials}</div>
        <div>
          <h4>
            {customer.name} <Pill tone="info">Retail</Pill>
            <Pill tone="ok">Active</Pill>
          </h4>
          <p>
            <span>
              <Phone {...I} />
              {customer.phone}
            </span>
            <span>
              <Mail {...I} />
              {customer.email}
            </span>
            <span>
              <Building2 {...I} />
              {customer.branch}
            </span>
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <UButton go>
            <Wallet {...I2} />
            Receive payment
          </UButton>
          <UButton>
            <Printer {...I2} />
            Print statement
          </UButton>
          <UButton>
            <Pencil {...I2} />
            Edit
          </UButton>
        </div>
      </div>
      <Cards>
        <UCard label="Balance owed" value={customer.owes} note="1 invoice open" icon={<Receipt {...I} />} well="red" tone="red" />
        <UCard label="Paid to date" value={customer.paidToDate} note="since Jan 2026" icon={<Wallet {...I} />} />
        <UCard
          label="Credit limit"
          value={customer.creditLimit}
          note={`${usd(available)} still available`}
          icon={<Shield {...I} />}
          well="navy"
        />
        <UCard
          label="Invoices"
          value={String(customer.invoices)}
          note={`avg. ${usd(customer.averageInvoice)}`}
          icon={<FileText {...I} />}
          well="navy"
        />
      </Cards>
      <div className="ugrid" style={{ gridTemplateColumns: '1.9fr 1fr' }}>
        <div className="utable">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Date</th>
                <th className="r">Total</th>
                <th className="r">Paid</th>
                <th className="r">Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customer.statement.map((r) => (
                <tr key={r.doc}>
                  <td className="m">{r.doc}</td>
                  <td>{r.date}</td>
                  <td className="r">{r.total === null ? '—' : usd(r.total)}</td>
                  <td className="r green">{usd(r.paid)}</td>
                  <td className={cn('r', r.balance ? 'red' : 'mu')}>{r.balance === null ? '—' : usd(r.balance)}</td>
                  <td>
                    <Pill tone={r.tone}>{r.label}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="upanel">
          <div className="upanel-h">
            <div>
              <div className="ul">Credit</div>
              <b>Limit used</b>
            </div>
            <Pill tone="part">{used}%</Pill>
          </div>
          <div style={{ padding: '4px 16px 16px' }}>
            <div className="ubar" style={{ height: 8 }}>
              <i style={{ width: `${used}%`, background: 'var(--warning)' }} />
            </div>
            <div className="un" style={{ marginTop: 8 }}>
              {usd(customer.owes)} of {usd(customer.creditLimit)}
            </div>
          </div>
          <div className="urow">
            <span>
              Opening balance<small>Recorded Jan 1, 2026</small>
            </span>
            <span className="r">$0.00</span>
          </div>
          <div className="urow">
            <span>
              Last payment
              <small>
                {customer.lastPayment.date} · {customer.lastPayment.via}
              </small>
            </span>
            <span className="r">{usd(customer.lastPayment.amount)}</span>
          </div>
          <div className="urow">
            <span>
              Oldest unpaid<small>{customer.openInvoice}</small>
            </span>
            <span className="r red">1 day</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
