"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function FinalCTASection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projectTypes = [
    "Web Design",
    "UI/UX Design",
    "Mobile App",
    "Dashboard",
    "E-commerce",
    "Portfolio",
    "Branding",
    "Landing Page",
    "AI Automation",
    "Logo Design",
  ]

  const tickerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<Array<{ name: string; completed: boolean; id: number }>>([])

  useEffect(() => {
    const initialItems = [
      ...projectTypes.map((name, idx) => ({ name, completed: false, id: idx })),
      ...projectTypes.map((name, idx) => ({ name, completed: false, id: idx + projectTypes.length })),
      ...projectTypes.map((name, idx) => ({ name, completed: false, id: idx + projectTypes.length * 2 })),
    ]
    setItems(initialItems)
  }, [])

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const updateCheckmarks = () => {
      const tickerRect = ticker.getBoundingClientRect()
      const centerX = tickerRect.left + tickerRect.width / 2

      const itemElements = ticker.querySelectorAll("[data-project-item]")
      const sarathiElement = document.querySelector("[data-sarathi-card]")

      if (!sarathiElement) return

      const sarathiRect = sarathiElement.getBoundingClientRect()
      const sarathiCenterX = sarathiRect.left + sarathiRect.width / 2

      setItems((prevItems) => {
        return prevItems.map((item, index) => {
          const element = itemElements[index]
          if (!element) return item

          const rect = element.getBoundingClientRect()
          const itemCenterX = rect.left + rect.width / 2

          const hasPassedSarathi = itemCenterX > sarathiCenterX

          return { ...item, completed: hasPassedSarathi }
        })
      })
    }

    const interval = setInterval(updateCheckmarks, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Box */}
        <div className="relative bg-zinc-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 text-center space-y-6 sm:space-y-8 mb-16 sm:mb-20 md:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
              If you scrolled this far, {"It's"} time to <span className="text-white">LEVEL UP</span>
            </h2>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <Button
                onClick={scrollToContact}
                className="relative bg-white text-black hover:bg-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full font-semibold overflow-hidden group animate-pulse-glow"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin-slow" />
                  Join the Elite Club
                </span>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full blur-xl bg-white opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
              </Button>
            </div>

            <p className="text-gray-400 text-base sm:text-lg mt-6 sm:mt-8 pb-4 sm:pb-0">
              Trust me we are good at this :)
            </p>
          </div>

          {/* Ticker Section */}
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-950 py-3 sm:py-4 overflow-hidden">
            <div ref={tickerRef} className="relative flex animate-scroll-left-to-right whitespace-nowrap">
              {items.map((project, index) => (
                <div key={project.id} data-project-item className="inline-flex items-center mx-4 sm:mx-6">
                  <span className={`text-xs sm:text-sm ${project.completed ? "text-gray-300" : "text-gray-500"}`}>
                    {project.name}
                  </span>
                  {project.completed && (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 text-green-500 animate-check-appear"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div
              data-sarathi-card
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/20">
                <span className="relative text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Sarathi Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left-to-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-left-to-right {
          animation: scroll-left-to-right 40s linear infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes check-appear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-check-appear {
          animation: check-appear 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
