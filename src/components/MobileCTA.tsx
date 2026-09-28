import { MessageCircle, Phone, PhoneIncoming, type LucideIcon } from 'lucide-react'
import { site, googleReviews } from '../data/content'
import { track } from '../lib/analytics'

/**
 * Stały pasek CTA na dole ekranu — tylko mobile. Dowód społeczny + telefon, WhatsApp i formularz.
 * Przyciski: jednakowa wysokość 48 px, napis zawsze w jednej linii, szerokość wg treści (flex-auto).
 * Wcześniej oba przyciski miały równą szerokość i duże marginesy — „Zostaw numer" jako pusta ramka
 * wyglądał na puste pole, a na telefonach 360 px napisy łamały się na dwie linie (przyciski 66 px).
 */
type MobileCTAProps = {
  /** Trzeci przycisk (domyślnie „Zostaw numer" → formularz kontaktowy). */
  secondary?: { href: string; label: string; icon: LucideIcon; track: string }
}

export function MobileCTA({
  secondary = { href: '#kontakt', label: 'Zostaw numer', icon: PhoneIncoming, track: 'mobilebar_leadform' },
}: MobileCTAProps = {}) {
  const SecondaryIcon = secondary.icon
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 backdrop-blur sm:hidden">
      <p className="flex items-center justify-center gap-x-1.5 whitespace-nowrap pt-1.5 text-xs text-white/60">
        <span className="font-semibold text-gold-300">★ {googleReviews.rating} Google (Begolden)</span>
        <span aria-hidden>•</span> oddzwaniam w 1 h
      </p>
      <div className="flex gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1.5">
        <a
          href={site.phoneHref}
          onClick={() => track.ctaClick('mobilebar_call')}
          className="btn-primary h-12 flex-auto whitespace-nowrap !px-4 !py-0 !text-sm"
        >
          <Phone className="h-4 w-4 shrink-0" /> Zadzwoń
        </a>
        {/* WhatsApp w pasku zamiast pływającego dymka, który zasłaniał treść */}
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Napisz na WhatsApp"
          onClick={() => track.whatsappClick('mobilebar')}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={secondary.href}
          onClick={() => track.ctaClick(secondary.track)}
          className="btn h-12 flex-auto whitespace-nowrap border border-gold-400/50 bg-gold-400/15 !px-4 !py-0 !text-sm text-gold-100 active:bg-gold-400/25"
        >
          <SecondaryIcon className="h-4 w-4 shrink-0 text-gold-300" /> {secondary.label}
        </a>
      </div>
    </div>
  )
}
