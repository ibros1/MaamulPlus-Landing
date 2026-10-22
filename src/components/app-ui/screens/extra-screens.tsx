import { ArrowLeftRight, Download, FileText, Package, Plus, Route, Search, TriangleAlert, Wallet } from 'lucide-react';
import { agentSession, chartOfAccounts, products, totals } from '@/content/demo-data';
import { cn } from '@/lib/cn';
import { AppShell } from '../app-shell';
import { Cards, Head, Pill, UButton, UCard, usd } from '../parts';

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;
const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;

/** Stock per branch with reorder levels. */
export function InventoryScreen() {
  const low = products.filter((p) => p.main + p.waaheen < p.reorder);
  return (
    <AppShell active="Stock" startGroup={3}>
      <Head
        title="Stock"
        sub="What is on the shelf in every branch, and what to reorder."
        actions={
          <>
            <UButton>
              <ArrowLeftRight {...I2} />
              Transfer
            </UButton>
            <UButton go>
              <Plus strokeWidth={2.25} aria-hidden />
              New purchase
            </UButton>
          </>
        }
      />
      <Cards>
        <UCard label="Stock value" value={totals.stockValue} note="at cost, all branches" icon={<Package {...I} />} />
        <UCard label="Products" value="1,248" note="active lines" icon={<FileText {...I} />} well="navy" />
        <UCard label="Running low" value={String(low.length)} note="below reorder level" icon={<TriangleAlert {...I} />} well="amber" />
        <UCard label="Transfers" value="6" note="this month" icon={<ArrowLeftRight {...I} />} well="navy" />
      </Cards>
      <div className="ufilters">
        <div className="uf">
          <label>Product</label>
          <div className="uin ph" style={{ width: 240 }}>
            <Search {...I2} />
            Name, SKU or vehicle…
          </div>
        </div>
        <div className="end">
          <UButton>
            <Download {...I2} />
            Export
          </UButton>
        </div>
      </div>
      <div className="utable">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th className="r">Main Branch</th>
              <th className="r">Waaheen Branch</th>
              <th className="r">Reorder at</th>
              <th className="r">Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const qty = p.main + p.waaheen;
              const isLow = qty < p.reorder;
              return (
                <tr key={p.sku}>
                  <td className="m">{p.sku}</td>
                  <td>{p.name}</td>
                  <td className="r">{p.main}</td>
                  <td className={cn('r', p.waaheen === 0 && 'red')}>{p.waaheen}</td>
                  <td className="r mu">{p.reorder}</td>
                  <td className="r">{usd(qty * p.cost)}</td>
                  <td>{isLow ? <Pill tone="part">Low stock</Pill> : <Pill tone="ok">In stock</Pill>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

/** Chart of accounts with codes, types and balances. */
export function ChartOfAccountsScreen() {
  return (
    <AppShell active="Chart of accounts" startGroup={5}>
      <Head
        title="Chart of accounts"
        sub="Every account the business uses, with its code and balance."
        actions={
          <>
            <UButton>
              <FileText {...I2} />
              Trial balance
            </UButton>
            <UButton go>
              <Plus strokeWidth={2.25} aria-hidden />
              New account
            </UButton>
          </>
        }
      />
      <Cards>
        <UCard label="Cash on hand" value={totals.cashOnHand} note="cash, bank and mobile money" icon={<Wallet {...I} />} />
        <UCard label="Receivable" value={totals.creditOutstanding} note="customers owe" well="red" tone="red" icon={<FileText {...I} />} />
        <UCard label="Payable" value={totals.owedToSuppliers} note="we owe suppliers" well="navy" icon={<FileText {...I} />} />
        <UCard label="Trial balance" value="Balanced" note="debits equal credits" icon={<ArrowLeftRight {...I} />} />
      </Cards>
      <div className="utable">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Account</th>
              <th>Type</th>
              <th className="r">Balance</th>
            </tr>
          </thead>
          <tbody>
            {chartOfAccounts.map((a) => (
              <tr key={a.code}>
                <td className="m">{a.code}</td>
                <td style={{ paddingLeft: 14 + a.level * 18, fontWeight: a.type === 'Group' ? 600 : 400 }}>{a.name}</td>
                <td>
                  <span className="pill out">{a.type}</span>
                </td>
                <td className="r">{a.balance === null ? '' : usd(a.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

/** A sales agent's field session: out, sold, returned, and money collected. */
export function AgentSessionScreen() {
  const s = agentSession;
  const collected = s.collected.cash + s.collected.zaad + s.collected.credit;
  return (
    <AppShell active="Sales agents" startGroup={4}>
      <Head
        kicker="Session · SES-000041"
        title={
          <>
            <Route {...I2} />
            {s.agent}
          </>
        }
        sub={`Route: ${s.route}. Opened ${s.opened}.`}
        actions={
          <>
            <Pill tone="ok">{s.status}</Pill>
            <UButton go>
              <Wallet {...I2} />
              Close and settle
            </UButton>
          </>
        }
      />
      <Cards>
        <UCard label="Cash collected" value={s.collected.cash} note="to Cash — Main Branch" tone="green" />
        <UCard label="Zaad collected" value={s.collected.zaad} note="to Zaad Merchant" tone="green" />
        <UCard label="On credit" value={s.collected.credit} note="added to customer balances" tone="red" />
        <UCard label="Session total" value={collected} note="sales on this route" />
      </Cards>
      <div className="utable">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="r">Out</th>
              <th className="r">Sold</th>
              <th className="r">Returned</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            {s.lines.map((l) => (
              <tr key={l.item}>
                <td>{l.item}</td>
                <td className="r">{l.out}</td>
                <td className="r green">{l.sold}</td>
                <td className="r">{l.returned}</td>
                <td>
                  {l.sold + l.returned === l.out ? <Pill tone="ok">Accounted for</Pill> : <Pill tone="due">Short</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
