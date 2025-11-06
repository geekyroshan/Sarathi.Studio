"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MessageCircle, X, Send, Loader2, User } from "lucide-react"
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
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    const openHandler = () => setIsOpen(true)

    window.addEventListener("sarathi-open-chat", openHandler)

    return () => {
      window.removeEventListener("sarathi-open-chat", openHandler)
    }
  }, [])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = { role: "user", content: trimmed }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = await res.json()
      const reply = data.reply || "I’m here whenever you’re ready to continue."

      setMessages((prev) => [...prev, { role: "bot", content: reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I couldn’t respond just now. Please try again shortly." },
      ])
    } finally {
      setIsLoading(false)
    }
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
        <div className="fixed bottom-24 right-2 sm:right-6 z-50 w-[min(100vw-1.5rem,26rem)] md:w-[28rem] lg:w-[32rem] h-[60vh] sm:h-[520px] bg-[#0c0f14]/95 ring-1 ring-white/10 backdrop-blur-xl border-2 border-dashed border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-b border-dashed border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                <Image src="/logo.jpg" alt="Sarathi logo" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-medium">Sarathi AI Assistant</h3>
                <p className="text-xs text-white/60">{isLoading ? "Typing..." : "Always here to help 😊"}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-[#0b0e12]/40">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "bot" && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center">
                    <Image src="/logo.jpg" alt="Sarathi logo" width={36} height={36} className="h-full w-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3 py-2 sm:px-4 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-white/10 text-white border border-dashed border-white/10"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center">
                  <Image src="/logo.jpg" alt="Sarathi logo" width={36} height={36} className="h-full w-full object-cover" />
                </div>
                <div className="bg-white/10 border border-dashed border-white/10 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-sm text-white/80">
                  <div className="flex items-center gap-1.5">
                    <span className="sr-only">Sarathi is typing</span>
                    <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-dashed border-white/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 border border-dashed border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <Button
                onClick={() => void handleSend()}
                size="icon"
                disabled={isLoading}
                className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90 disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
