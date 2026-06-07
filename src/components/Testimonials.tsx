import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/content'
import { Reveal } from './ui/Reveal'

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

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal as="article" key={t.name} delay={(i % 3) * 0.08} className="card relative flex h-full flex-col p-7">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gold-400/20" />
              <Stars rating={t.rating} />
              <p className="mt-4 flex-1 leading-relaxed text-white/75">„{t.text}"</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-display font-bold text-white">{t.name}</p>
                <p className="text-sm text-gold-300/80">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
