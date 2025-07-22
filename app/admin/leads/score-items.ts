import { Building, User, DollarSign, Clock, Target, MessageSquare, Zap } from "lucide-react"

export const SCORE_ITEMS = [
  {
    label: "Company Size",
    key: "companySize" as const,
    max: 20,
    icon: Building,
    description: "Based on company employee count",
  },
  {
    label: "Job Title",
    key: "jobTitle" as const,
    max: 20,
    icon: User,
    description: "Decision-making authority level",
  },
  {
    label: "Budget",
    key: "budget" as const,
    max: 15,
    icon: DollarSign,
    description: "Available budget range",
  },
  {
    label: "Timeline",
    key: "timeline" as const,
    max: 15,
    icon: Clock,
    description: "Urgency of implementation",
  },
  {
    label: "Use Case",
    key: "useCase" as const,
    max: 10,
    icon: Target,
    description: "Complexity and fit assessment",
  },
  {
    label: "Engagement",
    key: "engagement" as const,
    max: 10,
    icon: MessageSquare,
    description: "Quality of form responses",
  },
  {
    label: "Buying Signals",
    key: "buyingSignals" as const,
    max: 10,
    icon: Zap,
    description: "Indicators of purchase intent",
  },
] as const
