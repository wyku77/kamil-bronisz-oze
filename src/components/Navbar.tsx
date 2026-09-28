import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Menu, Phone, X, type LucideIcon } from 'lucide-react'
import { nav, site } from '../data/content'
import { Logo } from './ui/Logo'
import { track } from '../lib/analytics'

type NavItem = { label: string; href: string }

type NavbarProps = {
  /** Linki w pasku (komputer). */
  items?: NavItem[]
  /** Linki w menu mobilnym — domyślnie te same co w pasku. */
  mobileItems?: NavItem[]
  /** Złota plakietka z odnośnikiem do drugiej strony (Czyste Powietrze ⇄ magazyny energii). */
  pill?: { href: string; label: string; mobileLabel: string; icon: LucideIcon; track: string }
  /** Dokąd prowadzi „Bezpłatna analiza". */
  ctaHref?: string
  logoHref?: string
}

const defaultPill: NonNullable<NavbarProps['pill']> = {
  href: 'czyste-powietrze.html',
  label: 'Czyste Powietrze',
  mobileLabel: 'Czyste Powietrze — dotacja',
  icon: Leaf,
  track: 'navbar_czyste_powietrze',
}

export function Navbar({ items = nav, mobileItems, pill = defaultPill, ctaHref = '#kontakt', logoHref }: NavbarProps = {}) {
  const PillIcon = pill.icon
  const menuItems = mobileItems ?? items
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
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-ink-950/85 py-2 shadow-card backdrop-blur-xl'
          : 'border-transparent bg-transparent py-3.5'
      }`}
    >
      <nav className="container-px flex items-center justify-between">
        <Logo href={logoHref} />

        <div className="hidden items-center gap-0.5 xl:flex">
          <a
            href={pill.href}
            onClick={() => track.ctaClick(pill.track)}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-2 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
          >
            <PillIcon className="h-4 w-4 shrink-0" />
            {pill.label}
          </a>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={site.phoneHref}
            onClick={() => track.ctaClick('navbar_phone')}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-gold-300"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold-400" />
            {site.phone}
          </a>
          <a
            href={ctaHref}
            onClick={() => track.ctaClick('navbar_cta')}
            className="btn-primary whitespace-nowrap !py-2.5 !text-sm"
          >
            Bezpłatna analiza
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white xl:hidden"
          aria-label="Otwórz menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>

      {/* Menu mobilne — poza <header>, bo backdrop-blur paska psuł tło menu (prześwity) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/90" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ink-900 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo href={logoHref} />
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
                <a
                  href={pill.href}
                  onClick={() => setOpen(false)}
                  className="mb-1 flex items-center gap-2 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-base font-semibold text-gold-300"
                >
                  <PillIcon className="h-4 w-4" /> {pill.mobileLabel}
                </a>
                {menuItems.map((item) => (
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
                <a href={ctaHref} onClick={() => setOpen(false)} className="btn-primary w-full">
                  Umów bezpłatną analizę
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
