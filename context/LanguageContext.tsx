'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { content, Lang } from '@/data/content'

type ContentValue = typeof content[Lang]

type LanguageContextType = {
  lang: Lang
  t: ContentValue
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const toggleLang = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
