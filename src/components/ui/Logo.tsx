type LogoProps = {
  className?: string
  href?: string
}

/** Logo marki osobistej: Kamil Bronisz — Konsultant energetyczny. */
export function Logo({ className = '', href = '#top' }: LogoProps) {
  return (
    <a
      href={href}
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label="Kamil Bronisz — strona główna"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 shadow-glow-gold transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-950" fill="currentColor">
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          Kamil <span className="text-gradient">Bronisz</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
          Konsultant energetyczny
        </span>
      </span>
    </a>
  )
}
