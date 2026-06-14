import { Phone } from 'lucide-react'
import { site, googleReviews } from '../data/content'
import { track } from '../lib/analytics'

/** Stały pasek CTA na dole ekranu — tylko mobile. Dowód społeczny + dwie akcje. */
export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 backdrop-blur sm:hidden">
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 pt-1.5 text-[11px] text-white/60">
        <span className="font-semibold text-gold-300">★ {googleReviews.rating} Google (Begolden)</span>
        <span aria-hidden>•</span> oddzwaniam w 1 h
      </p>
      <div className="flex gap-2 px-3 pb-3 pt-1.5">
        <a
          href={site.phoneHref}
          onClick={() => track.ctaClick('mobilebar_call')}
          className="btn-primary flex-1 !py-3 !text-sm"
        >
          <Phone className="h-4 w-4" /> Zadzwoń
        </a>
        <a
          href="#kontakt"
          onClick={() => track.ctaClick('mobilebar_leadform')}
          className="btn-ghost flex-1 !py-3 !text-sm"
        >
          Zostaw numer
        </a>
      </div>
    </div>
  )
}
