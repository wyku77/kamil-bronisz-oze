import { useRef, useState } from 'react'
import { MapPin, ShieldCheck, Star } from 'lucide-react'
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
  // Która karta karuzeli jest na środku (tylko do kropek na telefonie)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const onScroll = () => {
    const el = scrollerRef.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const step = card.offsetWidth + 16 // szerokość karty + gap-4
    setActive(Math.min(testimonials.items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))))
  }

  return (
    <section id="opinie" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-50" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{testimonials.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{testimonials.lead}</p>
        </Reveal>

        {/* Pasek zaufania — opinie Google */}
        <Reveal className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 sm:flex-row sm:gap-5">
          <GoogleG />
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="font-display text-2xl font-bold text-white">{googleReviews.rating}</span>
              <Stars rating={5} />
            </div>
            <p className="text-xs text-white/70">
              <span className="font-semibold text-white/80">{googleReviews.count}</span> {googleReviews.note}
            </p>
            <p className="mt-0.5 text-[11px] text-white/60">{googleReviews.attribution}</p>
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
        <Reveal className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-white/70">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-300" />
          {googleReviews.local}
        </Reveal>

        {/* Na telefonie karuzela z przewijaniem w bok (kolejna karta wystaje, żeby było widać, że jest
            więcej) — 6 kart jedna pod drugą zajmowało ok. 5 ekranów. Od md zwykła siatka.
            Karty bez własnego Reveal: przy przesuwaniu w bok animacja wejścia zostawiała pustą,
            wystającą kartę, dopóki nie wjechała cała. */}
        <Reveal className="mt-12">
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.items.map((t) => (
              <article
                key={t.name}
                className="card card-hover relative flex w-[85%] shrink-0 snap-center flex-col overflow-hidden md:w-auto"
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

          {/* Kropki i podpowiedź — tylko na telefonie */}
          <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
            <div className="flex gap-1.5" aria-hidden="true">
              {testimonials.items.map((t, i) => (
                <span
                  key={t.name}
                  className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/25'}`}
                />
              ))}
            </div>
            <span className="text-xs text-white/60">
              {active + 1} / {testimonials.items.length} · przesuń w bok
            </span>
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
