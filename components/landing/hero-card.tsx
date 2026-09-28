"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { useFantasyMode } from "./fantasy-mode"

type Face = "casino" | "fantasy"

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

const CONTROL =
  "flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-off ring-1 ring-off/20 backdrop-blur-sm transition-all duration-300 hover:bg-ink/90 hover:text-lime focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none"

function EndCard({ visible, tagline }: { visible: boolean; tagline: string }) {
  return (
    <div
      aria-hidden={!visible}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink transition-opacity duration-1000 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <p className="text-4xl font-semibold tracking-tight text-off md:text-5xl">
        scout<span className="text-lime">/</span>gaming
      </p>
      <p className="font-mono text-[10px] tracking-[0.25em] text-off/50 uppercase">{tagline}</p>
    </div>
  )
}

export function HeroCard() {
  const { fantasy, mode } = useFantasyMode()
  const active: Face = fantasy ? "fantasy" : "casino"
  const casinoRef = useRef<HTMLVideoElement>(null)
  const fantasyRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [ended, setEnded] = useState<Record<Face, boolean>>({ casino: false, fantasy: false })

  const videoFor = (face: Face) => (face === "casino" ? casinoRef.current : fantasyRef.current)

  // Only the face turned toward the viewer plays, so audio never overlaps across the flip.
  useEffect(() => {
    videoFor(active === "casino" ? "fantasy" : "casino")?.pause()
    if (!ended[active]) videoFor(active)?.play().catch(() => {})
  }, [active, ended])

  const toggleSound = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    for (const face of ["casino", "fantasy"] as Face[]) {
      const video = videoFor(face)
      if (video) video.muted = nextMuted
    }
    if (!nextMuted && !ended[active]) videoFor(active)?.play().catch(() => {})
  }

  const replay = () => {
    const video = videoFor(active)
    if (!video) return
    video.currentTime = 0
    setEnded((prev) => ({ ...prev, [active]: false }))
    video.play().catch(() => {})
  }

  const markEnded = (face: Face) => () => setEnded((prev) => ({ ...prev, [face]: true }))

  return (
    <div className="relative shrink-0 [perspective:1600px]">
      <div aria-hidden="true" className="hero-glow absolute -inset-16 rounded-full" />
      <div className="relative [transform-style:preserve-3d] will-change-transform" style={TILT}>
        <div className="relative transition-transform duration-500 hover:scale-[1.03] [transform-style:preserve-3d]">
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
                  ref={casinoRef}
                  src="/videos/astrid-card.mp4"
                  poster="/images/astrid-card-poster.jpg"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={markEnded("casino")}
                  aria-label="Astrid, blond croupier i svart kavaj, hälsar välkommen vid blackjackbordet"
                  className="absolute inset-0 h-full w-full object-cover"
                />
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
                <EndCard visible={ended.casino} tagline="AI Live Casino" />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={SHINE} />
              </div>

              <div className={`${FACE} [transform:rotateY(180deg)]`}>
                <video
                  ref={fantasyRef}
                  src="/videos/fantasy-card.mp4"
                  poster="/images/fantasy-card-poster.jpg"
                  muted
                  playsInline
                  preload="metadata"
                  onEnded={markEnded("fantasy")}
                  aria-label="Scout Fantasy: fans på arenan, spelare i realtid och odds i mobilen"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                />
                <div className="absolute inset-x-0 top-0 flex justify-end p-6">
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
                <EndCard visible={ended.fantasy} tagline="Spot the play. Power the platform." />
                <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light" style={SHINE} />
              </div>
            </div>
          </Link>

          <div className="absolute top-6 left-6 flex gap-2">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Sätt på ljudet i videon" : "Stäng av ljudet i videon"}
              aria-pressed={!muted}
              className={CONTROL}
            >
              {muted ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={replay}
              aria-label="Spela videon igen"
              tabIndex={ended[active] ? 0 : -1}
              className={`${CONTROL} ${ended[active] ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
