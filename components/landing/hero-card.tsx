"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Volume2, VolumeX } from "lucide-react"
import { useFantasyMode } from "./fantasy-mode"

const FACE =
  "absolute inset-0 overflow-hidden rounded-[2rem] ring-1 ring-off/15 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"

const TILT = {
  transform:
    "translate3d(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 6px), 0) rotateX(calc(var(--my, 0) * -2.5deg)) rotateY(calc(var(--mx, 0) * 3.5deg))",
}

const SHINE = {
  background:
    "radial-gradient(circle at calc(50% + var(--mx, 0) * 40%) calc(50% + var(--my, 0) * 40%), rgba(255,255,255,0.14), transparent 55%)",
}

const IDLE_RATE = 0.25
const HOVER_RATE = 1

export function HeroCard() {
  const { fantasy, mode } = useFantasyMode()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = hovered || !muted ? HOVER_RATE : IDLE_RATE
  }, [hovered, muted])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !muted
    video.muted = nextMuted
    setMuted(nextMuted)
    if (!nextMuted) video.play().catch(() => {})
  }

  return (
    <div className="relative shrink-0 [perspective:1600px]">
      <div aria-hidden="true" className="hero-glow absolute -inset-16 rounded-full" />
      <div className="relative [transform-style:preserve-3d] will-change-transform" style={TILT}>
        <div
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="relative transition-transform duration-500 hover:scale-[1.03] [transform-style:preserve-3d]"
        >
          <Link
            href={fantasy ? "#" : "/demo"}
            aria-label={fantasy ? "Läs om Scout Fantasy" : "Öppna demospelet med Astrid"}
            className="block [transform-style:preserve-3d]"
          >
            <div
              className={`relative h-[520px] w-[330px] transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] md:h-[720px] md:w-[440px] ${
                fantasy ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
              }`}
            >
              <div className={FACE}>
                <video
                  ref={videoRef}
                  src="/videos/astrid-card.mp4"
                  poster="/images/astrid-card-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Astrid, blond croupier i svart kavaj, hälsar välkommen vid blackjackbordet"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={SHINE} />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent"
                />
                <div className="absolute inset-x-0 top-0 flex justify-end p-6">
                  <span
                    className={`flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-off uppercase backdrop-blur-sm transition-opacity duration-500 ${
                      mode === "live" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    Live nu
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-lime uppercase">{"// Croupier"}</p>
                    <p className="font-serif text-3xl text-off">Astrid</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-lime px-4 py-2 text-xs font-bold tracking-wider text-ink uppercase">
                    Spela <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className={`${FACE} [transform:rotateY(180deg)]`}>
                <Image
                  src="/images/fantasy-back.png"
                  alt="Fotboll på en upplyst gräsplan i en fullsatt arena på kvällen"
                  fill
                  sizes="(min-width: 768px) 440px, 330px"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={SHINE} />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                />
                <div className="absolute inset-x-0 top-0 p-6">
                  <span className="rounded-sm bg-lime px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-ink uppercase">
                    Scout Fantasy
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-lime uppercase">{"// Fantasy sports"}</p>
                    <p className="text-3xl leading-tight font-semibold text-off">
                      Daily fantasy
                      <br />
                      för din sportsbook.
                    </p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-lime px-4 py-2 text-xs font-bold tracking-wider text-ink uppercase">
                    Läs mer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Sätt på ljudet i videon" : "Stäng av ljudet i videon"}
            aria-pressed={!muted}
            className={`absolute top-6 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-off ring-1 ring-off/20 backdrop-blur-sm transition-all duration-300 hover:bg-ink/90 hover:text-lime focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none ${
              fantasy ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
