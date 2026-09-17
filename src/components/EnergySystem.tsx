import { useState } from 'react'
import { energySystem } from '../data/content'
import { track } from '../lib/analytics'
import img800 from '../assets/grafiki/dom-system-energii-800.webp'
import img1600 from '../assets/grafiki/dom-system-energii-1600.webp'

/**
 * Interaktywna ilustracja „jak działa dom z magazynem".
 * Punkty na grafice (mysz/dotyk) i etykiety pod nią (także klawiatura) wybierają element,
 * którego opis pokazuje się w panelu. Bez zależności od viewportu (whileInView/useInView),
 * więc prerender zapisuje od razu kompletny, widoczny stan.
 */
export function EnergySystem() {
  const [activeId, setActiveId] = useState(energySystem.defaultId)
  const active = energySystem.points.find((p) => p.id === activeId) ?? energySystem.points[0]

  const select = (id: string) => {
    setActiveId(id)
    track.ctaClick(`energy_system_${id}`)
  }

  return (
    <div>
      <p className="text-balance text-center font-display text-lg font-bold text-white sm:text-xl">{energySystem.title}</p>
      <p className="mt-1.5 text-balance text-center text-sm text-white/60">{energySystem.hint}</p>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#050b16]">
        <img
          src={img1600}
          srcSet={`${img800} 800w, ${img1600} 1600w`}
          sizes="(min-width: 1024px) 1024px, 100vw"
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          alt={energySystem.alt}
          className="block h-auto w-full"
        />

        {/* Punkty na grafice — dla myszy i dotyku; dostęp z klawiatury zapewniają etykiety poniżej */}
        {energySystem.points.map((p, i) => {
          const on = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => select(p.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {!on && <span className="absolute inset-1.5 animate-ping rounded-full bg-gold-400/40" />}
              <span
                className={`relative grid h-6 w-6 place-items-center rounded-full border font-display text-[11px] font-bold shadow-lg transition-all duration-200 sm:h-8 sm:w-8 sm:text-xs ${
                  on
                    ? 'scale-110 border-white bg-gold-400 text-ink-950'
                    : 'border-gold-300/70 bg-ink-950/85 text-gold-200 hover:bg-gold-400 hover:text-ink-950'
                }`}
              >
                {i + 1}
              </span>
            </button>
          )
        })}
      </div>

      {/* Etykiety — skanowalna lista elementów, obsługa klawiaturą */}
      <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Elementy systemu">
        {energySystem.points.map((p, i) => {
          const on = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id)}
              aria-pressed={on}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                on
                  ? 'border-gold-400 bg-gold-400/15 text-white'
                  : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-gold-400/50 hover:text-white'
              }`}
            >
              <span className="mr-1 font-display font-bold text-gold-300">{i + 1}</span>
              {p.short}
            </button>
          )
        })}
      </div>

      <div
        aria-live="polite"
        className="mx-auto mt-4 max-w-2xl rounded-2xl border border-gold-400/20 bg-white/[0.03] px-5 py-4 text-center"
      >
        <p className="font-display text-base font-bold text-white">{active.title}</p>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-white/70">{active.text}</p>
      </div>
    </div>
  )
}
