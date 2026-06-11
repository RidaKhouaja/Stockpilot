import { Package, DollarSign, AlertCircle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatisticsCardProps {
  title: string
  value: string
  icon: 'package' | 'dollar' | 'alert' | 'trend'
  color: 'blue' | 'green' | 'warning' | 'purple'
}

const iconMap = {
  package: Package,
  dollar: DollarSign,
  alert: AlertCircle,
  trend: TrendingUp,
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
  },
  warning: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    border: 'border-yellow-200',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-200',
  },
}

export function StatisticsCard({
  title,
  value,
  icon,
  color,
}: StatisticsCardProps) {
  const Icon = iconMap[icon]
  const colorStyles = colorMap[color]

  return (
    <div
      className={cn(
        'bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow',
        colorStyles.border
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary mb-2">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn('p-3 rounded-lg', colorStyles.bg)}>
          <Icon className={cn('w-6 h-6', colorStyles.icon)} />
        </div>
      </div>
    </div>
  )
}
