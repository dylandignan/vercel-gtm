import { notFound } from "next/navigation"
import { LeadQueries } from "@/lib/db/queries"
import { LeadDetailPage } from "@/app/admin/leads/[leadId]/lead-detail-page"

interface LeadDetailRouteProps {
  params: Promise<{ leadId: string }>
}

export default async function LeadDetailRoute({ params }: LeadDetailRouteProps) {
  const { leadId } = await params

  try {
    const lead = await LeadQueries.getById(leadId)

    if (!lead) {
      notFound()
    }

    return <LeadDetailPage lead={lead} />
  } catch (error) {
    console.error("Failed to load lead:", error)
    notFound()
  }
}
