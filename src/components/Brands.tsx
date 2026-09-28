import { brands } from '../data/content'
import { Reveal } from './ui/Reveal'

/**
 * Pasek logotypów marek: białe znaki bez kafelków, wyrównane wizualnie (wysokość z danych).
 * Wcześniej: kolorowe logo w białych prostokątach o różnej wielkości — część ledwo czytelna.
 */
export function Brands() {
  return (
    <section id="marki" className="bg-ink-950 pb-6 pt-2 sm:pb-10 sm:pt-4">
      <div className="container-px">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {brands.label}
          </p>
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-9 gap-y-6 sm:gap-x-12">
            {brands.items.map((b) => (
              <img
                key={b.alt}
                loading="lazy"
                decoding="async"
                src={b.src}
                alt={b.alt}
                title={b.alt}
                style={{ height: b.h }}
                className="w-auto max-w-[150px] opacity-75 transition-opacity hover:opacity-100 sm:max-w-none"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
