interface HeroSectionProps {
  step: "initial" | "enriching" | "smart-questions" | "self-service" | "qualified"
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
          <h1 className="text-5xl font-medium tracking-tight text-black leading-[1.1]">
            Ship at the
            <br />
            <span className="text-gray-500">speed of thought</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">{getHeadline()}</p>
        </div>

        {/* Progress for questions */}
        {step === "smart-questions" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-gray-500">{Math.round(progressPercentage)}% complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div
                className="bg-black h-1 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
