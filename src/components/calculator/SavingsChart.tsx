import { motion } from 'framer-motion'
import { formatPLN } from '../../lib/format'

type Point = { year: number; value: number }

type SavingsChartProps = {
  data: Point[]
  /** Rok osiągnięcia zwrotu (do oznaczenia na osi). */
  paybackYear: number
}

/**
 * Lekki, responsywny wykres słupkowy skumulowanych oszczędności w czasie (SVG).
 * Bez zewnętrznych bibliotek — animacja słupków przez Framer Motion.
 */
export function SavingsChart({ data, paybackYear }: SavingsChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="w-full">
      <div className="flex items-stretch gap-1.5 sm:gap-2" style={{ height: 180 }}>
        {data.map((d) => {
          const heightPct = Math.max((d.value / max) * 100, 2)
          const isPayback = d.year === paybackYear
          return (
            <div key={d.year} className="group relative flex h-full flex-1 flex-col items-center justify-end">
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-9 z-10 whitespace-nowrap rounded-lg border border-white/15 bg-ink-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-card transition-opacity group-hover:opacity-100">
                Rok {d.year}: {formatPLN(d.value)}
              </div>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: d.year * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-t-md ${
                  isPayback
                    ? 'bg-gradient-to-t from-brand-500 to-brand-300 ring-2 ring-brand-300'
                    : 'bg-gradient-to-t from-gold-600 to-gold-300'
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Oś X — co 5 lat */}
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {data.map((d) => (
          <div key={d.year} className="flex-1 text-center text-[10px] text-white/40">
            {d.year % 5 === 0 || d.year === 1 ? `${d.year}` : ''}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/55">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-gold-600 to-gold-300" />
          Skumulowane oszczędności
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-brand-500 to-brand-300" />
          Rok zwrotu inwestycji (~{paybackYear})
        </span>
      </div>
    </div>
  )
}
