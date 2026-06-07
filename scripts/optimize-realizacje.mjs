/**
 * Optymalizacja zdjęć realizacji: auto-orientacja (EXIF), zmniejszenie do maks.
 * 1400 px i kompresja JPEG. Źródło: /realizacje → wynik: /src/assets/realizacje.
 * Uruchom: npm i --no-save sharp && node scripts/optimize-realizacje.mjs
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const SRC = 'realizacje'
const OUT = 'src/assets/realizacje'
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f))
for (const f of files) {
  const out = join(OUT, parse(f).name + '.jpg')
  const info = await sharp(join(SRC, f))
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out)
  console.log(`${parse(f).name}.jpg — ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`)
}
