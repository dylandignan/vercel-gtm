import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/lib/db/schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

// Create the connection
const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString, { prepare: false })

// Create the database instance
export const db = drizzle(client, { schema })

// Re-export everything from schema
export * from "@/lib/db/schema"
