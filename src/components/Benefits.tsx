import { benefits } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Icon } from './ui/Icon'

export function Benefits() {
  return (
    <section id="dlaczego-warto" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-70" />

      <div className="container-px relative">
        <Reveal className="section-head-split">
          <div>
            <span className="eyebrow">{benefits.eyebrow}</span>
            <h2 className="mt-5 h-section text-white">{benefits.title}</h2>
          </div>
          <p className="text-lg leading-relaxed text-white/65">{benefits.lead}</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((b, i) => (
            <Reveal as="article" key={b.title} delay={i * 0.06} className="card card-hover group flex gap-4 p-5 sm:block sm:p-7">
              {b.image ? (
                <img
                  loading="lazy"
                  decoding="async"
                  src={b.image}
                  width={72}
                  height={72}
                  alt=""
                  className="-ml-1.5 -mt-1.5 h-14 w-14 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 sm:h-[72px] sm:w-[72px]"
                />
              ) : (
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/20 to-gold-500/10 text-gold-300 ring-1 ring-gold-400/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon name={b.icon} className="h-7 w-7" />
                </span>
              )}
              <div>
                <h3 className="font-display text-lg font-bold text-white sm:mt-5 sm:text-xl">{b.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60 sm:mt-2.5 sm:text-base">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
