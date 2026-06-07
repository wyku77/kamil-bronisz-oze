import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { nav, site } from '../data/content'
import { Logo } from './ui/Logo'
import { track } from '../lib/analytics'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Zablokuj scroll tła, gdy menu mobilne otwarte
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-ink-950/85 py-2 shadow-card backdrop-blur-xl'
          : 'border-transparent bg-transparent py-3.5'
      }`}
    >
      <nav className="container-px flex items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            onClick={() => track.ctaClick('navbar_phone')}
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-gold-300"
          >
            <Phone className="h-4 w-4 text-gold-400" />
            {site.phone}
          </a>
          <a
            href="#kontakt"
            onClick={() => track.ctaClick('navbar_cta')}
            className="btn-primary !py-2.5 !text-sm"
          >
            Bezpłatna analiza
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
          aria-label="Otwórz menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Menu mobilne */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ink-900 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white"
                  aria-label="Zamknij menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
                <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-white">
                  <Phone className="h-4 w-4 text-gold-400" />
                  {site.phone}
                </a>
                <a href="#kontakt" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Umów bezpłatną analizę
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
