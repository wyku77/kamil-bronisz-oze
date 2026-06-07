import { useEffect, useState } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { subsidyDeadline } from '../data/content'
import { track } from '../lib/analytics'

function daysLeft(target: string): number {
  const ms = new Date(target).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

/** Pasek FOMO: odliczanie do planowanego naboru dotacji (realny termin). */
export function SubsidyDeadline() {
  const [days, setDays] = useState(() => daysLeft(subsidyDeadline.targetDate))

  useEffect(() => {
    const id = window.setInterval(() => setDays(daysLeft(subsidyDeadline.targetDate)), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="border-y border-gold-400/20 bg-gradient-to-r from-gold-400/12 via-ink-900 to-ink-900">
      <div className="container-px py-3">
        <div className="flex flex-col items-center justify-center gap-2.5 text-center sm:flex-row sm:gap-5 sm:text-left">
          <span className="flex shrink-0 items-center gap-2 text-gold-300">
            <Clock className="h-4 w-4" />
            {days > 0 ? (
              <span className="font-display text-sm font-bold text-white">
                <span className="text-gradient">{days}</span> {subsidyDeadline.unit}
              </span>
            ) : (
              <span className="font-display text-sm font-bold text-white">{subsidyDeadline.passed}</span>
            )}
          </span>
          <p className="text-sm leading-relaxed text-white/70">{subsidyDeadline.text}</p>
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
