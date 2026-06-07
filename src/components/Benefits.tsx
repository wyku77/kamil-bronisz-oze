import { benefits } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Icon } from './ui/Icon'

export function Benefits() {
  return (
    <section id="dlaczego-warto" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-70" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{benefits.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{benefits.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{benefits.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((b, i) => (
            <Reveal as="article" key={b.title} delay={i * 0.06} className="card card-hover group p-7">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/20 to-gold-500/10 text-gold-300 ring-1 ring-gold-400/20 transition-transform duration-300 group-hover:scale-105">
                <Icon name={b.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{b.title}</h3>
              <p className="mt-2.5 leading-relaxed text-white/60">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
