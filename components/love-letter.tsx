"use client"

import { useEffect, useRef, useState } from "react"

const LETTER_LINES = [
  "I never believed in destiny,",
  "until you walked into my life.",
  "",
  "You changed me,",
  "you healed me,",
  "you completed me.",
  "",
  "I don't want a perfect life,",
  "I just want a life with YOU \u2764\uFE0F",
]

const TYPING_SPEED = 55
const LINE_PAUSE = 400

export function LoveLetter() {
  const [visibleText, setVisibleText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection observer to start typing when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  // Typing animation
  useEffect(() => {
    if (!hasStarted) return

    const fullText = LETTER_LINES.join("\n")
    let charIndex = 0
    let currentLineIndex = 0
    let currentCharInLine = 0
    let timeout: ReturnType<typeof setTimeout>

    function typeNext() {
      if (charIndex >= fullText.length) {
        setIsComplete(true)
        return
      }

      const currentLine = LETTER_LINES[currentLineIndex] || ""

      // If we're at the end of a line
      if (currentCharInLine >= currentLine.length) {
        charIndex += 1 // for the \n
        currentLineIndex += 1
        currentCharInLine = 0

        // Pause between lines
        const pause = LETTER_LINES[currentLineIndex] === "" ? LINE_PAUSE / 2 : LINE_PAUSE
        timeout = setTimeout(typeNext, pause)
        return
      }

      charIndex += 1
      currentCharInLine += 1
      setVisibleText(fullText.slice(0, charIndex))
      timeout = setTimeout(typeNext, TYPING_SPEED)
    }

    // Small initial delay before typing starts
    timeout = setTimeout(typeNext, 800)

    return () => clearTimeout(timeout)
  }, [hasStarted])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: "linear-gradient(180deg, #1a0a0a 0%, #2d1215 30%, #1a0a0a 100%)" }}
    >
      {/* Ambient candle glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main warm center glow */}
        <div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, #d97706 30%, transparent 70%)",
            animation: "candle-flicker 4s ease-in-out infinite",
          }}
        />
        {/* Left glow */}
        <div
          className="absolute left-[15%] top-[40%] h-[300px] w-[300px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
            animation: "candle-flicker 5s ease-in-out infinite 1s",
          }}
        />
        {/* Right glow */}
        <div
          className="absolute right-[15%] top-[35%] h-[250px] w-[250px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
            animation: "candle-flicker 3.5s ease-in-out infinite 0.5s",
          }}
        />
        {/* Bottom warm glow */}
        <div
          className="absolute bottom-[10%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #d97706 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating sparkle dots */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-300/40"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              animation: `candle-flicker ${3 + (i % 3)}s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Section heading */}
        <h2
          className="mb-12 text-center font-cursive text-4xl tracking-wide text-amber-200/90 sm:text-5xl"
          style={{
            textShadow: "0 0 30px rgba(245,158,11,0.3), 0 0 60px rgba(245,158,11,0.1)",
            opacity: hasStarted ? 1 : 0,
            transform: hasStarted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          A Letter From My Soul
        </h2>

        {/* Paper card */}
        <div
          className="relative mx-auto"
          style={{
            transform: "rotate(-1.5deg)",
            opacity: hasStarted ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
          }}
        >
          {/* Paper shadow */}
          <div
            className="absolute -inset-2 rounded-sm opacity-30"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
              filter: "blur(20px)",
              transform: "rotate(1deg) translateY(8px)",
            }}
          />

          {/* Paper texture card */}
          <div
            className="relative overflow-hidden rounded-sm px-8 py-10 sm:px-12 sm:py-14"
            style={{
              background: "linear-gradient(165deg, #fef3c7 0%, #fde68a 15%, #fef9c3 40%, #fefce8 60%, #fde68a 85%, #fef3c7 100%)",
              boxShadow: "inset 0 0 60px rgba(180,130,60,0.15), inset 0 0 120px rgba(180,130,60,0.05), 0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Paper grain overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Fold line */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-20"
              style={{
                background: "linear-gradient(90deg, transparent 5%, #92400e 20%, #92400e 80%, transparent 95%)",
              }}
            />

            {/* Aged edges - top */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-6 opacity-10"
              style={{ background: "linear-gradient(180deg, #92400e 0%, transparent 100%)" }}
            />
            {/* Aged edges - bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 opacity-10"
              style={{ background: "linear-gradient(0deg, #92400e 0%, transparent 100%)" }}
            />

            {/* Red wax seal decoration */}
            <div className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
              style={{
                background: "radial-gradient(circle at 35% 35%, #ef4444 0%, #dc2626 40%, #991b1b 100%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <svg className="h-8 w-8 text-red-200/80 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Letter content with typing effect */}
            <div className="relative space-y-1">
              {/* "My Dearest" salutation */}
              <p
                className="mb-6 font-cursive text-2xl text-amber-900/80 sm:text-3xl"
                style={{
                  opacity: hasStarted ? 1 : 0,
                  transition: "opacity 0.8s ease 0.5s",
                }}
              >
                My Dearest,
              </p>

              {/* Typed letter body */}
              <div className="min-h-[280px] sm:min-h-[260px]">
                <p
                  className="whitespace-pre-wrap font-cursive text-xl leading-[2] text-amber-950/75 sm:text-2xl sm:leading-[2]"
                  style={{ wordSpacing: "2px" }}
                >
                  {visibleText}
                  {!isComplete && hasStarted && (
                    <span
                      className="ml-0.5 inline-block h-6 w-[2px] bg-amber-900/60 align-middle"
                      style={{ animation: "cursor-blink 1s step-end infinite" }}
                    />
                  )}
                </p>
              </div>

              {/* Signature */}
              <div
                className="mt-8 text-right"
                style={{
                  opacity: isComplete ? 1 : 0,
                  transform: isComplete ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
                }}
              >
                <p className="font-cursive text-xl text-amber-900/60 sm:text-2xl">
                  Forever Yours,
                </p>
                <p className="mt-1 font-cursive text-2xl text-rose-700/70 sm:text-3xl">
                  With all my love
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom hearts */}
        <div
          className="mt-8 flex items-center justify-center gap-3"
          style={{
            opacity: isComplete ? 1 : 0,
            transition: "opacity 1.5s ease 0.8s",
          }}
        >
          {[14, 18, 22, 18, 14].map((size, i) => (
            <svg
              key={i}
              className="text-rose-400/40"
              style={{ animationDelay: `${i * 0.2}s` }}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  )
}
