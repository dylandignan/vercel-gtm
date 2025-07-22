import { LoadingSpinner } from "./loading-spinner"

interface LoadingStateProps {
  companyName: string
}

export function LoadingState({ companyName }: LoadingStateProps) {
  return (
    <div className="p-8">
      <div className="space-y-4 text-center">
        <LoadingSpinner size="md" className="mx-auto text-gray-600" />
        <div className="space-y-2">
          <div className="font-medium text-gray-900">Analyzing your project</div>
          <div className="text-sm text-gray-600">
            Our AI is researching {companyName} and analyzing your requirements
          </div>
        </div>
      </div>
    </div>
  )
}
