import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"
import { SarathiLogo } from "@/components/sarathi-logo"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left order-2 sm:order-1">
            © 2025 Sarathi Studio. All rights reserved
          </p>

          {/* Logo - Smaller on mobile */}
          <div className="order-1 sm:order-2">
            <SarathiLogo className="h-6 sm:h-8" />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-6 order-3">
            <Link
              href="https://x.com/sarathi_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X (Twitter)</span>
            </Link>
            <Link
              href="https://instagram.com/sarathi_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://linkedin.com/company/sarathi-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
