"use client"

import { useState, useCallback } from "react"
import { HeartPhotoCell } from "@/components/heart-photo-cell"
import { GalleryLightbox } from "@/components/gallery-lightbox"

// Heart shape grid: 1 = photo cell, 0 = empty
const HEART_GRID = [
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
]

const TOTAL_IMAGES = 70

const CAPTIONS = [
  "This moment lives in my heart",
  "Forever etched in my soul",
  "My favorite place is next to you",
  "Where it all began",
  "You make everything beautiful",
  "Lost in your eyes",
  "Our little infinity",
  "The day I knew it was you",
  "My heart skips a beat",
  "Together is my favorite place",
  "You are my sunshine",
  "Every second with you is magic",
  "Love looks like this",
  "My safe place, my person",
  "You are the reason I smile",
  "Dancing through life with you",
  "Home is wherever you are",
  "Our love story continues",
  "A moment frozen in time",
  "You and me, always",
  "My heart chose you",
  "Falling deeper every day",
  "The best is yet to come",
  "Written in the stars",
  "My yesterday, today, and tomorrow",
  "Two hearts, one love",
  "A love beyond words",
  "My world in your arms",
  "Growing old with my favorite person",
  "Thank you for being you",
  "All of me loves all of you",
  "Our adventure of a lifetime",
  "I found my home in you",
  "Perfectly imperfect, together",
  "A love that lights up the sky",
  "The best chapter of my life",
  "My peace in the chaos",
  "You make ordinary moments extraordinary",
  "Soulmates by fate, lovers by choice",
  "The heartbeat behind my smile",
  "My greatest adventure",
  "I carry your heart in mine",
  "Made for each other",
  "Where love meets forever",
  "You are my dream come true",
  "My first and last love",
  "Love in every heartbeat",
  "Together we are everything",
  "You complete my world",
  "Endless love, timeless moments",
  "A thousand memories with you",
  "You are my happy place",
  "My heart beats for you",
  "Love is our greatest gift",
  "With you, life is perfect",
  "My angel on earth",
  "You are the music of my heart",
  "Every day is Valentine's with you",
  "I am yours, forever",
  "Love without end",
  "You light up my darkest days",
  "My sweetest addiction",
  "A love story for the ages",
  "You are my everything",
  "My reason to believe in magic",
  "Hand in hand, heart to heart",
  "Loving you is breathing",
  "My once in a lifetime",
  "Forever starts with you",
  "You are my favorite chapter",
]

// Get photo path: /photos/1.jpg through /photos/70.jpg
function getPhotoSrc(index: number): string {
  const photoNumber = (index % TOTAL_IMAGES) + 1
  return `/photos/${photoNumber}.jpg`
}

export function HeartGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Collect all active cells in order
  const activeCells: { row: number; col: number; index: number }[] = []
  let cellIndex = 0
  for (let r = 0; r < HEART_GRID.length; r++) {
    for (let c = 0; c < HEART_GRID[r].length; c++) {
      if (HEART_GRID[r][c] === 1) {
        activeCells.push({ row: r, col: c, index: cellIndex })
        cellIndex++
      }
    }
  }

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + TOTAL_IMAGES) % TOTAL_IMAGES : null))
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % TOTAL_IMAGES : null))
  }, [])

  return (
    <section className="relative py-20 px-4 overflow-hidden" style={{ background: "linear-gradient(180deg, #0d0a12 0%, #1a0a1e 40%, #120818 100%)" }}>
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-600/10 blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Section heading */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-pink-400/80 text-sm font-medium tracking-[0.3em] uppercase mb-4">Our Memories</p>
        <h2 className="font-cursive text-5xl md:text-7xl text-pink-100 mb-4">Gallery of Love</h2>
        <p className="text-pink-300/60 text-base max-w-md mx-auto leading-relaxed">
          Every photo holds a heartbeat. Every memory, a forever.
        </p>
      </div>

      {/* Heart shape grid */}
      <div className="relative z-10 flex flex-col items-center gap-1 md:gap-1.5">
        {HEART_GRID.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex gap-1 md:gap-1.5 justify-center">
              {row.map((cell, colIndex) => {
                if (cell === 0) {
                  return <div key={colIndex} className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12" />
                }

                const photoIndex = activeCells.findIndex(
                  (ac) => ac.row === rowIndex && ac.col === colIndex
                )

                return (
                  <HeartPhotoCell
                    key={colIndex}
                    index={photoIndex}
                    photoSrc={getPhotoSrc(photoIndex)}
                    caption={CAPTIONS[photoIndex % CAPTIONS.length]}
                    onClick={() => handleOpen(photoIndex)}
                    delay={photoIndex * 30}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Neon heart outline SVG behind the grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
        <svg viewBox="0 0 512 512" className="w-[500px] h-[500px] md:w-[650px] md:h-[650px]" fill="none">
          <path
            d="M256 448l-30-26C118 322 48 262 48 186 48 124 96 80 160 80c36 0 68 16 96 48 28-32 60-48 96-48 64 0 112 44 112 106 0 76-70 136-178 236z"
            stroke="url(#neonGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom caption */}
      <p className="text-center mt-12 text-pink-300/50 text-sm relative z-10 tracking-wide">
        Click any memory to relive the moment
      </p>

      {/* Lightbox - navigates through all 70 photos */}
      {selectedIndex !== null && (
        <GalleryLightbox
          currentIndex={selectedIndex}
          totalPhotos={TOTAL_IMAGES}
          photoSrc={getPhotoSrc(selectedIndex)}
          caption={CAPTIONS[selectedIndex % CAPTIONS.length]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  )
}
