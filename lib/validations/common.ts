import { z } from "zod"

// Environment variable validation - used globally
export const envSchema = z.object({
  POSTGRES_URL: z.string().url("Invalid database URL"),
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url("Invalid site URL").optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export type EnvVars = z.infer<typeof envSchema>

// Database limits - used by multiple API routes
export const DB_LIMITS = {
  MAX_LEADS_PER_PAGE: 50,
  DEFAULT_PAGE_SIZE: 20,
  MAX_SEARCH_LENGTH: 100,
  MAX_NOTE_LENGTH: 2000,
} as const
