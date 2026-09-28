import { motion } from 'framer-motion'
import { ArrowRight, Calculator as CalcIcon, Sparkles } from 'lucide-react'
import { about, googleReviews, hero, site } from '../data/content'
import { Reveal } from './ui/Reveal'
import { CountUp } from './ui/CountUp'
import { track } from '../lib/analytics'
// Wizualizacja AI (koncepcja A, retusz i eksport: grafiki-ai/hero-koncepcje/retusz-eksport.mjs).
// Obraz 21:9 — dom i magazyn po prawej, lewa część pusta pod tekst.
import heroImg1000 from '../assets/grafiki/hero-dom-1000.webp'
import heroImg1600 from '../assets/grafiki/hero-dom-1600.webp'
import heroImg2400 from '../assets/grafiki/hero-dom-2400.webp'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950 text-white">
      {/* Scena: grafika + tekst. Na telefonie grafika to pas u góry (pod przezroczystą nawigacją),
          od lg — tło całej sceny z tekstem po lewej. */}
      <div className="relative">
        <div className="relative h-[280px] sm:h-[380px] lg:absolute lg:inset-0 lg:h-auto">
          <img
            loading="eager"
            decoding="async"
            // @ts-expect-error „fetchpriority" (małymi literami) to poprawny atrybut HTML — React renderuje go do DOM bez ostrzeżenia
            fetchpriority="high"
            src={heroImg1600}
            srcSet={`${heroImg1000} 1000w, ${heroImg1600} 1600w, ${heroImg2400} 2400w`}
            sizes="(min-width: 1024px) 100vw, 170vw"
            width={2400}
            height={1030}
            alt={hero.image.alt}
            // lg: kadr przesunięty o 30% — przy „left" na ekranach 1280 px magazyn przy garażu wypadał poza kadr
            className="absolute inset-0 h-full w-full object-cover object-[76%_62%] lg:object-[30%_center]"
          />
          {/* Telefon: przyciemnienie pod logo u góry i płynne przejście w tekst na dole */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,24,0.75)_0%,rgba(10,16,24,0)_32%,rgba(10,16,24,0)_62%,#0a1018_100%)] lg:hidden" />
          {/* Komputer: tekst po lewej na ciemnym niebie, u góry pod nawigacją i na dole przejście w statystyki */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,16,24,0.8)_0%,rgba(10,16,24,0.5)_34%,rgba(10,16,24,0)_56%)] lg:block" />
          <div className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-ink-950/70 to-transparent lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-b from-transparent to-ink-950 lg:block" />
        </div>

        {/* Wysokość sceny: 760 px, ale nie więcej niż ekran — na laptopach 720 px pasek zaufania zostaje w pierwszym ekranie */}
        <div className="container-px relative -mt-6 lg:mt-0 lg:flex lg:min-h-[min(760px,100svh)] lg:items-center lg:pb-10 lg:pt-20">
          <div className="max-w-xl lg:max-w-[540px] xl:max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow bg-ink-950/50 max-sm:tracking-[0.14em]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="sm:hidden">{hero.badgeShort}</span>
              <span className="hidden sm:inline">{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:mt-6 sm:text-5xl lg:text-[3rem] xl:text-[3.4rem]"
            >
              {hero.title}{' '}
              <span className="text-gradient">{hero.titleAccent}</span>{' '}
              {hero.titleEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-3 max-w-lg text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center lg:mt-7"
            >
              <a href="#kontakt" onClick={() => track.ctaClick('hero_primary')} className="btn-primary group">
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              {/* Drugi przycisk od sm; na telefonie niżej jako link — w pierwszym ekranie jest jeden cel */}
              <a
                href="#kalkulator"
                onClick={() => track.ctaClick('hero_calculator')}
                className="btn-ghost hidden bg-ink-950/40 sm:inline-flex"
              >
                <CalcIcon className="h-4 w-4" />
                {hero.secondaryCta}
              </a>
            </motion.div>

            {/* Obietnice — od sm, w jednej linii pod przyciskami */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-5 hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 sm:flex lg:mt-4"
            >
              {hero.trust.map((t) => (
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

            {/* Kto oddzwoni i z kim realizowane są instalacje — w pierwszym ekranie także na telefonie */}
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
                  <span className="text-white/70"> — {hero.person.note}</span>
                </p>
                <p className="mt-0.5 text-white/70">
                  {hero.person.company} ·{' '}
                  <span className="whitespace-nowrap font-semibold text-gold-300">
                    ★ {googleReviews.rating} w Google ({googleReviews.count}{' '}opinii)
                  </span>
                </p>
              </div>
            </motion.div>

            <a
              href="#kalkulator"
              onClick={() => track.ctaClick('hero_calculator')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 sm:hidden"
            >
              <CalcIcon className="h-4 w-4" /> {hero.secondaryCta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Statystyki */}
      {/* Reveal (nie motion.div z whileInView): przy ograniczonym ruchu — także w prerenderze — pasek
          od razu jest widoczny. Wcześniej trafiał do HTML z opacity: 0. */}
      <Reveal className="container-px relative mt-12 pb-14 lg:mt-4 lg:pb-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.label} className="bg-ink-900/40 px-6 py-7 text-center">
              {/* text-[1.65rem] na telefonie — przy text-3xl „16 000 zł" nie mieściło się w połowie szerokości */}
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
