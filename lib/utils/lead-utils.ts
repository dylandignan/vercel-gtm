import { Flame, Thermometer, Snowflake } from "lucide-react"

export const LEAD_TEMPERATURE_CONFIG = {
  hot: {
    icon: Flame,
    color: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-500",
  },
  warm: {
    icon: Thermometer,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-500",
  },
  cold: {
    icon: Snowflake,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-500",
  },
  unknown: {
    icon: Thermometer,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    iconColor: "text-gray-400",
  },
} as const

export const LEAD_STATUS_CONFIG = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-green-50 text-green-700 border-green-200",
  demo_scheduled: "bg-purple-50 text-purple-700 border-purple-200",
  closed_won: "bg-green-50 text-green-700 border-green-200",
  closed_lost: "bg-red-50 text-red-700 border-red-200",
} as const

export function getTemperatureConfig(temperature?: string | null) {
  return LEAD_TEMPERATURE_CONFIG[temperature as keyof typeof LEAD_TEMPERATURE_CONFIG] || LEAD_TEMPERATURE_CONFIG.unknown
}

export function getStatusColor(status: string) {
  return LEAD_STATUS_CONFIG[status as keyof typeof LEAD_STATUS_CONFIG] || LEAD_STATUS_CONFIG.new
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
