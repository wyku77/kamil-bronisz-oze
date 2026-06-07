/**
 * Generator grafiki Open Graph (1200×630) dla podglądu strony w social media.
 * Uruchom: npm i --no-save @resvg/resvg-js  &&  node scripts/generate-og.mjs
 * Wynik: public/og-image.png
 */
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'node:fs'

const W = 1200
const H = 630

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a1018"/>
      <stop offset="1" stop-color="#131c2b"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f3d27a"/>
      <stop offset="1" stop-color="#c9971f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.12" r="0.6">
      <stop offset="0" stop-color="#e1bd5b" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#e1bd5b" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- akcent -->
  <rect x="80" y="96" width="64" height="6" rx="3" fill="url(#gold)"/>

  <!-- eyebrow -->
  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600"
        letter-spacing="3" fill="#cbd5e1">MAGAZYNY ENERGII &#183; FOTOWOLTAIKA &#183; HEMS</text>

  <!-- headline -->
  <text x="78" y="268" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="800" fill="#ffffff">Obni&#380; rachunki za energi&#281;</text>
  <text x="78" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="800" fill="#ffffff">nawet o <tspan fill="url(#gold)">90%</tspan></text>

  <!-- subline -->
  <text x="80" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="500" fill="#9fb0c3">Inteligentne magazyny energii z AI, taryfy dynamiczne</text>
  <text x="80" y="472" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="500" fill="#9fb0c3">i pe&#322;na niezale&#380;no&#347;&#263; energetyczna.</text>

  <!-- stopka: nazwisko -->
  <text x="80" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Kamil Bronisz</text>
  <text x="80" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff" opacity="0">Kamil Bronisz</text>
  <text x="318" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="500" fill="url(#gold)">&#8212; ekspert OZE</text>

  <!-- ramka -->
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="28" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
</svg>`

mkdirSync('public', { recursive: true })
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: W },
  font: { loadSystemFonts: true },
  background: '#0a1018',
})
const png = resvg.render().asPng()
writeFileSync('public/og-image.png', png)
console.log(`OK: public/og-image.png (${png.length} bajtow, ${W}x${H})`)
