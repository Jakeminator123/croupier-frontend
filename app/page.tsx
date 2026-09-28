import Link from "next/link"
import { Twitter, Linkedin, Facebook, Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardStream } from "@/components/landing/card-stream"
import { LightTrails } from "@/components/landing/light-trails"
import { FantasyModeProvider } from "@/components/landing/fantasy-mode"
import { SiteNav } from "@/components/landing/site-nav"
import { HeroCard } from "@/components/landing/hero-card"

const socialIcon =
  "h-5 w-5 cursor-pointer text-off transition-all duration-300 hover:text-lime hover:drop-shadow-[0_0_12px_rgba(214,255,58,0.9)]"

export default function Home() {
  return (
    <FantasyModeProvider>
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ink via-[#111418] to-steel2 text-off">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(200,164,106,0.16),transparent_50%),radial-gradient(ellipse_at_10%_100%,rgba(214,255,58,0.08),transparent_45%)]"
      />
      <LightTrails />
      <CardStream />

      <SiteNav />

      <main className="relative z-10 flex flex-col items-center gap-12 px-6 pt-8 pb-32 md:px-16 lg:flex-row lg:items-center lg:justify-between lg:pt-12">
        <div className="max-w-2xl">
          <p className="mb-5 font-mono text-xs tracking-[0.25em] text-lime uppercase">
            {"// AI Live Casino · Scout Gaming Group · Malta & UK Licensed"}
          </p>
          <h1 className="mb-6 text-5xl leading-[1.02] font-semibold tracking-tight text-off md:text-6xl lg:text-7xl">
            Möt Astrid.
            <br />
            <span className="text-lime">Live blackjack</span>
            <br />
            driven av AI.
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-off/75 md:text-lg">
            Scout Gaming Groups AI live casino ger operatörer ett komplett blackjackbord: en croupier som pratar,
            riktiga regler och samma integration, wallet och KYC som vår fantasy sport. Prova demot, inga riktiga
            pengar.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-lime px-8 text-sm font-semibold tracking-wide text-ink uppercase transition-all duration-300 hover:bg-lime2 hover:shadow-[0_0_20px_rgba(214,255,58,0.7),0_0_40px_rgba(214,255,58,0.35)]"
            >
              <Link href="/demo">
                Spela demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-off/70 bg-transparent px-8 text-sm font-semibold tracking-wide text-off uppercase transition-all duration-300 hover:border-lime hover:bg-off/10 hover:text-lime hover:shadow-[0_0_20px_rgba(214,255,58,0.5),0_0_40px_rgba(214,255,58,0.25)]"
            >
              <a href="/videos/ai-casino-demo.mp4" target="_blank" rel="noreferrer">
                Se videon
              </a>
            </Button>
          </div>

          <div className="flex gap-3" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_8px_rgba(214,255,58,0.9)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-off/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-off/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-off/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-off/30" />
          </div>
        </div>

        <HeroCard />
      </main>

      <div className="absolute bottom-8 left-6 z-10 flex gap-6 md:bottom-12 md:left-16">
        <a href="#" aria-label="Twitter">
          <Twitter className={socialIcon} />
        </a>
        <a href="#" aria-label="LinkedIn">
          <Linkedin className={socialIcon} />
        </a>
        <a href="#" aria-label="Facebook">
          <Facebook className={socialIcon} />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram className={socialIcon} />
        </a>
      </div>

      <p className="absolute right-6 bottom-8 z-10 font-mono text-[10px] tracking-[0.2em] text-steel uppercase md:right-16 md:bottom-12">
        {"// 18+ · Demo utan riktiga pengar · © Scout Gaming Group"}
      </p>
    </div>
    </FantasyModeProvider>
  )
}
