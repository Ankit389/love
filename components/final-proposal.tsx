"use client"

import { useEffect, useMemo, useState } from "react"

type HeartParticle = {
  id: number
  left: number
  delay: number
  duration: number
  scale: number
}

export function FinalProposal() {
  const [showHeartBurst, setShowHeartBurst] = useState(false)
  const [shakeMode, setShakeMode] = useState<"none" | "cute">("none")

  // Golden heart rain particles
  const rainHearts = useMemo<HeartParticle[]>(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 5,
        scale: 0.6 + Math.random() * 0.8,
      })),
    []
  )

  // Burst hearts on YES click
  const burstHearts = useMemo<HeartParticle[]>(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.8,
        scale: 0.5 + Math.random() * 1.2,
      })),
    []
  )

  const triggerHeartBurst = () => {
    setShowHeartBurst(true)
    setShakeMode("none")
    // Auto hide after animation
    setTimeout(() => setShowHeartBurst(false), 3500)
  }

  const triggerCuteShake = () => {
    setShakeMode("cute")
    setShowHeartBurst(false)
    setTimeout(() => setShakeMode("none"), 800)
  }

  // Make sure body doesn't accidentally get overflow issues on mobile
  useEffect(() => {
    return () => {
      setShowHeartBurst(false)
      setShakeMode("none")
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16"
      style={{
        background:
          "radial-gradient(circle at top, #1f1028 0%, #0b0712 40%, #05030a 80%)",
      }}
    >
      {/* Soft background nebula */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute top-16 right-1/4 w-72 h-72 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-[100%] bg-amber-500/10 blur-3xl" />
      </div>

      {/* Golden heart rain */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {rainHearts.map((h) => (
          <div
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              top: "-10%",
              animation: `heart-rain ${h.duration}s linear infinite`,
              animationDelay: `${h.delay}s`,
              transform: `scale(${h.scale})`,
            }}
          >
            <span
              className="block text-[18px] md:text-[22px]"
              style={{
                textShadow:
                  "0 0 12px rgba(250,204,21,0.7), 0 0 28px rgba(250,204,21,0.45)",
                color: "#facc15",
              }}
            >
              ❤
            </span>
          </div>
        ))}
      </div>

      {/* YES heart burst overlay */}
      {showHeartBurst && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {burstHearts.map((h) => (
            <div
              key={h.id}
              className="absolute"
              style={{
                left: `${h.left}%`,
                bottom: "-10%",
                animation: `heart-burst ${h.duration}s ease-out forwards`,
                animationDelay: `${h.delay}s`,
                transform: `scale(${h.scale})`,
              }}
            >
              <span
                className="block text-[20px] md:text-[26px]"
                style={{
                  textShadow:
                    "0 0 18px rgba(251,191,36,0.9), 0 0 40px rgba(253,224,71,0.8)",
                  color: "#fde047",
                }}
              >
                ❤
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main proposal content */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Top label */}
        <div className="mb-5 flex items-center justify-center gap-3 text-amber-200/70 text-xs tracking-[0.4em] uppercase">
          <span className="h-px w-10 bg-amber-300/40" />
          <span>Final Proposal</span>
          <span className="h-px w-10 bg-amber-300/40" />
        </div>

        {/* Card */}
        <div
          className={`relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1f1024]/90 via-[#120817]/95 to-[#05030a]/98 px-6 py-10 sm:px-10 sm:py-14 shadow-[0_0_60px_rgba(250,204,21,0.18)] backdrop-blur-2xl ${
            shakeMode === "cute" ? "animate-cute-shake" : ""
          }`}
        >
          {/* Corner glows */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-8 w-56 h-56 rounded-full bg-pink-500/20 blur-[90px]" />

          {/* Ring accent */}
          <div className="absolute -top-1 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70" />

          {/* Proposal text */}
          <div className="relative text-center mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-amber-100/60">
              Anku &amp; Pihu
            </p>
            <h2
              className="font-cursive text-4xl sm:text-5xl md:text-6xl leading-tight text-amber-100"
              style={{
                textShadow:
                  "0 0 35px rgba(250,204,21,0.7), 0 0 90px rgba(253,224,71,0.5)",
              }}
            >
              Will You Be Mine Forever? 💍❤️
            </h2>
          </div>

          {/* Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
            <button
              onClick={triggerHeartBurst}
              className="group inline-flex items-center justify-center rounded-full px-9 py-3 text-base sm:text-lg font-medium text-[#05030a] bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 shadow-[0_0_35px_rgba(250,204,21,0.6)] hover:shadow-[0_0_55px_rgba(250,204,21,0.85)] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <span className="mr-2">YES</span>
              <span className="text-lg">❤️</span>
            </button>

            <button
              onClick={triggerCuteShake}
              className="inline-flex items-center justify-center rounded-full border border-amber-300/40 px-8 py-3 text-base sm:text-lg font-medium text-amber-100/90 bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              <span className="mr-2">Already Yours</span>
              <span className="text-lg">😳</span>
            </button>
          </div>

          {/* Ending text */}
          <p className="relative text-center text-amber-100/80 text-sm sm:text-base tracking-wide">
            Happy Valentine’s Day, My Love 💖
          </p>
        </div>
      </div>
    </section>
  )
}


