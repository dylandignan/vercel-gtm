import { Flame, Thermometer, Snowflake } from "lucide-react"

// Display options for lead data - used for showing proper labels and colors in UI
export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "demo_scheduled", label: "Demo Scheduled" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
] as const

// Status color configuration
export const STATUS_COLOR_CONFIG = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-green-50 text-green-700 border-green-200",
  demo_scheduled: "bg-purple-50 text-purple-700 border-purple-200",
  closed_won: "bg-green-50 text-green-700 border-green-200",
  closed_lost: "bg-red-50 text-red-700 border-red-200",
} as const

export const JOB_TITLE_OPTIONS = [
  { value: "cto", label: "CTO / Chief Technology Officer" },
  { value: "ceo", label: "CEO / Founder" },
  { value: "vp-engineering", label: "VP Engineering / Director" },
  { value: "senior-engineer", label: "Senior/Lead Engineer" },
  { value: "engineer", label: "Software Engineer/Developer" },
  { value: "other", label: "Other" },
] as const

// Helper functions to get display labels and colors
export const getStatusLabel = (status: string) => {
  return STATUS_OPTIONS.find(option => option.value === status)?.label || status
}

export const getStatusColor = (status: string) => {
  return STATUS_COLOR_CONFIG[status as keyof typeof STATUS_COLOR_CONFIG] || STATUS_COLOR_CONFIG.new
}

export const getJobTitleLabel = (value: string) => {
  return JOB_TITLE_OPTIONS.find(option => option.value === value)?.label || value
}

// Temperature configuration with icons and colors
export const TEMPERATURE_CONFIG = {
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

export function getTemperatureConfig(temperature?: string | null) {
  return TEMPERATURE_CONFIG[temperature as keyof typeof TEMPERATURE_CONFIG] || TEMPERATURE_CONFIG.unknown
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}