'use client'

import { useLang } from '@/context/LanguageContext'
import { useSkillFilter } from '@/context/SkillFilterContext'

function Badge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap"
      style={{
        background: 'var(--cv-surface)',
        border: '1px solid var(--cv-border)',
        color: 'var(--cv-text)',
      }}
    >
      {name}
    </span>
  )
}

function MarqueeRow({ items, reverse }: { items: { name: string }[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  const animClass = reverse ? 'marquee-row-right' : 'marquee-row-left'
  return (
    <div
      className="overflow-hidden mb-3"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div className={`flex gap-2 ${animClass}`} style={{ width: 'max-content' }}>
        {doubled.map((skill, i) => (
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

  const mid = Math.ceil(s.items.length / 2)
  const row1Items = s.items.slice(0, mid)
  const row2Items = s.items.slice(mid)

  const filteredByCategory = activeFilter
    ? s.filters
        .filter(f => f.key === activeFilter)
        .map(f => ({
          label: f.label,
          key: f.key,
          items: s.items.filter(i => i.category === f.key),
        }))
    : s.filters.map(f => ({
        label: f.label,
        key: f.key,
        items: s.items.filter(i => i.category === f.key),
      }))

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
            className="px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all"
            style={{
              background: activeFilter === null ? 'var(--cv-heading)' : 'var(--cv-surface)',
              color: activeFilter === null ? 'var(--cv-bg)' : 'var(--cv-muted)',
              border: '1px solid var(--cv-border)',
            }}
          >
            {s.filter_all}
          </button>
          {s.filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key === activeFilter ? null : f.key)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all"
              style={{
                background: activeFilter === f.key ? 'var(--cv-heading)' : 'var(--cv-surface)',
                color: activeFilter === f.key ? 'var(--cv-bg)' : 'var(--cv-muted)',
                border: '1px solid var(--cv-border)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Carousel — "All" selected */}
        {!activeFilter && (
          <div>
            <MarqueeRow items={row1Items} />
            <MarqueeRow items={row2Items} reverse />
          </div>
        )}

        {/* Category cards — filter active */}
        {activeFilter && (
          <div className="grid grid-cols-1 gap-4">
            {filteredByCategory.map(cat => (
              <div
                key={cat.key}
                className="rounded-2xl p-6"
                style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
              >
                <div className="mb-4 text-[10px] uppercase tracking-[2px]" style={{ color: 'var(--cv-muted)' }}>
                  {cat.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(skill => (
                    <Badge key={skill.name} name={skill.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
