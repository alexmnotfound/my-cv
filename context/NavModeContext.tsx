'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type NavMode = 'top' | 'sidebar' | 'collapsed'

type NavModeContextType = {
  navMode: NavMode
  setNavMode: (mode: NavMode) => void
}

const NavModeContext = createContext<NavModeContextType | null>(null)

const STORAGE_KEY = 'cv-nav-mode'

export function NavModeProvider({ children }: { children: ReactNode }) {
  const [navMode, setNavModeState] = useState<NavMode>('top')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as NavMode | null
    if (stored === 'top' || stored === 'sidebar' || stored === 'collapsed') {
      setNavModeState(stored)
    }
  }, [])

  const setNavMode = (mode: NavMode) => {
    setNavModeState(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }

  return (
    <NavModeContext.Provider value={{ navMode, setNavMode }}>
      {children}
    </NavModeContext.Provider>
  )
}

export function useNavMode() {
  const ctx = useContext(NavModeContext)
  if (!ctx) throw new Error('useNavMode must be used within NavModeProvider')
  return ctx
}
