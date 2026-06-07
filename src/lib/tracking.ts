/**
 * Wpięcie narzędzi marketingowych (GTM / Meta Pixel / Google Ads).
 * ID ustawiasz w zmiennych środowiskowych (VITE_*) — np. w GitHub Actions.
 * Skrypty ładują się DOPIERO po zgodzie na cookies (patrz ConsentBanner).
 *
 * Rekomendacja: użyj samego GTM (VITE_GTM_ID), a Meta Pixel i Google Ads
 * skonfiguruj w panelu GTM na zdarzeniach z dataLayer (lead_submit, ...).
 * Alternatywnie wpnij Pixel/Ads bezpośrednio przez ich ID.
 */
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined
const GADS_ID = import.meta.env.VITE_GADS_ID as string | undefined

/** Czy skonfigurowano jakiekolwiek narzędzie (czy w ogóle pokazywać baner cookie). */
export const hasTrackers = Boolean(GTM_ID || META_PIXEL_ID || GADS_ID)

let loaded = false

/** Ładuje skonfigurowane narzędzia śledzące (idempotentnie, po zgodzie). */
export function loadTrackers(): void {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  const w = window as unknown as Record<string, any>

  // Google Tag Manager
  if (GTM_ID) {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID
    document.head.appendChild(s)
  }

  // Google Ads (gtag.js)
  if (GADS_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GADS_ID
    document.head.appendChild(s)
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
      // gtag wymaga oryginalnego obiektu arguments
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', GADS_ID)
  }

  // Meta (Facebook) Pixel
  if (META_PIXEL_ID) {
    if (!w.fbq) {
      const n: any = function () {
        // eslint-disable-next-line prefer-rest-params
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      w.fbq = n
      if (!w._fbq) w._fbq = n
      const t = document.createElement('script')
      t.async = true
      t.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(t)
    }
    w.fbq('init', META_PIXEL_ID)
    w.fbq('track', 'PageView')
  }
}
