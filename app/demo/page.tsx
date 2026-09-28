import type { Metadata } from "next"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BlackjackGame } from "@/components/blackjack/blackjack-game"

export const metadata: Metadata = {
  title: "Spela blackjack med Astrid · Demo",
  description: "Spela blackjack mot AI-croupiern Astrid med demomarker.",
}

export default function DemoPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="sr-only">Blackjack med Astrid</h1>
        <BlackjackGame />
      </main>
      <SiteFooter />
    </>
  )
}
