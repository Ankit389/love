"use client"

import { useEffect, useRef, useState } from "react"

const PROMISES = [
  "I promise to respect you.",
  "I promise to protect you.",
  "I promise to choose you,\nevery single day ❤️",
]

export function PromisesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, #ffe4f0 0%, #ffeaf5 30%, #fff5fb 60%, #ffffff 100%)",
      }}
    >
      {/* Soft background hearts */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-52 h-52 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-rose-400/70 mb-4">
            Promises From My Heart
          </p>
          <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl text-rose-700 mb-3">
            Promises From My Heart
          </h2>
          <p className="text-rose-500/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Little vows, written softly in the language of forever.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-2 bottom-2 border-l border-rose-200" />

          <div className="space-y-10 sm:space-y-12">
            {PROMISES.map((promise, index) => {
              const delay = 200 * index
              const isVisible = hasStarted

              return (
                <div
                  key={index}
                  className="relative flex gap-6 sm:gap-8"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
                    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
                  }}
                >
                  {/* Heart icon */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md shadow-rose-200/80 flex items-center justify-center border border-rose-200">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-rose-500"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    {/* Small dot on the line */}
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400" />
                  </div>

                  {/* Promise text card */}
                  <div className="flex-1">
                    <div className="relative rounded-2xl bg-white/90 border border-rose-100 px-5 py-4 sm:px-6 sm:py-5 shadow-lg shadow-rose-100/80 backdrop-blur">
                      {/* Soft gradient corner */}
                      <div className="pointer-events-none absolute -top-6 -right-8 w-24 h-24 bg-pink-300/20 blur-3xl" />

                      <p className="relative whitespace-pre-line text-rose-700 text-base sm:text-lg leading-relaxed font-light">
                        {promise}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
