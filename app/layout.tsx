import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Astrid · Blackjack med AI-croupier",
  description:
    "Sätt dig vid Astrids bord. Ett demospel i blackjack med riktiga regler: blackjack betalar 3 till 2 och dealern stannar på alla 17.",
}

export const viewport: Viewport = {
  themeColor: "#1a1714",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${cormorant.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
