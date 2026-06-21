import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faq } from '../data/content'
import { Reveal } from './ui/Reveal'

/** Renderuje tekst z markerami **pogrubienia** (np. kluczowe liczby). */
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section relative overflow-hidden bg-slate-100 text-slate-900">
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            {faq.eyebrow}
          </span>
          <h2 className="mt-5 h-section text-slate-900">{faq.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{faq.lead}</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-gold-400 bg-white shadow-sm' : 'border-slate-200 bg-white/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">{item.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-gold-400 bg-gold-400 text-ink-950'
                        : 'border-slate-300 text-slate-500'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 leading-relaxed text-slate-600">{renderBold(item.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
