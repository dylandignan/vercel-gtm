"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

export function SalesAssistantChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/sales-assistant",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  return (
    <div className="flex h-full flex-col">
      <Card className="flex flex-1 flex-col">
        <CardContent className="flex-1 overflow-hidden p-4">
          <div className="max-h-96 flex-1 overflow-y-auto pr-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-gray-500">
                Type a question to get started.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    m.role === "user"
                      ? "rounded-br-none bg-black text-white"
                      : "rounded-bl-none bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="mb-1 flex items-center space-x-2">
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="font-medium capitalize">{m.role}</span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">
                    {m.content || (m.role === "assistant" && !m.content && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[70%] rounded-lg rounded-bl-none bg-gray-100 p-3 text-gray-900">
                  <div className="mb-1 flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span className="font-medium capitalize">Assistant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              className="flex-1 border-gray-300 focus:border-black focus:ring-black"
              value={input}
              placeholder="Ask about leads..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
