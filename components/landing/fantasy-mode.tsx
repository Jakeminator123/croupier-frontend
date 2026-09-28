"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FantasyModeValue {
  fantasy: boolean
  setFantasy: (on: boolean) => void
}

const FantasyModeContext = createContext<FantasyModeValue>({ fantasy: false, setFantasy: () => {} })

export function FantasyModeProvider({ children }: { children: ReactNode }) {
  const [fantasy, setFantasy] = useState(false)
  return <FantasyModeContext.Provider value={{ fantasy, setFantasy }}>{children}</FantasyModeContext.Provider>
}

export function useFantasyMode() {
  return useContext(FantasyModeContext)
}
