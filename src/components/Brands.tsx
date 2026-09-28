import { brands } from '../data/content'
import { Reveal } from './ui/Reveal'

/**
 * Pasek logotypów marek: białe znaki bez kafelków, wyrównane wizualnie (wysokość z danych).
 * Po najechaniu kursorem logo „podświetla się" w oryginalnych kolorach marki na białej plakietce
 * (ciemne loga — Deye, Sigenergy, SolaX — na granatowym tle byłyby niewidoczne).
 * Wersje biała i kolorowa mają identyczne wymiary (grafiki-ai/logotypy-biale.mjs), więc zamiana jest płynna.
 */
export function Brands() {
  return (
    <section id="marki" className="bg-ink-950 pb-6 pt-2 sm:pb-10 sm:pt-4">
      <div className="container-px">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {brands.label}
          </p>
          <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-4">
            {brands.items.map((b) => (
              <div
                key={b.alt}
                title={b.alt}
                className="group rounded-xl px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.35)]"
              >
                <span className="relative block" style={{ height: b.h }}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={b.src}
                    alt={b.alt}
                    className="h-full w-auto max-w-[150px] opacity-75 transition-opacity duration-300 group-hover:opacity-0 sm:max-w-none"
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={b.color}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
