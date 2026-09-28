import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Bell, CheckCircle2, Clock } from 'lucide-react'
import { subsidyDeadline } from '../data/content'
import { track } from '../lib/analytics'
import { submitLeadMagnet } from '../lib/leads'
import { Honeypot, isBotSubmit } from './ui/Honeypot'
import { SendFailure } from './ui/SendFailure'

const isEmail = (v: string) => v.includes('@')
const validContact = (v: string) => (isEmail(v) ? /\S+@\S+\.\S+/.test(v) : v.replace(/\D/g, '').length >= 9)

function daysLeft(target: string): number {
  const ms = new Date(target).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

/**
 * Pasek FOMO naboru dotacji. Trzy stany zależne od `subsidyDeadline.targetDate`:
 *  - brak daty (termin niepewny) → stała plakietka `badge` + `text`, bez licznika,
 *  - data w przyszłości → licznik dni w kafelkach + `text`,
 *  - data minęła → `passed` + `textStarted` (nabór trwa do wyczerpania środków).
 * Strona jest prerenderowana, więc w HTML zapisuje się liczba dni z chwili builda —
 * main.tsx renderuje wszystko od nowa (createRoot), więc odwiedzający widzi aktualną.
 */
export function SubsidyDeadline() {
  const target = subsidyDeadline.targetDate
  const [days, setDays] = useState<number | null>(() => (target ? daysLeft(target) : null))

  useEffect(() => {
    if (!target) return
    setDays(daysLeft(target))
    const id = window.setInterval(() => setDays(daysLeft(target)), 60_000)
    return () => window.clearInterval(id)
  }, [target])

  // „Powiadom mnie o starcie" — lżejsza ścieżka kontaktu (tylko przed startem naboru)
  const notify = subsidyDeadline.notify
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState('')
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [notifyError, setNotifyError] = useState('')

  const sendNotify = async () => {
    const v = contact.trim()
    setNotifyStatus('sending')
    const res = await submitLeadMagnet(isEmail(v) ? { email: v } : { phone: v }, 'powiadomienie_nabor')
    if (res.ok) track.leadSubmit({ source: 'powiadomienie_nabor', leadTemperature: 'cieply' })
    else track.leadError('powiadomienie_nabor')
    setNotifyStatus(res.ok ? 'done' : 'failed')
  }

  const handleNotify = async (e: FormEvent) => {
    e.preventDefault()
    if (isBotSubmit(e.target)) return setNotifyStatus('done')
    if (!validContact(contact.trim())) return setNotifyError(notify.error)
    setNotifyError('')
    await sendNotify()
  }

  const started = days !== null && days <= 0
  const counting = days !== null && !started
  const unit = days === 1 ? subsidyDeadline.unitOne : subsidyDeadline.unitMany

  return (
    <div className="border-y border-gold-400/20 bg-gradient-to-r from-gold-400/10 via-ink-900 to-ink-900">
      <div className="container-px py-3.5">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left">
          {counting ? (
            <div className="flex shrink-0 items-center gap-3">
              {/* Cyfry w kafelkach tylko wizualnie; czytnik ekranu dostaje pełne zdanie poniżej */}
              <div className="flex gap-1" aria-hidden="true">
                {String(days).padStart(2, '0')
                  .split('')
                  .map((d, i) => (
                    <span
                      key={i}
                      className="grid h-11 w-9 place-items-center rounded-lg border border-gold-400/35 bg-ink-950 font-display text-2xl font-extrabold tabular-nums text-gold-300 shadow-[inset_0_-10px_14px_rgba(0,0,0,0.35)]"
                    >
                      {d}
                    </span>
                  ))}
              </div>
              <div className="text-left leading-tight" aria-hidden="true">
                <p className="font-display text-sm font-bold text-white">{unit}</p>
                <p className="mt-0.5 text-xs text-white/60">start: {subsidyDeadline.dateLabel}</p>
              </div>
              <span className="sr-only">
                {days} {unit} — {subsidyDeadline.dateLabel}
              </span>
            </div>
          ) : (
            <span className="flex shrink-0 items-center gap-2 text-gold-300">
              <Clock className="h-4 w-4" />
              <span className="font-display text-sm font-bold text-white">
                {started ? subsidyDeadline.passed : <span className="text-gradient">{subsidyDeadline.badge}</span>}
              </span>
            </span>
          )}
          <p className="text-sm leading-relaxed text-white/70">
            {started ? subsidyDeadline.textStarted : subsidyDeadline.text}
          </p>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 sm:ml-auto">
            <a
              href="#kontakt"
              onClick={() => track.ctaClick('subsidy_deadline')}
              className="btn-primary !py-2 !text-xs"
            >
              {subsidyDeadline.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            {counting && !open && (
              <button
                type="button"
                onClick={() => {
                  setOpen(true)
                  track.ctaClick('subsidy_notify_open')
                }}
                className="btn-ghost !py-2 !text-xs"
              >
                <Bell className="h-3.5 w-3.5" /> {notify.button}
              </button>
            )}
          </div>
        </div>

        {counting && open && (
          <div className="mx-auto mt-3 max-w-xl pb-1">
            {notifyStatus === 'done' ? (
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> {notify.success}
              </p>
            ) : (
              <form onSubmit={handleNotify} className="space-y-2" noValidate>
                <Honeypot />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder={notify.placeholder}
                    aria-label={notify.placeholder}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="field !py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={notifyStatus === 'sending'}
                    className="btn-primary shrink-0 !py-2.5 !text-sm disabled:opacity-60"
                  >
                    {notifyStatus === 'sending' ? 'Wysyłam…' : notify.submit}
                  </button>
                </div>
                {notifyError && <p className="text-xs text-red-300">{notifyError}</p>}
                {notifyStatus === 'failed' && (
                  <SendFailure source="powiadomienie_nabor" onRetry={sendNotify} />
                )}
                <p className="text-[11px] leading-relaxed text-white/55">{notify.note}</p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
