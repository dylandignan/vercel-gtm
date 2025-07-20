import { Building, User, DollarSign, Clock, Target, MessageSquare, Zap } from "lucide-react"

// Admin-specific lead constants
export const LEAD_TEMPERATURES = {
  HOT: "hot",
  WARM: "warm",
  COLD: "cold",
} as const

export const LEAD_STATUSES = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  DEMO_SCHEDULED: "demo_scheduled",
  CLOSED_WON: "closed_won",
  CLOSED_LOST: "closed_lost",
} as const

export const LEAD_STATUS_CONFIG = {
  [LEAD_STATUSES.NEW]: {
    label: "New",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Recently submitted",
  },
  [LEAD_STATUSES.CONTACTED]: {
    label: "Contacted",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Initial contact made",
  },
  [LEAD_STATUSES.QUALIFIED]: {
    label: "Qualified",
    color: "bg-green-50 text-green-700 border-green-200",
    description: "Meets qualification criteria",
  },
  [LEAD_STATUSES.DEMO_SCHEDULED]: {
    label: "Demo Scheduled",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Demo call scheduled",
  },
  [LEAD_STATUSES.CLOSED_WON]: {
    label: "Closed Won",
    color: "bg-green-50 text-green-700 border-green-200",
    description: "Successfully converted",
  },
  [LEAD_STATUSES.CLOSED_LOST]: {
    label: "Closed Lost",
    color: "bg-red-50 text-red-700 border-red-200",
    description: "Did not convert",
  },
} as const

export const SCORE_ITEMS = [
  {
    label: "Company Size",
    key: "companySize",
    max: 20,
    icon: Building,
    description: "Based on company employee count",
  },
  {
    label: "Job Title",
    key: "jobTitle",
    max: 20,
    icon: User,
    description: "Decision-making authority level",
  },
  {
    label: "Budget",
    key: "budget",
    max: 15,
    icon: DollarSign,
    description: "Available budget range",
  },
  {
    label: "Timeline",
    key: "timeline",
    max: 15,
    icon: Clock,
    description: "Urgency of implementation",
  },
  {
    label: "Use Case",
    key: "useCase",
    max: 10,
    icon: Target,
    description: "Complexity and fit assessment",
  },
  {
    label: "Engagement",
    key: "engagement",
    max: 10,
    icon: MessageSquare,
    description: "Quality of form responses",
  },
  {
    label: "Buying Signals",
    key: "buyingSignals",
    max: 10,
    icon: Zap,
    description: "Indicators of purchase intent",
  },
] as const

export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "demo_scheduled", label: "Demo Scheduled" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
] as const

// Admin-specific messages
export const ADMIN_MESSAGES = {
  LEAD_UPDATED: "Lead updated successfully",
  LEAD_DELETED: "Lead deleted successfully",
  STATUS_UPDATED: "Status updated successfully",
  NOTE_ADDED: "Note added successfully",
  LEAD_NOT_FOUND: "Lead not found",
  SEARCH_LEADS: "Search leads...",
  ADD_NOTE: "Add a note about this lead...",
} as const
