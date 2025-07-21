import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xl font-medium text-black">Vercel</span>
          </Link>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-gray-600">{"Trusted by the world's leading companies"}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
