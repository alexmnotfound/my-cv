'use client'

import { useLang } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {a.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <h2 className="mb-5 text-[36px] font-black leading-tight tracking-tight" style={{ color: 'var(--cv-heading)' }}>
              {a.heading}
            </h2>
            <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--cv-muted)' }}>
              {a.body}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {a.highlights.map((h) => (
              <div
                key={h.title}
                className="flex gap-4 items-start rounded-xl p-5"
                style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{h.icon}</span>
                <div>
                  <div className="mb-1 text-[13px] font-bold" style={{ color: 'var(--cv-heading)' }}>{h.title}</div>
                  <div className="text-[12px] leading-relaxed" style={{ color: 'var(--cv-muted)' }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
