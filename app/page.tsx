import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Facebook, Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardStream } from "@/components/landing/card-stream"
import { LightTrails } from "@/components/landing/light-trails"

const NAV = [
  { label: "Fantasy", href: "#" },
  { label: "Live casino", href: "/demo", isNew: true },
  { label: "Operatörer", href: "#" },
  { label: "Om oss", href: "#" },
  { label: "Demo", href: "/demo" },
]

const navLink =
  "cursor-pointer text-sm font-bold tracking-[0.15em] uppercase text-off transition-all duration-300 hover:text-lime hover:drop-shadow-[0_0_8px_rgba(214,255,58,0.8)]"

const socialIcon =
  "h-5 w-5 cursor-pointer text-off transition-all duration-300 hover:text-lime hover:drop-shadow-[0_0_12px_rgba(214,255,58,0.9)]"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ink via-[#111418] to-steel2 text-off">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(200,164,106,0.16),transparent_50%),radial-gradient(ellipse_at_10%_100%,rgba(214,255,58,0.08),transparent_45%)]"
      />
      <LightTrails />
      <CardStream />

      <header className="relative z-10 px-6 py-6 md:px-16 md:py-8">
        <nav aria-label="Huvudmeny" className="flex items-center justify-between gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight text-off" aria-label="Scout Gaming Group, startsida">
            scout<span className="text-lime">/</span>gaming
          </Link>

          <ul className="hidden gap-8 md:flex lg:gap-12">
            {NAV.map((item) => (
              <li key={item.label} className="relative">
                <Link href={item.href} className={navLink}>
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

        <Link
          href="/demo"
          aria-label="Öppna demospelet med Astrid"
          className="animate-pulse-scale relative shrink-0 transition-transform duration-500 hover:scale-105"
        >
          <div className="glow-lime relative h-[520px] w-[330px] overflow-hidden rounded-[2rem] ring-1 ring-off/15 md:h-[720px] md:w-[440px]">
            <Image
              src="/images/astrid-table.png"
              alt="Astrid, blond croupier i svart kavaj, står redo vid blackjackbordet"
              fill
              priority
              sizes="(min-width: 768px) 440px, 330px"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent"
            />
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
        </Link>
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
  )
}
