import { MessageCircle, Phone, RotateCcw } from 'lucide-react'
import { site } from '../../data/content'
import { track } from '../../lib/analytics'

type Props = {
  /** Skąd pochodzi zgłoszenie — trafia do analityki kliknięć. */
  source: string
  /** Zdanie pod nagłówkiem, dopasowane do miejsca (np. „Twoje wyniki są poniżej…"). */
  message?: string
  onRetry?: () => void
  retrying?: boolean
}

/**
 * Komunikat, gdy zgłoszenie nie dotarło (padł webhook i e-mail, także po ponowieniu).
 * Zamiast udawanego „Dziękuję" daje klientowi dwie pewne drogi kontaktu i ponowienie wysyłki,
 * żeby lead nie przepadł po cichu.
 */
export function SendFailure({ source, message, onRetry, retrying = false }: Props) {
  return (
    <div role="alert" className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-left">
      <p className="text-sm font-semibold text-white">Nie udało się wysłać zgłoszenia</p>
      <p className="mt-1 text-sm leading-relaxed text-white/75">
        {message ?? 'To problem po mojej stronie, nie Twojej. Zadzwoń albo napisz — odpowiem od razu.'}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={site.phoneHref}
          onClick={() => track.callClick(`blad_${source}`)}
          className="btn-primary !px-4 !py-2 !text-sm"
        >
          <Phone className="h-4 w-4" /> {site.phone}
        </a>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.whatsappClick(`blad_${source}`)}
          className="btn-outline !px-4 !py-2 !text-sm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        {onRetry && (
          <button type="button" onClick={onRetry} disabled={retrying} className="btn-ghost !px-4 !py-2 !text-sm disabled:opacity-60">
            <RotateCcw className="h-4 w-4" /> {retrying ? 'Wysyłam…' : 'Spróbuj ponownie'}
          </button>
        )}
      </div>
    </div>
  )
}
