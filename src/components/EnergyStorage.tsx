import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BadgePercent, Plus, Zap } from 'lucide-react'
import { energyStorage } from '../data/content'
import { Reveal } from './ui/Reveal'
import { track } from '../lib/analytics'

// Reprezentatywna dobowa krzywa cen energii (zł/kWh) — ilustracja taryfy dynamicznej.
const PRICES = [
  0.45, 0.4, 0.38, 0.37, 0.4, 0.5, 0.7, 0.95, 0.9, 0.75, 0.6, 0.5, 0.42, 0.4, 0.45, 0.55, 0.78, 1.05,
  1.2, 1.1, 0.95, 0.8, 0.65, 0.55,
]
const CHARGE_MAX = 0.45
const DISCHARGE_MIN = 0.95
const MAXP = Math.max(...PRICES)

function TariffChart() {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-400/15 text-gold-300">
          <Zap className="h-4 w-4" />
        </span>
        <div>
          <p className="font-display text-sm font-bold text-white">{energyStorage.tariff.title}</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/55">{energyStorage.tariff.lead}</p>

      <div className="mt-5 flex items-end gap-[3px]" style={{ height: 150 }}>
        {PRICES.map((p, h) => {
          const charge = p <= CHARGE_MAX
          const discharge = p >= DISCHARGE_MIN
          const color = charge
            ? 'bg-emerald-400/80'
            : discharge
              ? 'bg-gradient-to-t from-gold-500 to-gold-300'
              : 'bg-white/15'
          return (
            <div key={h} className="flex h-full flex-1 flex-col justify-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(p / MAXP) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: h * 0.02, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-t-sm ${color}`}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/40">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/65">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-emerald-400/80" /> {energyStorage.tariff.chargeLabel}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-gradient-to-t from-gold-500 to-gold-300" />{' '}
          {energyStorage.tariff.dischargeLabel}
        </span>
      </div>
    </div>
  )
}

export function EnergyStorage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="magazyny-energii" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{energyStorage.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{energyStorage.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{energyStorage.lead}</p>
        </Reveal>

        {/* Mini-case: konkretne liczby + awersja do straty */}
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-3xl border border-gold-400/20 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="eyebrow">{energyStorage.miniCase.badge}</span>
              <p className="font-display text-sm font-semibold text-white/80">{energyStorage.miniCase.title}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-gold-200">Co miesiąc tracisz:</span> {energyStorage.miniCase.loss}
            </p>
            <div className="mt-6 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
                <p className="text-xs text-white/55">{energyStorage.miniCase.before.label}</p>
                <p className="mt-3 font-display text-3xl font-bold text-white/70">{energyStorage.miniCase.before.self}</p>
                <p className="text-[11px] text-white/50">{energyStorage.miniCase.before.selfLabel}</p>
                <p className="mt-3 font-display text-xl font-bold text-white/70">{energyStorage.miniCase.before.bill}</p>
                <p className="text-[11px] text-white/50">{energyStorage.miniCase.before.billLabel}</p>
              </div>
              <div className="grid place-items-center text-gold-300">
                <ArrowRight className="hidden h-6 w-6 sm:block" />
                <ArrowRight className="h-6 w-6 rotate-90 sm:hidden" />
              </div>
              <div className="rounded-2xl border border-gold-400/30 bg-gold-400/10 p-5 text-center">
                <p className="text-xs text-gold-200/90">{energyStorage.miniCase.after.label}</p>
                <p className="mt-3 font-display text-3xl font-extrabold text-gradient">{energyStorage.miniCase.after.self}</p>
                <p className="text-[11px] text-white/60">{energyStorage.miniCase.after.selfLabel}</p>
                <p className="mt-3 font-display text-xl font-extrabold text-gradient">{energyStorage.miniCase.after.bill}</p>
                <p className="text-[11px] text-white/60">{energyStorage.miniCase.after.billLabel}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Obiekcje (akordeon) */}
          <Reveal direction="right" className="space-y-3">
            {energyStorage.objections.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen ? 'border-gold-400/30 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm font-semibold text-white sm:text-base">{item.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-gold-400 bg-gold-400 text-ink-950' : 'border-white/20 text-white/70'
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-4 text-sm leading-relaxed text-white/65">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </Reveal>

          {/* Prawa kolumna: wykres taryfy + dotacja */}
          <Reveal direction="left" className="space-y-6">
            <TariffChart />

            <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-400/15 via-ink-800 to-ink-900 p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-400/20 blur-2xl" />
              <span className="eyebrow">
                <BadgePercent className="h-3.5 w-3.5" /> {energyStorage.subsidy.badge}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{energyStorage.subsidy.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{energyStorage.subsidy.text}</p>
              <p className="mt-3 text-sm leading-relaxed text-gold-300/90">{energyStorage.subsidy.note}</p>
              <a
                href="#kontakt"
                onClick={() => track.ctaClick('storage_subsidy')}
                className="btn-primary group mt-5 w-full sm:w-auto"
              >
                {energyStorage.subsidy.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
