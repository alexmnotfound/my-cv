'use client'

import { createContext, useContext, useState } from 'react'

type SkillFilterCtx = {
  activeFilter: string | null
  setActiveFilter: (f: string | null) => void
}

const SkillFilterContext = createContext<SkillFilterCtx>({
  activeFilter: null,
  setActiveFilter: () => {},
})

export function SkillFilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  return (
    <SkillFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </SkillFilterContext.Provider>
  )
}

export function useSkillFilter() {
  return useContext(SkillFilterContext)
}
