"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Loader2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Chatbot } from "@/components/chatbot"
import { AchievementCardBrands } from "@/components/achievement-card-brands"
import { AchievementCardExperience } from "@/components/achievement-card-experience"
import { AchievementCardSavings } from "@/components/achievement-card-savings"
import { TimezoneBar } from "@/components/timezone-bar"
import { ComparisonTable } from "@/components/comparison-table"
import { SauceSection } from "@/components/sauce-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { SarathiLogo } from "@/components/sarathi-logo"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const rotatingWords = ["AI Automations", "Web Development", "App Development", "Digital Solutions"]

const testimonials = [
  {
    message:
      "Working with Sarathi Studio has been transformative for our business. Their AI automation solution reduced our operational costs by 40% and improved efficiency across the board. The team is professional, responsive, and truly understands what we need.",
    author: "Dilip Poudyal",
    role: "Founder & CEO",
    company: "BSM International",
    image: "/placeholder.svg?height=100&width=100",
    reply: "Thank you for trusting us with your automation journey 🚀",
  },
  {
    message:
      "Sarathi Studio delivered beyond expectations. Their custom workflow automation has streamlined our entire enterprise operations. The 60% reduction in processing time has been a real game-changer for BN Enterprise.",
    author: "Braj Kishor Sarma",
    role: "CEO",
    company: "BN Enterprise",
    image: "/placeholder.svg?height=100&width=100",
    reply: "We're thrilled to be part of your success story 💼",
  },
  {
    message:
      "The web application built by Sarathi Studio exceeded all our expectations at RTG Group. Their attention to detail and commitment to quality is remarkable. Would highly recommend their services to anyone looking for top-tier development.",
    author: "Trideep Poudyal",
    role: "Manager",
    company: "RTG Group",
    image: "/placeholder.svg?height=100&width=100",
    reply: "Thank you, we're always here to support RTG Group 🙌",
  },
  {
    message:
      "Sarathi Studio's AI-powered solutions have revolutionized our business operations in Dubai. Their expertise in automation and commitment to excellence is unmatched. The ROI we've seen has been incredible.",
    author: "Ahmed Al-Mansouri",
    role: "CEO",
    company: "Emirates Digital Solutions",
    image: "/professional-middle-eastern-ceo-in-modern-dubai-off.jpg",
    reply: "We'd love to work with you again ❤️",
  },
  {
    message:
      "Outstanding work from Sarathi Studio. Their AI automation platform has transformed how we operate. The team's technical expertise and innovative approach have given us a significant competitive advantage in the US market.",
    author: "Michael Chen",
    role: "CEO",
    company: "TechVenture Inc.",
    image: "/professional-asian-american-ceo-in-silicon-valley-.jpg",
    reply: "Thank you for the amazing feedback 🎯",
  },
]

const companyLogos = [
  { name: "Slack", src: "/slack-logo.png" },
  { name: "Notion", src: "/notion-logo.png" },
  { name: "Zapier", src: "/zapier-logo.png" },
  { name: "Airtable", src: "/airtable-logo.png" },
  { name: "HubSpot", src: "/hubspot-logo.png" },
  { name: "Salesforce", src: "/salesforce-logo.png" },
  { name: "Monday", src: "/monday-com-logo.png" },
  { name: "Asana", src: "/asana-logo.png" },
]

const articles = [
  {
    title: "$3.70 Return for Every Dollar Invested in AI",
    description:
      "Companies see 91% revenue increases and 30% operational cost reductions. Top performers achieve 10x ROI with AI automation.",
    image: "/ai-automation-roi-business-growth-charts.jpg",
    source: "Graf Growth Partners",
    link: "https://www.grafgrowthpartners.com/post/showing-roi-with-ai-automation",
    badge: "ROI Study",
    badgeColor: "bg-blue-500/80",
  },
  {
    title: "How to Measure AI Automation Success",
    description:
      "Complete framework for measuring ROI: labor cost reduction, error avoidance, infrastructure savings, and productivity gains.",
    image: "/business-automation-success-metrics-dashboard.jpg",
    source: "Lleverage AI",
    link: "https://www.lleverage.ai/blog/the-roi-of-ai-automation-how-to-measure-success-in-your-business-2025-guide",
    badge: "2025 Guide",
    badgeColor: "bg-green-500/80",
  },
  {
    title: "761% ROI with AI Integration",
    description:
      "Integrating AI into CX and ERP systems delivers 214% ROI conservatively, rising to 761% with maximum improvements.",
    image: "/enterprise-ai-integration-business-systems.jpg",
    source: "SAP",
    link: "https://www.sap.com/slovenia/resources/maximizing-ai-roi",
    badge: "Enterprise Guide",
    badgeColor: "bg-orange-500/80",
  },
  {
    title: "Greater Efficiency Without Increasing IT Costs",
    description:
      "Advanced AI deployments in IT functions achieve higher returns on both traditional and generative AI investments.",
    image: "/it-automation-efficiency-technology-infrastructure.jpg",
    source: "IBM Institute",
    link: "https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/roi-ai-powered-it-automation",
    badge: "IT Automation",
    badgeColor: "bg-purple-500/80",
  },
]

export default function Home() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [agentsScrollPosition, setAgentsScrollPosition] = useState(0)
  const [articlesScrollPosition, setArticlesScrollPosition] = useState(0)
const [isContactSubmitting, setIsContactSubmitting] = useState(false)
const [activeService, setActiveService] = useState<number | null>(null)
  const { theme } = useTheme()
  const { toast } = useToast()

  const articlesScrollRef = useRef(null)

  const bgClass = "bg-black"
  const textClass = "text-white"
  const textSecondaryClass = "text-white/70"
  const borderClass = "border-white/10"
  const cardBgClass = "bg-white/5"
  const cardClass = `bg-white/5 backdrop-blur-sm rounded-2xl border border-dashed ${borderClass}`

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % rotatingWords.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const isMobile = window.innerWidth < 640
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
        const cardWidth = isMobile ? (window.innerWidth - 64) : (isTablet ? 360 : 400)
        const gap = isMobile ? 16 : 24 // gap-4 on mobile (16px), gap-6 on tablet/desktop (24px)
        const scrollDistance = cardWidth + gap
        const maxScroll = scrollDistance * testimonials.length
        const newPosition = prev + scrollDistance
        return newPosition >= maxScroll ? 0 : newPosition
      })
    }, 4000) // 4 seconds pause

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentsScrollPosition((prev) => {
        const isMobile = window.innerWidth < 640
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
        const cardWidth = isMobile ? (window.innerWidth - 64) : (isTablet ? 320 : 360) // tablet=320, desktop=360
        const gap = isMobile ? 16 : 24 // gap-4 on mobile (16px), gap-6 on tablet/desktop (24px)
        const scrollDistance = cardWidth + gap
        const totalCards = 6 // Total number of unique chat cards
        const maxScroll = scrollDistance * totalCards
        const newPosition = prev + scrollDistance
        return newPosition >= maxScroll ? 0 : newPosition
      })
    }, 4000) // 4 seconds pause, then move

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setArticlesScrollPosition((prev) => {
        const isMobile = window.innerWidth < 640
        const cardWidth = isMobile ? (window.innerWidth - 64) : 288 // tablet/desktop stay 288 (w-72)
        const gap = isMobile ? 16 : 24
        const scrollDistance = cardWidth + gap
        const maxScroll = scrollDistance * articles.length
        const newPosition = prev + scrollDistance
        return newPosition >= maxScroll ? 0 : newPosition
      })
    }, 4000) // 4 seconds pause

    return () => clearInterval(interval)
  }, [])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isContactSubmitting) {
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get("name") as string)?.trim() ?? ""
    const email = (formData.get("email") as string)?.trim() ?? ""
    const company = (formData.get("company") as string)?.trim() ?? ""
    const service = (formData.get("service") as string)?.toString() ?? ""
    const message = (formData.get("message") as string)?.trim() ?? ""

    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please add your name, email, and project details before sending.",
        duration: 4000,
      })
      return
    }

    setIsContactSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, service, message }),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      form.reset()

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. Our team will get back to you shortly.",
        duration: 4000,
      })
    } catch (error) {
      toast({
        title: "Unable to send",
        description: "We couldn't send your message. Please try again or email connect@sarathi.studio.",
        duration: 5000,
      })
    } finally {
      setIsContactSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen ${bgClass} relative overflow-hidden`}>
      {/* Grid Background Pattern */}
      <div
        className={`absolute inset-0 ${theme === "dark" ? "hidden" : theme === "default" ? "opacity-[0.05]" : "opacity-[0.08]"}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme === "default" ? "#fff" : "#000"} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === "default" ? "#fff" : "#000"} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vertical Lines */}
      <div className={`absolute inset-0 pointer-events-none ${theme === "dark" ? "hidden" : ""}`}>
        <div
          className={`absolute left-[15%] top-0 bottom-0 w-px ${theme === "default" ? "bg-white/10" : "bg-gray-900/10"}`}
        />
        <div
          className={`absolute right-[15%] top-0 bottom-0 w-px ${theme === "default" ? "bg-white/10" : "bg-gray-900/10"}`}
        />
      </div>

      <nav className={`relative z-20 border-b border-dashed ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <SarathiLogo className="h-10 sm:h-12" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#achievements"
              className={`text-sm ${textSecondaryClass} hover:${textClass} transition-all duration-300 relative group`}
            >
              <span className="relative z-10">Achievements</span>
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
            </a>
            <a
              href="#work"
              className={`text-sm ${textSecondaryClass} hover:${textClass} transition-all duration-300 relative group`}
            >
              <span className="relative z-10">Our Work</span>
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
            </a>
            <a
              href="#comparison"
              className={`text-sm ${textSecondaryClass} hover:${textClass} transition-all duration-300 relative group`}
            >
              <span className="relative z-10">Comparison</span>
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
            </a>
            <a
              href="#faqs"
              className={`text-sm ${textSecondaryClass} hover:${textClass} transition-all duration-300 relative group`}
            >
              <span className="relative z-10">FAQs</span>
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
            </a>
            <a
              href="https://wa.me/916000863947"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm ${textClass} transition-all duration-300 font-medium relative group px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5`}
            >
              <span className="relative z-10">Contact Us</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textClass} p-2`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t border-dashed ${borderClass} ${bgClass}/95 backdrop-blur-lg`}>
            <div className="px-4 py-6 space-y-4">
              <a
                href="#achievements"
                className="block text-sm text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Achievements
              </a>
              <a
                href="#work"
                className="block text-sm text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Work
              </a>
              <a
                href="#comparison"
                className="block text-sm text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comparison
              </a>
              <a
                href="#faqs"
                className="block text-sm text-white/70 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <a
                href="https://wa.me/916000863947"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <div className="pt-4 border-t border-dashed border-white/10">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 relative">
          {theme === "default" && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `radial-gradient(ellipse 600px 700px at center, rgba(30, 30, 30, 0.6) 0%, transparent 70%)`,
              }}
            />
          )}

          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <div
              className="relative px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20"
              style={{
                border: `2px dashed rgba(255, 255, 255, 0.2)`,
                borderRadius: "8px",
              }}
            >
              <div className="mb-8 sm:mb-12 flex items-center justify-center gap-2 text-xs sm:text-sm">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <div
                    className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full blur-sm"
                    style={{
                      boxShadow: "0 0 10px 4px rgba(34, 197, 94, 0.6), 0 0 20px 8px rgba(34, 197, 94, 0.3)",
                    }}
                  />
                </div>
                <span className="text-white/80">Available for New Projects</span>
              </div>

              <div className="text-center">
                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter ${textClass} mb-4 uppercase leading-[0.85]`}
                >
                  <span className="block">We Provide</span>
                  <span
                    className={`block transition-all duration-500 ${
                      isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                    }`}
                    style={{ fontWeight: 900 }}
                  >
                    {rotatingWords[currentWord]}
                  </span>
                </h1>
                <p
                  className={`text-base sm:text-lg ${textSecondaryClass} mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed px-4`}
                >
                  We don't just build, we solve your business's biggest challenges with AI-powered automation
                </p>
              </div>

              <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-white/80">AI Automation</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-white/80">Web Development</span>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-white/80">App Development</span>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 text-center">
                <a href="https://wa.me/916000863947" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base bg-white text-black hover:bg-white/90 relative group overflow-hidden"
                  >
                    <span className="relative z-10 transition-all duration-300">Get Started Today</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agents in Action Section */}
        <section className={`py-12 sm:py-16 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-white/5 rounded-full border border-dashed border-white/10">
                <span className="text-xs sm:text-sm text-white/70">Powered by Advanced AI</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                AI Agents in Action
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Experience how our intelligent AI agents transform customer interactions and automate complex workflows
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex gap-4 sm:gap-6 transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${agentsScrollPosition}px)` }}
              >
                {/* Duplicate the chat interfaces for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-4 sm:gap-6">
                    {/* Chat 1: E-commerce Order Tracking */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-blue-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                              <span className="text-white text-lg">🛍️</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">Order Assistant</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Hi, where's my last order?</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  Hello! Your order #ORD10423 is out for delivery and should arrive within 30 minutes.
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Great! Can I repeat the same order for tomorrow?</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  Re-ordering all 4 items—will you need them by 9 AM?
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Yes, please.</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  ✅ Order scheduled! $89 will be auto-charged tomorrow morning.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">E-commerce Assistant</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat 2: Appointment Scheduling */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-purple-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-lg">📅</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">Booking Agent</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-purple-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">I need to book a consultation</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  I'd be happy to help! What type of consultation are you looking for?
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-purple-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">AI automation strategy session</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">Perfect! Here are available slots:</p>
                                <div className="space-y-1">
                                  <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                    📍 Tomorrow, 2:00 PM
                                  </div>
                                  <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                    📍 Friday, 10:00 AM
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-purple-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Tomorrow at 2 PM works!</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  ✅ Booked! Calendar invite sent to your email. See you tomorrow!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">Appointment Scheduler</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat 3: Invoice Generation */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-green-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                              <span className="text-white text-lg">💰</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">Invoice Bot</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-green-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Generate invoice for Project Alpha</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">Creating invoice for Project Alpha...</p>
                                <div className="bg-gray-900 rounded p-2 space-y-1 text-[10px]">
                                  <div className="flex justify-between text-white/80">
                                    <span>Development</span>
                                    <span>$5,000</span>
                                  </div>
                                  <div className="flex justify-between text-white/80">
                                    <span>Design</span>
                                    <span>$2,000</span>
                                  </div>
                                  <div className="border-t border-white/10 my-1" />
                                  <div className="flex justify-between text-green-400 font-medium">
                                    <span>Total</span>
                                    <span>$7,000</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-green-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Perfect! Send it to client</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  ✅ Invoice #INV-2024-001 sent to client@company.com with payment link!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">Invoice Automation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat 4: Email Automation */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-orange-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                              <span className="text-white text-lg">📧</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">Email Agent</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-orange-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Send welcome email to new subscribers</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  I'll send personalized welcome emails to all 47 new subscribers from today.
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-orange-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Include the discount code</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">
                                  ✅ Emails sent with 20% discount code WELCOME20
                                </p>
                                <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                  📊 Open rate: 68% | Click rate: 34%
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-orange-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Schedule follow-up for next week</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  📅 Follow-up campaign scheduled for next Monday at 10 AM
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">Email Automation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat 5: CRM Data Entry */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-pink-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                              <span className="text-white text-lg">📊</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">CRM Assistant</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-pink-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Add new lead: Sarah from TechCorp</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  I'll add Sarah to your CRM. What's her email and phone number?
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-pink-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">sarah@techcorp.com, +1-555-0123</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">✅ Lead added successfully!</p>
                                <div className="bg-gray-900 rounded p-2 space-y-1 text-[10px] text-white/80">
                                  <div>👤 Sarah Johnson</div>
                                  <div>🏢 TechCorp</div>
                                  <div>📧 sarah@techcorp.com</div>
                                  <div>📱 +1-555-0123</div>
                                  <div>🏷️ Status: New Lead</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-pink-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Set reminder to follow up in 2 days</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">⏰ Reminder set for Wednesday at 9 AM</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">CRM Automation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat 6: Meeting Notes */}
                    <div className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[320px] md:w-[360px]">
                      <div className="relative bg-gradient-to-br from-cyan-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:scale-105 transition-transform duration-300">
                        <div className="aspect-[9/19] bg-black rounded-3xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-white text-sm">9:41</span>
                            <div className="flex gap-1">
                              <div className="w-3 h-2 bg-white/80 rounded-sm" />
                              <div className="w-3 h-2 bg-white/60 rounded-sm" />
                              <div className="w-3 h-2 bg-white/40 rounded-sm" />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                              <span className="text-white text-lg">📝</span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-sm">Notes AI</h3>
                              <p className="text-white/50 text-xs">Online</p>
                            </div>
                          </div>

                          <div className="space-y-3 px-2 h-[400px] overflow-hidden">
                            <div className="flex gap-2 justify-end">
                              <div className="bg-cyan-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Summarize today's client meeting</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">Here's your meeting summary:</p>
                                <div className="bg-gray-900 rounded p-2 space-y-1 text-[10px] text-white/80">
                                  <div>✅ Approved Q1 budget: $50K</div>
                                  <div>📅 Launch date: March 15</div>
                                  <div>👥 Team size: 5 members</div>
                                  <div>🎯 Next: Design mockups</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-cyan-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Create action items</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs mb-2">Action items created:</p>
                                <div className="space-y-1">
                                  <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                    ☐ Design mockups by Friday
                                  </div>
                                  <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                    ☐ Schedule team kickoff
                                  </div>
                                  <div className="bg-gray-900 rounded p-2 text-[10px] text-white/80">
                                    ☐ Send contract to legal
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="bg-cyan-600 rounded-2xl rounded-tr-sm p-3 max-w-[75%]">
                                <p className="text-white text-xs">Share with team</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                                <p className="text-white text-xs">
                                  ✅ Notes and action items shared with team@company.com
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-white/10">
                            <p className="text-white text-xs font-medium">Meeting Notes AI</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {[...Array(6)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const isMobile = window.innerWidth < 640
                    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
                    const cardWidth = isMobile ? (window.innerWidth - 64) : (isTablet ? 320 : 360)
                    const gap = isMobile ? 16 : 24
                    setAgentsScrollPosition(index * (cardWidth + gap))
                  }}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(
                      agentsScrollPosition /
                        ((typeof window !== "undefined" && window.innerWidth < 640)
                          ? window.innerWidth - 64 + 16
                          : (typeof window !== "undefined" && window.innerWidth < 1024)
                            ? 320 + 24
                            : 360 + 24)
                    ) %
                      6 ===
                    index
                      ? "bg-white w-8"
                      : "bg-white/30 w-2"
                  }`}
                  aria-label={`Go to chat ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="achievements" className={`py-16 sm:py-24 md:py-32 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-4 px-4 py-1 bg-white/5 rounded-full border border-dashed border-white/10">
                <span className="text-xs sm:text-sm text-white/70">and they say what they see!</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                Our Achievement
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Curious about what we've accomplished? Let our track record speak for itself.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <AchievementCardBrands />
              <AchievementCardExperience />
              <AchievementCardSavings />
            </div>
          </div>
        </section>

        <section className={`py-12 sm:py-16 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                Benefits of Sarathi Studio
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Why Settle for Less? Before you dive in, let's show you why our service is the game-changer your
                business needs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* Benefit 1: AI-Powered Automation - Growing chart animation */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative overflow-hidden">
                  <svg
                    className="w-full h-full text-white transition-transform duration-700 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      className="animate-[draw_2s_ease-in-out_infinite]"
                      style={{
                        strokeDasharray: "100",
                        strokeDashoffset: "100",
                        animation: "draw 2s ease-in-out infinite",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md group-hover:bg-blue-500/40 transition-all duration-300" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>AI-Powered Automation</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  We help brands automate repetitive tasks by turning manual workflows into intelligent systems that
                  save time and accelerate growth.
                </p>
              </div>

              {/* Benefit 2: Lightning-Fast Turnaround - Lightning bolt with pulse */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative">
                  <svg
                    className="w-full h-full text-yellow-400 animate-[flash_1.5s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-lg animate-pulse" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>Lightning-Fast Turnaround</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  Your automation and development requests are delivered within 48 hours, not weeks or months.
                </p>
              </div>

              {/* Benefit 3: Affordable Excellence - Spinning coin */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative">
                  <svg
                    className="w-full h-full text-green-400 animate-[spin_3s_linear_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/40 transition-all duration-300" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>Affordable Excellence</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  No surprises here! Pay the same fixed price each month. No sneaky extras on your bill
                </p>
              </div>

              {/* Benefit 4: Problem Solving - Glowing lightbulb */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative">
                  <svg
                    className="w-full h-full text-yellow-300 animate-[glow_2s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-yellow-300/40 rounded-full blur-xl animate-pulse" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>Problem Solving</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  We solve your business challenges with innovative AI solutions that drive real results.
                </p>
              </div>

              {/* Benefit 5: Private Client Portal - Bouncing document */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative">
                  <svg
                    className="w-full h-full text-blue-300 animate-[bounce_2s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-md group-hover:bg-blue-300/40 transition-all duration-300" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>Private Client Portal</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  Easily manage your subscription, and automation requests from your own personal portal.
                </p>
              </div>

              {/* Benefit 6: Access to Expert Team - Expanding team icon */}
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 relative">
                  <svg
                    className="w-full h-full text-purple-300 animate-[expand_2s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-purple-300/20 rounded-full blur-md group-hover:bg-purple-300/40 transition-all duration-300" />
                </div>
                <h3 className={`text-lg sm:text-xl font-light ${textClass} mb-2 sm:mb-3`}>Access to Expert Team</h3>
                <p className={`text-xs sm:text-sm ${textSecondaryClass} leading-relaxed`}>
                  Access to top-tier, experienced developers and AI specialists without the need for long-term contracts
                  or full-time salaries
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`py-16 sm:py-24 md:py-32 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                We are here to Serve...
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Stop stressing yourself in finding out the perfect solution for your particular business needs
              </p>
              <p className={`text-xs sm:text-sm ${textSecondaryClass} mt-4 italic`}>Tip: Hover on the cards</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {/* Service 1: AI Automation */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 1 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 1 ? null : 1)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/ai-automation.jpg"
                        alt="AI Automation"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/futuristic-ai-automation-interface-with-neural-net.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>AI Automation</h3>
                </div>
              </div>

              {/* Service 2: Web Development */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 2 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 2 ? null : 2)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-green-900/30 to-teal-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/web-development.jpg"
                        alt="Web Development"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/modern-responsive-website-design-on-multiple-devic.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Web Development</h3>
                </div>
              </div>

              {/* Service 3: App Development */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 3 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 3 ? null : 3)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-900/30 to-red-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect x="7" y="2" width="10" height="20" rx="2" ry="2" strokeWidth={1.5} />
                          <path d="M11 18h2" strokeWidth={1.5} strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/app-development.jpg"
                        alt="App Development"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/modern-smartphone-with-sleek-mobile-app-interface-.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>App Development</h3>
                </div>
              </div>

              {/* Service 4: Chatbot Development */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 4 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 4 ? null : 4)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-900/30 to-purple-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/chatbot-development.jpg"
                        alt="Chatbot Development"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/ai-chatbot-interface-with-conversation-bubbles--vi.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Chatbot Development</h3>
                </div>
              </div>

              {/* Service 5: Workflow Automation */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 5 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 5 ? null : 5)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/workflow-automation.jpg"
                        alt="Workflow Automation"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/automated-workflow-diagram-with-connected-nodes--p.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Workflow Automation</h3>
                </div>
              </div>

              {/* Service 6: Data Analysis */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 6 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 6 ? null : 6)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-900/30 to-orange-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 3v18h18" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                          <polyline
                            points="7 15 11 11 15 15 21 9"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/data-analysis.jpg"
                        alt="Data Analysis"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/data-analytics-dashboard-with-charts--graphs--pie-.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Data Analysis</h3>
                </div>
              </div>

              {/* Service 7: API Integration */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 7 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 7 ? null : 7)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900/30 to-purple-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/api-integration.jpg"
                        alt="API Integration"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/api-integration-architecture-with-connected-servic.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>API Integration</h3>
                </div>
              </div>

              {/* Service 8: Database Solutions */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 8 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 8 ? null : 8)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/30 to-green-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/database-solutions.jpg"
                        alt="Database Solutions"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/modern-database-servers--cloud-database-architectu.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Database Solutions</h3>
                </div>
              </div>

              {/* Service 9: Custom Solutions */}
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden ${activeService === 9 ? 'active' : ''} cursor-pointer sm:cursor-default`}
                onClick={() => setActiveService(activeService === 9 ? null : 9)}
              >
                <div className="relative z-10">
                  <div className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-900/30 to-pink-900/30 flex items-center justify-center relative">
                    {/* Default Icon - hidden on mobile, shown on desktop until hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 group-[.active]:opacity-0 sm:opacity-100 sm:group-hover:opacity-0">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-pink-500/20 animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white/80 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 001-1V7a1 1 0 00-1-1H7a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V4z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-[.active]:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:group-hover:scale-110">
                      <img
                        src="/services/custom-solutions.jpg"
                        alt="Custom Solutions"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.src = "/puzzle-pieces-coming-together--custom-tailored-sol.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent" />
                    </div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-light ${textClass} text-center`}>Custom Solutions</h3>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <p className={`text-base sm:text-lg ${textClass} mb-2`}>
                That's not it we do even <span className="font-semibold text-white">More...</span>
              </p>
            </div>
          </div>
        </section>

        {/* Industry Insights Section - Compact */}
        <section className={`py-8 border-t border-b border-dashed ${borderClass}`}>
          <div className="max-w-6xl mx-auto">
            {/* Industry Insights Badge */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                Industry Insights
              </span>
            </div>

            <div className="relative overflow-hidden">
              <div
                ref={articlesScrollRef}
                className="flex gap-4 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${articlesScrollPosition}px)` }}
              >
                {[...articles, ...articles].map((article, index) => (
                  <a
                    key={index}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-72 group"
                  >
                    <div className={`${cardClass} p-4 h-full hover:scale-105 transition-all duration-300`}>
                      {/* Article Image */}
                      <div className="relative h-32 sm:h-36 mb-3 rounded-lg overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 ${article.badgeColor} rounded text-xs font-medium`}>
                            {article.badge}
                          </span>
                        </div>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className={`${textSecondaryClass} text-xs sm:text-sm line-clamp-2 mb-3`}>
                        {article.description}
                      </p>

                      {/* Source */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${textSecondaryClass}`}>{article.source}</span>
                        <svg
                          className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className={`py-16 sm:py-24 md:py-32 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                What Our Clients Say
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Real appreciation from businesses we've helped transform
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[400px] bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Client Message */}
                    <div className="mb-6">
                      <div className="bg-blue-500/10 rounded-2xl rounded-tl-sm p-4 mb-4 border border-blue-500/20">
                        <p className={`text-sm ${textSecondaryClass} leading-relaxed`}>{testimonial.message}</p>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-3 mb-6">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full ring-2 ring-white/20 object-cover"
                        />
                        <div className="min-w-0">
                          <p className={`font-medium text-sm ${textClass}`}>{testimonial.author}</p>
                          <p className={`text-xs ${textSecondaryClass}`}>
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sarathi Studio Reply */}
                    <div className="border-t border-dashed border-white/10 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0 p-2">
                          <SarathiLogo iconOnly className="w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs ${textSecondaryClass} mb-1`}>
                            <span className="font-medium text-white">Sarathi Studio</span>
                          </p>
                          <p className={`text-sm ${textClass}`}>{testimonial.reply}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const isMobile = window.innerWidth < 640
                    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
                    const cardWidth = isMobile ? (window.innerWidth - 64) : (isTablet ? 360 : 400)
                    const gap = isMobile ? 16 : 24
                    setScrollPosition(index * (cardWidth + gap))
                  }}
                  className={`h-2 rounded-full transition-all ${
                    Math.floor(
                      scrollPosition /
                        ((typeof window !== "undefined" && window.innerWidth < 640)
                          ? window.innerWidth - 64 + 16
                          : (typeof window !== "undefined" && window.innerWidth < 1024)
                            ? 360 + 24
                            : 400 + 24)
                    ) %
                      testimonials.length ===
                    index
                      ? "bg-white w-8"
                      : "bg-white/30 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="work" className={`py-16 sm:py-24 md:py-32 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-blue-500/10 rounded-full border border-dashed border-blue-500/20">
                <span className="text-xs sm:text-sm text-blue-400">Still confused about us?</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                See our work
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Real-world AI automation projects that transformed business operations and saved thousands of hours
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Project 1: IT Support Automation */}
              <Link
                href="/work/moveworks"
                className="group relative bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">IT Support Automation</h3>
                      <p className="text-sm text-white/70">Employee Support Platform</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-light text-white mb-1">Internal IT Automation</h4>
                      <p className="text-xs text-white/60">70% queries auto-resolved</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project 2: Customer Service Automation */}
              <Link
                href="/work/yellow-ai"
                className="group relative bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 group-hover:from-yellow-500/50 group-hover:to-orange-500/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">Multichannel Support</h3>
                      <p className="text-sm text-white/70">Customer Service AI</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-light text-white mb-1">Conversational AI</h4>
                      <p className="text-xs text-white/60">8 languages • 65% automation</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project 3: Voice Analytics */}
              <Link
                href="/work/uniphore"
                className="group relative bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 group-hover:from-purple-500/50 group-hover:to-indigo-500/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">Voice Analytics</h3>
                      <p className="text-sm text-white/70">Enterprise Call Analysis</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-light text-white mb-1">AI Voice Platform</h4>
                      <p className="text-xs text-white/60">Real-time analytics • 90% QA reduction</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project 4: Manufacturing Support */}
              <Link
                href="/work/hunter-apparel"
                className="group relative bg-gradient-to-br from-orange-900/20 via-red-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 sm:col-span-2 lg:col-span-1"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 group-hover:from-orange-500/50 group-hover:to-red-500/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">Manufacturing Support</h3>
                      <p className="text-sm text-white/70">Retail Operations AI</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-light text-white mb-1">Workflow Automation</h4>
                      <p className="text-xs text-white/60">60% faster responses • 50% cost reduction</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project 5: Healthcare Automation */}
              <Link
                href="/work/omega-healthcare"
                className="group relative bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-black rounded-3xl overflow-hidden border border-dashed border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 sm:col-span-2 lg:col-span-2"
              >
                <div className="aspect-[4/3] lg:aspect-[8/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 group-hover:from-emerald-500/50 group-hover:to-teal-500/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">Healthcare Automation</h3>
                      <p className="text-sm text-white/70">Medical Billing AI</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-light text-white mb-1">Document Processing</h4>
                      <p className="text-xs text-white/60">15,000 hours saved monthly • 95% accuracy</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div id="comparison">
          <ComparisonTable />
        </div>

        {/* Timezone Bar component */}
        <TimezoneBar />

        {/* And here comes the Sauce... header and SauceSection */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-white/80">
              And here comes the <span className="font-semibold text-white">Sauce...</span>
            </p>
          </div>
        </section>

        <SauceSection />

        <div id="faqs">
          <FAQSection />
        </div>

        <FinalCTASection />

        <section id="contact" className={`py-16 sm:py-24 md:py-32 px-4 border-t border-dashed ${borderClass}`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light ${textClass} mb-4 sm:mb-6`}>
                Get In Touch
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto px-4`}>
                Ready to transform your business with AI automation? Let's start a conversation.
              </p>
            </div>

            <div
              className={`${cardBgClass} backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-dashed ${borderClass}`}
            >
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${textClass} mb-2`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-4 py-3 rounded-lg border border-dashed ${borderClass} ${cardBgClass} ${textClass} placeholder:${textSecondaryClass} focus:outline-none focus:border-blue-500 transition-colors`}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${textClass} mb-2`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-3 rounded-lg border border-dashed ${borderClass} ${cardBgClass} ${textClass} placeholder:${textSecondaryClass} focus:outline-none focus:border-blue-500 transition-colors`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={`block text-sm font-medium ${textClass} mb-2`}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={`w-full px-4 py-3 rounded-lg border border-dashed ${borderClass} ${cardBgClass} ${textClass} placeholder:${textSecondaryClass} focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className={`block text-sm font-medium ${textClass} mb-2`}>
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={`w-full px-4 py-3 rounded-lg border border-dashed ${borderClass} ${cardBgClass} ${textClass} focus:outline-none focus:border-blue-500 transition-colors`}
                  >
                    <option>AI Automation</option>
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>All Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${textClass} mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border border-dashed ${borderClass} ${cardBgClass} ${textClass} placeholder:${textSecondaryClass} focus:outline-none focus:border-blue-500 transition-colors resize-none`}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className={`w-full rounded-full px-8 py-6 text-base bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-400 transition disabled:opacity-60 disabled:cursor-not-allowed`}
                  disabled={isContactSubmitting}
                >
                  {isContactSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <Chatbot />
    </div>
  )
}
