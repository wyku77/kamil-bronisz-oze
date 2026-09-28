import { MessageCircle, Phone } from 'lucide-react'
import { site, googleReviews } from '../data/content'
import { track } from '../lib/analytics'

/** Stały pasek CTA na dole ekranu — tylko mobile. Dowód społeczny + telefon, WhatsApp i formularz. */
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
        {/* WhatsApp w pasku zamiast pływającego dymka, który zasłaniał treść */}
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Napisz na WhatsApp"
          onClick={() => track.whatsappClick('mobilebar')}
          className="grid w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
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
