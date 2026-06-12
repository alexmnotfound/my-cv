'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'
import { LandingAccordionItem, AccordionItemData } from '@/components/ui/interactive-image-accordion'

function ProjectModal({ item, onClose }: { item: AccordionItemData; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: 'modal-backdrop-in 0.25s ease forwards' }}
    >
      <div
        className="relative w-full max-w-[560px] rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--cv-bg)',
          border: '1px solid var(--cv-border)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.25)',
          animation: 'modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <div className="relative h-44 w-full overflow-hidden">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--cv-bg))' }} />
          {item.tag && (
            <span
              className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider"
              style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', color: 'var(--cv-muted)' }}
            >
              {item.tag}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-[16px] font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(4px)' }}
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-1 flex items-baseline gap-2">
            <h3 className="text-[18px] font-bold" style={{ color: 'var(--cv-heading)' }}>{item.title}</h3>
            {item.company && <span className="text-[11px]" style={{ color: 'var(--cv-muted)' }}>{item.company}</span>}
          </div>
          <p className="mb-4 text-[10px] uppercase tracking-wider" style={{ color: 'var(--cv-accent)' }}>{item.subtitle}</p>
          {item.description && (
            <p className="mb-5 text-[13px] leading-relaxed" style={{ color: 'var(--cv-muted)' }}>{item.description}</p>
          )}
          {item.highlights && (
            <div className="flex flex-col gap-2.5">
              {item.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex gap-2.5 text-[12px] leading-relaxed"
                  style={{ animation: `modal-item-in 0.3s ease ${i * 60}ms both`, color: 'var(--cv-text)' }}
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--cv-accent)' }} />
                  {h}
                </div>
              ))}
            </div>
          )}
          {item.links && (
            <div className="flex flex-wrap gap-2 mt-5">
              {item.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-4 py-2 text-[12px] font-medium transition-opacity hover:opacity-75"
                  style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', color: 'var(--cv-heading)' }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const p = t.projects
  const [active, setActive] = useState<AccordionItemData | null>(null)

  const accordionItems: AccordionItemData[] = p.items.map(item => ({
    id: item.id,
    title: item.title,
    company: item.company,
    subtitle: item.subtitle,
    imageUrl: item.imageUrl,
    tag: item.tag,
    description: item.description,
    highlights: item.highlights,
    links: ('links' in item ? item.links : undefined) as AccordionItemData['links'],
  }))

  return (
    <section id="projects" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
          {p.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
        </div>

        <LandingAccordionItem
          items={accordionItems}
          defaultActive={0}
          onItemClick={setActive}
        />

      </div>

      {active && <ProjectModal item={active} onClose={() => setActive(null)} />}
    </section>
  )
}
