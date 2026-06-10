'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, User, Briefcase, Layers, Mail, PanelLeft, PanelLeftClose, LayoutDashboard } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useNavMode } from '@/context/NavModeContext'

const SECTIONS = [
  { id: 'about',      Icon: User       },
  { id: 'experience', Icon: Briefcase  },
  { id: 'projects',   Icon: Layers     },
  { id: 'contact',    Icon: Mail       },
] as const

export default function Nav() {
  const { t, lang, toggleLang } = useLang()
  const { resolvedTheme, setTheme } = useTheme()
  const { navMode, setNavMode } = useNavMode()

  const navLabels = [t.nav.about, t.nav.experience, t.nav.projects, t.nav.contact]

  const isDark = resolvedTheme === 'dark'

  /* ── SHARED ELEMENTS ── */
  const LangToggle = () => (
    <div className="flex gap-0.5 rounded-lg p-0.5" style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}>
      <button onClick={() => lang === 'en' && toggleLang()} className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'es' ? 'opacity-100' : 'opacity-30'}`} aria-label="Español">🇦🇷</button>
      <button onClick={() => lang === 'es' && toggleLang()} className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'en' ? 'opacity-100' : 'opacity-30'}`} aria-label="English">🇺🇸</button>
    </div>
  )

  const ThemeToggle = ({ size = 14 }: { size?: number }) => (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Toggle theme">
      {isDark ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  )

  /* ── TOP BAR ── */
  if (navMode === 'top') {
    return (
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--cv-bg) 85%, transparent)', borderColor: 'var(--cv-border)' }}>
        <div className="mx-auto max-w-[1080px] px-8 py-3.5 flex items-center justify-between">
          <span className="text-[13px] font-black tracking-[3px]" style={{ color: 'var(--cv-heading)' }}>MR</span>

          <div className="hidden md:flex gap-8">
            {SECTIONS.map(({ id }, i) => (
              <a key={id} href={`#${id}`} className="text-[11px] uppercase tracking-widest transition-opacity hover:opacity-100" style={{ color: 'var(--cv-muted)' }}>
                {navLabels[i]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button onClick={() => setNavMode('sidebar')} className="p-2 rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Switch to sidebar">
              <PanelLeft size={14} />
            </button>
          </div>
        </div>
      </nav>
    )
  }

  /* ── SIDEBAR (expanded + collapsed) ── */
  const isCollapsed = navMode === 'collapsed'
  const sidebarWidth = isCollapsed ? '60px' : '240px'

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-300"
      style={{ width: sidebarWidth, background: 'color-mix(in srgb, var(--cv-bg) 95%, transparent)', borderRight: '1px solid var(--cv-border)', backdropFilter: 'blur(16px)' }}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-5" style={{ borderBottom: '1px solid var(--cv-border)', minHeight: '56px' }}>
        <span className="text-[13px] font-black tracking-[3px]" style={{ color: 'var(--cv-heading)' }}>
          {isCollapsed ? 'M' : 'MR'}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {SECTIONS.map(({ id, Icon }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:opacity-100 group relative"
            style={{ color: 'var(--cv-muted)' }}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-[12px] uppercase tracking-wider">{navLabels[i]}</span>
            )}
            {/* Tooltip on collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 rounded-md text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                style={{ background: 'var(--cv-heading)', color: 'var(--cv-bg)' }}>
                {navLabels[i]}
              </div>
            )}
          </a>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="flex flex-col gap-2 p-3" style={{ borderTop: '1px solid var(--cv-border)' }}>
        {isCollapsed ? (
          <>
            <button onClick={() => lang === 'en' && toggleLang()} className="text-base text-center w-full py-1 transition-opacity hover:opacity-80" aria-label="Español">🇦🇷</button>
            <button onClick={() => lang === 'es' && toggleLang()} className="text-base text-center w-full py-1 transition-opacity hover:opacity-80" aria-label="English">🇺🇸</button>
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="w-full flex justify-center py-1.5 rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)' }} aria-label="Toggle theme">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {/* Expand */}
            <button onClick={() => setNavMode('sidebar')} className="w-full flex justify-center py-1.5 rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Expand sidebar">
              <PanelLeft size={14} />
            </button>
          </>
        ) : (
          <>
            <LangToggle />
            <div className="flex gap-2">
              <ThemeToggle />
              {/* Collapse */}
              <button onClick={() => setNavMode('collapsed')} className="flex-1 flex items-center justify-center rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Collapse sidebar">
                <PanelLeftClose size={14} />
              </button>
              {/* Back to top */}
              <button onClick={() => setNavMode('top')} className="flex-1 flex items-center justify-center rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Switch to top bar">
                <LayoutDashboard size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
