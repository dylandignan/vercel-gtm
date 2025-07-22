import { Flame, Thermometer, TrendingUp, CheckCircle } from "lucide-react"

interface LeadStats {
  total: number
  hot: number
  warm: number
  cold: number
  new: number
  avgScore: number
}

interface LeadStatsProps {
  stats: LeadStats
}

const STAT_CARDS = [
  {
    key: "hot" as const,
    label: "Hot leads",
    icon: Flame,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    key: "warm" as const,
    label: "Warm leads",
    icon: Thermometer,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    key: "avgScore" as const,
    label: "Avg score",
    icon: TrendingUp,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    key: "new" as const,
    label: "New leads",
    icon: CheckCircle,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
]

export function LeadStats({ stats }: LeadStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
      {STAT_CARDS.map(({ key, label, icon: Icon, bgColor, iconColor }) => (
        <div key={key} className="rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 ${bgColor} flex items-center justify-center rounded-lg`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div>
              <div className="text-2xl font-medium text-black">{stats[key]}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
