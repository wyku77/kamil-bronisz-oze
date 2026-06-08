/**
 * Optymalizacja logotypów marek: ujednolicenie rozmiaru i nazw → src/assets/marki.
 * Uruchom: npm i --no-save sharp && node scripts/optimize-marki.mjs
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC = 'ikony'
const OUT = 'src/assets/marki'
mkdirSync(OUT, { recursive: true })

const map = {
  deye: 'deye.png',
  foxess: 'foxess.jpg',
  jinko: 'jinko.png',
  lesso: 'lesso.png',
  sigenergy: 'sigenergy.png',
  solax: 'solax.png',
  'tw solar': 'tw-solar.jpg',
}

for (const f of readdirSync(SRC)) {
  const base = f.replace(/\.[^.]+$/, '').toLowerCase()
  const out = map[base]
  if (!out) continue
  const ext = extname(out).slice(1)
  let img = sharp(join(SRC, f)).resize({ width: 400, height: 120, fit: 'inside', withoutEnlargement: true })
  img = ext === 'png' ? img.png({ quality: 90 }) : img.jpeg({ quality: 85 })
  const info = await img.toFile(join(OUT, out))
  console.log(`${out} — ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`)
}
