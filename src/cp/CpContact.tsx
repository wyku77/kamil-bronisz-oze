import { useState, type FormEvent } from 'react'
import { CheckCircle2, Lock, Mail, MessageCircle, Phone, Star } from 'lucide-react'
import { about, googleReviews, site } from '../data/content'
import { cpContact, cpQuiz } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { Honeypot, isBotSubmit } from '../components/ui/Honeypot'
import { SendFailure } from '../components/ui/SendFailure'
import { submitCzystePowietrze, type CpAnswers } from '../lib/leads'
import { track } from '../lib/analytics'

type Props = {
  answers: CpAnswers
  setAnswer: (key: keyof CpAnswers, value: string) => void
}

const whenOptions = cpQuiz.questions.find((q) => q.key === 'when')!.options

/**
 * Formularz na końcu strony (#kontakt) — wcześniej przycisk odsyłał klienta z powrotem do quizu.
 * Krótko: imię, telefon, kiedy wymiana, zgoda. Termin jest wspólny z quizem (jeśli klient zaczął quiz,
 * jego odpowiedzi też trafiają do leada). Lead idzie tą samą drogą co z quizu (Make + e-mail).
 */
export function CpContact({ answers, setAnswer }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  const send = async () => {
    setSending(true)
    const res = await submitCzystePowietrze({
      name: name.trim(),
      phone: phone.trim(),
      voivodeship: '',
      city: '',
      answers,
      source: 'czyste-powietrze-kontakt',
    })
    setSending(false)
    if (res.ok) {
      track.leadSubmit({ source: 'czyste-powietrze-kontakt', termin: answers.when })
      setFailed(false)
      setSent(true)
    } else {
      track.leadError('czyste-powietrze-kontakt')
      setFailed(true)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isBotSubmit(e.target)) return setSent(true)
    if (!name.trim()) return setError('Podaj imię.')
    if (phone.replace(/\D/g, '').length < 9) return setError('Podaj poprawny numer telefonu.')
    if (!answers.when) return setError('Zaznacz, kiedy planujesz wymianę.')
    if (!consent) return setError('Zaznacz zgodę, żebym mógł oddzwonić.')
    setError(null)
    await send()
  }

  return (
    <section id="kontakt" className="section relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{cpContact.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{cpContact.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{cpContact.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Profil + kontakt — na telefonie POD formularzem */}
          <Reveal direction="right" className="order-2 space-y-4 lg:order-1">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <SmartImage
                src={about.photo}
                alt={`${site.name} — ${site.role}`}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover object-top ring-1 ring-gold-400/30"
              />
              <div>
                <p className="font-display text-lg font-bold">{site.name}</p>
                <p className="text-sm text-gold-300">{site.role} · oddzwaniam osobiście</p>
              </div>
            </div>

            <a
              href={site.phoneHref}
              onClick={() => track.ctaClick('cp_contact_phone')}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400/20 text-gold-300">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/65">Zadzwoń bezpośrednio</span>
                <span className="font-display text-lg font-bold">{site.phone}</span>
              </span>
            </a>

            <a
              href={site.emailHref}
              onClick={() => track.ctaClick('cp_contact_email')}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.08]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                <Mail className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-white/65">Napisz e-mail</span>
                <span className="block break-all font-medium">{site.email}</span>
              </span>
            </a>

            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.ctaClick('cp_contact_whatsapp')}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Napisz na WhatsApp
            </a>

            <p className="flex items-center gap-2 px-1 text-sm text-white/65">
              <CheckCircle2 className="h-4 w-4 text-gold-300" />
              {site.area}
            </p>
          </Reveal>

          {/* Formularz */}
          <Reveal direction="left" className="order-1 lg:order-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center" aria-live="polite">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-400/20 text-gold-300">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">Dziękuję! 📞</h3>
                  <p className="mt-2 max-w-sm text-white/60">
                    {cpContact.thanks}{' '}
                    <a href={site.phoneHref} className="font-semibold text-gold-300">
                      {site.phone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <Honeypot />
                  <h3 className="font-display text-xl font-bold text-white">{cpContact.formTitle}</h3>

                  <div>
                    <p className="field-label">{cpContact.whenLabel}*</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {whenOptions.map((o) => {
                        const active = answers.when === o.v
                        return (
                          <button
                            key={o.v}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              setAnswer('when', o.v)
                              setError(null)
                            }}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                              active
                                ? 'border-gold-400 bg-gold-400/15 text-white'
                                : 'border-white/15 bg-white/[0.03] text-white/85 hover:border-gold-400/50 hover:bg-gold-400/10'
                            }`}
                          >
                            {o.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="k-name" className="field-label">
                        Imię*
                      </label>
                      <input
                        id="k-name"
                        type="text"
                        autoComplete="given-name"
                        className="field"
                        placeholder="Jan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="k-phone" className="field-label">
                        Telefon*
                      </label>
                      <input
                        id="k-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className="field"
                        placeholder="600 100 200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-gold-500 focus:ring-gold-400"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span>
                      Wyrażam zgodę na kontakt telefoniczny i przetwarzanie moich danych w celu przygotowania oferty,
                      zgodnie z{' '}
                      <a href="polityka-prywatnosci.html" className="text-gold-300 underline">
                        polityką prywatności
                      </a>
                      .*
                    </span>
                  </label>

                  {error && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300">{error}</p>}
                  {failed && !error && <SendFailure source="czyste-powietrze-kontakt" onRetry={send} retrying={sending} />}

                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
                    {sending ? 'Wysyłam…' : cpContact.submit}
                    {!sending && <Phone className="h-4 w-4" />}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-gold-300/80" />
                    {cpContact.note.replace('🔒 ', '')}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gold-300/90">
                    <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    <span>
                      <span className="font-semibold">{googleReviews.rating}</span> · {googleReviews.count}{' '}
                      {googleReviews.note} — firmy Begolden
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
