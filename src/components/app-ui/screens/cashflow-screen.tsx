import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  RefreshCw,
  Wallet,
} from 'lucide-react';
import { cashInBySource, cashOutByUse, topAccountsFlow, totals } from '@/content/demo-data';
import { AppShell } from '../app-shell';
import { Cards, UButton, UCard, usd } from '../parts';

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;
const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;

const MAX = 5600;
const AXIS = 470;
const SCALE = 360 / MAX;

/** Horizontal bars: money in grows right of the axis, money out grows left. */
function SourceBars() {
  const rows = [
    ...cashInBySource.map((s) => ({ name: s.name, v: s.amount, cls: 'in' })),
    ...cashOutByUse.map((s) => ({ name: s.name, v: -s.amount, cls: 'out' })),
  ];
  return (
    <svg viewBox="0 0 560 196" width="100%" height="196">
      {rows.map((r, i) => {
        const y = 10 + i * 26;
        const w = Math.abs(r.v) * SCALE;
        const x = r.v > 0 ? AXIS : AXIS - w;
        const tx = r.v > 0 ? x + w + 6 : x - 6;
        return (
          <g key={r.name}>
            <text x={AXIS - 380} y={y + 13} textAnchor="start">
              {r.name}
            </text>
            <rect className={r.cls} x={x.toFixed(1)} y={y} width={w.toFixed(1)} height="16" rx="3" />
            <text x={tx.toFixed(1)} y={y + 12} textAnchor={r.v > 0 ? 'start' : 'end'}>
              {Math.round(Math.abs(r.v)).toLocaleString('en-US')}
            </text>
          </g>
        );
      })}
      <line className="ax" x1={AXIS} x2={AXIS} y1="4" y2="190" />
    </svg>
  );
}

export function CashFlowScreen() {
  return (
    <AppShell active="Cash flow" startGroup={6}>
      <div className="ui-head">
        <div>
          <h4>
            <Banknote {...I2} />
            Cash flow
          </h4>
          <p>Money in, money out, and where it stands, classified by what brought money in or took it out.</p>
        </div>
        <div className="act" style={{ textAlign: 'right', fontSize: 11.5, color: 'var(--ink-muted)', display: 'block' }}>
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'var(--heading)',
              fontWeight: 500,
              fontSize: 12.5,
            }}
          >
            <Building2 {...I2} />
            All branches
          </div>
          Generated Oct 23, 2026, 4:12 PM
        </div>
      </div>
      <div className="ufilters">
        <div className="uf">
          <label>Period</label>
          <div className="uin">
            <Calendar {...I2} />
            This month
            <ChevronDown {...I2} className="chev" />
          </div>
        </div>
        <div className="uf">
          <label>From</label>
          <div className="uin">10/01/2026</div>
        </div>
        <div className="uf">
          <label>To</label>
          <div className="uin">10/23/2026</div>
        </div>
        <div className="uf">
          <label>Branch</label>
          <div className="uin">
            <Building2 {...I2} />
            All branches
            <ChevronDown {...I2} className="chev" />
          </div>
        </div>
        <div className="end">
          <UButton>
            <RefreshCw {...I2} />
            Refresh
          </UButton>
          <UButton>
            <Download {...I2} />
            CSV
          </UButton>
          <UButton>
            <FileText {...I2} />
            PDF
          </UButton>
        </div>
      </div>
      <Cards>
        <UCard label="Opening" value={totals.opening} note="Oct 1, 2026" icon={<Wallet {...I} />} well="navy" />
        <UCard label="Cash in" value={totals.monthIn} note="excludes transfers" icon={<ArrowDownLeft {...I} />} tone="green" />
        <UCard label="Cash out" value={totals.monthOut} note="excludes transfers" icon={<ArrowUpRight {...I} />} well="red" tone="red" />
        <UCard label="Closing" value={totals.cashOnHand} note="what is in the accounts now" icon={<Banknote {...I} />} />
      </Cards>
      <div className="ueq">
        <b>{usd(totals.opening)}</b> opening + <span className="g">{usd(totals.monthIn)}</span> in −{' '}
        <span className="d">{usd(totals.monthOut)}</span> out = <b>{usd(totals.cashOnHand)}</b> closing
      </div>
      <div className="ugrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="upanel">
          <div className="upanel-h">
            <b>Cash movement</b>
            <div className="useg">
              <span className="on">By source</span>
              <span>Waterfall</span>
              <span>Daily</span>
            </div>
          </div>
          <div className="uchart" style={{ padding: '0 16px 10px' }}>
            <SourceBars />
          </div>
        </div>
        <div className="utable" style={{ alignSelf: 'start' }}>
          <table>
            <thead>
              <tr>
                <th>Top accounts</th>
                <th className="r">In</th>
                <th className="r">Out</th>
                <th className="r">Closing</th>
              </tr>
            </thead>
            <tbody>
              {topAccountsFlow.map((a) => (
                <tr key={a.label}>
                  <td>{a.label}</td>
                  <td className="r green">{usd(a.moneyIn)}</td>
                  <td className="r red">{usd(a.moneyOut)}</td>
                  <td className="r" style={{ fontWeight: 600, color: 'var(--heading)' }}>
                    {usd(a.closing)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
