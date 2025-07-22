"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Clock, DollarSign, User } from "lucide-react"

import { Navbar } from "@/app/contact/components/layout/navbar"
import { HeroSection } from "@/app/contact/components/sections/hero-section"
import { SocialProof } from "@/app/contact/components/sections/social-proof"
import { InitialForm } from "@/app/contact/components/forms/initial-form"
import { LoadingState } from "@/app/contact/components/forms/loading-state"
import { QuestionForm } from "@/app/contact/components/forms/question-form"
import { QualifiedForm } from "@/app/contact/components/forms/qualified-form"
import { SelfServiceForm } from "@/app/contact/components/forms/self-service-form"

import { leadEnrichmentSchema, type LeadEnrichment } from "@/lib/schemas/leads"
import { type FormData } from "@/lib/schemas/forms"

const SMART_QUESTIONS = [
  {
    key: "jobTitle" as const,
    question: "What's your role?",
    icon: User,
    options: [
      { value: "cto", label: "CTO / Chief Technology Officer" },
      { value: "ceo", label: "CEO / Founder" },
      { value: "vp-engineering", label: "VP Engineering / Director" },
      { value: "senior-engineer", label: "Senior/Lead Engineer" },
      { value: "engineer", label: "Software Engineer/Developer" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "timeline" as const,
    question: "When do you need this deployed?",
    icon: Clock,
    options: [
      { value: "asap", label: "ASAP (This month)" },
      { value: "1-3months", label: "1-3 months" },
      { value: "3-6months", label: "3-6 months" },
      { value: "exploring", label: "Just exploring options" },
    ],
  },
  {
    key: "budgetRange" as const,
    question: "What's your monthly hosting budget?",
    icon: DollarSign,
    options: [
      { value: "10k+", label: "$10,000+ per month" },
      { value: "5k-10k", label: "$5,000 - $10,000" },
      { value: "1k-5k", label: "$1,000 - $5,000" },
      { value: "500-1k", label: "$500 - $1,000" },
      { value: "under-500", label: "Under $500" },
      { value: "not-sure", label: "Not sure yet" },
    ],
  },
]

export function SalesContactForm() {
  const [step, setStep] = useState<"initial" | "enriching" | "smart-questions" | "self-service" | "qualified">(
    "initial"
  )
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    useCase: "",
    timeline: "",
    budgetRange: "",
  })
  const [enrichment, setEnrichment] = useState<LeadEnrichment | null>(null)
  const [isEnriching, setIsEnriching] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isPending, startTransition] = useTransition()

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.company || !formData.useCase.trim()) return

    setIsEnriching(true)
    setStep("enriching")

    try {
      const enrichmentData = await fetch("/api/enrich-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(async (response): Promise<LeadEnrichment | null> => {
          if (!response.ok) return null
          const data = await response.json()
          if (data.error) return null

          const parseResult = leadEnrichmentSchema.safeParse(data)
          return parseResult.success ? parseResult.data : null
        })
        .catch((error) => {
          console.error("Enrichment failed:", error)
          return null
        })

      if (enrichmentData) {
        setEnrichment(enrichmentData)
      }

      const scoringResult = await updateLeadScore(formData, enrichmentData)

      if (scoringResult?.recommendedAction === "self_service") {
        setStep("self-service")
      } else {
        setStep("smart-questions")
      }
    } catch (error) {
      console.error("Form submission failed:", error)
      setStep("smart-questions")
    } finally {
      setIsEnriching(false)
    }
  }

  const updateLeadScore = async (currentFormData: FormData, enrichmentData: LeadEnrichment | null = null) => {
    try {
      const response = await fetch("/api/score-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadData: currentFormData,
          conversationHistory: [],
          enrichmentData: enrichmentData || enrichment,
        }),
      })

      if (response.ok) {
        const scoringResult = await response.json()
        return scoringResult
      }
      return null
    } catch (error) {
      console.error("Scoring failed:", error)
      return null
    }
  }

  const handleQuestionAnswer = async (key: keyof FormData, value: string) => {
    startTransition(async () => {
      const updatedFormData = { ...formData, [key]: value }
      setFormData(updatedFormData)

      const scoringResult = await updateLeadScore(updatedFormData)

      if (scoringResult?.recommendedAction === "self_service") {
        setStep("self-service")
        return
      }

      if (currentQuestionIndex < SMART_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setStep("qualified")
      }
    })
  }

  const handleSkipToDemo = () => {
    if (step === "self-service") {
      setStep("smart-questions")
    } else {
      setStep("qualified")
    }
  }

  const handleSkipQuestion = () => {
    handleQuestionAnswer(SMART_QUESTIONS[currentQuestionIndex].key, "skip")
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const currentQuestion = SMART_QUESTIONS[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 py-16 lg:grid-cols-2">
          <div className="space-y-12">
            <HeroSection
              step={step}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={SMART_QUESTIONS.length}
            />

            <SocialProof />
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="rounded-lg border border-gray-200 bg-white">
              {step === "initial" && (
                <InitialForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleInitialSubmit}
                  isSubmitting={isEnriching}
                />
              )}

              {step === "enriching" && <LoadingState companyName={formData.company} />}

              {step === "smart-questions" && currentQuestion && (
                <QuestionForm
                  question={currentQuestion}
                  onAnswer={handleQuestionAnswer}
                  onSkipToDemo={handleSkipToDemo}
                  onSkipQuestion={handleSkipQuestion}
                  isProcessing={isPending}
                />
              )}

              {step === "self-service" && (
                <SelfServiceForm companyName={formData.company} onContinueToDemo={handleSkipToDemo} />
              )}

              {step === "qualified" && <QualifiedForm enrichment={enrichment} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
