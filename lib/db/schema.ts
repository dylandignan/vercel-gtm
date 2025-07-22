import { sql } from "drizzle-orm"
import { pgTable, uuid, timestamp, text, integer, jsonb, index, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { 
  leadTemperatureSchema,
  leadStatusSchema,
  prioritySchema,
  type LeadEnrichment,
  type ScoreBreakdown
} from "@/lib/schemas/leads"

export const leads = pgTable("leads", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`),
    updatedAt: timestamp("updated_at").notNull().default(sql`now()`),

    email: varchar("email", { length: 255 }).notNull().unique(),
    company: varchar("company", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    jobTitle: varchar("job_title", { length: 200 }),
    useCase: text("use_case").notNull(),
    timeline: varchar("timeline", { length: 50 }),
    budgetRange: varchar("budget_range", { length: 50 }),

    enrichmentData: jsonb("enrichment_data").$type<LeadEnrichment>(),

    totalScore: integer("total_score").notNull().default(0),
    scoreBreakdown: jsonb("score_breakdown").$type<ScoreBreakdown>(),
    leadTemperature: text("lead_temperature", {
      enum: leadTemperatureSchema.options
    }),
    priority: text("priority", {
      enum: prioritySchema.options
    }),
    recommendedAction: varchar("recommended_action", { length: 500 }),
    reasoning: text("reasoning"),
    buyingSignals: text("buying_signals").array(),
    riskFactors: text("risk_factors").array(),
    nextBestActions: text("next_best_actions").array(),

    status: text("status", {
      enum: leadStatusSchema.options
    }).notNull().default("new"),
    assignedTo: varchar("assigned_to", { length: 100 }),
    notes: text("notes"),
}, (table) => [
    index("idx_leads_created_at").on(table.createdAt),
    index("idx_leads_temperature").on(table.leadTemperature),
    index("idx_leads_score").on(table.totalScore),
    index("idx_leads_status").on(table.status),
    index("idx_leads_company").on(table.company),
    index("idx_leads_email").on(table.email),
    index("idx_leads_status_temp").on(table.status, table.leadTemperature),
    index("idx_leads_score_temp").on(table.totalScore, table.leadTemperature),
    index("idx_leads_created_status").on(table.createdAt, table.status),
    index("idx_leads_dashboard").on(table.status, table.totalScore, table.createdAt),
    index("idx_leads_enrichment_industry").using("gin", sql`(enrichment_data->'industry')`),
    index("idx_leads_enrichment_company_size").using("gin", sql`(enrichment_data->'companySize')`),
    index("idx_leads_search").using("gin", sql`to_tsvector('english', ${table.company} || ' ' || ${table.useCase})`),
])

export const leadSchema = createSelectSchema(leads)
export const insertLeadSchema = createInsertSchema(leads)
export const updateLeadSchema = createUpdateSchema(leads).omit({ id: true, createdAt: true, updatedAt: true })

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
export type LeadUpdate = Partial<NewLead>
