"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi! I'm Sarathi AI Assistant. How can I help you with AI automation or development today?",
    },
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    // Check if preview has been shown before
    const hasSeenPreview = sessionStorage.getItem("chatbot-preview-shown")

    if (!hasSeenPreview) {
      // Show preview after 2 seconds
      const showTimer = setTimeout(() => {
        setShowPreview(true)
        sessionStorage.setItem("chatbot-preview-shown", "true")

        // Hide preview after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowPreview(false)
        }, 5000)

        return () => clearTimeout(hideTimer)
      }, 2000)

      return () => clearTimeout(showTimer)
    }
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Placeholder response - you'll connect this to your backend later
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Thanks for your message! Our team will connect this chatbot to our AI system soon.",
        },
      ])
    }, 1000)
  }

  const handlePreviewClick = () => {
    setShowPreview(false)
    setIsOpen(true)
  }

  return (
    <>
      {showPreview && !isOpen && (
        <div
          onClick={handlePreviewClick}
          className="fixed bottom-24 right-6 z-50 max-w-xs cursor-pointer animate-in slide-in-from-bottom-4 fade-in duration-500"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl border border-white/20">
            <p className="text-sm font-medium">Hey! How can I help you? 👋</p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-black/95 backdrop-blur-xl border-2 border-dashed border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-b border-dashed border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Sarathi AI Assistant</h3>
                <p className="text-xs text-white/60">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : "bg-white/10 text-white border border-dashed border-white/20"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-dashed border-white/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-dashed border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
