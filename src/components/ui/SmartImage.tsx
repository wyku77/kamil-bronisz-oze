import { useEffect, useState } from 'react'

type SmartImageProps = {
  src: string
  alt: string
  className?: string
  /** Eager-load tylko dla obrazów „above the fold” (np. hero). */
  priority?: boolean
  /** Zapasowe źródło (np. zdjęcie poglądowe), gdy główne się nie wczyta. */
  fallbackSrc?: string
}

/**
 * Obraz z eleganckim fallbackiem.
 * Kolejność: src → fallbackSrc → gradient z ikoną.
 */
export function SmartImage({ src, alt, className = '', priority = false, fallbackSrc }: SmartImageProps) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setCurrent(src)
    setFailed(false)
  }, [src])

  const handleError = () => {
    if (fallbackSrc && current !== fallbackSrc) {
      setCurrent(fallbackSrc)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-14 w-14 text-gold-400/40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      // @ts-expect-error „fetchpriority" (małymi literami) to poprawny atrybut HTML — React renderuje go do DOM bez ostrzeżenia
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={handleError}
      className={className}
    />
  )
}
