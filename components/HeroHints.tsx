'use client'

import { useLang } from '@/context/LanguageContext'

export default function HeroHints() {
  const { t } = useLang()
  const h = t.hero

  const stroke = {
    fill: 'none',
    stroke: 'var(--cv-heading)',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <>
      {/* Controls hint — sits above the photo card, arrow pointing straight up at nav controls. Desktop only. */}
      <div
        className="pointer-events-none absolute -top-7 right-[70px] z-10 hidden md:flex items-end gap-2.5"
        style={{ animation: 'hint-appear 0.8s ease 1.6s both' }}
        aria-hidden="true"
      >
        <span
          className="text-[19px] leading-tight max-w-[170px] text-right -rotate-2 -translate-y-1"
          style={{ fontFamily: 'var(--font-hand)', color: 'var(--cv-heading)' }}
        >
          {h.hint_controls}
        </span>
        <svg width="26" height="58" viewBox="0 0 26 58">
          {/* curvy hand-drawn stroke, drawn from tail to head */}
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
        style={{ animation: 'hint-appear 0.8s ease 2.4s both' }}
        aria-hidden="true"
      >
        <span
          className="text-[18px] -rotate-2 mb-0.5"
          style={{ fontFamily: 'var(--font-hand)', color: 'var(--cv-heading)' }}
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
