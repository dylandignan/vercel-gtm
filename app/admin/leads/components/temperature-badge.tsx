import { Badge } from "@/components/ui/badge"
import { getTemperatureConfig } from "@/app/admin/leads/display-options"

interface TemperatureBadgeProps {
  temperature?: string | null
  className?: string
}

export function TemperatureBadge({ temperature, className = "" }: TemperatureBadgeProps) {
  const config = getTemperatureConfig(temperature)
  const Icon = config.icon

  return (
    <Badge className={`${config.color} flex w-fit items-center space-x-1 ${className}`}>
      <Icon className={`h-3 w-3 ${config.iconColor}`} />
      <span className="capitalize">{temperature || "unknown"}</span>
    </Badge>
  )
}
