import {
  Building2,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react';
import { recentSales, totals } from '@/content/demo-data';
import { cn } from '@/lib/cn';
import { AppShell } from '../app-shell';
import { Cards, Head, Pill, UButton, UCard, usd } from '../parts';

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;
const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;

export function SalesScreen() {
  return (
    <AppShell active="Sales" startGroup={1}>
      <Head
        title="Sales"
        sub="Invoices that move stock and post to your books."
        actions={
          <>
            <UButton>
              <Download {...I2} />
              Export
            </UButton>
            <UButton go>
              <Plus strokeWidth={2.25} aria-hidden />
              New sale
            </UButton>
          </>
        }
      />
      <Cards>
        <UCard label="Invoices" value={String(totals.monthInvoices)} note="this month" icon={<Receipt {...I} />} />
        <UCard label="Revenue" value={totals.monthRevenue} note="this month" icon={<TrendingUp {...I} />} />
        <UCard
          label="Outstanding"
          value={totals.creditOutstanding}
          note={`on ${totals.creditInvoices} invoices`}
          icon={<Wallet {...I} />}
          well="amber"
          tone="red"
        />
        <UCard
          label="Today"
          value={String(totals.todayInvoices)}
          note={`${usd(totals.todayTakings)} taken`}
          icon={<Clock {...I} />}
          well="navy"
        />
      </Cards>
      <div className="ufilters">
        <div className="uf">
          <label>Sale no.</label>
          <div className="uin ph" style={{ width: 200 }}>
            <Search {...I2} />
            INV-0001…
          </div>
        </div>
        <div className="uf">
          <label>Status</label>
          <div className="uin">
            All statuses
            <ChevronDown {...I2} className="chev" />
          </div>
        </div>
        <div className="uf">
          <label>Payment</label>
          <div className="uin">
            All payments
            <ChevronDown {...I2} className="chev" />
          </div>
        </div>
        <div className="uf">
          <label>Period</label>
          <div className="uin">
            <Calendar {...I2} />
            This month
            <ChevronDown {...I2} className="chev" />
          </div>
        </div>
        <div className="end">
          <UButton ink>
            <Search {...I2} />
            Search
          </UButton>
          <UButton>
            <RefreshCw {...I2} />
            Reset
          </UButton>
        </div>
      </div>
      <div className="utable">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Customer</th>
              <th>Branch</th>
              <th>Sold by</th>
              <th>Date</th>
              <th className="r">Total</th>
              <th className="r">Balance</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((s) => (
              <tr key={s.number}>
                <td className="m">{s.number}</td>
                <td className={s.customer === 'Walk-in' ? 'mu' : undefined}>{s.customer}</td>
                <td>
                  <span className="meta">
                    <Building2 {...I} />
                    {s.branch}
                  </span>
                </td>
                <td>
                  <span className="meta">
                    <User {...I} />
                    {s.soldBy}
                  </span>
                </td>
                <td>
                  {s.date}
                  <span className="sub">{s.time}</span>
                </td>
                <td className="r">{usd(s.total)}</td>
                <td className={cn('r', s.balance ? 'red' : 'mu')}>{usd(s.balance)}</td>
                <td>
                  <Pill tone={s.payment.tone}>{s.payment.label}</Pill>
                </td>
                <td>
                  <Pill tone="info">Confirmed</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
