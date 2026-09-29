/**
 * Cloth model for the intro curtain. The retro page is cut into vertical strips; this module
 * turns the curtain clip's local time (`g`, seconds) into a transform per strip so the sheet
 * follows Astrid's hand: it bunches up where she grabs it, is flung across in front of her and
 * leaves through the right edge. All positions are in viewport pixels.
 */

export type StageMetrics = {
  vw: number
  vh: number
  /** Where the avatar's video frame sits inside the viewport. */
  videoLeft: number
  videoTop: number
  videoW: number
  videoH: number
}

export type StripPose = {
  /** Horizontal offset from the strip's resting position. */
  x: number
  /** Horizontal scale around the strip's top centre. */
  sx: number
  /** 0-1 darkening that reads as folds. */
  shade: number
}

export type CurtainFrame = {
  poses: StripPose[]
  /** Leftmost and rightmost visible edge of the sheet; used for its drop shadow. */
  left: number
  right: number
  /** How bunched the sheet is, 0 flat to 1 fully gathered. */
  bunch: number
}

/** Moments in the curtain clip (seconds). Read off the source at 6 fps. */
export const GATHER_START = 0.55
/** The sheet is a bundle in her hand and moves in front of her from here on. */
export const LAYER_SWITCH = 1.45
export const SWEEP_START = 1.5
export const CURTAIN_GONE = 3.0

const GATHER_LAG = 0.35
const GATHER_DURATION = 0.55
/** Where her hand grips the sheet, as a fraction of the video frame. */
const HAND = { x: 0.02, y: 0.06 }
/** Width of the gathered bundle, in video-frame widths. */
const BUNDLE_WIDTH = 0.16

/** Drape centre (video-frame widths from the frame's left edge) as it trails her hand. */
const CENTER_KEYS: [number, number][] = [
  [1.5, 0.06],
  [1.7, 0.12],
  [1.85, 0.25],
  [2.0, 0.38],
  [2.15, 0.52],
  [2.3, 0.66],
  [2.45, 0.82],
  [2.6, 1.02],
]
/** Drape width (video-frame widths); it billows open mid-sweep and narrows as it flies off. */
const WIDTH_KEYS: [number, number][] = [
  [1.5, BUNDLE_WIDTH],
  [1.7, 0.3],
  [1.85, 0.55],
  [2.0, 0.78],
  [2.15, 0.78],
  [2.3, 0.72],
  [2.45, 0.62],
  [2.6, 0.52],
  [2.8, 0.44],
  [3.0, 0.4],
]
const FLING_START = 2.6

const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const smooth = (t: number) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function keyed(keys: [number, number][], t: number) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    if (t <= t1) {
      const [t0, v0] = keys[i - 1]
      return lerp(v0, v1, (t - t0) / (t1 - t0))
    }
  }
  return keys[keys.length - 1][1]
}

export function stripWidth(vw: number, count: number) {
  return Math.ceil(vw / count)
}

export function stripCount(vw: number) {
  return Math.min(24, Math.max(12, Math.round(vw / 80)))
}

export function curtainFrame(g: number, m: StageMetrics, count: number): CurtainFrame {
  const stripW = stripWidth(m.vw, count)
  const handX = m.videoLeft + HAND.x * m.videoW
  const uHand = handX / m.vw
  const bundleW = BUNDLE_WIDTH * m.videoW
  const poses: StripPose[] = new Array(count)
  let left = Number.POSITIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let bunch = 0

  if (g < GATHER_START) {
    for (let i = 0; i < count; i++) poses[i] = { x: 0, sx: 1, shade: 0 }
    return { poses, left: 0, right: m.vw, bunch: 0 }
  }

  const sweeping = g >= SWEEP_START
  let center = handX
  let drapeW = bundleW
  if (sweeping) {
    drapeW = keyed(WIDTH_KEYS, g) * m.videoW
    center = m.videoLeft + keyed(CENTER_KEYS, g) * m.videoW
    if (g > FLING_START) {
      // Whatever the screen size, the sheet must be fully off the right edge by CURTAIN_GONE.
      const exit = m.vw + Math.max(uHand, 0.2) * drapeW + drapeW * 0.15 + 40
      const t = (g - FLING_START) / (CURTAIN_GONE - 0.08 - FLING_START)
      center = lerp(center, Math.max(center, exit), clamp01(t) * clamp01(t))
    }
  }

  const centers = new Array<number>(count)
  const widths = new Array<number>(count)
  const shades = new Array<number>(count)
  for (let i = 0; i < count; i++) {
    const rest = (i + 0.5) * stripW
    const u = rest / m.vw
    const phase = u * 7 * Math.PI - g * 9
    const fold = 0.03 * Math.sin(phase)
    const target = center + (u - uHand) * drapeW + drapeW * fold
    // Bunched strips are wider than their pitch so the sheet overlaps into folds.
    const sxTarget = (drapeW / m.vw) * (1.4 + 0.6 * (0.5 + 0.5 * Math.sin(phase + 0.9)))
    const shadeTarget = 0.1 + 0.3 * (0.5 + 0.5 * Math.sin(phase + 2.2))

    let p = 1
    if (!sweeping) {
      const lag = Math.abs(u - uHand) * GATHER_LAG
      p = smooth((g - GATHER_START - lag) / GATHER_DURATION)
    }
    centers[i] = lerp(rest, target, p)
    widths[i] = lerp(1, sxTarget, p) * stripW
    shades[i] = p * shadeTarget * (1 - drapeW / m.vw)
    bunch += p
  }

  for (let i = 0; i < count; i++) {
    // Strips that lag behind their neighbours are stretched to meet them, so the cloth never
    // tears open and shows the site through a slit.
    const toLeft = i > 0 ? centers[i] - centers[i - 1] : 0
    const toRight = i < count - 1 ? centers[i + 1] - centers[i] : 0
    const width = Math.max(widths[i], Math.max(toLeft, toRight) * 1.04)
    const rest = (i + 0.5) * stripW
    const x = centers[i] - rest
    poses[i] = { x, sx: width / stripW, shade: shades[i] }
    left = Math.min(left, centers[i] - width / 2)
    right = Math.max(right, centers[i] + width / 2)
  }

  return { poses, left, right, bunch: (bunch / count) * (1 - drapeW / m.vw) }
}

export function computeMetrics(vw: number, vh: number): StageMetrics {
  let videoH = vh * 0.9
  let videoW = videoH * 0.75
  if (videoW > vw * 0.96) {
    videoW = vw * 0.96
    videoH = videoW / 0.75
  }
  const centerX = vw >= 900 ? vw * 0.52 : vw * 0.5
  return {
    vw,
    vh,
    videoLeft: Math.round(centerX - videoW / 2),
    videoTop: Math.round(vh - videoH - vh * 0.02),
    videoW: Math.round(videoW),
    videoH: Math.round(videoH),
  }
}
