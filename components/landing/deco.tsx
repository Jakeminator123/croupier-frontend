import { cn } from "@/lib/utils"
import { type Suit, SUIT_SYMBOL } from "@/lib/blackjack"

interface DecoCardProps {
  rank: string
  suit: Suit
  className?: string
}

export function DecoCard({ rank, suit, className }: DecoCardProps) {
  const red = suit === "hearts" || suit === "diamonds"
  const symbol = SUIT_SYMBOL[suit]
  return (
    <div aria-hidden="true" className={cn("@container w-full", className)}>
      <div
        className={cn(
          "relative aspect-[5/7] w-full rounded-[6cqw] bg-[#f6f1e7] p-[7cqw] shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-black/20",
          red ? "text-[#a3262a]" : "text-[#1a1714]",
        )}
      >
        <div className="flex flex-col items-start font-serif leading-none">
          <span className="text-[22cqw] font-semibold">{rank}</span>
          <span className="text-[18cqw]">{symbol}</span>
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-[48cqw]">{symbol}</span>
        <div className="absolute right-[7cqw] bottom-[7cqw] flex rotate-180 flex-col items-start font-serif leading-none">
          <span className="text-[22cqw] font-semibold">{rank}</span>
          <span className="text-[18cqw]">{symbol}</span>
        </div>
      </div>
    </div>
  )
}

export function DecoCardBack({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("@container w-full", className)}>
      <div className="relative aspect-[5/7] w-full rounded-[6cqw] border border-primary/50 bg-[#231d17] p-[7cqw] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="flex h-full w-full items-center justify-center rounded-[4cqw] border border-primary/40 bg-[repeating-linear-gradient(45deg,transparent_0_5px,rgba(200,164,106,0.14)_5px_6px)]">
          <span className="font-serif text-[28cqw] text-primary/80">A</span>
        </div>
      </div>
    </div>
  )
}

const CHIP_STYLES: Record<number, { ring: string; face: string; text: string }> = {
  10: { ring: "bg-[#e9e2d3]", face: "bg-[#f6f1e7]", text: "text-[#1a1714]" },
  25: { ring: "bg-[#b8925a]", face: "bg-[#c8a46a]", text: "text-[#1a1714]" },
  100: { ring: "bg-[#0d0b09]", face: "bg-[#1a1714]", text: "text-[#c8a46a]" },
  500: { ring: "bg-[#6e1c20]", face: "bg-[#8a2429]", text: "text-[#f6f1e7]" },
}

export function Chip({ value, className }: { value: 10 | 25 | 100 | 500; className?: string }) {
  const s = CHIP_STYLES[value]
  return (
    <div aria-hidden="true" className={cn("@container w-full", className)}>
      <div className={cn("relative aspect-square w-full rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.6)]", s.ring)}>
        <div className="absolute inset-[6%] rounded-full border-[3cqw] border-dashed border-white/70" />
        <div className={cn("absolute inset-[22%] flex items-center justify-center rounded-full", s.face, s.text)}>
          <span className="font-serif text-[26cqw] leading-none font-semibold">{value}</span>
        </div>
      </div>
    </div>
  )
}
