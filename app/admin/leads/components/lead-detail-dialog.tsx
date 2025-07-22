"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Phone, Mail, Calendar, Save, Plus } from "lucide-react"
import { TemperatureBadge } from "@/app/admin/leads/components/temperature-badge"
import { updateLeadStatusAction, addLeadNoteAction } from "../actions/lead-actions"
import { toast } from "sonner"
import type { Lead } from "@/lib/db/schema"
import type { ScoreBreakdown, LeadStatus } from "@/lib/schemas/leads"
import { SCORE_ITEMS } from "@/app/admin/leads/score-items"
import { STATUS_OPTIONS } from "@/app/admin/leads/display-options"

interface LeadDetailDialogProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
}


export function LeadDetailDialog({ lead, isOpen, onClose }: LeadDetailDialogProps) {
  console.log(JSON.stringify(lead, null, 2))
  const [isPending, startTransition] = useTransition()
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [optimisticNotes, setOptimisticNotes] = useState(lead?.notes || "")

  if (!lead) return null

  const scoreBreakdown = (lead.scoreBreakdown as ScoreBreakdown) || {}

  const handleStatusChange = (newStatus: LeadStatus) => {
    startTransition(async () => {
      const result = await updateLeadStatusAction(lead.id, newStatus)
      if (result.success) {
        toast.success(`Lead status changed to ${newStatus}`)
      } else {
        toast.error(result.error)
      }
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    // Optimistic update
    const timestamp = new Date().toISOString()
    const formattedNote = `[${timestamp}] ${newNote.trim()}`
    const updatedNotes = optimisticNotes ? `${optimisticNotes}\n${formattedNote}` : formattedNote
    setOptimisticNotes(updatedNotes)

    startTransition(async () => {
      const result = await addLeadNoteAction(lead.id, newNote.trim())
      if (result.success) {
        setNewNote("")
        setIsAddingNote(false)
        toast.success("Note has been added to the lead")
      } else {
        toast.error(result.error)
        // Revert optimistic update on error
        setOptimisticNotes(lead.notes || "")
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{lead.company}</span>
            <TemperatureBadge temperature={lead.leadTemperature} />
          </DialogTitle>
          <DialogDescription>Lead details and scoring breakdown</DialogDescription>
        </DialogHeader>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
          <Select value={lead.status} onValueChange={handleStatusChange} disabled={isPending}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Email</div>
              <div className="text-gray-900">{lead.email}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Job Title</div>
              <div className="text-gray-900">{lead.jobTitle || "Not provided"}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Timeline</div>
              <div className="text-gray-900">{lead.timeline || "Not provided"}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Budget Range</div>
              <div className="text-gray-900">{lead.budgetRange || "Not provided"}</div>
            </div>
          </div>

          {/* Use Case */}
          <div>
            <div className="mb-2 text-sm font-medium text-gray-700">Use Case</div>
            <div className="rounded-lg bg-gray-50 p-4 text-gray-900">{lead.useCase}</div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Lead Score Breakdown</div>
              <div className="text-2xl font-medium text-gray-900">{lead.totalScore}/100</div>
            </div>
            <div className="space-y-3">
              {SCORE_ITEMS.map((item) => {
                const value = scoreBreakdown[item.key] || 0
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-black transition-all duration-300"
                          style={{ width: `${item.max > 0 ? (value / item.max) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="w-8 text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Buying Signals */}
          {lead.buyingSignals && lead.buyingSignals.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Buying Signals</div>
              <div className="space-y-2">
                {lead.buyingSignals.map((signal, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-sm text-gray-700">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Factors */}
          {lead.riskFactors && lead.riskFactors.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Risk Factors</div>
              <div className="space-y-2">
                {lead.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <AlertTriangle className="h-3 w-3 text-amber-600" />
                    <span className="text-sm text-gray-700">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Notes</div>
              <Button variant="outline" size="sm" onClick={() => setIsAddingNote(true)} className="border-gray-300">
                <Plus className="mr-1 h-4 w-4" />
                Add Note
              </Button>
            </div>

            {optimisticNotes ? (
              <div className="mb-4 space-y-2">
                {optimisticNotes.split("\n").map((note, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                    {note}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 text-sm text-gray-500 italic">
                No notes yet. Add a note to track important information about this lead.
              </div>
            )}

            {isAddingNote && (
              <div className="space-y-3 rounded-lg border border-gray-200 p-4">
                <Textarea
                  placeholder="Add a note about this lead..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleAddNote} disabled={!newNote.trim() || isPending} size="sm">
                    <Save className="mr-1 h-4 w-4" />
                    Save Note
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingNote(false)
                      setNewNote("")
                    }}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Action */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-1 text-sm font-medium text-gray-700">Recommended Action</div>
            <div className="mb-2 font-medium text-gray-900 capitalize">
              {lead.recommendedAction?.replace("_", " ") || "Continue conversation"}
            </div>
            <div className="text-sm text-gray-600">{lead.reasoning}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 border-t border-gray-200 pt-4">
            <Button className="flex-1 bg-black hover:bg-gray-800">
              <Phone className="mr-2 h-4 w-4" />
              Call Lead
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300 bg-transparent">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300 bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
