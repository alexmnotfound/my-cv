'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import { NavModeProvider } from '@/context/NavModeContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <NavModeProvider>
          {children}
        </NavModeProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
