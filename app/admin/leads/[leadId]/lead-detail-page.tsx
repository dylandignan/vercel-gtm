"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertTriangle, CheckCircle, Plus, Save, X } from "lucide-react"
import { TemperatureBadge } from "@/app/admin/leads/components/temperature-badge"
import { updateLeadStatusAction, addLeadNoteAction } from "@/app/admin/leads/actions/lead-actions"
import { toast } from "sonner"
import type { Lead } from "@/lib/db/schema"
import type { ScoreBreakdown, LeadStatus } from "@/lib/schemas/leads"
import { SCORE_ITEMS } from "@/app/admin/leads/score-items"
import {
  STATUS_OPTIONS,
  getJobTitleLabel,
  getTimelineLabel,
  getBudgetRangeLabel,
} from "@/app/admin/leads/display-options"

interface LeadDetailPageProps {
  lead: Lead
}

export function LeadDetailPage({ lead }: LeadDetailPageProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [optimisticNotes, setOptimisticNotes] = useState(lead?.notes || "")

  const scoreBreakdown = (lead.scoreBreakdown as ScoreBreakdown) || {}

  const handleStatusChange = (newStatus: LeadStatus) => {
    startTransition(async () => {
      const result = await updateLeadStatusAction(lead.id, newStatus)
      if (result.success) {
        toast.success(`Lead status changed to ${newStatus}`)
        router.refresh()
      } else {
        toast.error(result.error)
      }
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

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
        router.refresh()
      } else {
        toast.error(result.error)
        setOptimisticNotes(lead.notes || "")
      }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/leads")} className="border-gray-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Button>
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" />
              </svg>
              <span className="text-xl font-medium text-black">Vercel</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Lead Details</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-medium text-black">{lead.company}</h1>
              <TemperatureBadge temperature={lead.leadTemperature} />
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Full Name</div>
              <div className="text-gray-900">
                {[lead.firstName, lead.lastName].filter(Boolean).join(" ") || "Not provided"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Email</div>
              <div className="text-gray-900">{lead.email}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Job Title</div>
              <div className="text-gray-900">{lead.jobTitle ? getJobTitleLabel(lead.jobTitle) : "Not provided"}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Company</div>
              <div className="text-gray-900">{lead.company}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Timeline</div>
              <div className="text-gray-900">{lead.timeline ? getTimelineLabel(lead.timeline) : "Not provided"}</div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Budget Range</div>
              <div className="text-gray-900">
                {lead.budgetRange ? getBudgetRangeLabel(lead.budgetRange) : "Not provided"}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-gray-700">Use Case</div>
            <div className="rounded-lg bg-gray-50 p-4 text-gray-900">{lead.useCase}</div>
          </div>

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

          {lead.nextBestActions && lead.nextBestActions.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Next Best Actions</div>
              <div className="space-y-2">
                {lead.nextBestActions.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                    <span className="text-sm text-gray-700">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lead.enrichmentData && (
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">AI Enrichment Data</div>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-600">Company Size</div>
                    <div className="text-sm text-gray-900">{lead.enrichmentData.companySize || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-600">Industry</div>
                    <div className="text-sm text-gray-900">{lead.enrichmentData.industry || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-600">Likely Budget</div>
                    <div className="text-sm text-gray-900">{lead.enrichmentData.likelyBudget || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-600">Urgency Score</div>
                    <div className="text-sm text-gray-900">
                      {lead.enrichmentData.urgencyScore ? `${lead.enrichmentData.urgencyScore}/10` : "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-600">Recommended Plan</div>
                    <div className="text-sm text-gray-900 capitalize">
                      {lead.enrichmentData.recommendedPlan || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {lead.recommendedAction && (
            <div
              className={`rounded-lg p-4 ${lead.recommendedAction === "self_service" ? "border border-blue-200 bg-blue-50" : "bg-gray-50"}`}
            >
              <div className="mb-1 text-sm font-medium text-gray-700">Recommended Action</div>
              <div
                className={`mb-2 font-medium capitalize ${lead.recommendedAction === "self_service" ? "text-blue-900" : "text-gray-900"}`}
              >
                {lead.recommendedAction === "self_service"
                  ? "✨ Self-Service (Vercel Pro)"
                  : lead.recommendedAction?.replace("_", " ") || "Continue conversation"}
              </div>
              <div
                className={`text-sm ${lead.recommendedAction === "self_service" ? "text-blue-700" : "text-gray-600"}`}
              >
                {lead.reasoning}
              </div>
              {lead.recommendedAction === "self_service" && (
                <div className="mt-3 rounded-md bg-blue-100 p-3">
                  <p className="text-sm text-blue-800">
                    <strong>🎯 Suggestion:</strong> This lead is perfect for self-service signup. They can get started
                    immediately with Vercel Pro without SDR intervention.
                  </p>
                </div>
              )}
            </div>
          )}

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
        </div>
      </div>
    </div>
  )
}
