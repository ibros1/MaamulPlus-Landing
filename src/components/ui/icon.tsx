import {
  ArrowLeftRight,
  Banknote,
  Building2,
  IdCard,
  BookOpen,
  ChartColumn,
  Calculator,
  Check,
  Coins,
  FileText,
  History,
  Landmark,
  Layers,
  Package,
  Printer,
  Receipt,
  Route,
  Scale,
  ScanBarcode,
  Shield,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Truck,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/content/features';

const icons: Record<IconName, LucideIcon> = {
  book: BookOpen,
  package: Package,
  receipt: Receipt,
  wallet: Wallet,
  route: Route,
  banknote: Banknote,
  file: FileText,
  scale: Scale,
  layers: Layers,
  shield: Shield,
  history: History,
  calculator: Calculator,
  swap: ArrowLeftRight,
  scan: ScanBarcode,
  users: Users,
  printer: Printer,
  smartphone: Smartphone,
  coins: Coins,
  check: Check,
  store: Store,
  truck: Truck,
  tag: Tag,
  warehouse: Warehouse,
  chart: ChartColumn,
  sparkles: Sparkles,
  landmark: Landmark,
  idcard: IdCard,
  building: Building2,
};

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

/** Lucide icon by content name. Stroke 1.75 for 20–22 px, 2 for 16 px (pass strokeWidth). */
export function Icon({ name, strokeWidth = 1.75, ...props }: IconProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" focusable="false" strokeWidth={strokeWidth} {...props} />;
}
