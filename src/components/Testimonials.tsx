import { Star } from 'lucide-react'
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
            <p className="text-xs text-white/55">
              <span className="font-semibold text-white/80">{googleReviews.count}</span> {googleReviews.note}
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">{googleReviews.attribution}</p>
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal
              as="article"
              key={t.name}
              delay={(i % 3) * 0.08}
              className="card card-hover relative flex h-full flex-col overflow-hidden"
            >
              <SmartImage
                src={t.photo}
                alt={`Realizacja — magazyn energii (${t.role})`}
                className="h-60 w-full bg-ink-950/60 object-contain"
              />
              <div className="flex flex-1 flex-col p-6">
                <Stars rating={t.rating} />
                <p className="mt-3 flex-1 leading-relaxed text-white/75">„{t.text}"</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display font-bold text-white">{t.name}</p>
                  <p className="text-sm text-gold-300/80">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
