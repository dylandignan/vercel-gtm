import { z } from "zod"

// Lead enrichment schema - used across multiple API routes
export const leadEnrichmentSchema = z.object({
  companySize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  industry: z.string(),
  likelyBudget: z.enum(["under-1k", "1k-5k", "5k-15k", "15k-50k", "50k+"]),
  urgencyScore: z.number().min(1).max(10),
  recommendedPlan: z.enum(["pro", "enterprise", "custom"]),
  keyPainPoints: z.array(z.string()),
  nextBestQuestion: z.string().optional(),
})

// Lead scoring schema - used in scoring API and components
export const leadScoringSchema = z.object({
  totalScore: z.number().min(0).max(100),
  scoreBreakdown: z.object({
    companySize: z.number().min(0).max(20),
    jobTitle: z.number().min(0).max(20),
    budget: z.number().min(0).max(15),
    timeline: z.number().min(0).max(15),
    useCase: z.number().min(0).max(10),
    engagement: z.number().min(0).max(10),
    buyingSignals: z.number().min(0).max(10),
  }),
  leadTemperature: z.enum(["hot", "warm", "cold"]),
  priority: z.enum(["high", "medium", "low"]),
  recommendedAction: z.enum(["immediate_call", "demo_booking", "nurture_sequence", "disqualify"]),
  reasoning: z.string(),
  buyingSignals: z.array(z.string()),
  riskFactors: z.array(z.string()),
  nextBestActions: z.array(z.string()),
})

// Form data schema - used in components and API validation
export const formDataSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  company: z.string().min(1),
  jobTitle: z.string().optional(),
  useCase: z.string().min(1),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
})

// API request schemas
export const enrichLeadRequestSchema = formDataSchema.pick({
  email: true,
  company: true,
  jobTitle: true,
  useCase: true,
})

export const scoreLeadRequestSchema = z.object({
  leadData: formDataSchema,
  conversationHistory: z.array(z.any()).optional(),
  enrichmentData: leadEnrichmentSchema.optional(),
})

// Inferred TypeScript types
export type LeadEnrichment = z.infer<typeof leadEnrichmentSchema>
export type LeadScore = z.infer<typeof leadScoringSchema>
export type FormData = z.infer<typeof formDataSchema>
export type EnrichLeadRequest = z.infer<typeof enrichLeadRequestSchema>
export type ScoreLeadRequest = z.infer<typeof scoreLeadRequestSchema>
