import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from 'lucide-react'
import { site, about } from '../data/content'
import { Reveal } from './ui/Reveal'
import { SmartImage } from './ui/SmartImage'
import { submitLead, type LeadPayload } from '../lib/leads'
import { track } from '../lib/analytics'

const times = ['Rano (8:00–12:00)', 'Popołudnie (12:00–16:00)', 'Po 16:00', 'Dowolna pora']

type FormState = {
  name: string
  phone: string
  email: string
  postalCode: string
  time: string
  message: string
  consent: boolean
}

const initial: FormState = {
  name: '',
  phone: '',
  email: '',
  postalCode: '',
  time: times[0],
  message: '',
  consent: false,
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Podaj imię i nazwisko.')
    if (!form.phone.trim() && !form.email.trim()) return setError('Podaj numer telefonu lub adres e-mail.')
    if (!form.consent) return setError('Zaznacz zgodę na kontakt.')
    setError(null)
    setSending(true)

    // Minimalny payload zgodny ze strukturą leada (bez danych z kalkulatora)
    const payload: Partial<LeadPayload> & Record<string, unknown> = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      postalCode: form.postalCode.trim(),
      consent: form.consent,
      preferredTime: form.time,
      message: form.message.trim(),
      source: 'formularz-kontakt',
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
    }

    await submitLead(payload as LeadPayload)
    track.leadSubmit({ source: 'formularz-kontakt' })
    setSending(false)
    setSent(true)
    setForm(initial)
  }

  return (
    <section id="kontakt" className="section relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Kontakt • bezpłatnie</span>
          <h2 className="mt-5 h-section text-white">Umów bezpłatną analizę energetyczną</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Zostaw kontakt — oddzwonię w dogodnym terminie, przeanalizuję Twoje zużycie i przygotuję konkretne
            wyliczenia. Bez zobowiązań.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Profil + kontakt */}
          <Reveal direction="right" className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 font-display text-xl font-bold text-ink-950">
                KB
              </span>
              <SmartImage
                src={about.photo}
                alt={`${site.name} — ${site.role}`}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-gold-400/30"
              />
              <div>
                <p className="font-display text-lg font-bold">{site.name}</p>
                <p className="text-sm text-gold-300">{site.role}</p>
              </div>
            </div>

            <a
              href={site.phoneHref}
              onClick={() => track.ctaClick('contact_phone')}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400/20 text-gold-300">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/50">Zadzwoń bezpośrednio</span>
                <span className="font-display text-lg font-bold">{site.phone}</span>
              </span>
            </a>

            <a
              href={site.emailHref}
              onClick={() => track.ctaClick('contact_email')}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                <Mail className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/50">Napisz e-mail</span>
                <span className="font-medium">{site.email}</span>
              </span>
            </a>

            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.ctaClick('contact_whatsapp')}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Napisz na WhatsApp
            </a>

            <p className="flex items-center gap-2 px-1 text-sm text-white/50">
              <CheckCircle2 className="h-4 w-4 text-gold-300" />
              {site.area}
            </p>
          </Reveal>

          {/* Formularz */}
          <Reveal direction="left">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              {sent ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-400/20 text-gold-300">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">Dziękuję!</h3>
                  <p className="mt-2 max-w-sm text-white/60">
                    Twoje zgłoszenie zostało zapisane. Odezwę się najszybciej, jak to możliwe — zwykle w ciągu 1
                    godziny. W pilnej sprawie zadzwoń pod{' '}
                    <a href={site.phoneHref} className="font-semibold text-gold-300">
                      {site.phone}
                    </a>
                    .
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="btn-outline mt-6">
                    Wyślij kolejne zgłoszenie
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <h3 className="font-display text-xl font-bold text-white">Zarezerwuj termin analizy</h3>

                  <div>
                    <label htmlFor="c-name" className="field-label">
                      Imię i nazwisko*
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      className="field"
                      placeholder="Jan Kowalski"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className="field-label">
                        Telefon
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        autoComplete="tel"
                        className="field"
                        placeholder="600 100 200"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="field-label">
                        E-mail
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        className="field"
                        placeholder="jan@example.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-zip" className="field-label">
                        Kod pocztowy
                      </label>
                      <input
                        id="c-zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        className="field"
                        placeholder="40-750"
                        value={form.postalCode}
                        onChange={(e) => set('postalCode', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-time" className="field-label">
                        Preferowana pora kontaktu
                      </label>
                      <select
                        id="c-time"
                        className="field"
                        value={form.time}
                        onChange={(e) => set('time', e.target.value)}
                      >
                        {times.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="field-label">
                      Wiadomość
                    </label>
                    <textarea
                      id="c-message"
                      rows={3}
                      className="field"
                      placeholder="Napisz, czym jesteś zainteresowany…"
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                    />
                  </div>

                  <label className="flex items-start gap-3 text-xs leading-relaxed text-white/55">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-gold-500 focus:ring-gold-400"
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                    />
                    Wyrażam zgodę na kontakt w celu przedstawienia oferty oraz przetwarzanie moich danych zgodnie z
                    polityką prywatności.*
                  </label>

                  {error && (
                    <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300">{error}</p>
                  )}

                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
                    {sending ? 'Wysyłam…' : 'Umów bezpłatną analizę'}
                    {!sending && <Send className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
