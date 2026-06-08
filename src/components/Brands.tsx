import { brands } from '../data/content'
import { Reveal } from './ui/Reveal'

/** Kompaktowy pasek logotypów marek (pełny kolor na białych kafelkach). */
export function Brands() {
  return (
    <section id="marki" className="bg-ink-950 py-8 sm:py-10">
      <div className="container-px">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {brands.label}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {brands.items.map((b) => (
              <div
                key={b.alt}
                className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-2.5 sm:h-14 sm:w-28"
                title={b.alt}
              >
                <img src={b.src} alt={b.alt} loading="lazy" className="max-h-7 max-w-full object-contain sm:max-h-8" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
