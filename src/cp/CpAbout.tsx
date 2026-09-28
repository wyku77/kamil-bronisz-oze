import { useState } from 'react'
import { CheckCircle2, ChevronDown, MessageCircle, Phone } from 'lucide-react'
import { about, site } from '../data/content'
import { cpAbout } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { rich } from './ui'

/** Kto Ci pomoże — układ jak sekcja „O mnie" na stronie głównej + „Dlaczego ja" w kartach pod spodem. */
export function CpAbout() {
  // Na telefonie widać pierwszy akapit, resztę po „Czytaj więcej" (jak na stronie głównej)
  const [more, setMore] = useState(false)
  return (
    <section id="o-mnie" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="relative mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-gold-400/20">
              <SmartImage
                src={about.photo}
                alt={`${about.name} — ${about.role}`}
                className="h-[300px] w-full object-cover object-top sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-2xl font-bold text-white">{about.name}</p>
                <p className="text-sm text-gold-300">{cpAbout.role}</p>
              </div>
            </div>
            {/* Bez plakietki na zdjęciu — zasłaniała twarz (prośba Kamila) */}
          </Reveal>

          <Reveal direction="left">
            <span className="eyebrow">{cpAbout.eyebrow}</span>
            <h2 className="mt-5 h-section text-white">
              Poprowadzę Cię przez <span className="text-gradient">Czyste Powietrze</span> od A do Z
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-white/70">
              {cpAbout.paragraphs.map((p, i) => (
                <p key={p} className={i > 0 && !more ? 'hidden sm:block' : ''}>
                  {rich(p)}
                </p>
              ))}
            </div>
            {!more && (
              <button
                type="button"
                onClick={() => setMore(true)}
                aria-expanded={more}
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-300 sm:hidden"
              >
                Czytaj więcej <ChevronDown className="h-4 w-4" />
              </button>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn-primary !py-2.5 !text-sm">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !py-2.5 !text-sm"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/65">
              <CheckCircle2 className="h-4 w-4 text-gold-300" />
              {cpAbout.proof}
            </p>
          </Reveal>
        </div>

        {/* Dlaczego ja (dawniej osobna sekcja) */}
        <Reveal className="mt-16 max-w-3xl">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{cpAbout.why.title}</h3>
          <p className="mt-3 text-lg text-white/65">{cpAbout.why.lead}</p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cpAbout.why.items.map((w, i) => (
            <Reveal as="article" key={w.title} delay={i * 0.06} className="card card-hover flex gap-4 p-5 sm:block sm:p-6">
              <img
                loading="lazy"
                decoding="async"
                src={w.img}
                width={50}
                height={50}
                alt=""
                className="h-12 w-12 shrink-0 drop-shadow-[0_10px_16px_rgba(0,0,0,0.45)]"
              />
              <div>
                <h4 className="font-display text-lg font-bold leading-snug text-white sm:mt-4">{w.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{rich(w.text, 'font-semibold text-white/85')}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
