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
    // Kompaktowo: na telefonie niska belka nad paskiem kontaktu, na komputerze mała karta w lewym dolnym
    // rogu — wcześniej baner zasłaniał ok. 20% ekranu telefonu i pasek z oceną w sekcji otwierającej.
    <div className="fixed inset-x-0 bottom-0 z-[70] p-2 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[340px] sm:p-0">
      <div className="rounded-2xl border border-white/15 bg-ink-900/95 p-3 shadow-2xl backdrop-blur sm:p-4">
        <p className="text-[13px] leading-snug text-white/75">
          Cookies do analityki i reklam —{' '}
          <a href="polityka-prywatnosci.html" className="font-medium text-gold-300 underline">
            szczegóły
          </a>
          .
        </p>
        <div className="mt-2.5 flex gap-2">
          <button type="button" onClick={reject} className="btn-ghost flex-1 whitespace-nowrap !px-3 !py-2 !text-[13px]">
            Tylko niezbędne
          </button>
          <button type="button" onClick={accept} className="btn-primary flex-1 whitespace-nowrap !px-3 !py-2 !text-[13px]">
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  )
}
