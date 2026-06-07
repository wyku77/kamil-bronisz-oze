import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgePercent,
  BatteryCharging,
  Car,
  Clock,
  Download,
  Leaf,
  MessageCircle,
  PiggyBank,
  RefreshCw,
  Sun,
} from 'lucide-react'
import { SUBSIDY_PROGRAM, type CalcInput, type CalcResult } from '../../lib/calc'
import { site } from '../../data/content'
import { CountUp } from '../ui/CountUp'
import { formatPLN, formatNumber } from '../../lib/format'
import { generateWycenaPdf } from '../../lib/pdf'
import { SavingsChart } from './SavingsChart'
import { track } from '../../lib/analytics'

type Props = {
  result: CalcResult
  input: CalcInput
  name: string
  onRecalculate: () => void
}

const ENERGY_INFLATION = 0.05

/** Pierścień postępu (gauge) dla autokonsumpcji. */
function Ring({ value }: { value: number }) {
  const pct = Math.round(value * 100)
  const r = 52
  const c = 2 * Math.PI * r
  const offset = c * (1 - value)
  return (
    <div className="relative grid h-32 w-32 place-items-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="120" y2="120">
            <stop stopColor="#e1bd5b" />
            <stop offset="1" stopColor="#bb8718" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-3xl font-extrabold text-white">
          <CountUp to={pct} suffix="%" />
        </p>
      </div>
    </div>
  )
}

export function Results({ result, input, name, onRecalculate }: Props) {
  const [pdfLoading, setPdfLoading] = useState(false)

  const handlePdf = async () => {
    setPdfLoading(true)
    try {
      await generateWycenaPdf(input, result, name)
      track.ctaClick('pdf_download')
    } catch (err) {
      console.error('[pdf] Nie udało się wygenerować PDF:', err)
    } finally {
      setPdfLoading(false)
    }
  }

  const series = Array.from({ length: 20 }, (_, i) => {
    const year = i + 1
    const value =
      result.annualSavings * ((Math.pow(1 + ENERGY_INFLATION, year) - 1) / ENERGY_INFLATION)
    return { year, value: Math.round(value) }
  })
  const paybackYear = Math.max(1, Math.round(result.paybackYears))

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="eyebrow">Twoja spersonalizowana analiza</span>
          <p className="mt-3 text-white/60">
            System obniży Twój rachunek o około{' '}
            <span className="font-bold text-gold-300">{Math.round(result.billReduction * 100)}%</span>. Oto szczegóły.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href="#kontakt"
            onClick={() => track.ctaClick('results_book_top')}
            className="btn-primary group !py-2.5 !text-sm"
          >
            Zarezerwuj 15-min rozmowę
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={onRecalculate}
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/35 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" /> Przelicz ponownie
          </button>
        </div>
      </div>

      {/* Główne metryki */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/10 blur-2xl" />
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <PiggyBank className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-white/70">Roczne oszczędności</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-gradient">
            <CountUp to={result.annualSavings} suffix=" zł" />
          </p>
        </div>

        <div className="card relative overflow-hidden p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
            <Clock className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-white/70">Zwrot po dofinansowaniu</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">
            <CountUp to={result.paybackYears} decimals={1} suffix=" lat" />
          </p>
          <p className="mt-1 text-xs text-emerald-300/80">z dotacją na magazyn energii</p>
        </div>

        <div className="card relative overflow-hidden p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <Leaf className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-white/70">Redukcja CO₂ rocznie</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-white">
            <CountUp to={result.co2PerYear} suffix=" kg" />
          </p>
          <p className="mt-1 text-xs text-white/60">
            ~{formatNumber(Math.round(result.co2Over20y / 1000))} ton w 20 lat
          </p>
        </div>
      </div>

      {/* Komunikat dla posiadaczy EV / hybrydy plug-in */}
      {result.ev && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 sm:p-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
            <Car className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-white/75">
            <span className="font-semibold text-emerald-200">Masz samochód elektryczny lub hybrydę plug-in?</span>{' '}
            Ładując auto w najtańszych godzinach taryfy dynamicznej, zwrot z inwestycji jest jeszcze szybszy — „tankujesz"
            energię po najniższych stawkach, a system zarządzania energią (HEMS) robi to za Ciebie automatycznie.
          </p>
        </div>
      )}

      {/* Rekomendacja systemu */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card flex items-center gap-4 p-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <Sun className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-white/70">Rekomendowana moc PV</p>
            <p className="font-display text-2xl font-bold text-white">
              <CountUp to={result.pvPowerKwp} decimals={1} suffix=" kWp" />
            </p>
          </div>
        </div>

        <div className="card flex items-center gap-4 p-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <BatteryCharging className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-white/70">Sugerowany magazyn</p>
            <p className="font-display text-2xl font-bold text-white">
              <CountUp to={result.storageKwh} suffix=" kWh" />
            </p>
          </div>
        </div>

        <div className="card flex items-center justify-between gap-2 p-6">
          <div>
            <p className="text-sm text-white/70">Autokonsumpcja</p>
            <p className="text-xs text-white/60">udział własnej energii</p>
          </div>
          <Ring value={result.selfConsumption} />
        </div>
      </div>

      {/* Projekcja długoterminowa + wykres */}
      <div className="card p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h4 className="font-display text-lg font-bold text-white">Twoje oszczędności w czasie</h4>
            <p className="mt-1.5 text-sm text-white/70">
              Skumulowane oszczędności z uwzględnieniem wzrostu cen energii (~5%/rok).
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/65">W ciągu 10 lat</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-gradient">
                  <CountUp to={result.savings10y} suffix=" zł" />
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/65">W ciągu 20 lat</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-gradient">
                  <CountUp to={result.savings20y} suffix=" zł" />
                </p>
              </div>
            </div>
          </div>
          <SavingsChart data={series} paybackYear={paybackYear} />
        </div>
      </div>

      {/* Podsumowanie inwestycji */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card flex items-center gap-4 p-6">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <BadgePercent className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-white/70">Dofinansowanie</p>
            <p className="font-display text-2xl font-bold text-emerald-300">{formatPLN(result.subsidy)}</p>
            <p className="mt-0.5 text-xs text-white/60">program „{SUBSIDY_PROGRAM}"</p>
          </div>
        </div>
        <div className="card flex flex-col justify-center p-6">
          <p className="text-sm text-white/70">Roczna produkcja energii</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">
            {formatNumber(result.pvProduction)} kWh
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-400/15 via-ink-800 to-ink-900 p-6 text-center sm:p-8">
        <h4 className="font-display text-xl font-bold text-white sm:text-2xl">
          Następny krok: zarezerwuj bezpłatną 15-min rozmowę
        </h4>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/65">
          To wynik orientacyjny. Na 15-minutowej rozmowie przejdę z Tobą przez dobór systemu, ofertę i czas zwrotu —
          w dogodnej dla Ciebie porze, bez zobowiązań.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#kontakt" onClick={() => track.ctaClick('results_book')} className="btn-primary group">
            Zarezerwuj 15-min rozmowę
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={handlePdf}
            disabled={pdfLoading}
            className="btn-ghost disabled:opacity-60"
          >
            <Download className="h-4 w-4" /> {pdfLoading ? 'Generuję PDF…' : 'Pobierz PDF z wyceną'}
          </button>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.ctaClick('results_whatsapp')}
            className="btn-outline"
          >
            <MessageCircle className="h-4 w-4" /> Zapytaj na WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
