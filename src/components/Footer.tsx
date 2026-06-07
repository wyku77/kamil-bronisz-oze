import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react'
import { nav, site } from '../data/content'
import { Logo } from './ui/Logo'

const socialLinks = [
  { key: 'facebook', icon: Facebook, label: 'Facebook', hover: 'hover:bg-[#1877F2]' },
  { key: 'instagram', icon: Instagram, label: 'Instagram', hover: 'hover:bg-[#E4405F]' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', hover: 'hover:bg-[#0A66C2]' },
  { key: 'youtube', icon: Youtube, label: 'YouTube', hover: 'hover:bg-[#FF0000]' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const socials = socialLinks.filter((s) => site.social[s.key])

  return (
    <footer className="border-t border-white/10 bg-ink-900 text-white/70">
      <div className="container-px py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr]">
          {/* Marka */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {site.tagline} Projektuję inteligentne systemy: magazyny energii z AI, fotowoltaika, zarządzanie
              energią domu (HEMS) i taryfy dynamiczne — dla domów i firm.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={site.social[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`grid h-10 w-10 place-items-center rounded-xl bg-white/5 transition-colors hover:text-white ${s.hover}`}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nawigacja */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Nawigacja</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-gold-300">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Kontakt</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-gold-300">
                  <Phone className="h-4 w-4 text-gold-400" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-center gap-2.5 transition-colors hover:text-gold-300">
                  <Mail className="h-4 w-4 text-gold-400" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.area}
              </li>
            </ul>
            <a href="#kontakt" className="btn-primary mt-5 !py-2.5 !text-sm">
              Bezpłatna analiza
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {site.name} — {site.role}.
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-gold-300">
              Polityka prywatności
            </a>
            <a href="#" className="transition-colors hover:text-gold-300">
              RODO
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
