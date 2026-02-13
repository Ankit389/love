"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const shayaris = [
  {
    text: "Tumhari ek muskaan,\nmeri saari thakan mita deti hai,\ntumhara ek saath,\nmeri poori duniya bana deta hai",
    emoji: "\u2764\uFE0F",
  },
  {
    text: "Tum meri zindagi ka wo hissa ho,\njiske bina meri kahani adhuri hai,\ntumse hi meri subah hai,\ntumse hi meri raat poori hai",
    emoji: "\uD83C\uDF19",
  },
  {
    text: "Na jaane kab tumse milna\nhumare naseeb mein likha tha,\npar jab se mile ho tum,\nhar pal khushiyon se bhara hai",
    emoji: "\u2728",
  },
  {
    text: "Tumhari aankhon mein khoya\nmain apni duniya bhool gaya,\ntumhari baahon mein aake\nmain har gham se door ho gaya",
    emoji: "\uD83D\uDC95",
  },
  {
    text: "Mohabbat ka matlab samjha\njab tumhe dekha pehli baar,\ntab se dil mein bas ek hi\ndhun hai — tum, sirf tum",
    emoji: "\uD83C\uDFB6",
  },
  {
    text: "Khuda se bas itni dua hai,\nhar janam mein tum mili raho,\nmeri har saans mein tum ho,\nmeri har dhadkan mein tum raho",
    emoji: "\uD83E\uDD32",
  },
  {
    text: "Duniya mein kuch bhi ho jaaye,\npar tum meri rehna,\ntumse hi meri pehchaan hai,\ntumse hi mera jeena",
    emoji: "\uD83C\uDF39",
  },
  {
    text: "Tum ho toh sab kuch hai,\ntum nahi toh kuch bhi nahi,\ntum meri rooh ho,\ntum meri har khushi ki wajah ho",
    emoji: "\uD83D\uDC96",
  },
]

export function ShayariSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % shayaris.length)
    }, 5000)
  }, [])

  useEffect(() => {
    if (isVisible && !isPaused) {
      startTimer()
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isVisible, isPaused, startTimer])

  const goTo = (index: number) => {
    setActiveIndex(index)
    startTimer()
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + shayaris.length) % shayaris.length)
    startTimer()
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % shayaris.length)
    startTimer()
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-24 px-4"
      style={{ background: "linear-gradient(135deg, #1a0a10 0%, #2d0a1a 30%, #1a0a10 60%, #0d0508 100%)" }}
    >
      {/* Ambient rose glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
            animation: "pulse-slow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.10) 0%, transparent 70%)",
            animation: "pulse-slow 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(190,24,93,0.06) 0%, transparent 60%)",
            animation: "pulse-slow 12s ease-in-out infinite 4s",
          }}
        />
      </div>

      {/* Floating sparkle dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${8 + (i * 47) % 84}%`,
              top: `${5 + (i * 31) % 90}%`,
              background: i % 3 === 0 ? "#ec4899" : i % 3 === 1 ? "#f9a8d4" : "#fbbf24",
              opacity: 0.3 + (i % 4) * 0.1,
              animation: `pulse-slow ${4 + (i % 3) * 2}s ease-in-out infinite ${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-pink-500/40" />
            <span className="text-pink-400 text-sm font-light tracking-[0.3em] uppercase">
              Dil Ki Baatein
            </span>
            <span className="h-px w-12 bg-pink-500/40" />
          </div>

          <h2
            className="font-cursive text-5xl md:text-7xl mb-4"
            style={{ color: "#f9a8d4" }}
          >
            Romantic Shayari
          </h2>
          <p className="text-pink-300/60 text-lg font-light">
            Har lafz mein tera zikr hai
          </p>
        </div>

        {/* Main card carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(60px)",
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
          }}
        >
          {/* Card container */}
          <div className="relative h-[340px] md:h-[300px] flex items-center justify-center">
            {shayaris.map((shayari, index) => {
              const offset = index - activeIndex
              const absOffset = Math.abs(offset)
              const isActive = index === activeIndex

              if (absOffset > 2) return null

              return (
                <div
                  key={index}
                  className="absolute w-full max-w-lg cursor-pointer"
                  onClick={() => goTo(index)}
                  style={{
                    transform: `translateX(${offset * 60}px) scale(${isActive ? 1 : 0.88 - absOffset * 0.04}) translateZ(${isActive ? 0 : -absOffset * 50}px)`,
                    opacity: isActive ? 1 : 0.3 - absOffset * 0.08,
                    zIndex: isActive ? 10 : 5 - absOffset,
                    filter: isActive ? "none" : `blur(${absOffset * 2}px)`,
                    transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className="relative rounded-2xl p-8 md:p-10 overflow-hidden group"
                    style={{
                      background: "linear-gradient(145deg, rgba(236,72,153,0.08) 0%, rgba(30,10,20,0.95) 50%, rgba(190,24,93,0.06) 100%)",
                      border: "1px solid rgba(236,72,153,0.25)",
                      boxShadow: isActive
                        ? "0 0 30px rgba(236,72,153,0.15), 0 0 60px rgba(236,72,153,0.05), inset 0 1px 0 rgba(244,114,182,0.1)"
                        : "none",
                      transition: "box-shadow 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (isActive) {
                        e.currentTarget.style.boxShadow = "0 0 40px rgba(236,72,153,0.25), 0 0 80px rgba(236,72,153,0.1), 0 0 120px rgba(236,72,153,0.05), inset 0 1px 0 rgba(244,114,182,0.2)"
                        e.currentTarget.style.borderColor = "rgba(236,72,153,0.5)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isActive) {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(236,72,153,0.15), 0 0 60px rgba(236,72,153,0.05), inset 0 1px 0 rgba(244,114,182,0.1)"
                        e.currentTarget.style.borderColor = "rgba(236,72,153,0.25)"
                      }
                    }}
                  >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-pink-400/30 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-pink-400/30 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-pink-400/30 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-pink-400/30 rounded-br-2xl" />

                    {/* Quote mark */}
                    <div className="absolute top-4 left-6 font-cursive text-5xl text-pink-500/15 select-none leading-none">
                      {'"'}
                    </div>

                    {/* Shayari text */}
                    <div className="relative text-center pt-4">
                      <p
                        className="text-lg md:text-xl leading-relaxed whitespace-pre-line font-light italic"
                        style={{ color: "#fce7f3" }}
                      >
                        {shayari.text}
                      </p>
                      <div className="mt-6 text-3xl">
                        {shayari.emoji}
                      </div>
                    </div>

                    {/* Closing quote */}
                    <div className="absolute bottom-4 right-6 font-cursive text-5xl text-pink-500/15 select-none leading-none rotate-180">
                      {'"'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(236,72,153,0.1)",
                border: "1px solid rgba(236,72,153,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(236,72,153,0.2)"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(236,72,153,0.1)"
                e.currentTarget.style.boxShadow = "none"
              }}
              aria-label="Previous shayari"
            >
              <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {shayaris.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-500"
                  aria-label={`Go to shayari ${i + 1}`}
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === activeIndex
                      ? "linear-gradient(90deg, #ec4899, #f472b6)"
                      : "rgba(236,72,153,0.25)",
                    boxShadow: i === activeIndex ? "0 0 10px rgba(236,72,153,0.4)" : "none",
                  }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(236,72,153,0.1)",
                border: "1px solid rgba(236,72,153,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(236,72,153,0.2)"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(236,72,153,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(236,72,153,0.1)"
                e.currentTarget.style.boxShadow = "none"
              }}
              aria-label="Next shayari"
            >
              <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-slide progress bar */}
          <div className="mt-6 max-w-xs mx-auto h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(236,72,153,0.1)" }}>
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #ec4899, #f472b6)",
                width: isPaused ? `${((activeIndex + 1) / shayaris.length) * 100}%` : "100%",
                animation: isPaused ? "none" : "progress-fill 5s linear infinite",
                transition: isPaused ? "width 0.3s ease" : "none",
              }}
            />
          </div>
        </div>

        {/* Bottom decorative line */}
        <div
          className="mt-16 flex items-center justify-center gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1.5s ease 0.8s",
          }}
        >
          <span className="h-px w-16 bg-pink-500/20" />
          <svg className="w-4 h-4 text-pink-400/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="h-px w-16 bg-pink-500/20" />
        </div>
      </div>
    </section>
  )
}
