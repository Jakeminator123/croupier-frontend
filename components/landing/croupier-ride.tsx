"use client"

import { useEffect, useRef } from "react"

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

// The source is stacked: colour (already premultiplied by the matte) on top, luma matte below,
// so it can go straight to a premultiplied-alpha canvas.
const FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
void main() {
  float y = 1.0 - vUv.y;
  vec3 rgb = texture2D(uTex, vec2(vUv.x, y * 0.5)).rgb;
  float a = texture2D(uTex, vec2(vUv.x, 0.5 + y * 0.5)).r;
  gl_FragColor = vec4(rgb, a);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/** Draws a stacked-matte video onto a transparent canvas, so it composites over anything. */
function useMatteCanvas(videoRef: React.RefObject<HTMLVideoElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.useProgram(program)

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.clearColor(0, 0, 0, 0)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) video.addEventListener("loadeddata", () => video.pause(), { once: true })

    let frame = 0
    let lastTime = -1
    const draw = () => {
      frame = requestAnimationFrame(draw)
      if (video.readyState < 2 || video.currentTime === lastTime) return
      lastTime = video.currentTime
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight / 2
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [videoRef, canvasRef])
}

/** Restarts the croupier clip every time the ride animation loops, so both stay in step. */
function useRideSync(rideRef: React.RefObject<HTMLDivElement | null>, videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const ride = rideRef.current
    const video = videoRef.current
    if (!ride || !video) return
    const restart = (event: AnimationEvent) => {
      if (event.animationName !== "croupier-ride") return
      video.currentTime = 0
      void video.play().catch(() => {})
    }
    ride.addEventListener("animationiteration", restart)
    return () => ride.removeEventListener("animationiteration", restart)
  }, [rideRef, videoRef])
}

// Skims in along the floor from the right edge and ends exactly where the card is conjured, so the
// thread visibly pours into the spot the card unfolds from.
const STREAK_PATH = "M 1720 350 C 1460 344, 1200 300, 928 266"

/**
 * Three croupiers standing on an ace of spades. Once every clip loop a lime thread skims in
 * along the floor; the card unfolds from the point it is absorbed into, glides out past the left
 * edge and is gone before the clip restarts. It belongs to the casino, so the whole stage fades
 * away while the page is in fantasy mode.
 */
export function CroupierRide() {
  const rideRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useMatteCanvas(videoRef, canvasRef)
  useRideSync(rideRef, videoRef)

  return (
    <div aria-hidden="true" className="croupier-stage pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[420px] md:block">
      <svg className="croupier-streak absolute inset-0 h-full w-full" viewBox="0 0 1600 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="croupier-streak-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f2ffb0" stopOpacity="1" />
            <stop offset="0.35" stopColor="#d6ff3a" stopOpacity="0.9" />
            <stop offset="1" stopColor="#b5dc1f" stopOpacity="0" />
          </linearGradient>
          <filter id="croupier-streak-blur" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path
          d={STREAK_PATH}
          pathLength={2000}
          fill="none"
          stroke="url(#croupier-streak-grad)"
          strokeWidth={14}
          strokeLinecap="round"
          filter="url(#croupier-streak-blur)"
          className="croupier-streak-glow"
        />
        <path
          d={STREAK_PATH}
          pathLength={2000}
          fill="none"
          stroke="url(#croupier-streak-grad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="croupier-streak-core"
        />
      </svg>

      <div ref={rideRef} className="croupier-ride absolute bottom-[84px] left-0 h-[400px] w-[540px] will-change-transform">
        <div className="croupier-flash" />
        <div className="croupier-scene absolute inset-0">
          <div className="croupier-card">
            <span className="croupier-index croupier-index-tl">
              A<span className="block leading-none">♠</span>
            </span>
            <span className="croupier-pip">♠</span>
            <span className="croupier-index croupier-index-br">
              A<span className="block leading-none">♠</span>
            </span>
          </div>
          <div className="croupier-shadow" />
          <canvas ref={canvasRef} className="croupier-figures" />
          <video
            ref={videoRef}
            src="/videos/croupiers-matte.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="pointer-events-none absolute h-px w-px opacity-0"
          />
        </div>
      </div>
    </div>
  )
}
