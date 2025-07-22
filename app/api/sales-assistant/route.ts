import { streamText, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { db } from "@/lib/db"
import { leads } from "@/lib/db/schema"
import { leadTemperatureSchema, leadStatusSchema } from "@/lib/schemas/leads"
import { eq, desc, asc, count, sql, and, like, gte, lte } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const tools = {
      listTables: tool({
        description: "List all tables in the database with their schema information",
        parameters: z.object({
          schema: z.string().optional().default("public").describe("Database schema to query"),
        }),
        execute: async ({ schema }) => {
          const tables = await db.execute(sql`
            SELECT 
              table_name,
              table_type,
              table_schema
            FROM information_schema.tables 
            WHERE table_schema = ${schema}
            ORDER BY table_name
          `)

          return {
            schema,
            tables: tables,
          }
        },
      }),

      executeSQL: tool({
        description: "Execute a SELECT SQL query against the database (read-only for safety)",
        parameters: z.object({
          query: z.string().describe("SQL query to execute (SELECT statements only)"),
        }),
        execute: async ({ query }) => {
          const trimmedQuery = query.trim().toLowerCase()
          if (!trimmedQuery.startsWith("select")) {
            throw new Error("Only SELECT queries are allowed for safety. Use SELECT statements to query data.")
          }

          try {
            const result = await db.execute(sql.raw(query))

            return {
              query,
              rows: result,
              rowCount: result.length,
            }
          } catch (error) {
            return {
              query,
              error: error instanceof Error ? error.message : "Unknown error",
              suggestion:
                "Check your SQL syntax. Remember to use proper PostgreSQL syntax and quote table/column names if needed.",
            }
          }
        },
      }),

      describeTable: tool({
        description: "Get detailed column information for a specific table",
        parameters: z.object({
          tableName: z.string().describe("Name of the table to describe"),
          schema: z.string().optional().default("public").describe("Database schema"),
        }),
        execute: async ({ tableName, schema }) => {
          const columns = await db.execute(sql`
            SELECT 
              column_name,
              data_type,
              is_nullable,
              column_default,
              character_maximum_length
            FROM information_schema.columns 
            WHERE table_schema = ${schema} AND table_name = ${tableName}
            ORDER BY ordinal_position
          `)

          return {
            tableName,
            schema,
            columns: columns,
          }
        },
      }),
    }

    const result = await streamText({
      model: openai("gpt-4o"),
      messages,
      tools,
      maxSteps: 5,
      system: `You are a Vercel sales assistant with direct access to our PostgreSQL database.

Available Tools:
- listTables: See all available tables in the database
- describeTable: Get detailed column information for any table  
- executeSQL: Run SELECT queries to get specific data

Your role:
- Help sales reps analyze leads and answer any data questions
- Provide insights on lead data, trends, and pipeline health
- Answer questions by exploring the database structure and querying appropriately
- Always provide helpful summaries and actionable insights
- After using tools, ALWAYS provide a conversational response summarizing your findings

Best Practices:
1. Start by exploring table structure if unfamiliar with the data
2. Use PostgreSQL syntax for queries (case-sensitive column names, proper quoting)
3. Always use LIMIT clauses to avoid overwhelming responses
4. Focus on insights and trends, not just raw data dumps
5. Be helpful and provide context for your findings
6. Only use SELECT statements - no data modifications allowed

Remember: You can answer any question about the data by exploring tables and writing appropriate SQL queries!`,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error("Sales assistant API error:", error)

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
