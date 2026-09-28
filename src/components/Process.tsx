import { ArrowRight } from 'lucide-react'
import { process } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Icon } from './ui/Icon'

export function Process() {
  return (
    <section id="wspolpraca" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] opacity-[0.4] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-px relative">
        <Reveal className="section-head-split">
          <div>
            <span className="eyebrow">{process.eyebrow}</span>
            <h2 className="mt-5 h-section text-white">{process.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-white/65">{process.lead}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative">
              {/* Na telefonie ikona obok tekstu, a numer w rogu — karta o ok. 1/3 niższa. Od sm jak dotąd. */}
              <div className="card relative h-full p-5 sm:p-7">
                <span className="absolute right-5 top-4 font-display text-3xl font-extrabold text-white/10 sm:hidden">
                  {s.n}
                </span>
                <div className="flex items-start gap-4 sm:block">
                <div className="flex shrink-0 items-center justify-between">
                  {s.image ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      src={s.image}
                      width={64}
                      height={64}
                      alt=""
                      className="-ml-1.5 -my-1.5 h-14 w-14 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] sm:h-16 sm:w-16"
                    />
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-ink-950">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                  )}
                  <span className="hidden font-display text-4xl font-extrabold text-white/10 sm:inline">{s.n}</span>
                </div>
                <div className="pr-8 sm:pr-0">
                  <h3 className="font-display text-lg font-bold text-white sm:mt-5">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:mt-2.5">{s.text}</p>
                </div>
                </div>
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

        <Reveal className="mt-10 text-center">
          <a href="#kontakt" className="btn-primary group">
            Zacznij od bezpłatnej analizy
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
