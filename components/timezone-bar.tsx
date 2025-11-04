"use client"

import { useState, useEffect } from "react"

interface TimeZone {
  city: string
  timezone: string
  country: string
}

const timezones: TimeZone[] = [
  { city: "New York", timezone: "America/New_York", country: "USA" },
  { city: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { city: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
  { city: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { city: "London", timezone: "Europe/London", country: "UK" },
]

export function TimezoneBar() {
  const [times, setTimes] = useState<string[]>([])

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = timezones.map((tz) => {
        const date = new Date()
        return new Intl.DateTimeFormat("en-US", {
          timeZone: tz.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(date)
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative py-3 px-4 border-y border-dashed border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse" />

      {/* Desktop layout - single line */}
      <div className="hidden lg:block relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-[11px]">
          {timezones.map((tz, index) => (
            <div key={index} className="flex items-center gap-1.5 group whitespace-nowrap">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-white/90 font-mono group-hover:text-blue-400 transition-colors">
                {times[index] || "00:00:00"}
              </span>
              <span className="text-white/60 group-hover:text-white/80 transition-colors">
                {tz.city}, {tz.country}
              </span>
              {index === 2 && (
                <div className="mx-3 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-dashed border-blue-500/20">
                  <span className="text-white font-light whitespace-nowrap text-xs">
                    Available 24/7 • Best time to start your project is{" "}
                    <span className="font-medium text-blue-400">now</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tablet layout - wrapped but compact */}
      <div className="hidden md:block lg:hidden relative max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          {timezones.slice(0, 2).map((tz, index) => (
            <div key={index} className="flex items-center gap-1.5 group whitespace-nowrap">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-white/90 font-mono">{times[index] || "00:00:00"}</span>
              <span className="text-white/60">
                {tz.city}, {tz.country}
              </span>
            </div>
          ))}
          <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-dashed border-blue-500/20">
            <span className="text-white font-light whitespace-nowrap text-xs">
              Available 24/7 • <span className="font-medium text-blue-400">Start now</span>
            </span>
          </div>
          {timezones.slice(2).map((tz, index) => (
            <div key={index + 2} className="flex items-center gap-1.5 group whitespace-nowrap">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-white/90 font-mono">{times[index + 2] || "00:00:00"}</span>
              <span className="text-white/60">
                {tz.city}, {tz.country}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout - stacked */}
      <div className="md:hidden space-y-2">
        {timezones.map((tz, index) => (
          <div key={index} className="flex items-center justify-between px-3 py-1.5 bg-white/5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-white/60 text-[10px]">
                {tz.city}, {tz.country}
              </span>
            </div>
            <span className="text-white font-mono text-xs">{times[index] || "00:00:00"}</span>
          </div>
        ))}
        <div className="text-center px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-dashed border-blue-500/20">
          <span className="text-white font-light text-[10px]">
            Available 24/7 • <span className="font-medium text-blue-400">Start now</span>
          </span>
        </div>
      </div>
      {/* </CHANGE> */}
    </div>
  )
}
