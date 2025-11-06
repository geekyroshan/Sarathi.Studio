"use client"

import { useState } from "react"
import { Plus, Minus, Mail } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "What services do you provide?",
    answer:
      "AI Automations, Chatbots/Agents, Web Development, App Development, Workflow Automation, Data Analytics, API Integrations, Database Solutions, and Custom builds.",
  },
  {
    question: "How do you start a project?",
    answer:
      "Short discovery call → proposal with scope, INR pricing and timeline → kickoff with milestones and weekly demos.",
  },
  {
    question: "What industries do you support?",
    answer:
      "D2C/eCommerce, SaaS, Healthcare, Manufacturing, IT/Support, and services businesses. We tailor automations per domain.",
  },
  {
    question: "How fast can we start and what’s the timeline?",
    answer:
      "Start in 2–5 days post‑discovery. MVP agents: 1–2 weeks. Websites: 2–3 weeks. Larger builds depend on scope/integrations.",
  },
  {
    question: "Which tech do you use?",
    answer:
      "Next.js/React, Node/TypeScript, OpenAI/LLM providers, vector databases, analytics/observability, and integrations like HubSpot, Slack, Salesforce, Airtable, Notion, Zapier.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "Least‑privilege access, encryption in transit/at rest (provider‑dependent), minimal data retention, audit trails on request. On‑prem/VPC available on eligible plans.",
  },
  {
    question: "Do you build on our stack and integrate with our tools?",
    answer:
      "Yes. We integrate with your CRM/helpdesk/data sources and match your deployment model (cloud or self‑hosted where feasible).",
  },
  {
    question: "What does support look like after launch?",
    answer:
      "Monitoring, fixes and enhancements under monthly iteration. We optimize based on real usage data. SLAs available if needed.",
  },
  {
    question: "Do you offer multi‑language bot support?",
    answer:
      "Yes—English, Hindi and Assamese are supported. We can extend to other languages depending on content and audience.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We don’t offer refunds, but we do offer a satisfaction guarantee—we iterate until you’re happy. You can also pause/cancel future work anytime.",
  },
  {
    question: "Who’s behind Sarathi?",
    answer:
      "Sarathi Studio is led by Roshan & Monirul with a small team of developers and automation specialists.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            We Get It—Curiosity Leads to Success! Got questions? That's a great sign. Here are some answers.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="relative">
              {/* Answer on the left (appears when expanded) */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 max-w-3xl">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    R
                  </div>
                  {/* Answer bubble */}
                  <div className="flex-1 bg-[#1a1a1a] rounded-2xl rounded-tl-none p-4 sm:p-5 border border-gray-800">
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>

              {/* Question on the right */}
              <div className="flex justify-end">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center gap-2 sm:gap-3 bg-[#1a1a1a] hover:bg-[#222222] border border-gray-800 rounded-full py-2.5 sm:py-3 px-4 sm:px-5 transition-all hover:shadow-lg hover:shadow-blue-500/10 group max-w-full sm:max-w-2xl"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-700 bg-transparent flex items-center justify-center transition-all group-hover:border-blue-500 group-hover:scale-110">
                    {openIndex === index ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white text-left">{faq.question}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a1a1a] rounded-2xl border border-gray-800 p-4 sm:p-5 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
          <p className="text-sm sm:text-base font-semibold text-white text-center sm:text-left">
            Can't find your answer?
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@sarathi.studio"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (typeof window !== "undefined") {
                // Fallback for non-Gmail users
                window.location.href = "mailto:connect@sarathi.studio"
              }
              // Allow default behaviour to open Gmail tab when available
            }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs sm:text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all hover:scale-105 transform whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Send us a Mail
          </a>
        </div>
      </div>
    </section>
  )
}
