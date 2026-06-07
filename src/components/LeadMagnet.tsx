import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, Phone } from 'lucide-react'
import { leadMagnet } from '../data/content'
import { Reveal } from './ui/Reveal'
import { submitLeadMagnet } from '../lib/leads'
import { track } from '../lib/analytics'

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
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
                  <p className="text-xs text-white/40">{leadMagnet.consent}</p>
                </form>
              ) : (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" />
                  <div>
                    <p className="font-semibold text-emerald-200">{leadMagnet.successTitle}</p>
                    <p className="text-xs text-white/55">{leadMagnet.successNote}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Checklista — rozmyta do czasu zapisu (mechanizm „odblokuj") */}
            <div className="relative">
              <ul
                className={`space-y-2.5 transition-all duration-500 ${
                  unlocked ? '' : 'pointer-events-none select-none blur-sm'
                }`}
              >
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
              {!unlocked && (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="rounded-full border border-white/15 bg-ink-900/80 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur">
                    🔒 Zostaw numer, by odblokować
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
