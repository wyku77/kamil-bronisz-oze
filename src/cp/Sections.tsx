import { AlertTriangle, ArrowRight, Check, Hourglass, Info, Lightbulb } from 'lucide-react'
import { cpFinancing, cpHero, cpLevels, cpProcess, cpSources } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand, SectionHead, rich } from './ui'

/** Co możesz sfinansować (#finansowanie) — z opisem programu przeniesionym z pierwszego ekranu. */
export function Financing() {
  return (
    <section id="finansowanie" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-60" />
      <div className="container-px relative">
        <SectionHead eyebrow={cpFinancing.eyebrow} title={cpFinancing.title} top>
          <p className="text-base sm:text-lg">{rich(cpHero.programText, 'font-semibold text-white/90')}</p>
        </SectionHead>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cpFinancing.items.map((b, i) => (
            <Reveal as="article" key={b.title} delay={i * 0.05} className="card card-hover group flex gap-4 p-5 sm:p-7">
              <img
                loading="lazy"
                decoding="async"
                src={b.img}
                width={60}
                height={60}
                alt=""
                className="-ml-1 -mt-1 h-14 w-14 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
              />
              <div>
                <h3 className="font-display text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 flex items-start gap-2 text-sm text-white/60">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
          {cpFinancing.lead}
        </Reveal>
      </div>
    </section>
  )
}

/** Na co wymienić stary piec? (#zrodla) */
export function Sources() {
  return (
    <section id="zrodla" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] opacity-[0.4] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-px relative">
        <SectionHead eyebrow={cpSources.eyebrow} title={cpSources.title}>
          {cpSources.lead}
        </SectionHead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cpSources.items.map((s, i) => (
            <Reveal as="article" key={s.title} delay={i * 0.06} className="card card-hover flex flex-col overflow-hidden">
              {/* Telefon: ilustracja obok nazwy (karta o ok. 1/3 niższa); od md ilustracja nad treścią */}
              <div className="flex items-center gap-4 p-5 pb-0 md:block md:p-0">
                <div className="relative h-24 w-24 shrink-0 rounded-2xl bg-[radial-gradient(60%_70%_at_50%_60%,rgba(212,160,23,0.16),transparent_70%)] md:h-56 md:w-auto md:rounded-none">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={s.img}
                    width={480}
                    height={573}
                    alt={s.alt}
                    className="h-full w-full object-contain py-1.5 drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)] md:py-4"
                  />
                </div>
                <div className="md:px-6 md:pt-4">
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gold-300">{s.for}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-0 md:p-6 md:pt-0">
                <ul className="mt-4 space-y-2 text-[15px] text-white/75">
                  {s.plus.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {p}
                    </li>
                  ))}
                  {s.warn.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-white/60">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/90" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[15px] leading-relaxed text-white/70">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
          {cpSources.note}
        </Reveal>

        <CtaBand {...cpSources.band} label="cp_zrodla_band" whatsapp />
      </div>
    </section>
  )
}

/** Trzy poziomy dofinansowania (#poziomy) + nabór i terminy. */
export function Levels() {
  return (
    <section id="poziomy" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container-px relative">
        <SectionHead eyebrow={cpLevels.eyebrow} title={cpLevels.title}>
          {rich(cpLevels.lead, 'font-semibold text-white/90')}
        </SectionHead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cpLevels.items.map((l, i) => {
            const top = i === cpLevels.items.length - 1
            return (
              <Reveal
                as="article"
                key={l.tag}
                delay={i * 0.06}
                className={`card relative flex flex-col p-6 sm:p-7 ${top ? 'border-gold-400/40 bg-gold-400/[0.06]' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/75">
                      {l.tag}
                    </span>
                    <p className="mt-4 font-display text-[2.6rem] font-extrabold leading-none text-gradient sm:text-5xl">{l.amt}</p>
                  </div>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={l.img}
                    width={76}
                    height={76}
                    alt=""
                    className="-mt-2 h-16 w-16 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65">{l.text}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5 text-[15px] leading-relaxed text-white/75">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <p>{rich(cpLevels.note)}</p>
        </Reveal>

        {/* Nabór i terminy (dawniej osobna sekcja) */}
        <Reveal className="mt-10 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-400/15 text-gold-300">
              <Hourglass className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{cpLevels.deadline.title}</h3>
              <p className="mt-2 text-white/60">{cpLevels.deadline.lead}</p>
            </div>
          </div>
          <p className="text-[15px] leading-relaxed text-white/75">{rich(cpLevels.deadline.text)}</p>
        </Reveal>
      </div>
    </section>
  )
}

/** Jak wygląda współpraca — krok po kroku (5 kroków). */
export function CpProcess() {
  return (
    <section id="wspolpraca" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] opacity-[0.4] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container-px relative">
        <SectionHead eyebrow={cpProcess.eyebrow} title={cpProcess.title}>
          {cpProcess.lead}
        </SectionHead>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {cpProcess.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="card relative h-full p-5 sm:p-6">
              <span className="absolute right-5 top-4 font-display text-3xl font-extrabold text-white/10">{i + 1}</span>
              <div className="flex items-start gap-4 lg:block">
                <img
                  loading="lazy"
                  decoding="async"
                  src={s.img}
                  width={54}
                  height={54}
                  alt=""
                  className="-ml-1 h-14 w-14 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]"
                />
                <div className="pr-8 lg:pr-0">
                  <h3 className="font-display text-lg font-bold leading-snug text-white lg:mt-4">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60 lg:mt-2">{s.text}</p>
                </div>
              </div>
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
