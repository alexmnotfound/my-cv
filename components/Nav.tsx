'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const SECTION_IDS = ['about', 'experience', 'projects', 'contact'] as const

export default function Nav() {
  const { t, lang, toggleLang } = useLang()
  const { resolvedTheme, setTheme } = useTheme()

  const navLabels = [t.nav.about, t.nav.experience, t.nav.projects, t.nav.contact]

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ background: 'color-mix(in srgb, var(--cv-bg) 85%, transparent)', borderColor: 'var(--cv-border)' }}
    >
      <div className="mx-auto max-w-[1080px] px-8 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <span className="text-[13px] font-black tracking-[3px]" style={{ color: 'var(--cv-heading)' }}>
          MR
        </span>

        {/* Nav links */}
        <div className="hidden md:flex gap-8">
          {SECTION_IDS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[11px] uppercase tracking-widest transition-opacity hover:opacity-100"
              style={{ color: 'var(--cv-muted)' }}
            >
              {navLabels[i]}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div
            className="flex gap-0.5 rounded-lg p-0.5"
            style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
          >
            <button
              onClick={() => lang === 'en' && toggleLang()}
              className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'es' ? 'opacity-100' : 'opacity-30'}`}
              style={lang === 'es' ? { background: 'var(--cv-surface)' } : {}}
              aria-label="Español"
            >
              🇦🇷
            </button>
            <button
              onClick={() => lang === 'es' && toggleLang()}
              className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'en' ? 'opacity-100' : 'opacity-30'}`}
              style={lang === 'en' ? { background: 'var(--cv-surface)' } : {}}
              aria-label="English"
            >
              🇺🇸
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-opacity hover:opacity-80"
            style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

      </div>
    </nav>
  )
}
