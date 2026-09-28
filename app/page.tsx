import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { VideoSection } from "@/components/landing/video-section"
import { Rules } from "@/components/landing/rules"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <VideoSection />
        <Rules />
      </main>
      <SiteFooter />
    </>
  )
}
