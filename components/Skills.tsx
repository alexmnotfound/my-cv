'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { useSkillFilter } from '@/context/SkillFilterContext'

function Badge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] whitespace-nowrap"
      style={{
        background: 'var(--cv-surface)',
        border: '1px solid var(--cv-border)',
        color: 'var(--cv-muted)',
      }}
    >
      {name}
    </span>
  )
}

function MarqueeRow({ items, reverse, repeat = 2 }: { items: { name: string }[]; reverse?: boolean; repeat?: number }) {
  const filled = Array.from({ length: repeat }, () => items).flat()
  const animClass = reverse ? 'marquee-row-right' : 'marquee-row-left'
  return (
    <div
      className="overflow-hidden mb-3"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div className={`flex gap-2 ${animClass}`} style={{ width: 'max-content' }}>
        {filled.map((skill, i) => (
          <Badge key={`${skill.name}-${i}`} name={skill.name} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  const { activeFilter, setActiveFilter } = useSkillFilter()

  // hint arrow draws itself when the filter row scrolls into view
  const hintRef = useRef<HTMLDivElement>(null)
  const [hintVisible, setHintVisible] = useState(false)
  useEffect(() => {
    const el = hintRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHintVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const hintStroke = {
    fill: 'none',
    stroke: 'var(--cv-heading)',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeDasharray: 1,
  }

  // Fade transition: renderedFilter trails activeFilter by 180ms
  const [renderedFilter, setRenderedFilter] = useState(activeFilter)
  const [fading, setFading] = useState(false)

  // Experience hint — shown only the first time a filter is activated
  const expHintShownRef = useRef(false)
  const [expHintActive, setExpHintActive] = useState(false)
  const [expHintVisible, setExpHintVisible] = useState(false)
  const [expTextVisible, setExpTextVisible] = useState(false)

  useEffect(() => {
    if (activeFilter === renderedFilter) return
    setFading(true)
    const t = setTimeout(() => {
      setRenderedFilter(activeFilter)
      setFading(false)
    }, 180)
    return () => clearTimeout(t)
  }, [activeFilter])

  useEffect(() => {
    if (activeFilter && !expHintShownRef.current) {
      expHintShownRef.current = true
      setExpHintActive(true)
      setExpHintVisible(true)
      const t1 = setTimeout(() => setExpTextVisible(true), 900)
      const t2 = setTimeout(() => setExpHintVisible(false), 4500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [activeFilter])

  const displayItems = renderedFilter
    ? s.items.filter(i => i.category === renderedFilter)
    : [...s.items]

  const mid = Math.ceil(displayItems.length / 2)
  const row1Items = displayItems.slice(0, mid)
  const row2Items = displayItems.slice(mid)

  return (
    <section id="skills" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <style>{`
        .marquee-row-left  { animation: marquee-left  35s linear infinite; }
        .marquee-row-right { animation: marquee-right 35s linear infinite; }
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <div className="mx-auto max-w-[1080px]">

        <div className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {s.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter(null)}
            className="rounded text-[11px] px-2.5 py-1 transition-all duration-300"
            style={{
              background: activeFilter === null ? 'var(--cv-accent)' : 'var(--cv-surface)',
              color: activeFilter === null ? 'var(--cv-bg)' : 'var(--cv-muted)',
              border: `1px solid ${activeFilter === null ? 'var(--cv-accent)' : 'var(--cv-border)'}`,
              fontWeight: activeFilter === null ? 600 : 400,
            }}
          >
            {s.filter_all}
          </button>
          {s.filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key === activeFilter ? null : f.key)}
              className="rounded text-[11px] px-2.5 py-1 transition-all duration-300"
              style={{
                background: activeFilter === f.key ? 'var(--cv-accent)' : 'var(--cv-surface)',
                color: activeFilter === f.key ? 'var(--cv-bg)' : 'var(--cv-muted)',
                border: `1px solid ${activeFilter === f.key ? 'var(--cv-accent)' : 'var(--cv-border)'}`,
                fontWeight: activeFilter === f.key ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}

          {/* hand-drawn hint — arrow pointing left at the filter chips */}
          <div
            ref={hintRef}
            className="pointer-events-none hidden md:flex items-center gap-2 ml-3 -mt-1"
            style={{ opacity: hintVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
            aria-hidden="true"
          >
            <svg width="54" height="26" viewBox="0 0 54 26">
              <path
                d="M50 10 C 36 18, 22 8, 8 14"
                pathLength={1}
                style={{
                  ...hintStroke,
                  strokeDashoffset: hintVisible ? 0 : 1,
                  transition: 'stroke-dashoffset 0.8s ease-out 0.5s',
                }}
              />
              <path
                d="M16 7 C 13 9, 10 12, 7 14 C 10 15, 14 17, 17 20"
                pathLength={1}
                style={{
                  ...hintStroke,
                  strokeDashoffset: hintVisible ? 0 : 1,
                  transition: 'stroke-dashoffset 0.35s ease-out 1.3s',
                }}
              />
            </svg>
            <span
              className="text-[18px] -rotate-2 whitespace-nowrap overflow-hidden"
              style={{
                fontFamily: 'var(--font-hand)',
                color: 'var(--cv-heading)',
                clipPath: hintVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.7s ease-out 1.5s',
              }}
            >
              {s.hint_filter}
            </span>
          </div>
        </div>

        <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.18s ease' }}>
          {renderedFilter ? (
            /* Static centered grid when filter active */
            <div className="flex flex-wrap gap-2 py-4 justify-center">
              {displayItems.map(skill => (
                <Badge key={skill.name} name={skill.name} />
              ))}
            </div>
          ) : (
            /* Animated marquee when showing all */
            <>
              <MarqueeRow items={row1Items} />
              <MarqueeRow items={row2Items} reverse />
            </>
          )}
        </div>

        {/* One-time hint pointing down toward experience section */}
        <div
          className="pointer-events-none flex items-center justify-center gap-2 mt-2"
          style={{ opacity: expHintVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
          aria-hidden="true"
        >
          <span
            className="text-[18px] -rotate-2 whitespace-nowrap overflow-hidden"
            style={{
              fontFamily: 'var(--font-hand)',
              color: 'var(--cv-heading)',
              clipPath: expTextVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 0.7s ease-out',
            }}
          >
            {s.hint_experience}
          </span>
          <svg width="26" height="40" viewBox="0 0 26 40" fill="none">
            <path
              d="M14 2 C 10 10, 15 18, 12 32"
              pathLength={1}
              style={{
                ...hintStroke,
                strokeDashoffset: expHintActive ? 0 : 1,
                transition: 'stroke-dashoffset 0.8s ease-out 0.1s',
              }}
            />
            <path
              d="M5 26 C 8 29, 10 32, 12 34 C 14 31, 17 28, 20 26"
              pathLength={1}
              style={{
                ...hintStroke,
                strokeDashoffset: expHintActive ? 0 : 1,
                transition: 'stroke-dashoffset 0.35s ease-out 0.85s',
              }}
            />
          </svg>
        </div>

      </div>
    </section>
  )
}
