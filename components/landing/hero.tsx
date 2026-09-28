import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const STATS = [
  { value: "3:2", label: "Blackjack betalar" },
  { value: "17", label: "Dealern stannar" },
  { value: "6", label: "Lekar i skon" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-16 lg:flex-row lg:gap-20 lg:py-24">
        <div className="flex max-w-xl flex-1 flex-col gap-8">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {"// Blackjack · AI-croupier"}
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] font-medium text-foreground text-balance md:text-7xl">
            Möt Astrid. Kvällens croupier.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Ett lugnt bord, riktiga regler och en croupier som aldrig blinkar. Sätt dig ner, lägg din insats och
            spela blackjack med demomarker, helt utan risk.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-mono text-xs tracking-widest uppercase">
              <Link href="/demo">
                Sätt dig vid bordet
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent font-mono text-xs tracking-widest uppercase">
              <a href="#video">
                <Play className="h-4 w-4" aria-hidden="true" />
                Se videon
              </a>
            </Button>
          </div>
          <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{stat.label}</dt>
                <dd className="font-serif text-4xl text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative w-full max-w-md flex-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/astrid-table.png"
              alt="Astrid, en blond croupier i svart kavaj, med händerna vilande på blackjackbordet"
              fill
              priority
              sizes="(min-width: 1024px) 448px, 100vw"
              className="object-cover object-[50%_12%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-accent/40 bg-background/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
              Bord öppet · Demo
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{"// Croupier"}</p>
                <p className="font-serif text-3xl text-foreground">Astrid</p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Bord 01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
