"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink, Clock } from "lucide-react"
import type { LeadEnrichment } from "@/lib/schemas/lead"

interface QualifiedFormProps {
  enrichment?: LeadEnrichment | null
}

export function QualifiedForm({ enrichment }: QualifiedFormProps) {
  // Determine if user should get Pro trial or Enterprise demo
  const shouldGetProTrial = enrichment?.recommendedPlan === "pro"

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-black">Perfect! You're all set.</h2>
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
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-medium"
                onClick={() => window.open("https://vercel.com/signup?plan=pro&next=/dashboard", "_blank")}
              >
                Start free Pro trial
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <div className="text-center text-sm text-gray-600">14-day free trial • No credit card required</div>
            </>
          ) : (
            <>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">We'll be in touch soon</span>
                </div>
                <p className="text-sm text-gray-600">
                  A solutions engineer will reach out within 2 business hours to discuss your specific requirements and
                  set up a personalized demo.
                </p>
              </div>
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 bg-transparent text-sm"
                  onClick={() => window.open("https://vercel.com/contact/sales", "_blank")}
                >
                  Questions? Contact sales
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-500 space-y-1">
            <div>Trusted by teams at Netflix, TikTok, and thousands of other companies</div>
            <div>Deploy in seconds • Scale automatically • Zero configuration</div>
          </div>
        </div>
      </div>
    </div>
  )
}
