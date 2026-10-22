import type { ComponentType } from 'react';
import type { ScreenKey } from '@/content/features';
import { CashFlowScreen } from './cashflow-screen';
import { CustomerScreen } from './customer-screen';
import { DashboardScreen } from './dashboard-screen';
import { AgentSessionScreen, ChartOfAccountsScreen, InventoryScreen } from './extra-screens';
import { FinanceScreen } from './finance-screen';
import { PeopleScreen } from './people-screen';
import { SalesScreen } from './sales-screen';

export { CashFlowScreen, CustomerScreen, DashboardScreen, AgentSessionScreen, ChartOfAccountsScreen, InventoryScreen, FinanceScreen, PeopleScreen, SalesScreen };

/** Each coded screen and the app URL path it shows in the window frame. */
export const screens: Record<ScreenKey, { Component: ComponentType; path: string }> = {
  dashboard: { Component: DashboardScreen, path: 'dashboard' },
  sales: { Component: SalesScreen, path: 'sales' },
  customer: { Component: CustomerScreen, path: 'customers/jamac-ahmed' },
  finance: { Component: FinanceScreen, path: 'finance' },
  cashflow: { Component: CashFlowScreen, path: 'reports/cash-flow' },
  people: { Component: PeopleScreen, path: 'hr' },
  inventory: { Component: InventoryScreen, path: 'inventory/stock' },
  accounts: { Component: ChartOfAccountsScreen, path: 'accounting/chart-of-accounts' },
  agents: { Component: AgentSessionScreen, path: 'sales-agents/sessions/SES-000041' },
};
