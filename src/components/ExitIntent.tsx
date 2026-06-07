import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Phone, X } from 'lucide-react'
import { exitIntent } from '../data/content'
import { submitLeadMagnet } from '../lib/leads'
import { track } from '../lib/analytics'

const isPhone = (v: string) => v.replace(/\D/g, '').length >= 9
const SEEN_KEY = 'kb_exit_seen'

/** Pop-up przy próbie wyjścia (desktop). Pokazuje się maks. raz na sesję. */
export function ExitIntent() {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SEEN_KEY)) return
    if (window.matchMedia('(hover: none)').matches) return // pomijamy dotyk/mobile

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true)
        sessionStorage.setItem(SEEN_KEY, '1')
        document.removeEventListener('mouseout', onLeave)
      }
    }
    // Nasłuch włącza się dopiero po 2 minutach — klient ma czas zapoznać się ze stroną.
    const timer = window.setTimeout(() => document.addEventListener('mouseout', onLeave), 120000)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  const close = () => setOpen(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isPhone(phone)) {
      setError('Podaj poprawny numer telefonu.')
      return
    }
    setError('')
    setStatus('sending')
    await submitLeadMagnet({ phone }, 'exit_intent')
    track.leadSubmit({ source: 'exit_intent', leadTemperature: 'cieply' })
    setStatus('done')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-gold-400/25 bg-gradient-to-br from-ink-800 to-ink-900 p-7 shadow-2xl"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Zamknij"
              className="absolute right-4 top-4 text-white/65 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {status !== 'done' ? (
              <>
                <h3 className="font-display text-2xl font-bold text-white">{exitIntent.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{exitIntent.text}</p>
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={exitIntent.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="field pl-11"
                      aria-label="Numer telefonu"
                    />
                  </div>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Wysyłam…' : exitIntent.button}
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full text-center text-xs text-white/60 transition-colors hover:text-white/70"
                  >
                    {exitIntent.dismiss}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{exitIntent.successTitle}</h3>
                <p className="mt-2 text-sm text-white/60">{exitIntent.successText}</p>
                <button type="button" onClick={close} className="btn-outline mt-5">
                  Zamknij
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
