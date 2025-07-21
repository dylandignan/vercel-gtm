"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, MessageSquare } from "lucide-react"
import type { FormData } from "@/lib/schemas/forms"

interface InitialFormProps {
  formData: FormData
  onInputChange: (field: keyof FormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting?: boolean
}

export function InitialForm({ formData, onInputChange, onSubmit, isSubmitting = false }: InitialFormProps) {
  const getUseCaseEngagementFeedback = () => {
    const wordCount = formData.useCase.trim().split(/\s+/).length
    if (wordCount >= 20) return { color: "text-green-600", message: "Perfect! This helps us prepare a tailored demo." }
    if (wordCount >= 10) return { color: "text-blue-600", message: "Good detail. A bit more context would be helpful." }
    if (wordCount >= 5) return { color: "text-amber-600", message: "Tell us more about your specific requirements." }
    return { color: "text-gray-500", message: "Share details about your project and goals." }
  }

  const useCaseFeedback = getUseCaseEngagementFeedback()

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-black">Get started</h2>
          <p className="text-gray-600">{"Tell us about your project and we'll customize the perfect solution."}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName || ""}
                onChange={(e) => onInputChange("firstName", e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName || ""}
                onChange={(e) => onInputChange("lastName", e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Work email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className="border-gray-300 focus:border-black focus:ring-black"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-gray-700">
              Company *
            </Label>
            <Input
              id="company"
              placeholder="Acme Inc"
              value={formData.company}
              onChange={(e) => onInputChange("company", e.target.value)}
              className="border-gray-300 focus:border-black focus:ring-black"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase" className="text-sm font-medium text-gray-700">
              What are you building? *
            </Label>
            <Textarea
              id="useCase"
              placeholder="Tell us about your project, current challenges, and goals..."
              value={formData.useCase}
              onChange={(e) => onInputChange("useCase", e.target.value)}
              className="min-h-[100px] resize-none border-gray-300 focus:border-black focus:ring-black"
              required
            />
            <div className={`text-xs ${useCaseFeedback.color} flex items-center space-x-1`}>
              <MessageSquare className="h-3 w-3" />
              <span>{useCaseFeedback.message}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 w-full bg-black text-base font-medium text-white hover:bg-gray-800"
            disabled={!formData.useCase.trim() || isSubmitting}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  )
}
