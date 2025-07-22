import Link from "next/link"
import { User, Shield } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xl font-medium text-black">Vercel GTM</span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-medium tracking-tight text-black">Vercel Sales Platform</h1>
          <p className="text-xl text-gray-600">Choose your path to get started</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Link href="/contact" className="group">
            <div className="rounded-lg border border-gray-200 p-8 transition-all duration-200 hover:border-gray-300 hover:shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                  <User className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-medium text-black">Contact Sales</h2>
              </div>
              <p className="mb-4 text-gray-600">
                {
                  "Get started with Vercel's enterprise platform. Our AI-powered form will help personalize your experience and connect you with the right solution."
                }
              </p>
              <div className="text-sm font-medium text-black group-hover:text-gray-700">Start your journey →</div>
            </div>
          </Link>

          <Link href="/admin/leads" className="group">
            <div className="rounded-lg border border-gray-200 p-8 transition-all duration-200 hover:border-gray-300 hover:shadow-md">
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-medium text-black">Admin Panel</h2>
              </div>
              <p className="mb-4 text-gray-600">
                Access the lead management dashboard to view, score, and manage all incoming sales leads with AI-powered
                insights and recommendations.
              </p>
              <div className="text-sm font-medium text-black group-hover:text-gray-700">View leads →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
