"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface HeartPhotoCellProps {
  index: number
  photoSrc: string
  caption: string
  onClick: () => void
  delay: number
}

export function HeartPhotoCell({ index, photoSrc, caption, onClick, delay }: HeartPhotoCellProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <button
      onClick={onClick}
      aria-label={`Open photo ${index + 1}: ${caption}`}
      className={`
        group relative w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12
        rounded-sm overflow-hidden cursor-pointer
        transition-all duration-500
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        hover:z-20
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Neon pink border */}
      <div className="absolute inset-0 rounded-sm border border-pink-500/40 group-hover:border-pink-400/80 transition-colors duration-300 z-10" />

      {/* Neon glow on hover */}
      <div className="absolute -inset-1 rounded-sm bg-pink-500/0 group-hover:bg-pink-500/20 blur-sm transition-all duration-300 z-0" />

      {/* Real photo */}
      <Image
        src={photoSrc}
        alt={caption}
        fill
        sizes="(max-width: 640px) 28px, (max-width: 768px) 36px, (max-width: 1024px) 44px, 48px"
        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
      />

      {/* Heartbeat animation on hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-3 h-3 md:w-4 md:h-4 text-white drop-shadow-lg animate-heartbeat"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </button>
  )
}
