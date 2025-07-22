"use client"

import { Bot, X } from "lucide-react"
import { SalesAssistantChat } from "@/app/admin/leads/components/sales-assistant-chat"

interface ChatDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed right-6 bottom-0 z-50 flex h-[600px] w-96 flex-col rounded-t-lg border border-gray-200 bg-white shadow-2xl">
      
      <div className="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">AI Sales Assistant</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-200">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      
      <div className="flex-1 overflow-hidden">
        <SalesAssistantChat />
      </div>
    </div>
  )
}
