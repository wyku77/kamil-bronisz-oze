import type { ReactNode } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { googleReviews, site } from '../data/content'
import { GoogleG, Stars } from '../components/Testimonials'
import { Reveal } from '../components/ui/Reveal'
import { track } from '../lib/analytics'

/** Tekst z markerami **pogrubienia**. */
export function rich(text: string, boldClass = 'font-semibold text-white') {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className={boldClass}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

/** Nagłówek sekcji jak na stronie głównej: etykieta + tytuł po lewej, opis po prawej (od lg). */
export function SectionHead({
  eyebrow,
  title,
  children,
  top = false,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  /** Wyrównanie do góry — gdy opis po prawej jest dłuższy niż tytuł. */
  top?: boolean
}) {
  return (
    <Reveal className={`section-head-split ${top ? 'lg:items-start' : ''}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-5 h-section text-white">{title}</h2>
      </div>
      {children && <div className="text-lg leading-relaxed text-white/65">{children}</div>}
    </Reveal>
  )
}

/** Karta z oceną Google (firma Begolden) — ten sam wzór co w sekcji opinii na stronie głównej. */
export function GoogleRating({ note, label }: { note: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 sm:px-6">
      <div className="flex items-center gap-4">
        <GoogleG />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-white">{googleReviews.rating}</span>
            <Stars rating={5} />
          </div>
          <p className="text-xs text-white/70">
            <span className="font-semibold text-white/80">{googleReviews.count}</span> {googleReviews.note}
          </p>
        </div>
        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.ctaClick(label)}
          className="btn-outline ml-auto hidden shrink-0 !py-2.5 !text-sm sm:inline-flex"
        >
          {googleReviews.cta}
        </a>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/60">{note}</p>
      <a
        href={googleReviews.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track.ctaClick(label)}
        className="btn-outline mt-3 w-full !py-2.5 !text-sm sm:hidden"
      >
        {googleReviews.cta}
      </a>
    </div>
  )
}

/** Pasek CTA wewnątrz sekcji: tekst + „Sprawdź dotację" (+ opcjonalnie WhatsApp). */
export function CtaBand({
  title,
  text,
  button,
  label,
  whatsapp = false,
}: {
  title: string
  text: string
  button: string
  label: string
  whatsapp?: boolean
}) {
  return (
    <Reveal className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gold-400/20 bg-gradient-to-r from-gold-400/10 via-white/[0.03] to-transparent px-6 py-6 text-center md:flex-row md:text-left">
      <div>
        <p className="font-display text-lg font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
      </div>
      <div className="flex shrink-0 flex-wrap justify-center gap-3">
        <a href="#kwalifikacja" onClick={() => track.ctaClick(label)} className="btn-primary group">
          {button}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        {whatsapp && (
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex bg-[#25D366] text-white hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        )}
      </div>
    </Reveal>
  )
}
