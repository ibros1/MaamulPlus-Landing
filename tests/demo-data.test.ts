import {
  cashAccounts,
  cashInBySource,
  cashOutByUse,
  customer,
  journal,
  payroll,
  agentSession,
  sum,
  topAccountsFlow,
  totals,
} from '@/content/demo-data';

describe('sample data anchors agree everywhere', () => {
  it('cash on hand is the sum of every account', () => {
    expect(sum(cashAccounts.map((a) => a.balance))).toBe(7436.03);
    expect(totals.cashOnHand).toBe(7436.03);
  });

  it('opening + in − out = closing', () => {
    expect(Math.round((totals.opening + totals.monthIn - totals.monthOut) * 100) / 100).toBe(totals.cashOnHand);
  });

  it('cash in and out by source add up to the month totals', () => {
    expect(sum(cashInBySource.map((s) => s.amount))).toBe(totals.monthIn);
    expect(sum(cashOutByUse.map((s) => s.amount))).toBe(totals.monthOut);
    expect(totals.monthIn).toBe(9820.4);
    expect(totals.monthOut).toBe(4135.1);
    expect(totals.opening).toBe(1750.73);
  });

  it('keeps the headline figures from the brief', () => {
    expect(totals.creditOutstanding).toBe(1284.36);
    expect(totals.creditInvoices).toBe(9);
    expect(totals.monthRevenue).toBe(24650.06);
    expect(totals.monthInvoices).toBe(128);
    expect(totals.todayTakings).toBe(1284.5);
    expect(totals.todayInvoices).toBe(14);
    expect(payroll.monthlyBill).toBe(3450);
    expect(payroll.activeStaff).toBe(10);
  });

  it('Jamac Ahmed owes $207.18 on INV-000211 against a $400 limit', () => {
    expect(customer.owes).toBe(207.18);
    expect(customer.openInvoice).toBe('INV-000211');
    expect(customer.creditLimit).toBe(400);
    const open = customer.statement.filter((r) => (r.balance ?? 0) > 0);
    expect(sum(open.map((r) => r.balance ?? 0))).toBe(customer.owes);
  });

  it('headcount by department adds up to active staff', () => {
    expect(payroll.departments.reduce((a, d) => a + d.count, 0)).toBe(payroll.activeStaff);
  });

  it('the journal for INV-000214 balances', () => {
    const debit = sum(journal.lines.map((l) => l.debit));
    const credit = sum(journal.lines.map((l) => l.credit));
    expect(debit).toBe(credit);
    expect(debit).toBe(1562.4);
  });

  it('top accounts: opening + in − out = closing, and closings match the account list', () => {
    for (const a of topAccountsFlow) {
      expect(Math.round((a.opening + a.moneyIn - a.moneyOut) * 100) / 100).toBe(a.closing);
    }
    expect(topAccountsFlow[0]?.closing).toBe(cashAccounts.find((c) => c.code === '1010')?.balance);
  });

  it('every item on the agent session is accounted for', () => {
    for (const l of agentSession.lines) expect(l.sold + l.returned).toBe(l.out);
  });
});
