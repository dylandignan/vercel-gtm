import { Badge } from "@/components/ui/badge"
import { getStatusLabel, getStatusColor } from "@/app/admin/leads/display-options"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return <Badge className={`${getStatusColor(status)} ${className}`}>{getStatusLabel(status)}</Badge>
}
