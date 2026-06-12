'use client'

import { useEffect, useRef, useState } from 'react'

const NAME = 'Matías Rodríguez'
const CHARS = [...NAME] // spread handles unicode chars

export default function DigitalSignature() {
  const ref = useRef<HTMLDivElement>(null)
  const [lineVisible, setLineVisible]   = useState(false)
  const [letterCount, setLetterCount]   = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.unobserve(el)
        // line draws first, then letters appear one by one
        setTimeout(() => setLineVisible(true), 200)
        CHARS.forEach((_, i) => {
          setTimeout(() => setLetterCount(i + 1), 800 + i * 100)
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const lineLen = 240

  return (
    <div ref={ref} className="mt-12 inline-flex flex-col items-start select-none" aria-hidden="true">
      {/* letters */}
      <div
        className="leading-none tracking-wide"
        style={{ fontFamily: 'var(--font-hand)', fontSize: '44px', color: 'var(--cv-heading)' }}
      >
        {CHARS.map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : undefined,
              opacity: i < letterCount ? 1 : 0,
              transform: i < letterCount ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.12s ease, transform 0.12s ease',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* underline */}
      <svg width={lineLen} height="10" viewBox={`0 0 ${lineLen} 10`} style={{ marginTop: '-4px' }}>
        <path
          d={`M4 6 Q${lineLen / 2} 4 ${lineLen - 4} 6`}
          fill="none"
          stroke="var(--cv-heading)"
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: lineVisible ? 0 : 1,
            transition: 'stroke-dashoffset 0.6s ease-out 0.1s',
          }}
        />
      </svg>
    </div>
  )
}
