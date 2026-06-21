import { CheckCircle2, Clock, Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Youtube } from 'lucide-react'
import { about, site } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Icon } from './ui/Icon'
import { SmartImage } from './ui/SmartImage'

const socialLinks = [
  { key: 'facebook', icon: Facebook, label: 'Facebook' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'youtube', icon: Youtube, label: 'YouTube' },
] as const

export function About() {
  const socials = socialLinks.filter((s) => site.social[s.key])

  return (
    <section id="o-mnie" className="section relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Zdjęcie + karty */}
        <Reveal direction="right" className="relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-gold-400/20">
            <SmartImage
              src={about.photo}
              alt={`${about.name} — ${about.role}`}
              className="h-[460px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-2xl font-bold text-white">{about.name}</p>
              <p className="text-sm text-gold-300">{about.role}</p>
            </div>
          </div>

          {/* Karta — czas odpowiedzi */}
          <div className="absolute -right-3 top-8 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
            <Clock className="h-4 w-4 text-gold-300" />
            <div className="leading-tight">
              <p className="text-[11px] text-white/60">Kontakt</p>
              <p className="text-sm font-bold text-white">w ciągu 1 h</p>
            </div>
          </div>
        </Reveal>

        {/* Treść */}
        <Reveal direction="left">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="mt-5 h-section text-white">
            Twój konsultant od <span className="text-gradient">magazynów energii</span> i zarządzania energią
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{about.lead}</p>

          <div className="mt-5 space-y-3 text-white/60">
            {about.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Wyróżniki specjalizacji */}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((h) => (
              <li key={h.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-400/15 text-gold-300">
                  <Icon name={h.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/80">{h.label}</span>
              </li>
            ))}
          </ul>

          {/* Kontakt + social — na mobile Facebook ląduje w jednym wierszu z E-mailem;
              na desktopie social jest odsunięty na prawo (sm:ml-auto). */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={site.phoneHref} className="btn-primary !py-2.5 !text-sm">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2.5 !text-sm"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={site.emailHref} className="btn-ghost !py-2.5 !text-sm">
              <Mail className="h-4 w-4" /> E-mail
            </a>

            {socials.length > 0 && (
              <div className="flex gap-2 sm:ml-auto">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={site.social[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold-400/40 hover:text-gold-300"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-white/65">
            <CheckCircle2 className="h-4 w-4 text-gold-300" />
            {about.badges.join(' • ')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
