import { MapPin } from 'lucide-react'
import { serviceArea } from '../data/content'
import { Reveal } from './ui/Reveal'

/** Sekcja „Obszar działania" — lokalne sygnały SEO (woj. lubelskie + miasta). */
export function ServiceArea() {
  return (
    <section id="obszar-dzialania" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <MapPin className="h-3.5 w-3.5" /> {serviceArea.eyebrow}
          </span>
          <h2 className="mt-5 h-section text-white">{serviceArea.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{serviceArea.lead}</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {serviceArea.cities.map((city) => (
            <span
              key={city}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/85"
            >
              <MapPin className="h-4 w-4 shrink-0 text-gold-400" />
              {city}
            </span>
          ))}
        </Reveal>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-white/55">{serviceArea.note}</p>
      </div>
    </section>
  )
}
