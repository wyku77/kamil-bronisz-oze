type LogoProps = {
  className?: string
  href?: string
}

/**
 * Logo marki osobistej: Kamil Bronisz — Konsultant energetyczny.
 * Wspólne dla strony głównej i podstrony Czyste Powietrze (src/cp/). Wzór:
 * ikona 40 px (radius 12, gradient 135° #ecd28a → #d4a017 → #bb8718), nazwa Sora 800 18 px,
 * podpis 11 px, wersaliki, odstęp liter 0.14em, w jednej linii.
 */
export function Logo({ className = '', href = '#top' }: LogoProps) {
  return (
    <a
      href={href}
      className={`group flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="Kamil Bronisz — strona główna"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#ecd28a_0%,#d4a017_55%,#bb8718_100%)] shadow-glow-gold transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-950" fill="currentColor" aria-hidden="true">
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-[18px] font-extrabold leading-none tracking-[-0.01em] text-white">
          Kamil <span className="text-gradient">Bronisz</span>
        </span>
        <span className="mt-[5px] whitespace-nowrap text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-white/60">
          Konsultant energetyczny
        </span>
      </span>
    </a>
  )
}
