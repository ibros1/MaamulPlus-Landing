import {
  ArrowLeftRight,
  Banknote,
  Bell,
  BookOpen,
  ChevronsUpDown,
  FileText,
  Gauge,
  Landmark,
  Languages,
  LayoutGrid,
  Package,
  PanelLeft,
  Receipt,
  Route,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  Sun,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Logo } from '@/components/ui/logo';
import { business } from '@/content/demo-data';

type NavItem = [label: string, icon: LucideIcon];

/** The app's sidebar, in the same groups as the product. */
export const NAV: [group: string, items: NavItem[]][] = [
  ['Overview', [['Dashboard', LayoutGrid], ['Assistant', Sparkles]]],
  ['Sales', [['Sales dashboard', Gauge], ['Sales', ShoppingCart], ['Quotations', FileText], ['Sales returns', ArrowLeftRight]]],
  ['Purchases', [['Purchases', Truck], ['Purchase returns', ArrowLeftRight]]],
  ['Inventory', [['Products', Package], ['Stock', Package], ['Transfers', ArrowLeftRight], ['Adjustments', FileText]]],
  ['Parties', [['Customers', Users], ['Vendors', Store]]],
  ['Money', [['Finance dashboard', Gauge], ['Payments', Wallet], ['Sales agents', Route], ['Expenses', Receipt], ['Accounts', Landmark]]],
  ['Accounting', [['Chart of accounts', BookOpen], ['Transactions', FileText]]],
  ['HR', [['HR dashboard', Gauge], ['Employees', Users], ['Payroll', Banknote]]],
  ['Reports', [['Sales summary', ShoppingCart], ['Cash flow', Banknote], ['Income statement', FileText], ['Balance sheet', Landmark]]],
];

const I = { strokeWidth: 1.75, 'aria-hidden': true } as const;

interface AppShellProps {
  /** Label of the active sidebar item. */
  active: string;
  /** Sidebar starts at this group, so the active item is in view (the sidebar is clipped). */
  startGroup: number;
  children: ReactNode;
}

/** The fixed 1280×760 MaamulPlus app canvas: sidebar, top bar, body and footer. */
export function AppShell({ active, startGroup, children }: AppShellProps) {
  return (
    <div className="ui">
      <aside className="ui-side">
        <div className="ui-logo">
          <Logo variant="compact" />
        </div>
        <div className="ui-biz">
          <b>{business.initials}</b>
          <span>
            {business.name}
            <small>{business.branches[0]}</small>
          </span>
          <ChevronsUpDown strokeWidth={2} aria-hidden />
        </div>
        <div className="ui-navwrap">
          <div className="ui-nav">
            {NAV.slice(startGroup).map(([group, items]) => (
              <div key={group}>
                <div className="ui-g">{group}</div>
                {items.map(([label, Icon]) => (
                  <div key={label} className={label === active ? 'ui-i on' : 'ui-i'}>
                    <Icon {...I} />
                    {label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="ui-user">
          <div className="ui-av">{business.user.initials}</div>
          <span>
            {business.user.name}
            <small>{business.user.role}</small>
          </span>
        </div>
      </aside>
      <div className="ui-main">
        <div className="ui-top">
          <div className="sq">
            <PanelLeft {...I} />
          </div>
          <div className="ui-search">
            <Search strokeWidth={2} aria-hidden />
            Search customers, products, invoices…<kbd>⌘K</kbd>
          </div>
          <div className="ui-rate">{business.rate}</div>
          <div className="ic">
            <Languages {...I} />
          </div>
          <div className="ic">
            <Sun {...I} />
          </div>
          <div className="ic dot">
            <Bell {...I} />
          </div>
          <div className="ui-av">{business.user.initials}</div>
        </div>
        <div className="ui-body">{children}</div>
        <div className="ufoot">
          <span>{business.footer}</span>
          <span>All branches · ⌘K to search</span>
        </div>
      </div>
    </div>
  );
}
