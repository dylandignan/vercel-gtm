import { z } from "zod"

export const leadTemperatureSchema = z.enum(["hot", "warm", "cold"])
export const leadStatusSchema = z.enum(["new", "contacted", "qualified", "demo_scheduled", "closed_won", "closed_lost"])
export const prioritySchema = z.enum(["high", "medium", "low"])

export const leadEnrichmentSchema = z.object({
  companySize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  industry: z.string(),
  likelyBudget: z.enum(["under-1k", "1k-5k", "5k-15k", "15k-50k", "50k+"]),
  urgencyScore: z.number().min(1).max(10),
  recommendedPlan: z.enum(["pro", "enterprise", "custom"]),
})

export const scoreBreakdownSchema = z.object({
  companySize: z.number().min(0).max(20),
  jobTitle: z.number().min(0).max(20),
  budget: z.number().min(0).max(15),
  timeline: z.number().min(0).max(15),
  useCase: z.number().min(0).max(10),
  engagement: z.number().min(0).max(10),
  buyingSignals: z.number().min(0).max(10),
})

export const leadScoringSchema = z.object({
  totalScore: z.number().min(0).max(100),
  scoreBreakdown: scoreBreakdownSchema,
  leadTemperature: leadTemperatureSchema,
  priority: prioritySchema,
  recommendedAction: z.enum(["immediate_call", "demo_booking", "nurture_sequence", "disqualify", "self_service"]),
  reasoning: z.string(),
  buyingSignals: z.array(z.string()),
  riskFactors: z.array(z.string()),
  nextBestActions: z.array(z.string()),
})

export const leadTemperatureQuerySchema = z
  .string()
  .optional()
  .transform((val) => val?.split(",").filter(Boolean))
  .pipe(z.array(leadTemperatureSchema).optional())

export const leadStatusQuerySchema = z
  .string()
  .optional()
  .transform((val) => val?.split(",").filter(Boolean))
  .pipe(z.array(leadStatusSchema).optional())

export const leadSearchParamsSchema = z.object({
  search: z.string().optional(),
  temperature: leadTemperatureQuerySchema,
  status: leadStatusQuerySchema,
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
})

export type LeadTemperature = z.infer<typeof leadTemperatureSchema>
export type LeadStatus = z.infer<typeof leadStatusSchema>
export type Priority = z.infer<typeof prioritySchema>
export type LeadEnrichment = z.infer<typeof leadEnrichmentSchema>
export type LeadScoring = z.infer<typeof leadScoringSchema>
export type ScoreBreakdown = z.infer<typeof scoreBreakdownSchema>
export type LeadSearchParams = z.infer<typeof leadSearchParamsSchema>
