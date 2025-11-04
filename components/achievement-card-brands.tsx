"use client"

import { useState } from "react"

export function AchievementCardBrands() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-dashed border-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "perspective(1000px) rotateX(2deg) rotateY(-2deg)" : "none",
      }}
    >
      {/* Visual Content */}
      <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden relative">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              transform: isHovered ? "scale(1.2)" : "scale(1)",
            }}
          />
        </div>

        {/* Workflow Diagram */}
        <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
          <div className="space-y-4 w-full">
            {/* Top Row */}
            <div className="flex justify-center gap-4">
              <div
                className={`w-16 h-16 rounded-lg bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center transition-all duration-500 ${
                  isHovered ? "scale-110 rotate-3" : ""
                }`}
              >
                <span className="text-2xl">🤖</span>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-purple-400" />
            </div>

            {/* Middle Row */}
            <div className="flex justify-center gap-8">
              <div
                className={`w-14 h-14 rounded-lg bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center transition-all duration-500 delay-100 ${
                  isHovered ? "scale-110 -rotate-3" : ""
                }`}
              >
                <span className="text-xl">⚡</span>
              </div>
              <div
                className={`w-14 h-14 rounded-lg bg-green-500/30 border-2 border-green-400 flex items-center justify-center transition-all duration-500 delay-200 ${
                  isHovered ? "scale-110 rotate-3" : ""
                }`}
              >
                <span className="text-xl">✨</span>
              </div>
            </div>

            {/* Bottom Connecting Lines */}
            <div className="flex justify-center gap-8">
              <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-pink-400" />
              <div className="w-px h-8 bg-gradient-to-b from-green-400 to-cyan-400" />
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg bg-pink-500/30 border-2 border-pink-400 flex items-center justify-center transition-all duration-500 delay-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              >
                <span className="text-lg">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse" />
        )}
      </div>

      {/* Text Content */}
      <h3 className="text-2xl sm:text-3xl font-light text-white mb-2 sm:mb-3 transition-colors group-hover:text-blue-300">
        95+ Brands Served
      </h3>
      <p className="text-xs sm:text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
        Helping businesses across various industries achieve their goals with AI-powered solutions
      </p>

      {/* Hover Indicator */}
      <div
        className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-blue-400 transition-all duration-300 ${
          isHovered ? "scale-150 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  )
}
