import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl tracking-wide text-foreground">Astrid</span>
          <span className="hidden font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase sm:inline">
            {"// blackjack"}
          </span>
        </Link>
        <nav aria-label="Huvudmeny" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <li>
              <a href="#bordet" className="transition-colors hover:text-foreground">
                Bordet
              </a>
            </li>
            <li>
              <a href="#video" className="transition-colors hover:text-foreground">
                Se Astrid
              </a>
            </li>
            <li>
              <a href="#regler" className="transition-colors hover:text-foreground">
                Regler
              </a>
            </li>
          </ul>
          <Button asChild size="sm" className="font-mono text-xs tracking-widest uppercase">
            <Link href="/demo">Spela demo</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
