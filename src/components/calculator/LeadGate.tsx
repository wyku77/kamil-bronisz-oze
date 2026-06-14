import { useState, type FormEvent } from 'react'
import { ArrowLeft, Lock, ShieldCheck, Sparkles, Star } from 'lucide-react'
import type { CalcResult } from '../../lib/calc'
import type { LeadContact } from '../../lib/leads'
import { CountUp } from '../ui/CountUp'
import { googleReviews, leadMicrocopy, leadTimeframe } from '../../data/content'

type Props = {
  result: CalcResult
  onUnlock: (contact: LeadContact) => Promise<void>
  onBack: () => void
}

const empty: LeadContact = { name: '', phone: '', email: '', postalCode: '', consent: false, timeframe: '' }

export function LeadGate({ result, onUnlock, onBack }: Props) {
  const [form, setForm] = useState<LeadContact>(empty)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const set = <K extends keyof LeadContact>(key: K, v: LeadContact[K]) =>
    setForm((f) => ({ ...f, [key]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Podaj imię.')
    if (!form.phone.trim()) return setError('Podaj numer telefonu.')
    if (!form.email.trim()) return setError('Podaj adres e-mail.')
    if (!form.timeframe) return setError('Zaznacz, kiedy planujesz inwestycję.')
    if (!form.consent) return setError('Zaznacz zgodę, aby zobaczyć pełne wyniki.')
    setError(null)
    setSending(true)
    await onUnlock(form)
    setSending(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      {/* Teaser — haczyk */}
      <div className="relative flex flex-col justify-center">
        <span className="eyebrow w-fit">
          <Sparkles className="h-3.5 w-3.5" /> Twoja wstępna analiza jest gotowa
        </span>
        <p className="mt-5 text-sm uppercase tracking-wider text-white/65">Szacowane roczne oszczędności</p>
        <p className="mt-1 font-display text-5xl font-extrabold text-gradient sm:text-6xl">
          <CountUp to={result.annualSavings} suffix=" zł" />
        </p>
        <p className="mt-3 max-w-md leading-relaxed text-white/65">
          Podaj dane kontaktowe, aby odblokować <span className="font-semibold text-white">pełną analizę</span>:
          rekomendowaną moc instalacji, dobór magazynu energii, autokonsumpcję, czas zwrotu, projekcję na 10 i 20 lat
          oraz redukcję CO₂.
        </p>

        {/* Zablokowany podgląd */}
        <div className="relative mt-6 hidden sm:block">
          <div className="grid grid-cols-3 gap-3 blur-[6px]">
            {['Moc PV', 'Magazyn', 'Autokonsumpcja', 'Zwrot', 'Oszczędności 20 lat', 'CO₂'].map((l) => (
              <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] text-white/65">{l}</p>
                <p className="mt-2 h-5 w-12 rounded bg-white/15" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/40 bg-ink-900/80 text-gold-300 backdrop-blur">
              <Lock className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      {/* Formularz lead magnet */}
      <div className="rounded-3xl border border-gold-400/25 bg-white/[0.04] p-6 shadow-glow-gold backdrop-blur-sm sm:p-8">
        <h3 className="font-display text-xl font-bold text-white">Odblokuj pełne wyniki</h3>
        <p className="mt-1.5 text-sm text-white/70">
          Wyślę Ci też pełną analizę i odezwę się, by odpowiedzieć na pytania. Bez spamu.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="l-name" className="field-label">
              Imię*
            </label>
            <input
              id="l-name"
              type="text"
              autoComplete="given-name"
              className="field"
              placeholder="Jan"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="l-phone" className="field-label">
                Telefon*
              </label>
              <input
                id="l-phone"
                type="tel"
                autoComplete="tel"
                className="field"
                placeholder="600 100 200"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="l-zip" className="field-label">
                Kod pocztowy
              </label>
              <input
                id="l-zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                className="field"
                placeholder="40-750"
                value={form.postalCode}
                onChange={(e) => set('postalCode', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="l-email" className="field-label">
              Adres e-mail*
            </label>
            <input
              id="l-email"
              type="email"
              autoComplete="email"
              className="field"
              placeholder="jan@example.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="l-timeframe" className="field-label">
              {leadTimeframe.label}*
            </label>
            <select
              id="l-timeframe"
              className="field"
              value={form.timeframe}
              onChange={(e) => set('timeframe', e.target.value)}
            >
              <option value="">{leadTimeframe.placeholder}</option>
              {leadTimeframe.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-gold-500 focus:ring-gold-400"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
            />
            Wyrażam zgodę na kontakt oraz otrzymywanie informacji marketingowych i przetwarzanie danych zgodnie z
            polityką prywatności.*
          </label>

          {error && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300">{error}</p>}

          <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
            {sending ? 'Przygotowuję wyniki…' : 'Pokaż moje pełne wyniki'}
          </button>

          <p className="text-center text-[11px] text-white/60">{leadMicrocopy}</p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-gold-300/90">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            <span>
              <span className="font-semibold">{googleReviews.rating}</span> · {googleReviews.count}{' '}
              {googleReviews.note} — firmy Begolden
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-white/60">
            <button type="button" onClick={onBack} className="flex items-center gap-1 hover:text-white/70">
              <ArrowLeft className="h-3.5 w-3.5" /> Zmień dane
            </button>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-gold-300" /> Dane bezpieczne, zgodnie z RODO
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
