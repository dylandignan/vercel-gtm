export function SocialProof() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm tracking-wide text-gray-500 uppercase">Trusted by</p>
        <div className="grid grid-cols-4 items-center gap-8 opacity-60">
          <div className="text-lg font-medium">Netflix</div>
          <div className="text-lg font-medium">Pinterest</div>
          <div className="text-lg font-medium">Figma</div>
          <div className="text-lg font-medium">Adobe</div>
        </div>
      </div>

      
      <div className="border-l-2 border-gray-200 pl-6">
        <blockquote className="mb-4 text-lg leading-relaxed text-gray-700">
          {'"Vercel reduced our deployment time from 45 minutes to 30 seconds. Our team productivity increased 3x."'}
        </blockquote>
        <div className="text-sm">
          <div className="font-medium text-gray-900">Sarah Chen</div>
          <div className="text-gray-500">VP Engineering, Box</div>
        </div>
      </div>
    </div>
  )
}
