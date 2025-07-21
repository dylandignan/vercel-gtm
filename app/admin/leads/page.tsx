import { Suspense } from "react"
import { LeadQueries } from "@/lib/db/queries"
import { LeadsPageClient } from "./leads-page-client"
import { LeadStats } from "./components/lead-stats"
import { leadSearchParamsSchema } from "@/lib/schemas/leads"

interface SearchParams {
  search?: string
  temperature?: string
  status?: string
}

interface LeadsPageProps {
  searchParams: SearchParams
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const awaitedSearchParams = await searchParams
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" />
              </svg>
              <span className="text-xl font-medium text-black">Vercel</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Sales Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-medium text-black">Lead Management</h1>
          <p className="text-gray-600">Track and manage sales leads</p>
        </div>

        <Suspense fallback={<StatsLoading />}>
          <StatsSection />
        </Suspense>

        <Suspense fallback={<LeadsLoading />}>
          <LeadsSection searchParams={awaitedSearchParams} />
        </Suspense>
      </div>
    </div>
  )
}

// Server Component for stats
async function StatsSection() {
  try {
    const stats = await LeadQueries.getStats()
    return <LeadStats stats={stats} />
  } catch (error) {
    console.error("Failed to load stats:", error)
    return <StatsError />
  }
}

async function LeadsSection({ searchParams }: { searchParams: SearchParams }) {
  try {
    const validatedParams = leadSearchParamsSchema.safeParse(searchParams)
    if (!validatedParams.success) {
      console.error("Invalid search params:", validatedParams.error)
      return <LeadsError />
    }

    const filters = {
      search: validatedParams.data.search,
      temperature: validatedParams.data.temperature,
      status: validatedParams.data.status,
      page: validatedParams.data.page,
      limit: validatedParams.data.limit,
    }

    const { leads, total } = await LeadQueries.getAll(filters)
    return <LeadsPageClient initialLeads={leads} totalCount={total} searchParams={searchParams} />
  } catch (error) {
    console.error("Failed to load leads:", error)
    return <LeadsError />
  }
}

// Loading components
function StatsLoading() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-100" />
            <div>
              <div className="mb-1 h-6 w-12 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LeadsLoading() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
      </div>
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 w-full animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Error components
function StatsError() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-6">
        <div className="text-sm text-red-700">Failed to load statistics. Please refresh the page.</div>
      </div>
    </div>
  )
}

function LeadsError() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="text-sm text-red-700">Failed to load leads. Please refresh the page.</div>
    </div>
  )
}
