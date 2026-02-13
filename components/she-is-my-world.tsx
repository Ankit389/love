"use client"

import { useEffect, useState } from "react"

export function SheIsMyWorld() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#fce4ec_0%,_#fdf2f8_30%,_#fff1f2_60%,_#ffffff_100%)]" />

      {/* Soft glowing orbs */}
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl animate-pulse-slow" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-rose-100/25 blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Main content */}
      <div
        className={`relative z-10 flex max-w-3xl flex-col items-center gap-10 transition-all duration-[1500ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Globe icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-pink-300/20 blur-2xl animate-pulse-slow" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-pink-200/50 bg-white/40 backdrop-blur-md shadow-lg shadow-pink-100/50">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#f472b6" strokeWidth="1.5" />
              <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M2 12h20" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M4.5 6.5h15" stroke="#f472b6" strokeWidth="1" opacity="0.5" />
              <path d="M4.5 17.5h15" stroke="#f472b6" strokeWidth="1" opacity="0.5" />
              {/* Heart in the center */}
              <path
                d="M12 15.5l-.7-.64C9.2 13.12 8 11.95 8 10.5 8 9.12 9.12 8 10.5 8c.78 0 1.53.36 2 .93a2.64 2.64 0 012-.93C15.88 8 17 9.12 17 10.5c0 1.45-1.2 2.62-3.3 4.36l-.7.64z"
                fill="#f472b6"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2
          className={`text-center font-cursive text-5xl leading-tight tracking-wide text-rose-900 sm:text-6xl md:text-7xl transition-all duration-[2000ms] delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {'Anku & Pihu \u2014 You Are My Everything \u{1F30D}\u{2764}\u{FE0F}'}
        </h2>

        {/* Gold accent line */}
        <div
          className={`h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-[2000ms] delay-500 ease-out ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

        {/* Glassmorphism card */}
        <div
          className={`relative rounded-3xl border border-white/60 bg-white/30 p-8 shadow-2xl shadow-pink-100/40 backdrop-blur-xl sm:p-12 transition-all duration-[2000ms] delay-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Gold corner accents */}
          <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-amber-400/50 rounded-tl-lg" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-amber-400/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-400/50 rounded-br-lg" />

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-50/50 via-transparent to-amber-50/30 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <p className="font-sans text-lg leading-[1.9] tracking-wide text-rose-800/80 sm:text-xl md:text-2xl font-light">
              {'You are not just my girlfriend,'}
              <br />
              {'you are my '}
              <span className="font-cursive text-2xl text-rose-600 sm:text-3xl md:text-4xl">{'peace'}</span>
              {', my '}
              <span className="font-cursive text-2xl text-rose-600 sm:text-3xl md:text-4xl">{'strength'}</span>
              {','}
              <br />
              {'my '}
              <span className="font-cursive text-2xl text-rose-600 sm:text-3xl md:text-4xl">{'smile'}</span>
              {', my '}
              <span className="font-cursive text-2xl text-rose-600 sm:text-3xl md:text-4xl">{'home'}</span>
              {'.'}
            </p>

            {/* Second gold line */}
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

            <p className="font-sans text-lg leading-[1.9] tracking-wide text-rose-800/70 sm:text-xl md:text-2xl font-light italic">
              {'When I look at you,'}
              <br />
              {'the whole world becomes '}
              <span className="font-cursive text-2xl text-amber-600 not-italic sm:text-3xl md:text-4xl">{'beautiful'}</span>
              {'.'}
            </p>
          </div>
        </div>

        {/* Bottom heart */}
        <div
          className={`transition-all duration-[2000ms] delay-1000 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="animate-heartbeat">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#f472b6"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
