import { type NextRequest, NextResponse } from "next/server"
import { LeadQueries } from "@/lib/db/queries"
import { insertLeadSchema, leadFiltersSchema } from "@/lib/db/schema"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertLeadSchema.parse(body)
    const lead = await LeadQueries.upsert(validatedData)

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error("API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = leadFiltersSchema.parse({
      temperature: searchParams.get("temperature"),
      status: searchParams.get("status"),
      search: searchParams.get("search"),
    })

    const leads = await LeadQueries.getAll(filters)
    return NextResponse.json({ leads })
  } catch (error) {
    console.error("API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid filters", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
