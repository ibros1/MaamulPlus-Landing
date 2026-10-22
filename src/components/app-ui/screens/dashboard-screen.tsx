import { Package, Plus, Receipt, RefreshCw, ShoppingCart, Truck, Wallet } from 'lucide-react';
import { business, recentSales, takingsTrend, totals } from '@/content/demo-data';
import { AppShell } from '../app-shell';
import { Cards, Head, Money, Pill, UButton, UCard, usd } from '../parts';

const W = 560;
const H = 160;
const MAX = 22;

/** Line path for the takings chart, drawn to scale from the data. */
export function trendPath(points: readonly number[]): { d: string; last: [number, number] } {
  const xs = points.map((_, i) => i * (W / (points.length - 1)));
  const ys = points.map((p) => H - 8 - (p / MAX) * (H - 24));
  const d = 'M' + xs.map((x, i) => `${x.toFixed(1)} ${(ys[i] ?? 0).toFixed(1)}`).join(' L');
  return { d, last: [(xs[xs.length - 1] ?? 0) - 3, ys[ys.length - 1] ?? 0] };
}

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;

const quickActions = [
  { label: 'Write a sale', Icon: Receipt },
  { label: 'Record a purchase', Icon: Truck },
  { label: 'Take a payment', Icon: Wallet },
];

export function DashboardScreen() {
  const { d, last } = trendPath(takingsTrend);
  const recent = recentSales.slice(0, 3);
  const via = ['credit', 'Zaad', 'bank'];
  return (
    <AppShell active="Dashboard" startGroup={0}>
      <Head
        kicker={business.today}
        title={`Welcome back, ${business.user.firstName}`}
        sub="Everything the business did today, in one page."
        actions={
          <>
            <UButton>
              <RefreshCw strokeWidth={2} aria-hidden />
              Refresh
            </UButton>
            <UButton go>
              <Plus strokeWidth={2.25} aria-hidden />
              New sale
            </UButton>
          </>
        }
      />
      <div className="upanel" style={{ display: 'grid', gridTemplateColumns: '330px 1fr' }}>
        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="ul">Takings today</div>
          <div className="un" style={{ marginTop: 8 }}>
            {totals.todayInvoices} invoices written today
          </div>
          <Money value={totals.todayTakings} xl />
          <div className="un">
            <Pill tone="ok" className="mr-1.5">
              {totals.todayDelta}
            </Pill>
            on last Friday
          </div>
        </div>
        <div className="uchart" style={{ padding: '14px 16px 6px' }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="150" preserveAspectRatio="none">
            <line className="gl" x1="0" x2={W} y1="40" y2="40" />
            <line className="gl" x1="0" x2={W} y1="80" y2="80" />
            <line className="gl" x1="0" x2={W} y1="120" y2="120" />
            <path d={`${d} L${W} ${H} L0 ${H}Z`} style={{ fill: 'var(--accent)', opacity: 0.1 }} />
            <path d={d} style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 2.2, vectorEffect: 'non-scaling-stroke' }} />
            <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="4" style={{ fill: 'var(--accent)' }} />
          </svg>
        </div>
      </div>
      <Cards>
        <UCard label="This month" value={totals.monthRevenue} note={`on ${totals.monthInvoices} invoices`} icon={<ShoppingCart {...I} />} />
        <UCard
          label="Credit outstanding"
          value={totals.creditOutstanding}
          note={`${totals.creditInvoices} invoices still owing`}
          icon={<Receipt {...I} />}
          well="red"
          tone="red"
        />
        <UCard label="Stock value" value={totals.stockValue} note={`${totals.lowStockLines} lines running low`} icon={<Package {...I} />} well="navy" />
        <UCard label="Cash on hand" value={totals.cashOnHand} note="across cash, bank and mobile money" icon={<Wallet {...I} />} />
      </Cards>
      <div className="ugrid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div className="upanel">
          <div className="upanel-h">
            <div>
              <div className="ul">Latest</div>
              <b>Recent sales</b>
            </div>
            <a>View all</a>
          </div>
          {recent.map((s, i) => (
            <div className="urow" key={s.number}>
              <span>
                <b style={{ fontWeight: 500 }}>{s.number}</b>
                <small>
                  {s.customer} · {via[i]}
                </small>
              </span>
              <Pill tone={s.payment.tone}>{s.payment.label}</Pill>
              <span className="r">{usd(s.total)}</span>
            </div>
          ))}
        </div>
        <div className="upanel">
          <div className="upanel-h">
            <div>
              <div className="ul">Get on with it</div>
              <b>Quick actions</b>
            </div>
          </div>
          {quickActions.map(({ label, Icon }) => (
            <div className="urow" key={label}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon {...I} />
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
