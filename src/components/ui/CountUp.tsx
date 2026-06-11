import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type CountUpProps = {
  to: number
  from?: number
  /** Czas trwania animacji w sekundach. */
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Formatuj liczbę z separatorami tysięcy (pl-PL). */
  separator?: boolean
  className?: string
}

/**
 * Animowany licznik (count-up). Startuje, gdy element pojawi się w viewport.
 * Reaguje na zmianę `to` (np. po przeliczeniu kalkulatora) — animuje od bieżącej wartości.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = true,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(from)
  const startedFrom = useRef(from)

  useEffect(() => {
    if (!inView) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(to)
      return
    }

    const start = startedFrom.current
    const startTime = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(start + (to - start) * eased)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        startedFrom.current = to
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  const fmt = (n: number) =>
    new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: separator,
    }).format(n)

  const formatted = fmt(value)
  const finalText = `${prefix}${fmt(to)}${suffix}`

  // „Duch" rezerwuje docelową szerokość, więc liczba animuje się w miejscu —
  // bez przeskakiwania układu (layout shift) podczas zliczania.
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-grid', fontVariantNumeric: 'tabular-nums' }}
    >
      <span aria-hidden="true" style={{ visibility: 'hidden', gridArea: '1 / 1' }}>
        {finalText}
      </span>
      <span style={{ gridArea: '1 / 1' }}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  )
}
