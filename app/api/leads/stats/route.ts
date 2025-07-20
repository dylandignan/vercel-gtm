import { NextResponse } from "next/server"
import { LeadQueries } from "@/lib/db/queries"

export async function GET() {
  try {
    const stats = await LeadQueries.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
