export function VideoSection() {
  return (
    <section id="video" className="scroll-mt-20 border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:py-28">
        <div className="flex max-w-md flex-col gap-4">
          <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">{"// Se henne i aktion"}</p>
          <h2 className="font-serif text-4xl leading-tight text-foreground text-balance md:text-5xl">
            En croupier som läser bordet.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Astrid är vår första AI-croupier. Se hur hon delar ut och hur bordet känns innan du sätter dig.
          </p>
        </div>
        <div className="w-full max-w-sm flex-1 lg:ml-auto">
          <video
            className="aspect-[9/16] w-full rounded-lg border border-border bg-background object-cover"
            src="/videos/ai-casino-demo.mp4"
            poster="/images/astrid-table.png"
            controls
            playsInline
            preload="metadata"
          >
            <track kind="captions" />
          </video>
        </div>
      </div>
    </section>
  )
}
