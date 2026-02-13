"use client"

import { useState, useRef, useEffect, useCallback } from "react"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return
    const cur = audioRef.current.currentTime
    const dur = audioRef.current.duration
    setCurrentTime(cur)
    setDuration(dur)
    setProgress(dur ? (cur / dur) * 100 : 0)
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    audioRef.current.currentTime = pct * audioRef.current.duration
  }, [])

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00"
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <>
      {/* Audio element - put your song file at /public/song.mp3 */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating music button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Expanded player panel */}
        {expanded && (
          <div className="absolute bottom-16 right-0 mb-2 w-72 rounded-2xl border border-pink-400/30 bg-[#1a0a1a]/95 p-4 shadow-2xl shadow-pink-500/20 backdrop-blur-xl">
            {/* Song info */}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-pink-400"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  Our Song
                </p>
                <p className="text-xs text-pink-300/60">For You</p>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="group mb-2 h-1.5 cursor-pointer rounded-full bg-white/10"
              onClick={handleSeek}
            >
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute -top-1 right-0 h-3.5 w-3.5 rounded-full border-2 border-pink-400 bg-white opacity-0 shadow-lg shadow-pink-500/50 transition-opacity group-hover:opacity-100" />
              </div>
            </div>

            {/* Time */}
            <div className="mb-3 flex justify-between text-[10px] text-pink-300/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Rewind */}
              <button
                onClick={() => {
                  if (audioRef.current)
                    audioRef.current.currentTime = Math.max(
                      0,
                      audioRef.current.currentTime - 10
                    )
                }}
                className="text-pink-300/60 transition-colors hover:text-pink-300"
                aria-label="Rewind 10 seconds"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12.5 8.5L8 12l4.5 3.5V8.5z" fill="currentColor" />
                  <path
                    d="M16.5 8.5L12 12l4.5 3.5V8.5z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/40 transition-transform hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-0.5 h-5 w-5"
                  >
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" />
                  </svg>
                )}
              </button>

              {/* Forward */}
              <button
                onClick={() => {
                  if (audioRef.current)
                    audioRef.current.currentTime = Math.min(
                      audioRef.current.duration,
                      audioRef.current.currentTime + 10
                    )
                }}
                className="text-pink-300/60 transition-colors hover:text-pink-300"
                aria-label="Forward 10 seconds"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M7.5 8.5L12 12l-4.5 3.5V8.5z"
                    fill="currentColor"
                  />
                  <path d="M12 8.5L16.5 12 12 15.5V8.5z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main floating button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-pink-400/40 bg-[#1a0a1a]/90 shadow-xl shadow-pink-500/30 backdrop-blur-xl transition-all hover:scale-110 hover:shadow-pink-500/50 ${
            isPlaying ? "animate-pulse-slow" : ""
          }`}
          aria-label="Toggle music player"
        >
          {/* Glow ring when playing */}
          {isPlaying && (
            <div className="absolute inset-0 animate-ping rounded-full border border-pink-400/30" />
          )}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-pink-400 transition-colors group-hover:text-pink-300"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>

          {/* Playing indicator dots */}
          {isPlaying && (
            <div className="absolute -top-1 -right-1 flex gap-0.5">
              <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400" style={{ animationDelay: "0ms" }} />
              <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400" style={{ animationDelay: "150ms" }} />
              <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </button>
      </div>
    </>
  )
}
