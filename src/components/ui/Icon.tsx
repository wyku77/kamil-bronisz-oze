import {
  BadgePercent,
  BatteryCharging,
  ClipboardList,
  Cpu,
  Gauge,
  HeartHandshake,
  PencilRuler,
  PiggyBank,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  'badge-percent': BadgePercent,
  'battery-charging': BatteryCharging,
  'clipboard-list': ClipboardList,
  cpu: Cpu,
  gauge: Gauge,
  'heart-handshake': HeartHandshake,
  'pencil-ruler': PencilRuler,
  'piggy-bank': PiggyBank,
  'shield-check': ShieldCheck,
  sun: Sun,
  'trending-up': TrendingUp,
  wrench: Wrench,
  zap: Zap,
}

type IconProps = {
  name: string
  className?: string
  strokeWidth?: number
}

/** Resolver ikon po nazwie (string) — używany przez sekcje sterowane danymi. */
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = map[name] ?? Zap
  return <Cmp className={className} strokeWidth={strokeWidth} />
}
