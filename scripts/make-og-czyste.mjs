// Generuje dedykowany OG-image dla podstrony Czyste Powietrze (1200x630).
// Uruchom: node scripts/make-og-czyste.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/czyste-powietrze-og.png')

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c131d"/>
      <stop offset="1" stop-color="#0a0f17"/>
    </linearGradient>
    <radialGradient id="glow" cx="16%" cy="14%" r="65%">
      <stop offset="0" stop-color="#e1bd5b" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#e1bd5b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ecd28a"/>
      <stop offset="1" stop-color="#d4a017"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="10" height="630" fill="url(#gold)"/>

  <!-- marka -->
  <g transform="translate(80,66)" font-family="Segoe UI, Arial, sans-serif">
    <rect width="64" height="64" rx="16" fill="url(#gold)"/>
    <text x="32" y="43" font-size="30" font-weight="800" fill="#0a1018" text-anchor="middle">KB</text>
    <text x="84" y="26" font-size="26" font-weight="700" fill="#ffffff">Kamil Bronisz</text>
    <text x="84" y="52" font-size="15" letter-spacing="2" fill="#9fb0c3">KONSULTANT ENERGETYCZNY</text>
  </g>

  <!-- eyebrow -->
  <g transform="translate(80,176)" font-family="Segoe UI, Arial, sans-serif">
    <rect width="196" height="40" rx="20" fill="#e1bd5b" fill-opacity="0.12" stroke="#e1bd5b" stroke-opacity="0.30"/>
    <text x="24" y="26" font-size="16" font-weight="700" letter-spacing="3" fill="#ecd28a">DOTACJE 2026</text>
  </g>

  <!-- naglowek -->
  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="78" y="300" font-size="88" font-weight="800" fill="#e9c97a">Czyste Powietrze</text>
    <text x="80" y="356" font-size="38" font-weight="700" fill="#ffffff">Dotacja na wymianę pieca i termomodernizację</text>
    <text x="80" y="406" font-size="25" fill="#c4d0dd">Pompa ciepła &#8226; piec peletowy &#8226; piec zgazowujący drewno</text>
  </g>

  <!-- statystyka -->
  <g transform="translate(80,452)" font-family="Segoe UI, Arial, sans-serif">
    <text x="0" y="64" font-size="74" font-weight="800" fill="#ffffff">od <tspan fill="#e9c97a">40%</tspan> do <tspan fill="#e9c97a">100%</tspan></text>
    <text x="0" y="104" font-size="22" fill="#9fb0c3">kosztów kwalifikowanych</text>
  </g>

  <text x="1120" y="596" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#9fb0c3" text-anchor="end">woj. lubelskie &#8226; formalności biorę na siebie</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Zapisano:', out)
