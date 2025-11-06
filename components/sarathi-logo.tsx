import Image from "next/image"

export function SarathiLogo({
  className = "w-auto h-8",
  iconOnly = false,
}: { className?: string; iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <div className={className}>
        <Image
          src="/logo.jpg"
          alt="Sarathi Studio logo"
          width={100}
          height={100}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-full w-auto">
        <Image
          src="/logo.jpg"
          alt="Sarathi Studio logo"
          width={100}
          height={100}
          className="h-full w-auto object-contain"
          priority
        />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-bold text-white tracking-tighter">Sarathi</span>
        <span className="text-2xl font-light text-white tracking-tighter -mt-1">Studio</span>
      </div>
    </div>
  )
}
