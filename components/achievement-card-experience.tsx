"use client"

import { useState } from "react"

export function AchievementCardExperience() {
  const [isHovered, setIsHovered] = useState(false)

  const services = [
    { name: "AI Automation", angle: 0, color: "from-blue-400 to-blue-600" },
    { name: "Web Dev", angle: 60, color: "from-purple-400 to-purple-600" },
    { name: "App Dev", angle: 120, color: "from-pink-400 to-pink-600" },
    { name: "Digital Solutions", angle: 180, color: "from-orange-400 to-orange-600" },
    { name: "Cloud Services", angle: 240, color: "from-green-400 to-green-600" },
    { name: "Consulting", angle: 300, color: "from-cyan-400 to-cyan-600" },
  ]

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "perspective(1000px) rotateX(-2deg) rotateY(2deg)" : "none",
      }}
    >
      {/* Visual Content - Circular Service Diagram */}
      <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center overflow-visible relative">
        {/* Rotating Background */}
        <div
          className="absolute inset-0 opacity-10 transition-transform duration-[3000ms] rounded-2xl"
          style={{
            backgroundImage: `conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f97316, #10b981, #06b6d4, #3b82f6)`,
            transform: isHovered ? "rotate(360deg)" : "rotate(0deg)",
          }}
        />

        {/* Circular Diagram */}
        <div className="relative w-full h-full p-6 flex items-center justify-center">
          <svg viewBox="-10 -10 220 220" className="w-full h-full overflow-visible">
            {/* Outer Circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              className={`transition-all duration-700 ${isHovered ? "stroke-white/30" : ""}`}
            />

            {/* Inner Circle */}
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              className={`transition-all duration-700 ${isHovered ? "fill-white/10" : ""}`}
            />

            {/* Service Segments */}
            {services.map((service, index) => {
              const angle = (service.angle * Math.PI) / 180
              const x = 100 + 60 * Math.cos(angle - Math.PI / 2)
              const y = 100 + 60 * Math.sin(angle - Math.PI / 2)
              const labelX = 100 + 95 * Math.cos(angle - Math.PI / 2)
              const labelY = 100 + 95 * Math.sin(angle - Math.PI / 2)

              return (
                <g key={index}>
                  {/* Connecting Line */}
                  <line
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    className={`transition-all duration-500 delay-${index * 100}`}
                    style={{
                      strokeDasharray: isHovered ? "0" : "5,5",
                    }}
                  />

                  {/* Service Node */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? "8" : "6"}
                    className={`transition-all duration-500 delay-${index * 100}`}
                    style={{
                      fill: `url(#gradient-${index})`,
                    }}
                  />

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={service.color.split(" ")[0].replace("from-", "#")} />
                      <stop offset="100%" stopColor={service.color.split(" ")[1].replace("to-", "#")} />
                    </linearGradient>
                  </defs>

                  {/* Service Label */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="8"
                    className={`transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-60"}`}
                  >
                    {service.name}
                  </text>
                </g>
              )
            })}

            {/* Center Text */}
            <text x="100" y="95" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              4
            </text>
            <text x="100" y="110" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
              YEARS
            </text>
          </svg>
        </div>

        {/* Pulse Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse rounded-2xl" />
        )}
      </div>

      {/* Text Content */}
      <h3 className="text-2xl sm:text-3xl font-light text-white mb-2 sm:mb-3 transition-colors group-hover:text-purple-300">
        4 Years of Experience
      </h3>
      <p className="text-xs sm:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
        Bringing seasoned expertise in AI automation, web/app development, and digital solutions
      </p>

      {/* Hover Indicator */}
      <div
        className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-purple-400 transition-all duration-300 ${
          isHovered ? "scale-150 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  )
}
