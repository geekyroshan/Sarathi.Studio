import { Check, X } from "lucide-react"

interface ComparisonRow {
  feature: string
  sarathi: string | boolean
  freelancer: string | boolean
  agency: string | boolean
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Cost",
    sarathi: "Fixed monthly rate",
    freelancer: "$$$$ (High hourly rates)",
    agency: "$$$$$+ (Premium pricing)",
  },
  {
    feature: "AI Automation",
    sarathi: true,
    freelancer: "Limited or none",
    agency: "Maybe, at extra cost",
  },
  {
    feature: "Turnaround Time",
    sarathi: "48 hours for most projects",
    freelancer: "Weeks, depending on availability",
    agency: "Can take weeks due to processes",
  },
  {
    feature: "Start Time",
    sarathi: "Today itself",
    freelancer: "Days to set up agreements",
    agency: "Weeks to onboard and plan",
  },
  {
    feature: "Unlimited Revisions",
    sarathi: true,
    freelancer: "Limited revisions per project",
    agency: "Limited, with extra time costs",
  },
  {
    feature: "Client Portal",
    sarathi: true,
    freelancer: "No consistent system",
    agency: "Internal systems, less accessible",
  },
  {
    feature: "Scalability",
    sarathi: "Scale instantly with AI",
    freelancer: "Limited by freelancer's capacity",
    agency: "Possible, but expensive",
  },
  {
    feature: "24/7 Support",
    sarathi: true,
    freelancer: "Timezone dependent",
    agency: "Business hours only",
  },
]

export function ComparisonTable() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-500/20">
              Why choose us?
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">See How We Differ</h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Check out what Sarathi Studio offers vs freelancers and traditional agencies. The difference is clear!
          </p>
        </div>

        {/* Comparison Table - Optimized for mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 p-2 sm:p-4 md:p-6 bg-white/5 border-b border-white/10">
              <div className="text-white/40 font-medium text-[9px] sm:text-xs md:text-sm">Feature</div>
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[8px] sm:text-[10px] md:text-xs">⭐</span>
                </div>
                <span className="text-white font-semibold text-[9px] sm:text-xs md:text-base">Sarathi Studio</span>
              </div>
              <div className="text-white/80 font-medium text-[9px] sm:text-xs md:text-base text-center">Freelancer</div>
              <div className="text-white/80 font-medium text-[9px] sm:text-xs md:text-base text-center">Agency</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 p-2 sm:p-4 md:p-6 hover:bg-white/5 transition-colors group"
                >
                  {/* Feature Label - First column */}
                  <div className="flex items-center">
                    <span className="text-white/40 text-[9px] sm:text-xs md:text-sm font-medium">{row.feature}</span>
                  </div>

                  {/* Sarathi Column - Second column */}
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    {typeof row.sarathi === "boolean" ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-green-400" />
                        </div>
                        <span className="text-green-400 text-[9px] sm:text-xs md:text-sm font-medium">Yes</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-green-400" />
                        </div>
                        <span className="text-white text-[9px] sm:text-xs md:text-sm leading-tight">{row.sarathi}</span>
                      </>
                    )}
                  </div>

                  {/* Freelancer Column - Third column */}
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                    {typeof row.freelancer === "boolean" ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                        <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-red-400" />
                      </div>
                    ) : (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-red-400" />
                        </div>
                        <span className="text-white/60 text-[9px] sm:text-xs md:text-sm text-center leading-tight">
                          {row.freelancer}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Agency Column - Fourth column */}
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
                    {typeof row.agency === "boolean" ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                        <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-red-400" />
                      </div>
                    ) : (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-red-400" />
                        </div>
                        <span className="text-white/60 text-[9px] sm:text-xs md:text-sm text-center leading-tight">
                          {row.agency}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden text-center mt-4">
          <p className="text-white/40 text-xs">Zoom in for better view</p>
        </div>
      </div>
    </section>
  )
}
