"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type SiteMode = "casino" | "fantasy" | "live"

interface SiteModeValue {
  mode: SiteMode
  fantasy: boolean
  setMode: (mode: SiteMode) => void
  setFantasy: (on: boolean) => void
}

const SiteModeContext = createContext<SiteModeValue>({
  mode: "casino",
  fantasy: false,
  setMode: () => {},
  setFantasy: () => {},
})

export function FantasyModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>("casino")
  const value: SiteModeValue = {
    mode,
    fantasy: mode === "fantasy",
    setMode,
    setFantasy: (on) => setMode(on ? "fantasy" : "casino"),
  }
  return (
    <SiteModeContext.Provider value={value}>
      <div data-mode={mode} className="contents">
        {children}
      </div>
    </SiteModeContext.Provider>
  )
}

export function useFantasyMode() {
  return useContext(SiteModeContext)
}
