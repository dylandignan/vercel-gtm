"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LeadFilters } from "./components/lead-filters"
import { LeadTable } from "./components/lead-table"
import { LeadDetailDialog } from "./components/lead-detail-dialog"
import { ChatDrawer } from "@/app/admin/leads/components/chat-drawer"
import { Button } from "@/components/ui/button"
import { Bot, RefreshCw } from "lucide-react"
import type { Lead } from "@/lib/db/schema"

interface LeadsPageClientProps {
  initialLeads: Lead[]
  searchParams: {
    search?: string
    temperature?: string
    status?: string
  }
}

export function LeadsPageClient({ initialLeads, searchParams }: LeadsPageClientProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Use URL state for filters to enable back/forward navigation
  const searchTerm = searchParams.search || ""
  const temperatureFilter = searchParams.temperature || "all"
  const statusFilter = searchParams.status || "all"

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(currentSearchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    startTransition(() => {
      router.push(`/admin/leads?${params.toString()}`)
    })
  }

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <>
      {/* Refresh Button */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-gray-300 bg-transparent"
          disabled={isPending}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <LeadFilters
        searchTerm={searchTerm}
        temperatureFilter={temperatureFilter}
        statusFilter={statusFilter}
        onSearchChange={(search) => updateFilters({ search })}
        onTemperatureChange={(temperature) => updateFilters({ temperature })}
        onStatusChange={(status) => updateFilters({ status })}
        disabled={isPending}
      />

      {/* Leads Table */}
      <div className={isPending ? "pointer-events-none opacity-50" : ""}>
        <LeadTable leads={initialLeads} onViewLead={setSelectedLead} />
      </div>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-800"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Drawer */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Lead Detail Dialog */}
      <LeadDetailDialog lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </>
  )
}
