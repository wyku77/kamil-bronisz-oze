/**
 * Generuje ikony PNG (PWA + apple-touch) z public/favicon.svg.
 * Uruchom: node scripts/generate-icons.mjs
 */
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const svg = readFileSync('public/favicon.svg')
const out = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const { name, size } of out) {
  await sharp(svg, { density: 512 }).resize(size, size).png().toFile('public/' + name)
  console.log(`public/${name} — ${size}x${size}`)
}
