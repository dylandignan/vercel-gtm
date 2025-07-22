"use client"

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { TemperatureBadge } from "@/app/admin/leads/components/temperature-badge"
import { StatusBadge } from "@/app/admin/leads/components/status-badge"
import { formatDate } from "@/app/admin/leads/display-options"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import type { Lead } from "@/lib/db/schema"
import { getJobTitleLabel } from "@/app/admin/leads/display-options"

interface LeadTableProps {
  leads: Lead[]
}

export function LeadTable({ leads }: LeadTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleViewLead = (leadId: string) => {
    startTransition(() => {
      router.push(`/admin/leads/${leadId}`)
    })
  }
  if (leads.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="py-12 text-center text-gray-500">
          No leads found. Try adjusting your filters or create some test leads.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Company</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Score</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Temperature</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Created</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{lead.company}</div>
                    <div className="max-w-[200px] truncate text-sm text-gray-600">{lead.useCase}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{lead.email}</div>
                    <div className="text-sm text-gray-600">
                      {lead.jobTitle ? getJobTitleLabel(lead.jobTitle) : "No title"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-lg font-medium text-gray-900">{lead.totalScore}</div>
                    <div className="text-sm text-gray-500">/100</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TemperatureBadge temperature={lead.leadTemperature} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(lead.createdAt.toISOString())}</td>
                <td className="px-6 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewLead(lead.id)}
                    disabled={isPending}
                    className="border-gray-300"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    {isPending ? "Loading..." : "View"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
