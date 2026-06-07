import { ArrowRight } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { track } from '../lib/analytics'

type Props = {
  text: string
  button: string
  href: string
  label: string
}

/** Lekki pasek CTA wstawiany pomiędzy sekcjami (zwiększa liczbę punktów konwersji). */
export function SectionCTA({ text, button, href, label }: Props) {
  return (
    <div className="bg-ink-950 py-6">
      <div className="container-px">
        <Reveal className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold-400/20 bg-gradient-to-r from-gold-400/12 via-white/[0.03] to-transparent px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="font-display text-base font-semibold text-white sm:text-lg">{text}</p>
          <a href={href} onClick={() => track.ctaClick(label)} className="btn-primary group shrink-0">
            {button}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </div>
  )
}
