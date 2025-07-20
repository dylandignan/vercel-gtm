CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"job_title" text,
	"use_case" text NOT NULL,
	"timeline" text,
	"budget_range" text,
	"enrichment_data" jsonb,
	"total_score" integer DEFAULT 0 NOT NULL,
	"score_breakdown" jsonb,
	"lead_temperature" text,
	"priority" text,
	"recommended_action" text,
	"reasoning" text,
	"buying_signals" text[],
	"risk_factors" text[],
	"next_best_actions" text[],
	"status" text DEFAULT 'new' NOT NULL,
	"assigned_to" text,
	"notes" text,
	CONSTRAINT "leads_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "idx_leads_created_at" ON "leads" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_leads_temperature" ON "leads" USING btree ("lead_temperature");--> statement-breakpoint
CREATE INDEX "idx_leads_score" ON "leads" USING btree ("total_score" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_leads_status" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_leads_company" ON "leads" USING btree ("company");