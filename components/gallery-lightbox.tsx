"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"

interface GalleryLightboxProps {
  currentIndex: number
  totalPhotos: number
  photoSrc: string
  caption: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({
  currentIndex,
  totalPhotos,
  photoSrc,
  caption,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsOpen(true))
    })
  }, [])

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [handleClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  const animState = isExiting ? "opacity-0 scale-95" : isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
  const backdropState = isExiting ? "opacity-0" : isOpen ? "opacity-100" : "opacity-0"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300 ${backdropState}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center gap-6 max-w-2xl w-full transition-all duration-300 ease-out ${animState}`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close gallery"
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 z-20"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation - Previous */}
        <button
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:-translate-x-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Navigation - Next */}
        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Photo display */}
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.2)] relative bg-black/40">
          <Image
            src={photoSrc}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="text-center px-4">
          <p className="font-cursive text-2xl md:text-3xl text-pink-200 mb-2">
            {caption} <span className="text-red-400">&#10084;</span>
          </p>
          <p className="text-pink-400/50 text-sm">
            {currentIndex + 1} of {totalPhotos} memories
          </p>
        </div>

        {/* Dot indicators - show max 20, with scroll hint */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
          {Array.from({ length: Math.min(totalPhotos, 20) }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === currentIndex % 20 ? "bg-pink-400 w-4" : "bg-pink-400/30"
              }`}
            />
          ))}
          {totalPhotos > 20 && (
            <span className="text-pink-400/40 text-xs ml-1">+{totalPhotos - 20}</span>
          )}
        </div>
      </div>
    </div>
  )
}
