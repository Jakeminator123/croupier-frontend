import type { CSSProperties } from "react"
import { Chip, DecoCard, DecoCardBack } from "./deco"
import type { Suit } from "@/lib/blackjack"

type Item =
  | { kind: "card"; rank: string; suit: Suit }
  | { kind: "back" }
  | { kind: "chip"; value: 10 | 25 | 100 | 500 }

interface StreamItem {
  item: Item
  top: string
  size: string
  dur: number
  delay: number
  r0: number
  r1: number
  depth: "far" | "mid" | "near"
}

const STREAM: StreamItem[] = [
  { item: { kind: "card", rank: "A", suit: "spades" }, top: "5%", size: "w-24 md:w-32", dur: 22, delay: -2, r0: -40, r1: 30, depth: "near" },
  { item: { kind: "chip", value: 100 }, top: "12%", size: "w-12 md:w-16", dur: 17, delay: -9, r0: 0, r1: 720, depth: "mid" },
  { item: { kind: "card", rank: "K", suit: "hearts" }, top: "20%", size: "w-16 md:w-24", dur: 26, delay: -14, r0: -20, r1: 50, depth: "far" },
  { item: { kind: "back" }, top: "28%", size: "w-20 md:w-28", dur: 20, delay: -5, r0: -60, r1: 20, depth: "mid" },
  { item: { kind: "chip", value: 25 }, top: "36%", size: "w-10 md:w-14", dur: 15, delay: -11, r0: 0, r1: -540, depth: "far" },
  { item: { kind: "card", rank: "Q", suit: "diamonds" }, top: "44%", size: "w-24 md:w-36", dur: 24, delay: -17, r0: -30, r1: 45, depth: "near" },
  { item: { kind: "card", rank: "10", suit: "clubs" }, top: "52%", size: "w-14 md:w-20", dur: 28, delay: -8, r0: -10, r1: 60, depth: "far" },
  { item: { kind: "chip", value: 500 }, top: "60%", size: "w-14 md:w-20", dur: 19, delay: -3, r0: 0, r1: 900, depth: "near" },
  { item: { kind: "card", rank: "J", suit: "spades" }, top: "68%", size: "w-20 md:w-28", dur: 21, delay: -19, r0: -50, r1: 25, depth: "mid" },
  { item: { kind: "back" }, top: "76%", size: "w-16 md:w-24", dur: 25, delay: -12, r0: -25, r1: 55, depth: "far" },
  { item: { kind: "chip", value: 10 }, top: "84%", size: "w-10 md:w-12", dur: 16, delay: -6, r0: 0, r1: 600, depth: "mid" },
  { item: { kind: "card", rank: "9", suit: "hearts" }, top: "90%", size: "w-24 md:w-32", dur: 23, delay: -1, r0: -35, r1: 35, depth: "near" },
]

const DEPTH_CLASS = {
  far: "opacity-30 blur-[3px]",
  mid: "opacity-55 blur-[1px]",
  near: "opacity-85",
}

function Piece({ item }: { item: Item }) {
  if (item.kind === "card") return <DecoCard rank={item.rank} suit={item.suit} />
  if (item.kind === "back") return <DecoCardBack />
  return <Chip value={item.value} />
}

export function CardStream() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {STREAM.map((s, i) => (
        <div key={i} className={`absolute left-0 ${s.size} ${DEPTH_CLASS[s.depth]}`} style={{ top: s.top }}>
          <div
            className="animate-stream"
            style={
              {
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
                "--r0": `${s.r0}deg`,
                "--r1": `${s.r1}deg`,
              } as CSSProperties
            }
          >
            <Piece item={s.item} />
          </div>
        </div>
      ))}
    </div>
  )
}
