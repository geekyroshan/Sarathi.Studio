export function SarathiLogo({
  className = "w-auto h-8",
  iconOnly = false,
}: { className?: string; iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Infinity/8 Symbol */}
        <path
          d="M 50 20 C 50 20, 30 20, 30 35 C 30 50, 50 50, 50 50 C 50 50, 30 50, 30 65 C 30 80, 50 80, 50 80 C 50 80, 70 80, 70 65 C 70 50, 50 50, 50 50 C 50 50, 70 50, 70 35 C 70 20, 50 20, 50 20 Z"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Symbol - Infinity/8 */}
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <path
          d="M 50 20 C 50 20, 30 20, 30 35 C 30 50, 50 50, 50 50 C 50 50, 30 50, 30 65 C 30 80, 50 80, 50 80 C 50 80, 70 80, 70 65 C 70 50, 50 50, 50 50 C 50 50, 70 50, 70 35 C 70 20, 50 20, 50 20 Z"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-bold text-white tracking-tighter">Sarathi</span>
        <span className="text-2xl font-light text-white tracking-tighter -mt-1">Studio</span>
      </div>
    </div>
  )
}
