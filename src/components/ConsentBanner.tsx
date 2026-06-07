import { useEffect, useState } from 'react'
import { getConsent, setConsent } from '../lib/consent'
import { hasTrackers, loadTrackers } from '../lib/tracking'

/**
 * Baner zgody na cookies. Pokazuje się tylko, gdy skonfigurowano narzędzia
 * śledzące (GTM/Pixel/Ads). Narzędzia ładują się dopiero po „Akceptuję".
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasTrackers) return
    const consent = getConsent()
    if (consent === 'granted') {
      loadTrackers()
    } else if (consent === null) {
      setVisible(true)
    }
  }, [])

  if (!hasTrackers || !visible) return null

  const accept = () => {
    setConsent('granted')
    loadTrackers()
    setVisible(false)
  }
  const reject = () => {
    setConsent('denied')
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/15 bg-ink-900/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-white/70">
          Używamy plików cookies do analityki i reklam, aby ulepszać stronę i lepiej docierać z ofertą.
          Szczegóły w{' '}
          <a href="polityka-prywatnosci.html" className="font-medium text-gold-300 underline">
            Polityce prywatności
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <button type="button" onClick={reject} className="btn-ghost !py-2.5 !text-sm">
            Tylko niezbędne
          </button>
          <button type="button" onClick={accept} className="btn-primary !py-2.5 !text-sm">
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  )
}
