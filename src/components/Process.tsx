import { ArrowRight } from 'lucide-react'
import { process } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Icon } from './ui/Icon'

export function Process() {
  return (
    <section id="wspolpraca" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] opacity-[0.4] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{process.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{process.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative">
              <div className="card h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-ink-950">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/10">{s.n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>

              {/* Strzałka między krokami (desktop) */}
              {i < process.steps.length - 1 && (
                <span className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-gold-400/60 lg:block">
                  <ArrowRight className="h-6 w-6" />
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href="#kontakt" className="btn-primary group">
            Zacznij od bezpłatnej analizy
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
