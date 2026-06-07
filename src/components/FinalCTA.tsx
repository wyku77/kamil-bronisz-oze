import { ArrowRight, Calculator as CalcIcon } from 'lucide-react'
import { finalCta } from '../data/content'
import { Reveal } from './ui/Reveal'
import { track } from '../lib/analytics'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 sm:py-20">
      <div className="container-px relative">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-gold-400/25 bg-gradient-to-br from-gold-400/15 via-ink-800 to-ink-900 p-8 text-center shadow-glow-gold sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">{finalCta.eyebrow}</span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">{finalCta.lead}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#kontakt" onClick={() => track.ctaClick('final_primary')} className="btn-primary group">
                {finalCta.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#kalkulator" onClick={() => track.ctaClick('final_calculator')} className="btn-ghost">
                <CalcIcon className="h-4 w-4" />
                {finalCta.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
