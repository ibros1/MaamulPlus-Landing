import { Banknote, Building2, RefreshCw } from 'lucide-react';
import { business, payroll } from '@/content/demo-data';
import { AppShell } from '../app-shell';
import { Head, Money, Pill, UButton, usd } from '../parts';

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;
const I2 = { strokeWidth: 2, 'aria-hidden': true } as const;

export function PeopleScreen() {
  const largest = Math.max(...payroll.departments.map((d) => d.count));
  return (
    <AppShell active="HR dashboard" startGroup={5}>
      <Head
        kicker={business.today}
        title="People"
        sub="Who is on the books, what they cost, and where payroll stands."
        actions={
          <>
            <UButton go>
              <Banknote {...I2} />
              Run payroll
            </UButton>
            <UButton>
              <RefreshCw {...I2} />
              Refresh
            </UButton>
          </>
        }
      />
      <div className="upanel" style={{ display: 'grid', gridTemplateColumns: '330px 1fr' }}>
        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="ul">Monthly salary bill</div>
          <div className="un" style={{ marginTop: 8 }}>
            {payroll.activeStaff} active on the books
          </div>
          <Money value={payroll.monthlyBill} xl />
          <div className="un">{payroll.newHires} new hire in the last 30 days</div>
        </div>
        <div style={{ padding: '16px 22px' }}>
          <div className="ul" style={{ marginBottom: 6 }}>
            Headcount by department
          </div>
          {payroll.departments.map((d) => (
            <div
              key={d.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 20px',
                gap: 12,
                alignItems: 'center',
                padding: '7px 0',
                fontSize: 12.5,
              }}
            >
              <span>{d.name}</span>
              <div className="ubar" style={{ height: 8 }}>
                <i style={{ width: `${(d.count / largest) * 100}%` }} />
              </div>
              <span className="r" style={{ textAlign: 'right' }}>
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ucards" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="ucard">
          <div className="ul">Active staff</div>
          <div className="uv">{payroll.activeStaff}</div>
        </div>
        <div className="ucard">
          <div className="ul">Paid this month</div>
          <Money value={payroll.paidThisMonth} />
        </div>
        <div className="ucard">
          <div className="ul">Deductions</div>
          <Money value={payroll.deductions} tone="red" />
        </div>
        <div className="ucard">
          <div className="ul">Advances owed</div>
          <Money value={payroll.advancesOwed} />
        </div>
      </div>
      <div className="utable">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Branch</th>
              <th className="r">Salary</th>
              <th>October</th>
            </tr>
          </thead>
          <tbody>
            {payroll.employees.map((e) => {
              const [first = '', last = ''] = e.name.split(' ');
              return (
                <tr key={e.name}>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                      <span
                        className="ui-av"
                        style={{ width: 26, height: 26, fontSize: 10, background: 'var(--brand-soft)', color: 'var(--heading)' }}
                      >
                        {first[0]}
                        {last[0]}
                      </span>
                      {e.name}
                    </span>
                  </td>
                  <td>{e.role}</td>
                  <td>
                    <span className="meta">
                      <Building2 {...I} />
                      {e.branch}
                    </span>
                  </td>
                  <td className="r">{usd(e.salary)}</td>
                  <td>
                    <Pill tone={e.tone}>{e.label}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
