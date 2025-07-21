import { eq, desc, and, or, ilike, inArray, SQL, count } from "drizzle-orm"
import { db } from "@/lib/db"
import { leads, type Lead, type NewLead, type LeadUpdate } from "@/lib/db/schema"
import type { LeadSearchParams } from "@/lib/schemas/leads"

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

static getAll = async (filters: Partial<LeadSearchParams> = {}): Promise<{ leads: Lead[], total: number }> => {
  try {
    const { page = 1, limit = 20, ...searchFilters } = filters
    const offset = (page - 1) * limit
    
    // Build an array of SQL snippets, skipping undefined entries
    const conditions: SQL[] = [
      searchFilters.temperature && searchFilters.temperature.length > 0 && inArray(leads.leadTemperature, searchFilters.temperature),
      searchFilters.status && searchFilters.status.length > 0 && inArray(leads.status, searchFilters.status),
      searchFilters.search && or(
        ilike(leads.company, `%${searchFilters.search}%`),
        ilike(leads.email,   `%${searchFilters.search}%`),
        ilike(leads.useCase, `%${searchFilters.search}%`)
      )
    ].filter(Boolean) as SQL[];

    const whereClause = conditions.length ? and(...conditions) : undefined;
    
    // Get total count for pagination
    const [{ total }] = await db
      .select({ total: count() })
      .from(leads)
      .where(whereClause)
    
    // Get paginated results
    const result = await db
      .select()
      .from(leads)
      .where(whereClause)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset(offset)

    return { leads: result, total };
  } catch (error) {
    console.error("Failed to get leads:", error);
    return { leads: [], total: 0 };
  }
};


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
      return result.length > 0
    } catch (error) {
      console.error("Failed to delete lead:", error)
      return false
    }
  }

  static getStats = async () => {
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
    }
}
