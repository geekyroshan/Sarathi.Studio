"use client"

import { useState } from "react"

export function AchievementCardSavings() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer sm:col-span-2 md:col-span-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02)" : "none",
      }}
    >
      {/* Visual Content - Animated Chart */}
      <div className="aspect-square bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              opacity: isHovered ? 0.5 : 0.2,
            }}
          />
        </div>

        {/* Chart SVG */}
        <div className="relative w-full h-full">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={30 + i * 30}
                x2="200"
                y2={30 + i * 30}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                className={`transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-50"}`}
              />
            ))}

            {/* Area Chart */}
            <path
              d="M 0 120 Q 50 100, 100 80 T 200 40 L 200 150 L 0 150 Z"
              fill="url(#areaGradient)"
              className={`transition-all duration-1000 ${isHovered ? "opacity-100" : "opacity-80"}`}
              style={{
                transform: isHovered ? "scaleY(1.08)" : "scaleY(1)",
                transformOrigin: "bottom",
              }}
            />

            {/* Line Chart */}
            <path
              d="M 0 120 Q 50 100, 100 80 T 200 40"
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="3"
              filter="url(#glow)"
              className={`transition-all duration-1000`}
              style={{
                strokeDasharray: "400",
                strokeDashoffset: isHovered ? "0" : "400",
                strokeWidth: isHovered ? "4" : "3",
              }}
            />

            {/* Data Points */}
            {[
              { x: 0, y: 120 },
              { x: 50, y: 100 },
              { x: 100, y: 80 },
              { x: 150, y: 60 },
              { x: 200, y: 40 },
            ].map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "6" : "3"}
                  fill="rgb(34, 197, 94)"
                  className={`transition-all duration-500`}
                  style={{
                    filter: isHovered ? "url(#glow)" : "none",
                    transitionDelay: `${index * 150}ms`,
                  }}
                />
                {isHovered && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="10"
                    fill="none"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="1"
                    opacity="0"
                    className="animate-ping"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  />
                )}
              </g>
            ))}

            {/* Highest Label */}
            <line
              x1="0"
              y1="40"
              x2="200"
              y2="40"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className={`transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-60"}`}
            />
            <text
              x="160"
              y="35"
              fill="rgb(34, 197, 94)"
              fontSize="10"
              className={`transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-80"}`}
            >
              Highest (This month)
            </text>

            {/* Dollar Signs Animation */}
            {isHovered &&
              [20, 60, 100, 140, 180].map((x, index) => (
                <text
                  key={index}
                  x={x}
                  y="20"
                  fill="rgb(34, 197, 94)"
                  fontSize="18"
                  fontWeight="bold"
                  className="animate-bounce"
                  style={{
                    animationDelay: `${index * 120}ms`,
                    filter: "drop-shadow(0 0 4px rgba(34, 197, 94, 0.8))",
                  }}
                >
                  $
                </text>
              ))}
          </svg>
        </div>

        {/* Glow Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 animate-pulse" />
        )}
      </div>

      {/* Text Content */}
      <h3 className="text-2xl sm:text-3xl font-light text-white mb-2 sm:mb-3 transition-colors group-hover:text-green-300">
        $100,000+ Saved for Brands
      </h3>
      <p className="text-xs sm:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
        Helping businesses reinvest savings where it matters most through intelligent automation
      </p>

      {/* Hover Indicator */}
      <div
        className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-green-400 transition-all duration-300 ${
          isHovered ? "scale-150 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  )
}
