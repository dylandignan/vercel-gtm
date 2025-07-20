import { eq, desc, and, or, ilike } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import { db, leads } from "@/lib/db/index"
import type { Lead, NewLead, LeadUpdate, LeadFilters } from "@/lib/db/schema"

export class LeadQueries {
  static async create(data: NewLead): Promise<Lead> {
    try {
      const [lead] = await db
        .insert(leads)
        .values({
          ...data,
          updatedAt: new Date(),
        })
        .returning()

      return lead
    } catch (error) {
      console.error("Failed to create lead:", error)
      throw new Error("Failed to create lead")
    }
  }

  static async upsert(data: NewLead): Promise<Lead> {
    try {
      const [lead] = await db
        .insert(leads)
        .values({
          ...data,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: leads.email,
          set: {
            ...data,
            updatedAt: new Date(),
          },
        })
        .returning()

      return lead
    } catch (error) {
      console.error("Failed to upsert lead:", error)
      throw new Error("Failed to upsert lead")
    }
  }

  // Cache leads query for 5 minutes
  static getAll = unstable_cache(
    async (filters: LeadFilters = {}): Promise<Lead[]> => {
      try {
        let query = db.select().from(leads)

        const conditions = []

        if (filters.temperature) {
          conditions.push(eq(leads.leadTemperature, filters.temperature))
        }

        if (filters.status) {
          conditions.push(eq(leads.status, filters.status))
        }

        if (filters.search) {
          const searchTerm = `%${filters.search}%`
          conditions.push(
            or(ilike(leads.company, searchTerm), ilike(leads.email, searchTerm), ilike(leads.useCase, searchTerm)),
          )
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions))
        }

        return await query.orderBy(desc(leads.createdAt))
      } catch (error) {
        console.error("Failed to get leads:", error)
        return []
      }
    },
    ["leads-all"],
    {
      revalidate: 300, // 5 minutes
      tags: ["leads"],
    },
  )

  static async getById(id: string): Promise<Lead | null> {
    try {
      const [lead] = await db.select().from(leads).where(eq(leads.id, id)).limit(1)
      return lead || null
    } catch (error) {
      console.error("Failed to get lead by id:", error)
      return null
    }
  }

  static async getByEmail(email: string): Promise<Lead | null> {
    try {
      const [lead] = await db.select().from(leads).where(eq(leads.email, email)).limit(1)
      return lead || null
    } catch (error) {
      console.error("Failed to get lead by email:", error)
      return null
    }
  }

  static async update(id: string, data: LeadUpdate): Promise<Lead | null> {
    try {
      const [lead] = await db
        .update(leads)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(leads.id, id))
        .returning()

      return lead || null
    } catch (error) {
      console.error("Failed to update lead:", error)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const result = await db.delete(leads).where(eq(leads.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Failed to delete lead:", error)
      return false
    }
  }

  // Cache stats for 2 minutes
  static getStats = unstable_cache(
    async () => {
      try {
        const allLeads = await db.select().from(leads)

        const stats = {
          total: allLeads.length,
          hot: allLeads.filter((l) => l.leadTemperature === "hot").length,
          warm: allLeads.filter((l) => l.leadTemperature === "warm").length,
          cold: allLeads.filter((l) => l.leadTemperature === "cold").length,
          new: allLeads.filter((l) => l.status === "new").length,
          avgScore:
            allLeads.length > 0
              ? Math.round(allLeads.reduce((sum, lead) => sum + lead.totalScore, 0) / allLeads.length)
              : 0,
        }

        return stats
      } catch (error) {
        console.error("Failed to get stats:", error)
        return {
          total: 0,
          hot: 0,
          warm: 0,
          cold: 0,
          new: 0,
          avgScore: 0,
        }
      }
    },
    ["lead-stats"],
    {
      revalidate: 120, // 2 minutes
      tags: ["leads", "stats"],
    },
  )
}
