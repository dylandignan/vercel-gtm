"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink, Clock } from "lucide-react"
import type { LeadEnrichment } from "@/lib/schemas/leads"

interface QualifiedFormProps {
  enrichment?: LeadEnrichment | null
}

export function QualifiedForm({ enrichment }: QualifiedFormProps) {
  const shouldGetProTrial = enrichment?.recommendedPlan === "pro"

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-black">{"Perfect! You're all set."}</h2>
            <p className="text-gray-600">
              {shouldGetProTrial
                ? "Start building immediately with a free Pro trial."
                : "We'll connect you with the right solution for your needs."}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {shouldGetProTrial ? (
            <>
              <Link href="https://vercel.com/signup?plan=pro&next=/dashboard" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="h-12 w-full bg-black text-base font-medium text-white hover:bg-gray-800">
                  {"Start free Pro trial"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="text-center text-sm text-gray-600">14-day free trial • No credit card required</div>
            </>
          ) : (
            <>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="mb-2 flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{"We'll be in touch soon"}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {
                    "A solutions engineer will reach out within 2 business hours to discuss your specific requirements and set up a personalized demo."
                  }
                </p>
              </div>
              <div className="text-center">
                <Link href="https://vercel.com/contact/sales" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-gray-300 bg-transparent text-sm hover:bg-gray-50"
                  >
                    Questions? Contact sales
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 text-center">
          <div className="space-y-1 text-xs text-gray-500">
            <div>Trusted by teams at Netflix, TikTok, and thousands of other companies</div>
            <div>Deploy in seconds • Scale automatically • Zero configuration</div>
          </div>
        </div>
      </div>
    </div>
  )
}
