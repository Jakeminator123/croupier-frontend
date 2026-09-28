import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const RULES = [
  { key: "Mål", value: "Kom närmare 21 än dealern utan att gå över." },
  { key: "Blackjack", value: "Ess plus ett tiokort betalar 3 till 2." },
  { key: "Dealern", value: "Drar till 16 och stannar på alla 17." },
  { key: "Kort", value: "Ta ett kort till." },
  { key: "Stanna", value: "Behåll din hand och låt dealern spela." },
  { key: "Dubbla", value: "Dubbla insatsen på dina två första kort och få exakt ett kort till." },
]

export function Rules() {
  return (
    <section id="regler" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:py-28">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">{"// Husregler"}</p>
          <h2 className="font-serif text-4xl leading-tight text-foreground text-balance md:text-5xl">
            Enkla regler. Klassiskt spel.
          </h2>
          <Button asChild size="lg" className="w-fit font-mono text-xs tracking-widest uppercase">
            <Link href="/demo">
              Spela mot Astrid
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          {RULES.map((rule) => (
            <div key={rule.key} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <dt className="w-32 shrink-0 font-mono text-xs tracking-[0.2em] text-primary uppercase">{rule.key}</dt>
              <dd className="text-sm leading-relaxed text-foreground/90">{rule.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
