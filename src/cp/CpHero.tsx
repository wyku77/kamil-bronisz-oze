import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Phone } from 'lucide-react'
import { about, googleReviews, site } from '../data/content'
import { cpHero } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { CountUp } from '../components/ui/CountUp'
import { track } from '../lib/analytics'

/**
 * Sekcja otwierająca Czystego Powietrza — ten sam układ co na stronie głównej (scena ze zdjęciem,
 * jeden złoty przycisk, pasek „kto oddzwoni", statystyki pod spodem).
 * Zdjęcie to PRAWDZIWA realizacja (dom z zielonym dachem, r6) — tylko kadr i skalowanie, bez AI.
 * Telefon: zdjęcie jako pas u góry pod przezroczystą nawigacją. Komputer: zdjęcie w prawej części
 * sceny, wtopione w tło, tekst po lewej na ciemnym tle.
 */
export function CpHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950 text-white">
      <div className="relative">
        <div className="relative h-[280px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%] xl:w-[56%]">
          <img
            loading="eager"
            decoding="async"
            // @ts-expect-error „fetchpriority" (małymi literami) to poprawny atrybut HTML — React renderuje go do DOM bez ostrzeżenia
            fetchpriority="high"
            src={cpHero.image.src}
            srcSet={cpHero.image.srcSet}
            sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 54vw, 100vw"
            width={2000}
            height={1500}
            alt={cpHero.image.alt}
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
          />
          {/* Telefon: przyciemnienie pod logo u góry i płynne przejście w tekst na dole */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.7)_0%,rgba(7,11,18,0)_30%,rgba(7,11,18,0)_60%,#070b12_100%)] lg:hidden" />
          {/* Komputer: zdjęcie wtapia się w tło z lewej, u góry pod nawigacją i na dole w statystyki */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#070b12_0%,rgba(7,11,18,0.55)_16%,rgba(7,11,18,0)_42%)] lg:block" />
          <div className="absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-ink-950/80 to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-b from-transparent to-ink-950 lg:block" />

          {/* Ten sam dom przed pracami — dowód, że to prawdziwa realizacja */}
          <a
            href="#realizacje"
            onClick={() => track.ctaClick('cp_hero_przed_po')}
            className="group absolute bottom-10 right-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-ink-950/70 p-1.5 shadow-card backdrop-blur-md sm:right-6 lg:bottom-24 lg:right-8 lg:p-2 lg:pr-4"
          >
            <span className="relative block overflow-hidden rounded-xl">
              <img
                loading="eager"
                decoding="async"
                src={cpHero.before.src}
                srcSet={cpHero.before.srcSet}
                sizes="(min-width: 1024px) 128px, 80px"
                width={240}
                height={180}
                alt={cpHero.before.alt}
                className="h-[60px] w-20 object-cover lg:h-24 lg:w-32"
              />
              <span className="absolute left-1 top-1 rounded-md bg-ink-950/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Przed
              </span>
            </span>
            <span className="hidden text-sm leading-snug lg:block">
              <span className="block font-semibold text-white">Prawdziwa realizacja</span>
              <span className="block text-white/65">ten sam dom przed i po</span>
              <span className="mt-1 inline-flex items-center gap-1 font-semibold text-gold-300">
                Zobacz realizacje <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </a>
        </div>

        {/* Wysokość sceny: 760 px, ale nie więcej niż ekran — pasek zaufania zostaje w pierwszym ekranie */}
        <div className="container-px relative -mt-6 lg:mt-0 lg:flex lg:min-h-[min(760px,100svh)] lg:items-center lg:pb-12 lg:pt-24">
          <div className="max-w-xl lg:max-w-[46%] xl:max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow bg-ink-950/50 max-sm:tracking-[0.14em]"
            >
              <Leaf className="h-3.5 w-3.5" />
              {/* krótka etykieta na telefonie i w wąskiej kolumnie 1024–1279 px (pełna łamała się na dwie linie) */}
              <span className="sm:hidden lg:inline xl:hidden">{cpHero.badgeShort}</span>
              <span className="hidden sm:inline lg:hidden xl:inline">{cpHero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:mt-6 sm:text-[2.6rem] lg:text-[2.4rem] xl:text-[2.75rem]"
            >
              {cpHero.title} <span className="text-gradient">{cpHero.titleAccent}</span> {cpHero.titleEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-3 max-w-lg text-base leading-relaxed text-white/75 sm:mt-5 sm:text-lg"
            >
              {cpHero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center"
            >
              <a href="#kwalifikacja" onClick={() => track.ctaClick('cp_hero_primary')} className="btn-primary group whitespace-nowrap">
                {cpHero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              {/* Drugi przycisk od sm; na telefonie „Zadzwoń" jest w pasku na dole ekranu */}
              <a
                href={site.phoneHref}
                onClick={() => track.ctaClick('cp_hero_phone')}
                className="btn-ghost hidden whitespace-nowrap bg-ink-950/40 sm:inline-flex"
              >
                <Phone className="h-4 w-4" />
                Zadzwoń<span className="lg:hidden xl:inline">: {site.phone}</span>
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-5 hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 sm:flex lg:mt-4 lg:hidden xl:flex"
            >
              {cpHero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-gold-400/20 text-gold-300">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* Kto oddzwoni i z kim realizowane są prace — w pierwszym ekranie także na telefonie */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/60 p-2.5 pr-4 backdrop-blur-md sm:mt-6 sm:gap-3.5 sm:p-3 lg:mt-5"
            >
              <img
                loading="eager"
                decoding="async"
                src={about.photo}
                width={52}
                height={52}
                alt={site.name}
                className="h-11 w-11 shrink-0 rounded-xl object-cover object-top ring-1 ring-gold-400/30 sm:h-[52px] sm:w-[52px]"
              />
              <div className="text-[13px] leading-snug sm:text-sm">
                <p className="text-white">
                  <span className="font-semibold">{site.name}</span>
                  <span className="text-white/70"> — {cpHero.person.note}</span>
                </p>
                <p className="mt-0.5 text-white/70">
                  {cpHero.person.company} ·{' '}
                  <span className="whitespace-nowrap font-semibold text-gold-300">
                    ★ {googleReviews.rating} w Google ({googleReviews.count}{' '}opinii)
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statystyki */}
      {/* Reveal (nie motion.div z whileInView): przy ograniczonym ruchu — także w prerenderze — pasek
          od razu jest widoczny. Wcześniej trafiał do HTML z opacity: 0. */}
      <Reveal className="container-px relative mt-10 pb-12 lg:mt-2 lg:pb-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4">
          {cpHero.stats.map((s) => (
            <div key={s.label} className="bg-ink-900/40 px-5 py-6 text-center sm:px-6 sm:py-7">
              <p className="whitespace-nowrap font-display text-[1.65rem] font-bold text-gradient sm:text-4xl">
                <CountUp to={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} />
              </p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
