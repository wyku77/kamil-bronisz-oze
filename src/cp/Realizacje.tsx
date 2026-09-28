import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cpRealizacje, type Realizacja } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand, GoogleRating, rich } from './ui'

/**
 * Karta „przed–po". Bez JS i w prerenderze (ograniczony ruch) widać zdjęcie „po".
 * W przeglądarce karta startuje od „przed" i sama przechodzi w „po", gdy wjedzie w ekran
 * (chyba że klient już kliknął przełącznik).
 */
function Karta({ r, index, total }: { r: Realizacja; index: number; total: number }) {
  const reduce = useReducedMotion()
  const [after, setAfter] = useState<boolean>(() => !!reduce || typeof IntersectionObserver === 'undefined')
  const touched = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || typeof IntersectionObserver === 'undefined' || !stageRef.current) return
    let timer = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.intersectionRatio >= 0.6)) {
          io.disconnect()
          timer = window.setTimeout(() => {
            if (!touched.current) setAfter(true)
          }, 1100)
        }
      },
      { threshold: [0, 0.6] },
    )
    io.observe(stageRef.current)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [reduce])

  const pokaz = (po: boolean) => {
    touched.current = true
    setAfter(po)
  }
  const beforeLabel = r.before.label ?? 'Przed'

  return (
    <article
      aria-roledescription="slajd"
      aria-label={`Realizacja ${index + 1} z ${total}`}
      className="card flex w-[88%] shrink-0 snap-center flex-col overflow-hidden md:w-[calc((100%-1.25rem)/2)] md:snap-start"
    >
      <div
        ref={stageRef}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('button')) pokaz(!after)
        }}
        className="relative aspect-[3/2] cursor-pointer overflow-hidden bg-ink-800"
      >
        <img
          loading="lazy"
          decoding="async"
          src={r.before.src}
          srcSet={r.before.srcSet}
          sizes="(min-width: 1280px) 620px, (min-width: 768px) 48vw, 88vw"
          width={1200}
          height={800}
          alt={r.before.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          loading="lazy"
          decoding="async"
          src={r.after.src}
          srcSet={r.after.srcSet}
          sizes="(min-width: 1280px) 620px, (min-width: 768px) 48vw, 88vw"
          width={1200}
          height={800}
          alt={r.after.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${after ? 'opacity-100' : 'opacity-0'}`}
        />
        <span
          aria-hidden="true"
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-card ${
            after ? 'bg-gold-400 text-ink-950' : 'bg-ink-950/80 text-white'
          }`}
        >
          {after ? 'Po' : beforeLabel}
        </span>
        <div
          role="group"
          aria-label="Porównaj zdjęcia"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 rounded-full border border-white/15 bg-ink-950/75 p-1 backdrop-blur-md"
        >
          {[
            { po: false, label: beforeLabel },
            { po: true, label: 'Po' },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={after === b.po}
              onClick={() => pokaz(b.po)}
              className={`min-w-[72px] rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                after === b.po ? 'bg-gold-400 text-ink-950' : 'text-white/80 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5">
        <p className="font-display text-lg font-bold text-white">{r.title}</p>
        <p className="mt-0.5 text-sm text-white/60">{r.meta}</p>
      </div>
    </article>
  )
}

/** Realizacje — przed i po (#realizacje): karuzela jak opinie na stronie głównej + ocena Google przy nagłówku. */
export function Realizacje() {
  const items = cpRealizacje.items
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
  const pozycje = Math.max(1, items.length - perView + 1)
  const idzDo = (i: number) => {
    const k = krok()
    if (!k) return
    k.el.scrollTo({ left: Math.max(0, Math.min(pozycje - 1, i)) * k.step, behavior: 'smooth' })
  }
  const aktywna = Math.min(active, pozycje - 1)

  return (
    <section id="realizacje" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-50" />
      <div className="container-px relative">
        <div className="section-head-split">
          <Reveal>
            <span className="eyebrow">{cpRealizacje.eyebrow}</span>
            <h2 className="mt-5 h-section text-white">{cpRealizacje.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">{rich(cpRealizacje.lead)}</p>
          </Reveal>
          <Reveal>
            <GoogleRating note={cpRealizacje.googleNote} label="cp_google_reviews" />
          </Reveal>
        </div>

        <Reveal className="relative mt-10">
          <div
            ref={scrollerRef}
            onScroll={measure}
            role="region"
            aria-roledescription="karuzela"
            aria-label="Realizacje przed i po"
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:gap-5 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((r, i) => (
              <Karta key={r.id} r={r} index={i} total={items.length} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => idzDo(aktywna - 1)}
              disabled={aktywna === 0}
              aria-label="Poprzednia realizacja"
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
                  aria-label={`Pokaż realizację ${i + 1}`}
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
              aria-label="Następna realizacja"
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-gold-400/50 hover:text-gold-300 disabled:opacity-30 md:grid"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <CtaBand {...cpRealizacje.band} label="cp_realizacje_band" />
      </div>
    </section>
  )
}
