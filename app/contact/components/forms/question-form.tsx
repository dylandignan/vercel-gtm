"use client"

import type React from "react"

interface QuestionOption {
  value: string
  label: string
}

interface Question {
  key: string
  question: string
  icon: React.ComponentType<{ className?: string }>
  options: QuestionOption[]
}

interface QuestionFormProps {
  question: Question
  onAnswer: (key: string, value: string) => void
  onSkipToDemo: () => void
  onSkipQuestion: () => void
}

export function QuestionForm({ question, onAnswer, onSkipToDemo, onSkipQuestion }: QuestionFormProps) {
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
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={() => onAnswer(question.key, option.value)}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <button
            className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={onSkipToDemo}
          >
            Skip questions and book demo
          </button>
          <button
            className="w-full text-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onSkipQuestion}
          >
            Skip this question
          </button>
        </div>
      </div>
    </div>
  )
}
