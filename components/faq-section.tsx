"use client"

import { useState } from "react"
import { Plus, Minus, Mail } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "Who's behind Sarathi Studio?",
    answer:
      "Hey there! I'm Roshan, the founder of Sarathi Studio. We're a passionate team that combines creative design expertise with cutting-edge AI automation. Our vision is to help businesses unlock their full potential through strategic, impactful, and visually stunning digital solutions, while fostering long-lasting relationships built on trust and innovation.",
  },
  {
    question: "How does AI automation work in your process?",
    answer:
      "Great question! We use AI to supercharge our workflow - from rapid prototyping and code generation to automated testing and optimization. This doesn't replace human creativity; it amplifies it. Our team focuses on strategy, design, and quality control while AI handles repetitive tasks, allowing us to deliver projects 3-5x faster than traditional agencies.",
  },
  {
    question: "How does the delivery process work?",
    answer:
      "Once you subscribe, submit unlimited requests through our client portal. We work on one request at a time, delivering each within 48-72 hours on average. You'll receive regular updates, and once delivered, you can request revisions or move to the next request. Our AI-powered workflow ensures consistent quality and lightning-fast turnaround.",
  },
  {
    question: "Is there a limit to how many requests I can have?",
    answer:
      "Nope, no limits! With your active subscription, add as many requests to your queue as you'd like. We'll work through them one by one, ensuring each gets the attention it deserves. You'll always have a steady stream of work being completed without worrying about hourly rates or project quotes.",
  },
  {
    question: "How fast will I receive my projects?",
    answer:
      "Most requests are completed within 48-72 hours. Complex projects may take longer, but we'll always communicate timelines upfront. Our AI-assisted development process allows us to work significantly faster than traditional agencies while maintaining high quality. Rush delivery options are also available for urgent requests.",
  },
  {
    question: "What if I don't like the result?",
    answer:
      "No worries at all! We offer unlimited revisions on all projects. If something isn't quite right, just let us know what changes you'd like, and we'll refine it until you're 100% satisfied. Your happiness is our priority, and we won't consider a project complete until you're thrilled with the results.",
  },
  {
    question: "Can AI really replace human designers?",
    answer:
      "Absolutely not, and we don't want it to! AI is a powerful tool, but it lacks human intuition, emotional intelligence, and strategic thinking. We use AI to handle technical heavy lifting and repetitive tasks, freeing our team to focus on creative strategy, brand storytelling, and crafting experiences that truly resonate with your audience.",
  },
  {
    question: "What does it mean to pause a subscription?",
    answer:
      "Life gets busy, and we totally get it! You can pause your subscription anytime if you don't have active requests. Your billing cycle pauses, and you won't be charged until you resume. Perfect for seasonal businesses or when you're between projects. Simply reactivate when you're ready to continue.",
  },
  {
    question: "Why wouldn't I just hire a full-time developer?",
    answer:
      "Excellent question! A senior full-time developer costs $80,000-$150,000+ per year, plus benefits, equipment, and overhead. With Sarathi Studio, you get an entire team of experts (developers, designers, AI specialists) for a fraction of the cost. Plus, you can pause or cancel anytime and scale as needed.",
  },
  {
    question: "What AI tools and technologies do you use?",
    answer:
      "We leverage cutting-edge AI tools including GPT-4 for content generation, Midjourney and DALL-E for visual concepts, GitHub Copilot for code assistance, and custom AI models for specific tasks. We also use Next.js, React, Node.js, and various AI APIs to build intelligent, scalable solutions tailored to your needs.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Due to the high-quality nature of our work, we don't offer refunds. However, we do offer a satisfaction guarantee - we'll keep revising until you're happy with the results. You can also pause or cancel your subscription anytime to stop future billing. We're confident you'll love working with us!",
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
            href="mailto:connect@sarathi.studio"
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
