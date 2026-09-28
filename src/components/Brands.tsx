import type { CSSProperties } from 'react'
import { brands } from '../data/content'
import { Reveal } from './ui/Reveal'

/**
 * Pasek logotypów marek.
 * - Komputer: białe znaki bez kafelków; po najechaniu kursorem logo „podświetla się" w oryginalnych
 *   kolorach na białej plakietce (ciemne loga — Deye, Sigenergy, SolaX — na granacie byłyby niewidoczne).
 * - Telefon i urządzenia dotykowe (bez kursora): logotypy zawsze kolorowe na białych plakietkach —
 *   reguła .brand-chip w src/index.css.
 * Plakietki mają stałą wysokość, więc w kilku rzędach na telefonie wyglądają równo.
 * Wersje biała i kolorowa mają identyczne wymiary (grafiki-ai/logotypy-biale.mjs).
 */
type BrandsProps = {
  id?: string
  label?: string
  items?: { src: string; color: string; alt: string; h: number }[]
}

export function Brands({ id = 'marki', label = brands.label, items = brands.items }: BrandsProps = {}) {
  return (
    <section id={id} className="bg-ink-950 pb-6 pt-2 sm:pb-10 sm:pt-4">
      <div className="container-px">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {label}
          </p>
          <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-x-4 sm:gap-y-3">
            {items.map((b) => (
              <div
                key={b.alt}
                title={b.alt}
                style={{ '--h': `${b.h}px` } as CSSProperties}
                // telefon: równe plakietki po 3 w rzędzie (ostatnia wyśrodkowana), od sm szerokość wg logo
                className="brand-chip group flex h-12 w-[calc((100%-1rem)/3)] items-center justify-center rounded-xl px-2 transition-all duration-300 sm:h-[52px] sm:w-auto sm:px-3 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.35)]"
              >
                {/* na telefonie logo ok. 20% mniejsze — mieści się w plakietce */}
                <span className="relative block h-[calc(var(--h)*0.8)] max-w-full sm:h-[var(--h)]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={b.src}
                    alt={b.alt}
                    className="brand-white h-full w-auto max-w-full object-contain opacity-75 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={b.color}
                    alt=""
                    aria-hidden="true"
                    className="brand-color absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
