"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFantasyMode } from "./fantasy-mode"

const PRIMARY = [
  { label: "Fantasy", href: "#", triggersFantasy: true },
  { label: "Live casino", href: "/demo", isNew: true },
]

const SECONDARY = [
  { label: "Operatörer", href: "#" },
  { label: "Om oss", href: "#" },
  { label: "Demo", href: "/demo" },
]

const glow = "transition-all duration-300 hover:text-lime hover:drop-shadow-[0_0_8px_rgba(214,255,58,0.8)]"

export function SiteNav() {
  const { fantasy, setFantasy } = useFantasyMode()

  return (
    <header className="relative z-10 px-6 py-6 md:px-16 md:py-8">
      <nav aria-label="Huvudmeny" className="flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-off" aria-label="Scout Gaming Group, startsida">
          scout<span className="text-lime">/</span>gaming
        </Link>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <ul className="flex items-center gap-8 lg:gap-10">
            {PRIMARY.map((item) => (
              <li key={item.label} className="relative">
                <Link
                  href={item.href}
                  className={`cursor-pointer text-base font-bold tracking-[0.15em] text-off uppercase ${glow} ${
                    item.triggersFantasy && fantasy ? "text-lime drop-shadow-[0_0_8px_rgba(214,255,58,0.8)]" : ""
                  }`}
                  onPointerEnter={item.triggersFantasy ? () => setFantasy(true) : undefined}
                  onPointerLeave={item.triggersFantasy ? () => setFantasy(false) : undefined}
                  onFocus={item.triggersFantasy ? () => setFantasy(true) : undefined}
                  onBlur={item.triggersFantasy ? () => setFantasy(false) : undefined}
                >
                  {item.label}
                </Link>
                {item.isNew && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-6 rounded-sm bg-lime px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-ink uppercase">
                    Ny
                  </span>
                )}
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="h-5 w-px bg-off/20" />

          <ul className="flex items-center gap-6 lg:gap-8">
            {SECONDARY.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`cursor-pointer text-xs font-medium tracking-[0.15em] text-off/60 uppercase ${glow}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Button
          asChild
          size="sm"
          className="rounded-md bg-lime px-4 font-semibold text-ink transition-all duration-300 hover:bg-lime2 hover:shadow-[0_0_20px_rgba(214,255,58,0.5)]"
        >
          <Link href="/demo">
            Boka demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </nav>
    </header>
  )
}
