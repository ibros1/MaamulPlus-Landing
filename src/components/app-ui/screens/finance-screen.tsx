import { ArrowLeftRight, FileText } from 'lucide-react';
import { business, cashAccounts, financeBars, totals } from '@/content/demo-data';
import { AppShell } from '../app-shell';
import { Head, Money, UButton, usd } from '../parts';

const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;
const BAR = 12;
const GAP = 34;
const UNIT = 11;

export function FinanceScreen() {
  return (
    <AppShell active="Finance dashboard" startGroup={4}>
      <Head
        kicker={business.today}
        title="Finance"
        sub="Where the money sits, and how it moved this month."
        actions={
          <>
            <UButton>
              <FileText {...I2} />
              Cash flow report
            </UButton>
            <UButton>
              <ArrowLeftRight {...I2} />
              Transfer
            </UButton>
          </>
        }
      />
      <div className="upanel" style={{ display: 'grid', gridTemplateColumns: '330px 1fr' }}>
        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="ul">Cash position</div>
          <div className="un" style={{ marginTop: 8 }}>
            Held across {cashAccounts.length} accounts
          </div>
          <Money value={totals.cashOnHand} xl />
          <div className="un">
            {totals.receiptsThisMonth} receipts and {totals.paymentsThisMonth} payments this month
          </div>
        </div>
        <div className="uchart" style={{ padding: '14px 18px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="uleg">
            <span>
              <i />
              Money in
            </span>
            <span>
              <i className="r" />
              Money out
            </span>
          </div>
          <svg viewBox="0 0 440 150" width="100%" height="140" preserveAspectRatio="none">
            <line className="gl" x1="0" x2="440" y1="42" y2="42" />
            <line className="gl" x1="0" x2="440" y1="86" y2="86" />
            <line className="ax" x1="0" x2="440" y1="130.5" y2="130.5" />
            {financeBars.map(([a, b], i) => {
              const x = 20 + i * GAP;
              return (
                <g key={i}>
                  <rect className="in" x={x} y={130 - a * UNIT} width={BAR} height={a * UNIT} rx="3" />
                  <rect className="out" x={x + BAR + 2} y={130 - b * UNIT} width={BAR} height={b * UNIT} rx="3" />
                </g>
              );
            })}
            <text x="20" y="146">
              Oct 1
            </text>
            <text x="190" y="146">
              Oct 12
            </text>
            <text x="395" y="146">
              Oct 23
            </text>
          </svg>
        </div>
      </div>
      <div className="ucards" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="ucard">
          <div className="ul">In this month</div>
          <Money value={totals.monthIn} tone="green" />
        </div>
        <div className="ucard">
          <div className="ul">Out this month</div>
          <Money value={totals.monthOut} tone="red" />
        </div>
        <div className="ucard">
          <div className="ul">Net movement</div>
          <Money value={Math.round((totals.monthIn - totals.monthOut) * 100) / 100} tone="green" />
        </div>
        <div className="ucard">
          <div className="ul">Expenses</div>
          <Money value={totals.expenses} tone="red" />
        </div>
      </div>
      <div className="ugrid" style={{ gridTemplateColumns: '1.7fr 1fr' }}>
        <div className="utable">
          <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Kind</th>
                <th>Share</th>
                <th className="r">Balance</th>
              </tr>
            </thead>
            <tbody>
              {cashAccounts.map((a) => (
                <tr key={a.code}>
                  <td>
                    {a.name}{' '}
                    <span className="mu" style={{ font: '400 11.5px var(--font-mono)', marginLeft: 4 }}>
                      {a.code}
                    </span>
                  </td>
                  <td>
                    <span className="pill out">{a.kind}</span>
                  </td>
                  <td>
                    <div className="ubar">
                      <i style={{ width: `${a.share}%` }} />
                    </div>
                  </td>
                  <td className="r">{usd(a.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="upanel">
          <div className="upanel-h">
            <div>
              <div className="ul">Owed</div>
              <b>Both directions</b>
            </div>
          </div>
          <div className="urow">
            <span>
              Customers owe us<small>{totals.creditInvoices} unpaid invoices</small>
            </span>
            <span className="r red">{usd(totals.creditOutstanding)}</span>
          </div>
          <div className="urow">
            <span>
              We owe suppliers<small>{totals.supplierBills} unpaid bills</small>
            </span>
            <span className="r">{usd(totals.owedToSuppliers)}</span>
          </div>
          <div className="urow">
            <span>
              Staff advances<small>{totals.openAdvances} open</small>
            </span>
            <span className="r">{usd(totals.staffAdvances)}</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
