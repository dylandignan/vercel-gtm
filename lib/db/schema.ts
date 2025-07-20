import { pgTable, uuid, timestamp, text, integer, jsonb, index } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),

    // Basic lead info
    email: text("email").notNull().unique(),
    company: text("company").notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    jobTitle: text("job_title"),
    useCase: text("use_case").notNull(),
    timeline: text("timeline"),
    budgetRange: text("budget_range"),

    // Enrichment data
    enrichmentData: jsonb("enrichment_data"),

    // Lead scoring
    totalScore: integer("total_score").default(0).notNull(),
    scoreBreakdown: jsonb("score_breakdown"),
    leadTemperature: text("lead_temperature", {
      enum: ["hot", "warm", "cold"],
    }),
    priority: text("priority", {
      enum: ["high", "medium", "low"],
    }),
    recommendedAction: text("recommended_action"),
    reasoning: text("reasoning"),
    buyingSignals: text("buying_signals").array(),
    riskFactors: text("risk_factors").array(),
    nextBestActions: text("next_best_actions").array(),

    // Status tracking
    status: text("status", {
      enum: ["new", "contacted", "qualified", "demo_scheduled", "closed_won", "closed_lost"],
    })
      .default("new")
      .notNull(),
    assignedTo: text("assigned_to"),
    notes: text("notes"),
  },
  (table) => ({
    // Indexes for better query performance
    createdAtIdx: index("idx_leads_created_at").on(table.createdAt.desc()),
    temperatureIdx: index("idx_leads_temperature").on(table.leadTemperature),
    scoreIdx: index("idx_leads_score").on(table.totalScore.desc()),
    statusIdx: index("idx_leads_status").on(table.status),
    companyIdx: index("idx_leads_company").on(table.company),
  }),
)

// Enhanced Zod schemas with better validation
export const insertLeadSchema = createInsertSchema(leads, {
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  useCase: z.string().min(1, "Use case is required"),
  totalScore: z.number().min(0).max(100),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  jobTitle: z.string().optional(),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
})

export const selectLeadSchema = createSelectSchema(leads)

export const updateLeadSchema = insertLeadSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// Lead filter schema for API queries
export const leadFiltersSchema = z.object({
  temperature: z.enum(["hot", "warm", "cold"]).optional(),
  status: z.enum(["new", "contacted", "qualified", "demo_scheduled", "closed_won", "closed_lost"]).optional(),
  search: z.string().optional(),
})

// Inferred types - single source of truth
export type Lead = typeof leads.$inferSelect
export type NewLead = z.infer<typeof insertLeadSchema>
export type LeadUpdate = z.infer<typeof updateLeadSchema>
export type LeadFilters = z.infer<typeof leadFiltersSchema>
