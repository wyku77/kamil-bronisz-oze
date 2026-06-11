import { motion } from 'framer-motion'
import { ArrowRight, BatteryCharging, Calculator as CalcIcon, Sparkles } from 'lucide-react'
import { hero } from '../data/content'
import { SmartImage } from './ui/SmartImage'
import { CountUp } from './ui/CountUp'
import { track } from '../lib/analytics'
import heroPhoto from '../assets/realizacje/20241212_134324-1.jpg'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950 pb-20 pt-32 text-white sm:pt-36 lg:pb-28">
      {/* Tło: mesh gradient + siatka */}
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

      <div className="container-px relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Lewa kolumna — treść */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {hero.title}{' '}
            <span className="text-gradient">{hero.titleAccent}</span>{' '}
            {hero.titleEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#kontakt" onClick={() => track.ctaClick('hero_primary')} className="btn-primary group">
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#kalkulator" onClick={() => track.ctaClick('hero_calculator')} className="btn-ghost">
              <CalcIcon className="h-4 w-4" />
              {hero.secondaryCta}
            </a>
          </motion.div>

          {/* Pasek zaufania */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60"
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
        </div>

        {/* Prawa kolumna — obraz + pływające karty */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-gold-400/15">
            <SmartImage
              src={heroPhoto}
              alt="Realny montaż inteligentnego magazynu energii — realizacja Kamil Bronisz"
              priority
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          </div>

          {/* Pływająca karta — oszczędności */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-3 bottom-8 w-44 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:-left-6"
          >
            <p className="text-xs font-medium text-white/60">{hero.floating.savingsLabel}</p>
            <p className="mt-1 font-display text-3xl font-bold text-gradient">{hero.floating.savingsValue}</p>
            <p className="mt-1 text-[11px] text-white/65">{hero.floating.savingsNote}</p>
          </motion.div>

          {/* Pływająca karta — magazyn naładowany */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-2 top-8 w-44 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:-right-5"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold-400/20 text-gold-300">
                <BatteryCharging className="h-4 w-4" />
              </span>
              <p className="text-xs font-medium text-white/70">{hero.floating.liveLabel}</p>
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">{hero.floating.liveValue}</p>
            <p className="mt-1 text-[11px] text-gold-300">{hero.floating.liveNote}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Statystyki */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container-px relative mt-16 lg:mt-24"
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.label} className="bg-ink-900/40 px-6 py-7 text-center">
              <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                <CountUp to={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} />
              </p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="container-px relative mt-8 text-center text-xs text-white/60">
        {hero.title} {hero.titleAccent} {hero.titleEnd}
      </div>
    </section>
  )
}
