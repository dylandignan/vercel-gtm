import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/lib/utils/lead-utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return <Badge className={`${getStatusColor(status)} ${className}`}>{status.replace("_", " ")}</Badge>
}
