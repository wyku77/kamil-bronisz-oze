import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { site, googleReviews } from '../data/content'
import { track } from '../lib/analytics'

/**
 * Dyskretny pasek CTA pojawiający się po przewinięciu — tylko desktop (lg+).
 * Wyśrodkowany na dole, więc nie koliduje z pływającym przyciskiem WhatsApp
 * (prawy dolny róg). Na mobile rolę tę pełni osobny <MobileCTA />.
 */
export function DesktopCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // Centrowanie trzymamy na zewnętrznym kontenerze — wewnętrzny motion.div
    // ustawia własny transform (animacja y), który nadpisałby -translate-x-1/2.
    <div className="fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-5 rounded-full border border-white/10 bg-ink-900/95 py-2.5 pl-6 pr-2.5 shadow-card backdrop-blur"
          >
            <p className="text-sm text-white/80">
              <span className="font-semibold text-gold-300">★ {googleReviews.rating} Google</span>
              <span className="mx-2 text-white/30" aria-hidden>
                •
              </span>
              Bezpłatna analiza — oddzwaniam zwykle w 1 h
            </p>
            <div className="flex items-center gap-2">
              <a
                href={site.phoneHref}
                onClick={() => track.ctaClick('desktopbar_call')}
                className="btn-ghost !py-2 !text-sm"
              >
                <Phone className="h-4 w-4" /> Zadzwoń
              </a>
              <a
                href="#kontakt"
                onClick={() => track.ctaClick('desktopbar_leadform')}
                className="btn-primary !py-2 !text-sm"
              >
                Zostaw numer — oddzwonię
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
