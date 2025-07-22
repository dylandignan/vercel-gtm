"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LeadFilters } from "./components/lead-filters"
import { LeadTable } from "./components/lead-table"
import { ChatDrawer } from "@/app/admin/leads/components/chat-drawer"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Bot } from "lucide-react"
import type { Lead } from "@/lib/db/schema"

interface LeadsPageClientProps {
  initialLeads: Lead[]
  totalCount: number
  searchParams: {
    search?: string
    temperature?: string
    status?: string
    page?: string
    limit?: string
  }
}

export function LeadsPageClient({ initialLeads, totalCount, searchParams }: LeadsPageClientProps) {
  const [isPending, _] = useTransition()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const currentPage = Number(searchParams.page) || 1
  const pageSize = Number(searchParams.limit) || 20
  const totalPages = Math.ceil(totalCount / pageSize)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      <LeadFilters disabled={isPending} />

      <div className={isPending ? "pointer-events-none opacity-50" : ""}>
        <LeadTable leads={initialLeads} />

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of{" "}
              {totalCount} leads
            </div>
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(currentPage - 1)
                      }}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber: number
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(pageNumber)
                        }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(currentPage + 1)
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-800"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
