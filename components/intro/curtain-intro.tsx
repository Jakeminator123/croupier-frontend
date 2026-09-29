"use client"

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { createMatteRenderer } from "@/lib/matte-renderer"
import { RetroSite } from "./retro-site"
import {
  CURTAIN_GONE,
  LAYER_SWITCH,
  computeMetrics,
  curtainFrame,
  stripCount,
  stripWidth,
  type StageMetrics,
} from "./curtain-math"

type Clip = "intro" | "curtain" | "outro"
type Phase = Clip | "leaving" | "done"

const CLIPS: Clip[] = ["intro", "curtain", "outro"]
const NEXT: Record<Clip, Phase> = { intro: "curtain", curtain: "outro", outro: "leaving" }
const SRC: Record<Clip, string> = {
  intro: "/videos/intro/astrid-walk.mp4",
  curtain: "/videos/intro/astrid-drag.mp4",
  outro: "/videos/intro/astrid-natural.mp4",
}
/** If a clip has not finished by then it is stuck loading; the site must not stay covered. */
const CLIP_TIMEOUT_MS: Record<Clip, number> = { intro: 16000, curtain: 10000, outro: 12000 }
const LEAVE_MS = 700
const FRAME = { w: 960, h: 1280 }
/**
 * The walk-in clip is wider than the others: the standard frame sits at its right edge and she
 * enters from well left of it, so on most screens she starts outside the viewport.
 */
const WALK = {
  widthRatio: 1792 / 960,
  /** Her right edge in the first frame, in frame widths from the standard frame's left edge. */
  startRight: (317 - 832) / 960,
  /** Seconds of walking; any extra distance a wide screen needs is added as a glide over this. */
  walkEnd: 4.6,
}

// Survives client-side navigation and resets with a full page load: the intro is a loading screen,
// so coming back from /demo should not replay it.
let introPlayed = false

const Retro = memo(RetroSite)

/**
 * Loading-screen intro. A Windows 95 desktop covers the real site while it loads; Astrid walks
 * in as a 2D figure, becomes a 3D avatar, grabs the old page like a curtain and flings it off
 * screen, then turns photoreal over the revealed site. Skippable with the button or Escape.
 */
export function CurtainIntro() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [metrics, setMetrics] = useState<StageMetrics | null>(null)
  const [curtainGone, setCurtainGone] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<Clip, HTMLVideoElement | null>>({ intro: null, curtain: null, outro: null })
  const stripRefs = useRef<(HTMLDivElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])
  const phaseRef = useRef<Phase>("intro")
  const metricsRef = useRef<StageMetrics | null>(null)
  const goneRef = useRef(false)
  const startedAt = useRef(0)
  const lastSheet = useRef<"static" | "strips">("static")

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])
  useEffect(() => {
    metricsRef.current = metrics
  }, [metrics])

  const active = phase !== "done"

  // Play once per page load, and never for people who asked for less motion.
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (introPlayed || reduceMotion) {
      setPhase("done")
      return
    }
    introPlayed = true
    startedAt.current = performance.now()
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!active || !root) return
    const measure = () => setMetrics(computeMetrics(root.clientWidth, root.clientHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [active])

  // One clip per phase; the next phase starts when the clip ends.
  useEffect(() => {
    if (phase === "done" || phase === "leaving") return
    const video = videoRefs.current[phase]
    if (!video) return
    if (phase === "outro" && !goneRef.current) {
      goneRef.current = true
      setCurtainGone(true)
    }
    const advance = () => setPhase(NEXT[phase])
    const bail = () => setPhase("leaving")
    const guard = setTimeout(bail, CLIP_TIMEOUT_MS[phase])
    video.currentTime = 0
    video.addEventListener("ended", advance)
    video.addEventListener("error", bail)
    video.play().catch(bail)
    return () => {
      clearTimeout(guard)
      video.removeEventListener("ended", advance)
      video.removeEventListener("error", bail)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "leaving") return
    for (const clip of CLIPS) videoRefs.current[clip]?.pause()
    const timer = setTimeout(() => setPhase("done"), LEAVE_MS)
    return () => clearTimeout(timer)
  }, [phase])

  const skip = useCallback(() => setPhase((current) => (current === "done" ? current : "leaving")), [])

  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, skip])

  // Draws the current clip through the matte and, during the curtain clip, moves the strips.
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const renderer = canvas ? createMatteRenderer(canvas) : null
    const skews: number[] = []
    const prevX: number[] = []
    let prevTime = performance.now()
    let raf = 0
    let shown: Clip = "intro"
    let boxStyle = ""

    // The box follows whichever clip is actually on the canvas, so a wide walk frame is never
    // squeezed into the narrow box (or the reverse) while the next clip is still loading.
    const layoutAvatar = (m: StageMetrics) => {
      const box = avatarRef.current
      if (!box) return
      let left = m.videoLeft
      let width = m.videoW
      let shift = 0
      if (shown === "intro") {
        width = Math.round(m.videoW * WALK.widthRatio)
        left = m.videoLeft + m.videoW - width
        const walk = videoRefs.current.intro
        const glide = Math.max(0, m.videoLeft + WALK.startRight * m.videoW + 24)
        const t = walk ? Math.min(1, walk.currentTime / WALK.walkEnd) : 0
        shift = -glide * (1 - t) ** 3
      }
      const next = `${left}|${width}|${shift.toFixed(1)}`
      if (next === boxStyle) return
      boxStyle = next
      box.style.left = `${left}px`
      box.style.width = `${width}px`
      box.style.transform = shift ? `translateX(${shift.toFixed(1)}px)` : ""
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const current = phaseRef.current
      const clip = current === "intro" || current === "curtain" || current === "outro" ? current : null
      const video = clip ? videoRefs.current[clip] : null
      if (clip && video && renderer?.draw(video)) shown = clip

      const m = metricsRef.current
      if (m) layoutAvatar(m)
      const dt = Math.max(1 / 240, (now - prevTime) / 1000)
      prevTime = now
      if (!m || current !== "curtain" || goneRef.current || !video) return

      const g = video.currentTime
      const count = stripRefs.current.length
      const frame = curtainFrame(g, m, count)
      for (let i = 0; i < count; i++) {
        const strip = stripRefs.current[i]
        if (!strip) continue
        const { x, sx, shade } = frame.poses[i]
        const vx = (x - (prevX[i] ?? x)) / dt
        prevX[i] = x
        // The hem trails the grip: fast strips lean away from their direction of travel.
        const targetSkew = Math.max(-24, Math.min(24, -vx * 0.011))
        skews[i] = (skews[i] ?? 0) + (targetSkew - (skews[i] ?? 0)) * 0.3
        strip.style.transform = `translateX(${x.toFixed(2)}px) skewX(${skews[i].toFixed(2)}deg) scaleX(${sx.toFixed(4)})`
        const shadeEl = shadeRefs.current[i]
        if (shadeEl) shadeEl.style.opacity = shade.toFixed(3)
      }
      const shadow = shadowRef.current
      if (shadow) {
        const width = Math.max(1, frame.right - frame.left) + 80
        shadow.style.transform = `translateX(${(frame.left - 40).toFixed(1)}px) scaleX(${(width / m.vw).toFixed(4)})`
        shadow.style.opacity = (frame.bunch * 0.85).toFixed(3)
      }
      const root = rootRef.current
      if (root && g >= LAYER_SWITCH && !root.hasAttribute("data-above")) root.setAttribute("data-above", "")
      if (g >= CURTAIN_GONE) {
        goneRef.current = true
        setCurtainGone(true)
      }
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      renderer?.dispose()
    }
  }, [active])

  const count = metrics ? stripCount(metrics.vw) : 0
  const strips = useMemo(() => {
    if (!metrics) return null
    const width = stripWidth(metrics.vw, count)
    stripRefs.current.length = count
    shadeRefs.current.length = count
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="intro-strip"
        style={{ left: i * width, width }}
        ref={(el) => {
          stripRefs.current[i] = el
        }}
      >
        <div className="intro-strip-inner" style={{ left: -i * width, width: metrics.vw }}>
          <Retro />
        </div>
        <div
          className="intro-strip-shade"
          ref={(el) => {
            shadeRefs.current[i] = el
          }}
        />
      </div>
    ))
    // Only the viewport size changes the strip layout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics?.vw, metrics?.vh, count])

  if (phase === "intro") lastSheet.current = "static"
  else if (phase === "curtain") lastSheet.current = "strips"
  const sheet: "static" | "strips" | "none" = curtainGone
    ? "none"
    : phase === "intro"
      ? "static"
      : phase === "curtain"
        ? "strips"
        : lastSheet.current

  // The clones' CSS animations are offset by how long the static page has already been showing.
  const stripsElapsed = useMemo(
    () => (sheet === "strips" ? (performance.now() - startedAt.current) / 1000 : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sheet === "strips"],
  )

  if (!active) return null

  return (
    <div
      ref={rootRef}
      className="intro-root"
      data-stage={curtainGone ? "after" : "before"}
      data-leaving={phase === "leaving" ? "" : undefined}
      role="region"
      aria-label="Intro"
    >
      {sheet === "static" && (
        <div className="intro-static" aria-hidden="true">
          <Retro />
        </div>
      )}
      {sheet === "strips" && metrics && (
        <div className="intro-curtain" aria-hidden="true" style={{ "--elapsed": `${stripsElapsed.toFixed(3)}s` } as CSSProperties}>
          <div ref={shadowRef} className="intro-shadow" style={{ left: 0, width: metrics.vw, opacity: 0 }} />
          {strips}
        </div>
      )}

      <div
        ref={avatarRef}
        className="intro-avatar"
        aria-hidden="true"
        data-hidden={phase === "leaving" ? "" : undefined}
        style={metrics ? { top: metrics.videoTop, height: metrics.videoH } : { visibility: "hidden" }}
      >
        <canvas ref={canvasRef} width={FRAME.w} height={FRAME.h} />
        {CLIPS.map((clip) => (
          <video
            key={clip}
            ref={(el) => {
              videoRefs.current[clip] = el
            }}
            src={SRC[clip]}
            muted
            playsInline
            preload="auto"
          />
        ))}
      </div>

      <button type="button" className="intro-skip" data-look={curtainGone ? "modern" : "retro"} onClick={skip} autoFocus>
        {curtainGone ? "Hoppa över intro" : "Hoppa över intro »"}
      </button>
    </div>
  )
}
