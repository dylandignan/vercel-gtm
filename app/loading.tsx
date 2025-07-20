import { RefreshCw } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="space-y-4 text-center">
        <RefreshCw className="mx-auto h-8 w-8 animate-spin text-gray-400" />
        <div className="space-y-2">
          <div className="text-lg font-medium text-gray-900">Loading...</div>
          <div className="text-sm text-gray-600">Please wait while we load your data</div>
        </div>
      </div>
    </div>
  )
}
