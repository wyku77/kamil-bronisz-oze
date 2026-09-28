import { useState } from 'react'
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

type FAQData = { eyebrow: string; title: string; lead: string; items: { q: string; a: string }[] }

export function FAQ({ data = faq }: { data?: FAQData } = {}) {
  const [open, setOpen] = useState<number | null>(0)
  const polowa = Math.ceil(data.items.length / 2)
  const zNumerem = data.items.map((item, i) => ({ item, i }))
  const kolumny = [zNumerem.slice(0, polowa), zNumerem.slice(polowa)]

  return (
    <section id="faq" className="section relative overflow-hidden bg-slate-100 text-slate-900">
      <div className="container-px relative">
        <Reveal className="section-head-split">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
              {data.eyebrow}
            </span>
            <h2 className="mt-5 h-section text-slate-900">{data.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-600">{data.lead}</p>
        </Reveal>

        {/* Od lg dwie niezależne kolumny (każda rozwija się osobno) — jedna kolumna 14 pytań
            zajmowała ok. 1,9 ekranu. Kolejność czytania: najpierw lewa, potem prawa. */}
        <Reveal className="mt-10 grid items-start gap-3 lg:grid-cols-2 lg:gap-5">
          {kolumny.map((kol, k) => (
            <div key={k} className="space-y-3">
              {kol.map(({ item, i }) => {
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
                    {/* Odpowiedź zawsze jest w HTML (zwinięta przez grid-rows 0fr) — roboty widzą wszystkie
                        odpowiedzi, zgodnie z danymi FAQPage w <head>. Wcześniej zamknięte odpowiedzi nie
                        istniały w kodzie strony. */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden" aria-hidden={!isOpen}>
                        <p className="px-6 pb-5 leading-relaxed text-slate-600">{renderBold(item.a)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
