'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Moon, Sun, User, Briefcase, Layers, Mail, PanelLeft, PanelLeftClose, LayoutDashboard, Cpu, Home } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import { useNavMode } from '@/context/NavModeContext'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const SECTIONS = [
  { id: 'home',       Icon: Home      },
  { id: 'about',      Icon: User      },
  { id: 'experience', Icon: Briefcase },
  { id: 'skills',     Icon: Cpu       },
  { id: 'projects',   Icon: Layers    },
  { id: 'contact',    Icon: Mail      },
] as const

export default function Nav() {
  const { t, lang, toggleLang } = useLang()
  const { resolvedTheme, setTheme } = useTheme()
  const { navMode, setNavMode } = useNavMode()
  const [photoOpen, setPhotoOpen] = useState(false)

  const Avatar = ({ size = 28 }: { size?: number }) => (
    <button
      onClick={() => setPhotoOpen(true)}
      className="rounded-full overflow-hidden flex-shrink-0 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ width: size, height: size, border: '2px solid var(--cv-border)' }}
      aria-label="Ver foto de perfil"
    >
      <Image src="/profile.png" alt="Matias Rodriguez" width={size} height={size} className="object-cover w-full h-full" />
    </button>
  )

  const navLabels = [t.nav.home, t.nav.about, t.nav.experience, t.nav.skills, t.nav.projects, t.nav.contact]
  const isDark = resolvedTheme === 'dark'

  const LangToggle = () => (
    <div className="flex gap-0.5 rounded-lg p-0.5" style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}>
      <button onClick={() => lang === 'en' && toggleLang()} className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'es' ? 'opacity-100' : 'opacity-30'}`} aria-label="Español">🇦🇷</button>
      <button onClick={() => lang === 'es' && toggleLang()} className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'en' ? 'opacity-100' : 'opacity-30'}`} aria-label="English">🇺🇸</button>
    </div>
  )

  const ThemeToggle = () => (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 rounded-lg transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)', border: '1px solid var(--cv-border)' }} aria-label="Toggle theme">
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )

  const PhotoDialog = () => (
    <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
      <DialogContent className="p-0 overflow-hidden max-w-sm border-0" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Image src="/profile.png" alt="Matias Rodriguez" width={400} height={400} className="w-full h-auto rounded-xl object-cover" />
      </DialogContent>
    </Dialog>
  )

  /* ── ICON BUTTON with tooltip ── */
  const IconBtn = ({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) => (
    <div className="relative group/iconbtn">
      <button
        onClick={onClick}
        className="p-1.5 rounded-md transition-opacity hover:opacity-80"
        style={{ color: 'var(--cv-muted)' }}
        aria-label={label}
      >
        {children}
      </button>
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 rounded-md text-[10px] whitespace-nowrap pointer-events-none z-[200] opacity-0 group-hover/iconbtn:opacity-100 transition-opacity duration-150"
        style={{ background: 'var(--cv-heading)', color: 'var(--cv-bg)' }}
      >
        {label}
      </div>
    </div>
  )

  /* ── TOP BAR ── */
  if (navMode === 'top') {
    return (
      <>
      <nav className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--cv-bg) 85%, transparent)', borderColor: 'var(--cv-border)' }}>
        <div className="mx-auto max-w-[1080px] px-8 py-3.5 flex items-center justify-between">
          <Avatar size={28} />

          <div className="hidden md:flex gap-8">
            {SECTIONS.map(({ id }, i) => (
              <a key={id} href={`#${id}`} className="text-[11px] uppercase tracking-widest transition-opacity hover:opacity-100" style={{ color: 'var(--cv-muted)' }}>
                {navLabels[i]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LangToggle />
            <IconBtn onClick={() => setTheme(isDark ? 'light' : 'dark')} label={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </IconBtn>
            <IconBtn onClick={() => setNavMode('sidebar')} label="Sidebar">
              <PanelLeft size={14} />
            </IconBtn>
          </div>
        </div>
      </nav>
      <PhotoDialog />
      </>
    )
  }

  /* ── SIDEBAR ── */
  const isCollapsed = navMode === 'collapsed'

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-300"
      style={{
        width: isCollapsed ? '60px' : '240px',
        background: 'color-mix(in srgb, var(--cv-bg) 95%, transparent)',
        borderRight: '1px solid var(--cv-border)',
        backdropFilter: 'blur(16px)',
        overflow: 'visible',
      }}
    >
      {/* ── Header: logo + controls ── */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{ borderBottom: '1px solid var(--cv-border)', minHeight: '56px' }}
      >
        <Avatar size={isCollapsed ? 28 : 32} />

        <div className="flex items-center gap-0.5">
          {isCollapsed ? (
            /* Collapsed: just expand button */
            <IconBtn onClick={() => setNavMode('sidebar')} label="Expandir">
              <PanelLeft size={13} />
            </IconBtn>
          ) : (
            /* Expanded: collapse + switch to top */
            <>
              <IconBtn onClick={() => setNavMode('collapsed')} label="Minimizar">
                <PanelLeftClose size={13} />
              </IconBtn>
              <IconBtn onClick={() => setNavMode('top')} label="Top bar">
                <LayoutDashboard size={13} />
              </IconBtn>
            </>
          )}
        </div>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {SECTIONS.map(({ id, Icon }, i) => (
          <div key={id} className="relative group">
            <a
              href={`#${id}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:opacity-100"
              style={{ color: 'var(--cv-muted)' }}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-[12px] uppercase tracking-wider">{navLabels[i]}</span>
              )}
            </a>

            {/* Tooltip — always show on hover, but only useful when collapsed */}
            {isCollapsed && (
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-md text-[11px] whitespace-nowrap pointer-events-none z-[200] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ background: 'var(--cv-heading)', color: 'var(--cv-bg)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
              >
                {navLabels[i]}
                {/* Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent" style={{ borderRightColor: 'var(--cv-heading)' }} />
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ── Bottom controls ── */}
      <div className="flex flex-col gap-2 p-3" style={{ borderTop: '1px solid var(--cv-border)' }}>
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => lang === 'en' && toggleLang()} className={`text-base transition-all ${lang === 'es' ? 'opacity-100' : 'opacity-30'}`} aria-label="Español">🇦🇷</button>
            <button onClick={() => lang === 'es' && toggleLang()} className={`text-base transition-all ${lang === 'en' ? 'opacity-100' : 'opacity-30'}`} aria-label="English">🇺🇸</button>
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="transition-opacity hover:opacity-80" style={{ color: 'var(--cv-muted)' }} aria-label="Toggle theme">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        )}
      </div>
      <PhotoDialog />
    </aside>
  )
}
