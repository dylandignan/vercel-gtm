DROP INDEX "idx_leads_created_at";--> statement-breakpoint
DROP INDEX "idx_leads_score";--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "company" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "first_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "last_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "job_title" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "timeline" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "budget_range" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "recommended_action" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "assigned_to" SET DATA TYPE varchar(100);--> statement-breakpoint
CREATE INDEX "idx_leads_email" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_leads_status_temp" ON "leads" USING btree ("status","lead_temperature");--> statement-breakpoint
CREATE INDEX "idx_leads_score_temp" ON "leads" USING btree ("total_score","lead_temperature");--> statement-breakpoint
CREATE INDEX "idx_leads_created_status" ON "leads" USING btree ("created_at","status");--> statement-breakpoint
CREATE INDEX "idx_leads_dashboard" ON "leads" USING btree ("status","total_score","created_at");--> statement-breakpoint
CREATE INDEX "idx_leads_enrichment_industry" ON "leads" USING gin ((enrichment_data->'industry'));--> statement-breakpoint
CREATE INDEX "idx_leads_enrichment_company_size" ON "leads" USING gin ((enrichment_data->'companySize'));--> statement-breakpoint
CREATE INDEX "idx_leads_search" ON "leads" USING gin (to_tsvector('english', "company" || ' ' || "use_case"));--> statement-breakpoint
CREATE INDEX "idx_leads_created_at" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_leads_score" ON "leads" USING btree ("total_score");