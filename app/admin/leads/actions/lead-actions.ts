"use server"

import { revalidatePath } from "next/cache"
import { LeadQueries } from "@/lib/db/queries"
import type { LeadUpdate } from "@/lib/db/schema"
import { updateLeadSchema } from "@/lib/db/schema"
import type { LeadStatus } from "@/lib/schemas/leads"

export async function updateLeadAction(leadId: string, data: LeadUpdate) {
  try {
    const validatedData = updateLeadSchema.parse(data)
    const updatedLead = await LeadQueries.update(leadId, validatedData)

    if (!updatedLead) {
      throw new Error("Lead not found")
    }

    revalidatePath("/admin/leads")
    return { success: true, lead: updatedLead }
  } catch (error) {
    console.error("Failed to update lead:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update lead",
    }
  }
}

export async function deleteLeadAction(leadId: string) {
  try {
    const success = await LeadQueries.delete(leadId)

    if (!success) {
      throw new Error("Lead not found")
    }

    revalidatePath("/admin/leads")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete lead:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete lead",
    }
  }
}

export async function updateLeadStatusAction(leadId: string, status: LeadStatus) {
  return updateLeadAction(leadId, { status })
}

export async function assignLeadAction(leadId: string, assignedTo: string) {
  return updateLeadAction(leadId, { assignedTo })
}

export async function addLeadNoteAction(leadId: string, note: string) {
  try {
    const lead = await LeadQueries.getById(leadId)
    if (!lead) {
      throw new Error("Lead not found")
    }

    const existingNotes = lead.notes || ""
    const timestamp = new Date().toISOString()
    const newNote = `[${timestamp}] ${note}`
    const updatedNotes = existingNotes ? `${existingNotes}\n${newNote}` : newNote

    return updateLeadAction(leadId, { notes: updatedNotes })
  } catch (error) {
    console.error("Failed to add note:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add note",
    }
  }
}
