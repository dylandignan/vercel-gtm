"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react"

interface SelfServiceFormProps {
  companyName: string
  onContinueToDemo: () => void
}

export function SelfServiceForm({ companyName, onContinueToDemo }: SelfServiceFormProps) {
  const handleSignupClick = () => {
    // Open Vercel Pro signup in new tab
    window.open("https://vercel.com/signup", "_blank")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Sparkles className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-900">Perfect for Self-Service!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Based on your needs, Vercel Pro is ideal for {companyName}. You can get started immediately!
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-3">
          <h4 className="font-medium text-blue-900">✨ Vercel Pro includes:</h4>
        </div>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span>Fast global CDN with edge functions</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span>Automatic deployments from Git</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span>Custom domains & SSL certificates</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span>Analytics & performance insights</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={handleSignupClick}
          className="w-full bg-black hover:bg-gray-800"
          size="lg"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Get Started with Vercel Pro
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-3">
            Or if you need enterprise features like advanced security, priority support, and custom SLAs:
          </p>
          <Button 
            onClick={onContinueToDemo}
            variant="outline"
            className="w-full border-gray-300"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Continue to Enterprise Demo
          </Button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">
          No commitment required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  )
}