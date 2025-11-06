"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  vx: number
  vy: number
  angle: number
}

export function SauceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 0.15 + 0.05
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: speed,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          angle: angle,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  useEffect(() => {
    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          if (isHovering) return star

          let newX = star.x + star.vx
          let newY = star.y + star.vy
          let newVx = star.vx
          let newVy = star.vy

          if (newX <= 0 || newX >= 100) {
            newVx = -newVx
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -newVy
            newY = Math.max(0, Math.min(100, newY))
          }

          return {
            ...star,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          }
        }),
      )

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovering])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      section.addEventListener("mouseenter", handleMouseEnter)
      section.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        section.removeEventListener("mousemove", handleMouseMove)
        section.removeEventListener("mouseenter", handleMouseEnter)
        section.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden bg-black">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated stars with random movement and cursor following */}
      {stars.map((star) => {
        const offsetX = isHovering ? (mousePosition.x - star.x) * star.speed * 0.5 : 0
        const offsetY = isHovering ? (mousePosition.y - star.y) * star.speed * 0.5 : 0

        return (
          <div
            key={star.id}
            className="absolute rounded-full bg-white transition-all duration-300 ease-out"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          />
        )
      })}

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Pause or Cancel
          <br />
          Anytime
        </h2>
        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Don't commit to a service you've gotta pay even when there's no work to give them. With Sarathi Studio, you're
          in complete control!
        </p>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("sarathi-open-chat"))
            }
          }}
          className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          View Plans and Pricing
        </button>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
    </section>
  )
}
