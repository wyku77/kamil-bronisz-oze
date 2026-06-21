import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { site, googleReviews } from '../data/content'
import { track } from '../lib/analytics'

/**
 * Dyskretny pasek CTA pojawiający się po przewinięciu — TYLKO w zakresie
 * 1024–1279 px (lg, ale nie xl). Powód: navbar pokazuje własne CTA dopiero od
 * xl (≥1280 px), a poniżej zwija się do hamburgera — wtedy na górze nie ma CTA,
 * więc ten pasek wypełnia lukę. Na ≥1280 px navbar już to robi, więc chowamy
 * pasek, żeby nie dublować. Wyśrodkowany na dole — nie koliduje z pływającym
 * WhatsAppem. Na mobile rolę tę pełni osobny <MobileCTA />.
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
    <div className="fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 lg:block xl:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-900/90 py-1.5 pl-4 pr-1.5 shadow-card backdrop-blur"
          >
            <p className="text-xs text-white/75">
              <span className="font-semibold text-gold-300">★ {googleReviews.rating}</span>
              <span className="mx-1.5 text-white/30" aria-hidden>
                •
              </span>
              oddzwaniam w 1 h
            </p>
            <a
              href={site.phoneHref}
              onClick={() => track.ctaClick('desktopbar_call')}
              className="btn-ghost !px-3 !py-1.5 !text-xs"
            >
              <Phone className="h-3.5 w-3.5" /> Zadzwoń
            </a>
            <a
              href="#kontakt"
              onClick={() => track.ctaClick('desktopbar_leadform')}
              className="btn-primary !px-3 !py-1.5 !text-xs"
            >
              Zostaw numer
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
