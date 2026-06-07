import { Check, Sparkles, X } from 'lucide-react'
import { approach } from '../data/content'
import { Reveal } from './ui/Reveal'

export function Approach() {
  return (
    <section id="dlaczego-ja" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{approach.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">{approach.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{approach.lead}</p>
        </Reveal>

        {/* Kontrast: akwizytor vs konsultant */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          <Reveal direction="right" className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p className="font-display text-lg font-bold text-white/80">{approach.bad.title}</p>
            <ul className="mt-4 space-y-3">
              {approach.bad.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-white/55">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400">
                    <X className="h-3 w-3" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            direction="left"
            className="rounded-3xl border border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-ink-900 p-6 shadow-glow-gold"
          >
            <p className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <Sparkles className="h-4 w-4 text-gold-300" /> {approach.good.title}
            </p>
            <ul className="mt-4 space-y-3">
              {approach.good.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <Check className="h-3 w-3" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Tabela porównawcza */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <h3 className="text-center font-display text-lg font-bold text-white">{approach.table.title}</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-left">
                  <th className="px-4 py-3 font-medium text-white/60">{approach.table.head[0]}</th>
                  <th className="px-4 py-3 text-center font-medium text-white/60">{approach.table.head[1]}</th>
                  <th className="px-4 py-3 text-center font-semibold text-gold-300">{approach.table.head[2]}</th>
                </tr>
              </thead>
              <tbody>
                {approach.table.rows.map((r, i) => (
                  <tr key={r.label} className={i % 2 ? 'bg-white/[0.015]' : ''}>
                    <td className="px-4 py-3 text-white/75">{r.label}</td>
                    <td className="px-4 py-3 text-center text-white/45">{r.pv}</td>
                    <td className="px-4 py-3 text-center font-medium text-gold-200">{r.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
