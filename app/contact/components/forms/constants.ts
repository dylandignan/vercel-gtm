// Form-specific constants and messages
export const PLACEHOLDERS = {
  EMAIL: "john@company.com",
  FIRST_NAME: "John",
  LAST_NAME: "Doe",
  COMPANY: "Acme Inc",
  USE_CASE: "Tell us about your project, current challenges, and goals...",
} as const

export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  VALIDATION: "Please check your input and try again.",
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_COMPANY: "Please enter a valid company name",
  USE_CASE_TOO_SHORT: "Please provide more details about your use case",
} as const

export const LOADING_MESSAGES = {
  SUBMITTING: "Submitting...",
  ANALYZING: "Analyzing your project...",
  ENRICHING: "Enriching lead data...",
} as const

export const JOB_TITLE_OPTIONS = [
  { value: "cto", label: "CTO / Chief Technology Officer" },
  { value: "ceo", label: "CEO / Founder" },
  { value: "vp-engineering", label: "VP Engineering / Director" },
  { value: "senior-engineer", label: "Senior/Lead Engineer" },
  { value: "engineer", label: "Software Engineer/Developer" },
  { value: "other", label: "Other" },
] as const

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP (This month)" },
  { value: "1-3months", label: "1-3 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "exploring", label: "Just exploring options" },
] as const

export const BUDGET_OPTIONS = [
  { value: "10k+", label: "$10,000+ per month" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "1k-5k", label: "$1,000 - $5,000" },
  { value: "500-1k", label: "$500 - $1,000" },
  { value: "under-500", label: "Under $500" },
  { value: "not-sure", label: "Not sure yet" },
] as const
