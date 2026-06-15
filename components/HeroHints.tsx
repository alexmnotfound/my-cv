'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { useNavMode } from '@/context/NavModeContext'

export default function HeroHints() {
  const { t } = useLang()
  const h = t.hero
  const { navMode } = useNavMode()

  // text reveals after the arrow finishes drawing
  const [controlsText, setControlsText] = useState(false)
  const [scrollText, setScrollText]     = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setControlsText(true), 2800)
    const t2 = setTimeout(() => setScrollText(true),   3750)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const stroke = {
    fill: 'none',
    stroke: 'var(--cv-heading)',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const writeStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
    fontFamily: 'var(--font-hand)',
    color: 'var(--cv-heading)',
    clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
    transition: `clip-path 0.7s ease-out ${delay}ms`,
  })

  return (
    <>
      {/* Sidebar hint — visible only in sidebar mode, points upper-left at sidebar layout toggle */}
      <div
        className={`pointer-events-none absolute -top-7 left-[20px] z-10 items-end gap-2.5 flex-row-reverse ${navMode === 'sidebar' ? 'hidden md:flex' : 'hidden'}`}
        aria-hidden="true"
      >
        <span
          className="text-[19px] leading-tight max-w-[170px] -rotate-2 -translate-y-1 whitespace-nowrap overflow-hidden"
          style={writeStyle(controlsText)}
        >
          {h.hint_layout}
        </span>
        <svg width="26" height="58" viewBox="0 0 26 58">
          <path
            d="M16 54 C 11 40, 14 22, 9 6"
            pathLength={1}
            style={{
              ...stroke,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: 'hint-draw 0.9s ease-out 1.9s forwards',
            }}
          />
          <path
            d="M2 14 C 5 11, 7 8, 9 5 C 10 9, 12 13, 15 16"
            pathLength={1}
            style={{
              ...stroke,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: 'hint-draw 0.35s ease-out 2.7s forwards',
            }}
          />
        </svg>
      </div>

      {/* Controls hint — top nav only, hidden in sidebar mode. Desktop only. */}
      <div
        className={`pointer-events-none absolute -top-7 right-[70px] z-10 items-end gap-2.5 ${navMode === 'sidebar' ? 'hidden' : 'hidden md:flex'}`}
        aria-hidden="true"
      >
        <span
          className="text-[19px] leading-tight max-w-[170px] text-right -rotate-2 -translate-y-1 whitespace-nowrap overflow-hidden"
          style={writeStyle(controlsText)}
        >
          {h.hint_controls}
        </span>
        <svg width="26" height="58" viewBox="0 0 26 58">
          <path
            d="M10 54 C 15 40, 8 22, 13 6"
            pathLength={1}
            style={{
              ...stroke,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: 'hint-draw 0.9s ease-out 1.9s forwards',
            }}
          />
          <path
            d="M5 14 C 8 11, 11 8, 13 5 C 14 9, 16 13, 19 16"
            pathLength={1}
            style={{
              ...stroke,
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: 'hint-draw 0.35s ease-out 2.7s forwards',
            }}
          />
        </svg>
      </div>

      {/* Scroll hint — bottom center */}
      <div
        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        aria-hidden="true"
      >
        <span
          className="text-[18px] -rotate-2 mb-0.5 whitespace-nowrap overflow-hidden"
          style={writeStyle(scrollText)}
        >
          {h.hint_scroll}
        </span>
        <div style={{ animation: 'hint-bob 2.2s ease-in-out 3.6s infinite' }}>
          <svg width="26" height="40" viewBox="0 0 26 40">
            <path
              d="M14 2 C 10 10, 15 18, 12 32"
              pathLength={1}
              style={{
                ...stroke,
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: 'hint-draw 0.8s ease-out 2.7s forwards',
              }}
            />
            <path
              d="M5 26 C 8 29, 10 32, 12 34 C 14 31, 17 28, 20 26"
              pathLength={1}
              style={{
                ...stroke,
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: 'hint-draw 0.35s ease-out 3.4s forwards',
              }}
            />
          </svg>
        </div>
      </div>
    </>
  )
}
