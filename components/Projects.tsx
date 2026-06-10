'use client'

import { useLang } from '@/context/LanguageContext'
import { LandingAccordionItem } from '@/components/ui/interactive-image-accordion'

export default function Projects() {
  const { t } = useLang()
  const p = t.projects

  const accordionItems = p.items.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    imageUrl: item.imageUrl,
    tag: item.tag,
    description: item.description,
    features: [...item.features],
  }))

  return (
    <section id="projects" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {p.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        <LandingAccordionItem items={accordionItems} defaultActive={0} />

      </div>
    </section>
  )
}
