export function SocialProof() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Trusted by</p>
        <div className="grid grid-cols-4 gap-8 items-center opacity-60">
          <div className="text-lg font-medium">Netflix</div>
          <div className="text-lg font-medium">TikTok</div>
          <div className="text-lg font-medium">Hulu</div>
          <div className="text-lg font-medium">Twitch</div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="border-l-2 border-gray-200 pl-6">
        <blockquote className="text-lg text-gray-700 mb-4 leading-relaxed">
          "Vercel reduced our deployment time from 45 minutes to 30 seconds. Our team productivity increased 3x."
        </blockquote>
        <div className="text-sm">
          <div className="font-medium text-gray-900">Sarah Chen</div>
          <div className="text-gray-500">VP Engineering, TechCorp</div>
        </div>
      </div>
    </div>
  )
}
