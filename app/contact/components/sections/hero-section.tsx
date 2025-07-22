import { type FormStep } from "@/lib/schemas/forms"

interface HeroSectionProps {
  step: FormStep
  currentQuestionIndex?: number
  totalQuestions?: number
}

export function HeroSection({ step, currentQuestionIndex = 0, totalQuestions = 3 }: HeroSectionProps) {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const getHeadline = () => {
    switch (step) {
      case "initial":
        return "Join thousands of teams building the future with Vercel's platform."
      case "smart-questions":
        return "Just a few questions to personalize your experience."
      case "processing":
        return "Analyzing your needs to recommend the perfect solution."
      case "self-service":
        return "Perfect! You can get started immediately with our self-service option."
      case "qualified":
        return "Ready to ship faster than ever before."
      default:
        return "Join thousands of teams building the future with Vercel's platform."
    }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl leading-[1.1] font-medium tracking-tight text-black">
            Ship at the
            <br />
            <span className="text-gray-500">speed of thought</span>
          </h1>
          <p className="max-w-lg text-xl leading-relaxed text-gray-600">{getHeadline()}</p>
        </div>

        {step === "smart-questions" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-gray-500">{Math.round(progressPercentage)}% complete</span>
            </div>
            <div className="h-1 w-full rounded-full bg-gray-100">
              <div
                className="h-1 rounded-full bg-black transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
