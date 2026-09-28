import { useEffect, useState } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { subsidyDeadline } from '../data/content'
import { track } from '../lib/analytics'

function daysLeft(target: string): number {
  const ms = new Date(target).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

/**
 * Pasek FOMO naboru dotacji. Trzy stany zależne od `subsidyDeadline.targetDate`:
 *  - brak daty (termin niepewny) → stała plakietka `badge` + `text`, bez licznika,
 *  - data w przyszłości → licznik dni w kafelkach + `text`,
 *  - data minęła → `passed` + `textStarted` (nabór trwa do wyczerpania środków).
 * Strona jest prerenderowana, więc w HTML zapisuje się liczba dni z chwili builda —
 * main.tsx renderuje wszystko od nowa (createRoot), więc odwiedzający widzi aktualną.
 */
export function SubsidyDeadline() {
  const target = subsidyDeadline.targetDate
  const [days, setDays] = useState<number | null>(() => (target ? daysLeft(target) : null))

  useEffect(() => {
    if (!target) return
    setDays(daysLeft(target))
    const id = window.setInterval(() => setDays(daysLeft(target)), 60_000)
    return () => window.clearInterval(id)
  }, [target])

  const started = days !== null && days <= 0
  const counting = days !== null && !started
  const unit = days === 1 ? subsidyDeadline.unitOne : subsidyDeadline.unitMany

  return (
    <div className="border-y border-gold-400/20 bg-gradient-to-r from-gold-400/10 via-ink-900 to-ink-900">
      <div className="container-px py-3.5">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left">
          {counting ? (
            <div className="flex shrink-0 items-center gap-3">
              {/* Cyfry w kafelkach tylko wizualnie; czytnik ekranu dostaje pełne zdanie poniżej */}
              <div className="flex gap-1" aria-hidden="true">
                {String(days).padStart(2, '0')
                  .split('')
                  .map((d, i) => (
                    <span
                      key={i}
                      className="grid h-11 w-9 place-items-center rounded-lg border border-gold-400/35 bg-ink-950 font-display text-2xl font-extrabold tabular-nums text-gold-300 shadow-[inset_0_-10px_14px_rgba(0,0,0,0.35)]"
                    >
                      {d}
                    </span>
                  ))}
              </div>
              <div className="text-left leading-tight" aria-hidden="true">
                <p className="font-display text-sm font-bold text-white">{unit}</p>
                <p className="mt-0.5 text-xs text-white/60">start: {subsidyDeadline.dateLabel}</p>
              </div>
              <span className="sr-only">
                {days} {unit} — {subsidyDeadline.dateLabel}
              </span>
            </div>
          ) : (
            <span className="flex shrink-0 items-center gap-2 text-gold-300">
              <Clock className="h-4 w-4" />
              <span className="font-display text-sm font-bold text-white">
                {started ? subsidyDeadline.passed : <span className="text-gradient">{subsidyDeadline.badge}</span>}
              </span>
            </span>
          )}
          <p className="text-sm leading-relaxed text-white/70">
            {started ? subsidyDeadline.textStarted : subsidyDeadline.text}
          </p>
          <a
            href="#kontakt"
            onClick={() => track.ctaClick('subsidy_deadline')}
            className="btn-primary shrink-0 !py-2 !text-xs sm:ml-auto"
          >
            {subsidyDeadline.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
