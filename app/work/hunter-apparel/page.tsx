import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function HunterApparelCaseStudy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-dashed border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-1 bg-orange-500/10 rounded-full border border-dashed border-orange-500/20">
              <span className="text-xs sm:text-sm text-orange-400">Manufacturing Automation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6">Manufacturing Support Automation</h1>
            <p className="text-xl text-white/70 max-w-3xl">
              AI-driven workflow automation for customer service and operations in manufacturing and retail support
            </p>
          </div>

          {/* Project Image */}
          <div className="aspect-video rounded-3xl overflow-hidden border border-dashed border-white/10 bg-gradient-to-br from-orange-900/20 to-red-900/20 mb-12">
            <img
              src="/manufacturing-support-automation.jpg"
              alt="Manufacturing Support Automation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Problem Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm">
                  1
                </span>
                The Problem
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Hunter Apparel faced challenges managing increased customer demand with manual ticket routing and FAQ
                handling. The support team was overwhelmed with repetitive queries, leading to slow response times.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Manual ticket routing causing delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Repetitive FAQ queries consuming staff time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Difficulty scaling support during peak seasons</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm">
                  2
                </span>
                Our Solution
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Sarathi Studio replaced manual processes with an AI-powered workflow system that automatically triages
                tickets, handles FAQs, and routes complex issues to the right team members.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Automated ticket triage and categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>AI-powered FAQ chatbot for instant responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Smart routing based on issue complexity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Integration with existing CRM system</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Outcome Section */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 md:p-12 border border-dashed border-white/10 mb-16">
            <h2 className="text-2xl font-light mb-8">Results Achieved</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-light text-green-400 mb-2">60%</div>
                <p className="text-white/70">Faster response times</p>
              </div>
              <div>
                <div className="text-4xl font-light text-blue-400 mb-2">50%</div>
                <p className="text-white/70">Reduction in support costs</p>
              </div>
              <div>
                <div className="text-4xl font-light text-purple-400 mb-2">75%</div>
                <p className="text-white/70">FAQs handled automatically</p>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {["AI Workflow Automation", "Ticket Triage", "FAQ Chatbot", "CRM Integration", "Smart Routing"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/5 rounded-full border border-dashed border-white/10 text-sm text-white/70"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-colors font-medium"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
