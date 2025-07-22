"use client"

import type React from "react"
import { Loader2 } from "lucide-react"
import type { FormData } from "@/lib/schemas/forms"

interface QuestionOption {
  value: string
  label: string
}

interface Question {
  key: keyof FormData
  question: string
  icon: React.ComponentType<{ className?: string }>
  options: QuestionOption[]
}

interface QuestionFormProps {
  question: Question
  onAnswer: (key: keyof FormData, value: string) => Promise<void>
  onSkipToDemo: () => void
  onSkipQuestion: () => void
  isProcessing?: boolean
}

export function QuestionForm({
  question,
  onAnswer,
  onSkipToDemo,
  onSkipQuestion,
  isProcessing = false,
}: QuestionFormProps) {
  return (
    <div className="p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <question.icon className="h-4 w-4 text-gray-600" />
            <h2 className="text-xl font-medium text-black">{question.question}</h2>
          </div>
          <p className="text-sm text-gray-600">This helps us recommend the right solution for you.</p>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              className="w-full cursor-pointer rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
              onClick={() => onAnswer(question.key, option.value)}
              disabled={isProcessing}
            >
              <div className="flex items-center justify-between font-medium text-gray-900">
                {option.label}
                {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3 border-t border-gray-200 pt-4">
          <button
            className="w-full cursor-pointer text-center text-sm text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onSkipToDemo}
            disabled={isProcessing}
          >
            Skip questions and book demo
          </button>
          <button
            className="w-full cursor-pointer text-center text-xs text-gray-500 transition-colors hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onSkipQuestion}
            disabled={isProcessing}
          >
            Skip this question
          </button>
        </div>
      </div>
    </div>
  )
}
