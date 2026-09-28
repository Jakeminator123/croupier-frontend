const FEATURES = [
  {
    tag: "01 / Bordet",
    title: "Riktiga regler, inget fusk.",
    body: "Sex kortlekar, blandad sko och en dealer som stannar på alla 17. Samma matematik som vid ett riktigt bord.",
  },
  {
    tag: "02 / Risk",
    title: "Demomarker, noll insats.",
    body: "Du börjar med 1 000 marker. Tar de slut fyller du på med ett klick. Inga konton, inga riktiga pengar.",
  },
  {
    tag: "03 / Format",
    title: "Byggt för telefonen.",
    body: "Bordet är gjort i stående format, så det passar lika bra i handen som på en stor skärm.",
  },
]

export function Features() {
  return (
    <section id="bordet" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mb-14 flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">{"// Varför Astrids bord"}</p>
          <h2 className="font-serif text-4xl leading-tight text-foreground text-balance md:text-5xl">
            Ett bord byggt för lugn, inte för brus.
          </h2>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.tag} className="flex flex-col gap-6 bg-background p-8">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">{`// ${feature.tag}`}</p>
              <h3 className="font-serif text-2xl text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
