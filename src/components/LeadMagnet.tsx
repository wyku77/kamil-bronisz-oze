import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, Phone } from 'lucide-react'
import { leadMagnet } from '../data/content'
import { Reveal } from './ui/Reveal'
import { submitLeadMagnet } from '../lib/leads'
import { track } from '../lib/analytics'
import cover600 from '../assets/grafiki/checklista-tablet-600.webp'
import cover1200 from '../assets/grafiki/checklista-tablet-1200.webp'
import cover1440 from '../assets/grafiki/checklista-tablet-1440.webp'

const isPhone = (v: string) => v.replace(/\D/g, '').length >= 9

export function LeadMagnet() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isPhone(phone)) {
      setError('Podaj poprawny numer telefonu.')
      return
    }
    setError('')
    setStatus('sending')
    await submitLeadMagnet({ phone, email }, 'lead_magnet_dotacja')
    track.leadSubmit({ source: 'lead_magnet', leadTemperature: 'cieply' })
    setStatus('done')
  }

  const unlocked = status === 'done'

  return (
    <section id="poradnik" className="relative overflow-hidden bg-ink-900 py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">{leadMagnet.eyebrow}</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{leadMagnet.title}</h2>
              <p className="mt-4 leading-relaxed text-white/65">{leadMagnet.lead}</p>

              {!unlocked ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={leadMagnet.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="field pl-11"
                      aria-label="Numer telefonu"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={leadMagnet.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="field pl-11"
                      aria-label="Adres e-mail (opcjonalnie)"
                    />
                  </div>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Wysyłam…' : leadMagnet.button}
                  </button>
                  <p className="text-xs text-white/60">{leadMagnet.consent}</p>
                </form>
              ) : (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" />
                  <div>
                    <p className="font-semibold text-emerald-200">{leadMagnet.successTitle}</p>
                    <p className="text-xs text-white/70">{leadMagnet.successNote}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Przed zapisem: okładka checklisty (pokazuje, co dostajesz). Po zapisie: pełna checklista.
                Na mobile okładka stoi nad formularzem, na desktopie obok niego. */}
            <div className={unlocked ? '' : 'order-first lg:order-none'}>
              {unlocked ? (
                <ul className="space-y-2.5">
                  {leadMagnet.checklist.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400/15 font-display text-xs font-bold text-gold-300">
                        {i + 1}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <figure className="mx-auto max-w-xs sm:max-w-sm">
                  <img
                    src={cover1200}
                    srcSet={`${cover600} 600w, ${cover1200} 1200w, ${cover1440} 1440w`}
                    sizes="(min-width: 640px) 384px, 320px"
                    width={1200}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    alt={leadMagnet.coverAlt}
                    className="block h-auto w-full rounded-2xl border border-white/10 shadow-card"
                  />
                  <figcaption className="mt-3 text-center text-xs font-medium text-white/60">
                    🔒 Pełna checklista po zostawieniu numeru
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
