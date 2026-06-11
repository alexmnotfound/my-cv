'use client'

import { useLang } from '@/context/LanguageContext'
import { useSkillFilter } from '@/context/SkillFilterContext'

type Item = {
  role: string
  company: string
  period: string
  desc: string
  highlights: readonly string[]
  tags: readonly string[]
}

function ExperienceContent({
  item,
  isHighlighted,
  activeSkillNames,
}: {
  item: Item
  isHighlighted: (tag: string) => boolean
  activeSkillNames: Set<string> | null
}) {
  return (
    <div>
      <div className="mb-0.5 text-[15px] font-bold" style={{ color: 'var(--cv-heading)' }}>{item.role}</div>
      <div className="mb-2.5 text-[12px]" style={{ color: 'var(--cv-muted)' }}>{item.company}</div>
      <div className="mb-3 text-[13px] leading-[1.7]" style={{ color: 'var(--cv-muted)' }}>{item.desc}</div>
      <div className="mb-4 flex flex-col gap-1.5">
        {item.highlights.map((h, j) => (
          <div key={j} className="flex gap-2 text-[12px] leading-relaxed" style={{ color: 'var(--cv-muted)' }}>
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--cv-accent)' }} />
            {h}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map(tag => {
          const lit = isHighlighted(tag)
          return (
            <span
              key={tag}
              className="rounded text-[10px] px-2 py-0.5 transition-all duration-300"
              style={{
                background: lit ? 'var(--cv-accent)' : 'var(--cv-surface)',
                border: `1px solid ${lit ? 'var(--cv-accent)' : 'var(--cv-border)'}`,
                color: lit ? 'var(--cv-bg)' : activeSkillNames ? 'color-mix(in srgb, var(--cv-muted) 40%, transparent)' : 'var(--cv-muted)',
                fontWeight: lit ? 600 : 400,
              }}
            >
              {tag}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function Experience() {
  const { t } = useLang()
  const e = t.experience
  const { activeFilter } = useSkillFilter()

  const activeSkillNames = activeFilter
    ? new Set(t.skills.items.filter(s => s.category === activeFilter).map(s => s.name as string))
    : null

  const isHighlighted = (tag: string) => activeSkillNames?.has(tag) ?? false

  return (
    <section id="experience" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {e.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        <div className="flex flex-col">
          {e.items.map((item, i) => (
            <div key={i}>
              {/* ── DESKTOP: 3-col timeline ── */}
              <div
                className="hidden md:grid pb-10"
                style={{ gridTemplateColumns: '180px 1px 1fr', gap: '0 28px' }}
              >
                <div className="text-right text-[11px] tracking-wide pt-1" style={{ color: 'var(--cv-muted)' }}>
                  {item.period}
                </div>
                <div className="relative" style={{ background: 'var(--cv-border)' }}>
                  <div className="absolute -left-[3px] top-1 h-2 w-2 rounded-full" style={{ background: 'var(--cv-accent)' }} />
                </div>
                <ExperienceContent item={item} isHighlighted={isHighlighted} activeSkillNames={activeSkillNames} />
              </div>

              {/* ── MOBILE: stacked card ── */}
              <div
                className="md:hidden mb-6 rounded-xl p-5"
                style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
              >
                <div className="mb-1 text-[10px] tracking-wider uppercase" style={{ color: 'var(--cv-accent)' }}>
                  {item.period}
                </div>
                <ExperienceContent item={item} isHighlighted={isHighlighted} activeSkillNames={activeSkillNames} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
