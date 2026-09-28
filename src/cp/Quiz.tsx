import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, ClipboardCheck, Lock } from 'lucide-react'
import { cpQuiz } from '../data/cp'
import { Reveal } from '../components/ui/Reveal'
import { Honeypot, isBotSubmit } from '../components/ui/Honeypot'
import { SendFailure } from '../components/ui/SendFailure'
import { submitCzystePowietrze, type CpAnswers } from '../lib/leads'
import { pushEvent, track } from '../lib/analytics'
import { SectionHead } from './ui'

type Props = {
  answers: CpAnswers
  setAnswer: (key: keyof CpAnswers, value: string) => void
}

const Pct = ({ children }: { children: ReactNode }) => <span className="font-bold text-gold-300">{children}</span>
const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-white">{children}</strong>

/** Wstępny wynik — ta sama logika i teksty co w dawnej podstronie HTML. */
function Wynik({ a }: { a: CpAnswers }) {
  if (a.owner === 'nie') {
    return (
      <p>
        Program Czyste Powietrze wymaga <B>tytułu własności</B> do domu jednorodzinnego. Jeśli jesteś w trakcie zakupu
        albo masz inną sytuację — zostaw numer, sprawdzę Twój przypadek indywidualnie i wskażę realne opcje.
      </p>
    )
  }
  return (
    <>
      <p>
        Świetnie — <B>prawdopodobnie kwalifikujesz się</B> do Czyste Powietrze.{' '}
        {a.heat === 'wegiel' ? (
          <>Wymiana starego „kopciucha" to <B>rdzeń programu</B> — zwykle najszerszy zakres wsparcia. </>
        ) : a.heat === 'drewno' ? (
          <>Wymiana starego pieca na drewno na nowoczesne źródło zwykle <B>kwalifikuje się</B> do dotacji. </>
        ) : a.heat === 'gaz' ? (
          <>Przy piecu gazowym zakres wsparcia bywa węższy — sprawdzę Twój przypadek pod aktualne zasady. </>
        ) : (
          <>Sprawdzę, czy Twoje obecne źródło ciepła kwalifikuje się do wymiany w programie. </>
        )}
        {a.insul === 'nie' ? (
          <>
            Brak ocieplenia działa <B>na Twoją korzyść</B>: kompleksowa termomodernizacja razem z wymianą źródła ciepła to
            najwyższy poziom — nawet <Pct>do 100%</Pct> kosztów kwalifikowanych.{' '}
          </>
        ) : a.insul === 'czesc' ? (
          <>
            Przy częściowym ociepleniu domykamy termomodernizację i wymieniamy źródło ciepła — to zwykle{' '}
            <B>wysoki poziom dofinansowania</B>.{' '}
          </>
        ) : (
          <>Skupimy się na samej wymianie źródła ciepła — najszybszy efekt na rachunku. </>
        )}
        {a.newsrc === 'pompa'
          ? 'Pompa ciepła to najniższe koszty eksploatacji, zwłaszcza w parze z fotowoltaiką i taryfą dynamiczną.'
          : a.newsrc === 'pellet'
            ? 'Piec peletowy: niższy koszt startu i automatyczny podajnik — wygodne „klasyczne" ciepło.'
            : a.newsrc === 'zgaz'
              ? 'Piec zgazowujący drewno: najtańsze paliwo, jeśli masz dostęp do drewna.'
              : 'Bez obaw, że nie wiesz co wybrać — dobiorę źródło ciepła pod Twój dom i budżet.'}
      </p>
      <p className="mt-3">
        Twój{' '}
        <B>
          dokładny poziom — od <Pct>40%</Pct> do nawet <Pct>100%</Pct>
        </B>{' '}
        kosztów — policzę po krótkiej rozmowie.
      </p>
    </>
  )
}

type FormState = { name: string; phone: string; voivodeship: string; city: string; consent: boolean }
const initialForm: FormState = { name: '', phone: '', voivodeship: '', city: '', consent: false }

/**
 * Quiz kwalifikacyjny (#kwalifikacja): 5 pytań → wstępny wynik → formularz oddzwonienia.
 * Lead ma te same pola co w dawnej podstronie (Make → Telegram, Web3Forms → e-mail).
 * Komputer: pytania po lewej, wynik i formularz w przyklejonym panelu po prawej.
 */
export function Quiz({ answers, setAnswer }: Props) {
  const answered = cpQuiz.questions.filter((q) => answers[q.key] !== null).length
  const done = answered === cpQuiz.questions.length
  const [form, setForm] = useState<FormState>(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)
  const reported = useRef(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))

  // Po ostatniej odpowiedzi: zdarzenie do analityki (raz) i — na telefonie — przewinięcie do wyniku,
  // który pojawia się pod pytaniami i łatwo go przeoczyć.
  useEffect(() => {
    if (!done || reported.current) return
    reported.current = true
    pushEvent('quiz_complete', {
      source: 'czyste-powietrze',
      wlasciciel: answers.owner,
      zrodlo: answers.heat,
      ocieplony: answers.insul,
      nowe_zrodlo: answers.newsrc,
      termin: answers.when,
    })
    if (window.innerWidth < 1024) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = async () => {
    setSending(true)
    const res = await submitCzystePowietrze({
      name: form.name.trim(),
      phone: form.phone.trim(),
      voivodeship: form.voivodeship,
      city: form.city.trim(),
      answers,
      source: 'czyste-powietrze',
    })
    setSending(false)
    if (res.ok) {
      track.leadSubmit({
        source: 'czyste-powietrze',
        voivodeship: form.voivodeship,
        city: form.city.trim(),
        zrodlo: answers.heat,
        nowe_zrodlo: answers.newsrc,
        termin: answers.when,
      })
      setFailed(false)
      setSent(true)
    } else {
      track.leadError('czyste-powietrze')
      setFailed(true)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isBotSubmit(e.target)) return setSent(true)
    if (!form.name.trim()) return setError('Podaj imię — bez niego nie wyślę formularza.')
    if (form.phone.replace(/\D/g, '').length < 9) return setError('Podaj poprawny numer telefonu.')
    if (!form.voivodeship) return setError('Wybierz województwo.')
    if (!form.city.trim()) return setError('Podaj miejscowość.')
    if (!form.consent) return setError('Zaznacz zgodę, żebym mógł oddzwonić.')
    setError(null)
    await send()
  }

  return (
    <section id="kwalifikacja" className="section relative overflow-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gold opacity-50" />

      <div className="container-px relative">
        <SectionHead eyebrow={cpQuiz.eyebrow} title={cpQuiz.title}>
          {cpQuiz.lead}
        </SectionHead>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          {/* Pytania */}
          <Reveal className="card divide-y divide-white/10 p-5 sm:p-7">
            {cpQuiz.questions.map((q, n) => (
              <div key={q.key} className="py-5 first:pt-0 last:pb-0">
                <p className="flex items-start gap-3 font-display text-base font-semibold text-white sm:text-lg">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                      answers[q.key] !== null ? 'bg-gold-400 text-ink-950' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {n + 1}
                  </span>
                  <span className="pt-0.5">{q.label}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:pl-10">
                  {q.options.map((o) => {
                    const active = answers[q.key] === o.v
                    return (
                      <button
                        key={o.v}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setAnswer(q.key, o.v)}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
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
            ))}
          </Reveal>

          {/* Wynik i formularz */}
          <div ref={panelRef} className="scroll-mt-24 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-ink-950/70 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              {!done ? (
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
                      <ClipboardCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-white">Twój wstępny wynik</p>
                      <p className="text-sm text-white/60">
                        Odpowiedziano {answered} z {cpQuiz.questions.length}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500 transition-all duration-500"
                      style={{ width: `${(answered / cpQuiz.questions.length) * 100}%` }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    Odpowiedz na wszystkie pytania — wynik pojawi się tutaj. Bezpłatnie i bez zobowiązań.
                  </p>
                </div>
              ) : sent ? (
                <div className="py-6 text-center" aria-live="polite">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-400/20 text-gold-300">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-bold text-white">{cpQuiz.thanksTitle}</p>
                  <p className="mx-auto mt-2 max-w-sm text-white/65">{cpQuiz.thanks}</p>
                </div>
              ) : (
                <>
                  <div
                    aria-live="polite"
                    className="rounded-2xl border border-gold-400/25 bg-gold-400/[0.07] p-4 text-[15px] leading-relaxed text-white/80"
                  >
                    <Wynik a={answers} />
                  </div>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                    <Honeypot />
                    <div>
                      <p className="font-semibold text-white">{cpQuiz.formTitle}</p>
                      <p className="mt-1 text-sm text-white/60">{cpQuiz.formSub}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <label htmlFor="q-name" className="field-label">
                          Imię*
                        </label>
                        <input
                          id="q-name"
                          type="text"
                          autoComplete="given-name"
                          className="field"
                          placeholder="Jan"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="field-label">
                          Telefon*
                        </label>
                        <input
                          id="q-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          className="field"
                          placeholder="600 100 200"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-voiv" className="field-label">
                          Województwo*
                        </label>
                        <select
                          id="q-voiv"
                          className="field"
                          value={form.voivodeship}
                          onChange={(e) => set('voivodeship', e.target.value)}
                        >
                          <option value="">Wybierz województwo</option>
                          {cpQuiz.voivodeships.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="q-city" className="field-label">
                          Miejscowość*
                        </label>
                        <input
                          id="q-city"
                          type="text"
                          autoComplete="address-level2"
                          className="field"
                          placeholder="np. Świdnik"
                          value={form.city}
                          onChange={(e) => set('city', e.target.value)}
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-gold-500 focus:ring-gold-400"
                        checked={form.consent}
                        onChange={(e) => set('consent', e.target.checked)}
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

                    {error && (
                      <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300">{error}</p>
                    )}
                    {failed && !error && <SendFailure source="czyste-powietrze" onRetry={send} retrying={sending} />}

                    <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
                      {sending ? 'Wysyłam…' : cpQuiz.submit}
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
                      <Lock className="h-3.5 w-3.5 shrink-0 text-gold-300/80" />
                      {cpQuiz.note.replace('🔒 ', '')}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
