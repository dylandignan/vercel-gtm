import type React from "react"
import type { Lead } from "@/lib/db/schema"

// Admin-specific component types
export interface LeadTableColumn {
  key: keyof Lead | "actions"
  label: string
  sortable?: boolean
  width?: string
  render?: (lead: Lead) => React.ReactNode
}

export interface LeadFilterOptions {
  temperatures: Array<{ value: string; label: string }>
  statuses: Array<{ value: string; label: string }>
}

export interface AdminComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LeadActionProps {
  lead: Lead
  onUpdate?: (lead: Lead) => void
  onDelete?: (leadId: string) => void
}
