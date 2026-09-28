import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, ShieldCheck, Star } from 'lucide-react'
import { testimonials, googleReviews } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SmartImage } from './ui/SmartImage'
import { track } from '../lib/analytics'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} na 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-gold-400 text-gold-400' : 'text-white/20'}`}
        />
      ))}
    </div>
  )
}

/** Logo Google (4-kolorowe „G"). */
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

export function Testimonials() {
  // Karuzela na wszystkich szerokościach: telefon ~1 karta, md 2, lg 3 naraz.
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [perView, setPerView] = useState(1)
  const krok = () => {
    const el = scrollerRef.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16
    return { el, step: card.offsetWidth + gap, gap }
  }
  const measure = () => {
    const k = krok()
    if (!k) return
    setPerView(Math.max(1, Math.round((k.el.clientWidth + k.gap) / k.step)))
    setActive(Math.round(k.el.scrollLeft / k.step))
  }
  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const pozycje = Math.max(1, testimonials.items.length - perView + 1)
  const idzDo = (i: number) => {
    const k = krok()
    if (!k) return
    k.el.scrollTo({ left: Math.max(0, Math.min(pozycje - 1, i)) * k.step, behavior: 'smooth' })
  }
  const aktywna = Math.min(active, pozycje - 1)

  return (
    <section id="opinie" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-50" />

      <div className="container-px relative">
        <div className="section-head-split">
        <Reveal>
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{testimonials.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{testimonials.lead}</p>
        </Reveal>

        <div>
        {/* Pasek zaufania — opinie Google */}
        <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 sm:flex-row sm:gap-5">
          <GoogleG />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="font-display text-2xl font-bold text-white">{googleReviews.rating}</span>
              <Stars rating={5} />
            </div>
            <p className="text-xs text-white/70">
              <span className="font-semibold text-white/80">{googleReviews.count}</span> {googleReviews.note}
            </p>
            <p className="mt-0.5 text-xs text-white/60">{googleReviews.attribution}</p>
          </div>
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.ctaClick('google_reviews')}
            className="btn-outline !py-2.5 !text-sm sm:ml-auto"
          >
            {googleReviews.cta}
          </a>
        </Reveal>

        {/* Lokalny dowód społeczny (statyczny, prawdziwy) */}
        <Reveal className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-white/70 lg:justify-start">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-300" />
          {googleReviews.local}
        </Reveal>
        </div>
        </div>

        {/* Karuzela: na telefonie kolejna karta wystaje (widać, że jest więcej), od md 2 karty, od lg 3
            naraz ze strzałkami — wcześniej na komputerze siatka 2×3 zajmowała ok. 2 ekrany.
            Karty bez własnego Reveal: przy przesuwaniu w bok animacja wejścia zostawiała pustą,
            wystającą kartę, dopóki nie wjechała cała. */}
        <Reveal className="relative mt-10">
          <div
            ref={scrollerRef}
            onScroll={measure}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:gap-5 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.items.map((t) => (
              <article
                key={t.name}
                className="card card-hover relative flex w-[85%] shrink-0 snap-center flex-col overflow-hidden md:w-[calc((100%-1.25rem)/2)] md:snap-start lg:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="relative h-60 w-full overflow-hidden bg-ink-950">
                  {/* Rozmyta kopia tego samego zdjęcia wypełnia boki zamiast czarnych pasów.
                      Samo zdjęcie realizacji zostaje w całości, bez kadrowania. */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src={t.photo}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-xl saturate-150"
                  />
                  <div className="absolute inset-0 bg-ink-950/40" />
                  <SmartImage
                    src={t.photo}
                    alt={`Realizacja — magazyn energii (${t.role})`}
                    className="relative h-60 w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Stars rating={t.rating} />
                  <p className="mt-3 flex-1 leading-relaxed text-white/75">„{t.text}”</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-display font-bold text-white">{t.name}</p>
                    <p className="text-sm text-gold-300/80">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Nawigacja: strzałki (od md) i kropki — jedna kropka na pozycję karuzeli */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => idzDo(aktywna - 1)}
              disabled={aktywna === 0}
              aria-label="Poprzednie opinie"
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-gold-400/50 hover:text-gold-300 disabled:opacity-30 md:grid"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: pozycje }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => idzDo(i)}
                  aria-label={`Opinie — pozycja ${i + 1} z ${pozycje}`}
                  className="grid h-6 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all ${i === aktywna ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/25'}`} />
                </button>
              ))}
            </div>
            <span className="text-xs text-white/60 md:hidden">przesuń w bok</span>
            <button
              type="button"
              onClick={() => idzDo(aktywna + 1)}
              disabled={aktywna >= pozycje - 1}
              aria-label="Następne opinie"
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-gold-400/50 hover:text-gold-300 disabled:opacity-30 md:grid"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Obowiązek informacyjny (Omnibus): skąd pochodzą opinie i jak je weryfikuję */}
          <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-white/55">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300/80" />
            <span>{testimonials.verification}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
