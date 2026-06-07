import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { site } from '../data/content'
import { track } from '../lib/analytics'

/** Pływające przyciski: WhatsApp, telefon (mobile) i „do góry". */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-28 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-5">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Przewiń do góry"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink-800 text-white shadow-card transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Napisz na WhatsApp"
        onClick={() => track.ctaClick('floating_whatsapp')}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/60" />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </div>
  )
}
