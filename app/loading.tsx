import { RefreshCw } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
        <div className="space-y-2">
          <div className="text-lg font-medium text-gray-900">Loading...</div>
          <div className="text-sm text-gray-600">
            Please wait while we load your data
          </div>
        </div>
      </div>
    </div>
  )
}
