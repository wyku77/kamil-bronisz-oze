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
 *  - brak daty (znany tylko kwartał) → stała plakietka `badge` + `text`, bez licznika,
 *  - data w przyszłości → odliczanie dni + `text`,
 *  - data minęła → `passed` + `textStarted` (nabór trwa do wyczerpania środków).
 */
export function SubsidyDeadline() {
  const target = subsidyDeadline.targetDate
  const [days, setDays] = useState<number | null>(() => (target ? daysLeft(target) : null))

  useEffect(() => {
    if (!target) return
    const id = window.setInterval(() => setDays(daysLeft(target)), 60_000)
    return () => window.clearInterval(id)
  }, [target])

  const started = days !== null && days <= 0

  return (
    <div className="border-y border-gold-400/20 bg-gradient-to-r from-gold-400/10 via-ink-900 to-ink-900">
      <div className="container-px py-3">
        <div className="flex flex-col items-center justify-center gap-2.5 text-center sm:flex-row sm:gap-5 sm:text-left">
          <span className="flex shrink-0 items-center gap-2 text-gold-300">
            <Clock className="h-4 w-4" />
            <span className="font-display text-sm font-bold text-white">
              {days === null ? (
                <span className="text-gradient">{subsidyDeadline.badge}</span>
              ) : started ? (
                subsidyDeadline.passed
              ) : (
                <>
                  <span className="text-gradient">{days}</span>{' '}
                  {days === 1 ? subsidyDeadline.unitOne : subsidyDeadline.unitMany}
                </>
              )}
            </span>
          </span>
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
