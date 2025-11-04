"use client"

import { useTheme } from "./theme-provider"
import { Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-dashed border-white/20 hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Moon className={`w-5 h-5 transition-colors ${theme === "dark" ? "text-blue-500" : "text-white"}`} />
    </button>
  )
}
