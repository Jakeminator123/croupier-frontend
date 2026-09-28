import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardStream } from "@/components/landing/card-stream"

const NAV = [
  { label: "Blackjack", href: "/demo" },
  { label: "Roulette", href: "#" },
  { label: "Live", href: "#" },
  { label: "Turneringar", href: "#" },
  { label: "Om Astrid", href: "#" },
  { label: "Demo", href: "/demo" },
]

const navLink =
  "cursor-pointer text-sm font-bold tracking-[0.15em] uppercase text-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(200,164,106,0.9)]"

const socialIcon =
  "h-5 w-5 cursor-pointer text-foreground transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(200,164,106,0.9)]"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#120e0b] via-[#241b14] to-[#3a2c1e]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(200,164,106,0.18),transparent_55%)]"
      />
      <CardStream />

      <header className="relative z-10 px-6 py-6 md:px-16 md:py-8">
        <nav aria-label="Huvudmeny" className="flex items-center justify-between gap-6">
          <ul className="flex flex-wrap gap-6 md:gap-12">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="hidden items-center gap-2 rounded-full border border-accent/40 bg-background/50 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            Bord 01 öppet
          </span>
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center gap-12 px-6 pt-8 pb-32 md:px-16 lg:flex-row lg:items-center lg:justify-between lg:pt-12">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold tracking-wider text-primary uppercase">AI Live Casino:</p>
          <h1 className="mb-6 font-serif text-5xl leading-[1.05] font-bold text-foreground uppercase md:text-6xl lg:text-7xl">
            Möt Astrid.
            <br />
            Din croupier
            <br />
            i blackjack.
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-foreground/80">
            Sätt dig vid bordet, lägg din insats och spela mot en AI-croupier med riktiga regler. Blackjack betalar
            3 till 2. Demomarker, ingen risk.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary px-8 text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(200,164,106,0.8),0_0_40px_rgba(200,164,106,0.5)]"
            >
              <Link href="/demo">Spela demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-foreground bg-transparent px-8 text-sm font-semibold tracking-wide text-foreground uppercase transition-all duration-300 hover:border-primary hover:bg-foreground/10 hover:text-primary hover:shadow-[0_0_20px_rgba(200,164,106,0.8),0_0_40px_rgba(200,164,106,0.5)]"
            >
              <a href="/videos/ai-casino-demo.mp4" target="_blank" rel="noreferrer">
                Se videon
              </a>
            </Button>
          </div>

          <div className="flex gap-3" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(200,164,106,0.9)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
          </div>
        </div>

        <Link
          href="/demo"
          aria-label="Öppna demospelet med Astrid"
          className="animate-pulse-scale relative shrink-0 transition-transform duration-500 hover:scale-105"
        >
          <div className="glow-gold relative h-[520px] w-[330px] overflow-hidden rounded-[2rem] ring-1 ring-primary/40 md:h-[720px] md:w-[440px]">
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
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#120e0b] to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Croupier</p>
                <p className="font-serif text-3xl text-foreground">Astrid</p>
              </div>
              <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wider text-primary-foreground uppercase">
                Spela
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

      <p className="absolute right-6 bottom-8 z-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:right-16 md:bottom-12">
        18+ · Demo utan riktiga pengar
      </p>
    </div>
  )
}
