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

export function QuestionForm({ question, onAnswer, onSkipToDemo, onSkipQuestion, isProcessing = false }: QuestionFormProps) {
  return (
    <div className="p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <question.icon className="w-4 h-4 text-gray-600" />
            <h2 className="text-xl font-medium text-black">{question.question}</h2>
          </div>
          <p className="text-sm text-gray-600">This helps us recommend the right solution for you.</p>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              className="w-full p-4 text-left border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
              onClick={() => onAnswer(question.key, option.value)}
              disabled={isProcessing}
            >
              <div className="font-medium text-gray-900 flex items-center justify-between">
                {option.label}
                {isProcessing && (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <button
            className="w-full text-center text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSkipToDemo}
            disabled={isProcessing}
          >
            Skip questions and book demo
          </button>
          <button
            className="w-full text-center text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
