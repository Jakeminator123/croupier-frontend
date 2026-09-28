"use client"

import { useEffect, useRef } from "react"

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

// The source is stacked: colour (already composited over black) on top, luma matte below.
// Because the colour is premultiplied by that same matte it can go straight to a
// premultiplied-alpha canvas.
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

/**
 * Three croupiers, cut out of their studio backdrop and shrunk to silhouettes, standing on
 * a playing card that glides slowly across the floor from right to left and out of frame.
 * They belong to the casino, so the whole ride fades away while the page is in fantasy mode.
 */
export function CroupierRide() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useMatteCanvas(videoRef, canvasRef)

  return (
    <div aria-hidden="true" className="croupier-stage pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[40vh] md:block">
      <div className="croupier-ride absolute bottom-[84px] left-0 h-[400px] w-[540px] will-change-transform">
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
  )
}
