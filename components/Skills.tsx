'use client'

import { useLang } from '@/context/LanguageContext'

export default function Skills() {
  const { t } = useLang()
  const s = t.skills

  return (
    <section id="skills" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {s.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {s.categories.map(cat => (
            <div
              key={cat.label}
              className="rounded-2xl p-6"
              style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
            >
              <div className="mb-4 text-[10px] uppercase tracking-[2px]" style={{ color: 'var(--cv-muted)' }}>
                {cat.label}
              </div>
              <div className="flex flex-col gap-3">
                {cat.items.map(skill => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: 'var(--cv-text)' }}>{skill.name}</span>
                    <div className="w-20 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--cv-border)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${skill.level}%`, background: 'var(--cv-heading)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
