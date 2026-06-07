/**
 * Optymalizacja zdjęcia hero: auto-orientacja (EXIF), odcięcie dolnego paska
 * ze znakiem wodnym AI, zmniejszenie i kompresja. Uruchom: node scripts/optimize-hero.mjs
 */
import sharp from 'sharp'

const src = 'realizacje/20241212_134324(1).jpg'
const out = 'src/assets/realizacje/20241212_134324-1.jpg'

const { data, info } = await sharp(src).rotate().toBuffer({ resolveWithObject: true })
const cropH = Math.round(info.height * 0.94) // utnij dolny ~6% (znak wodny „Treść generowana przez AI")

const res = await sharp(data)
  .extract({ left: 0, top: 0, width: info.width, height: cropH })
  .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out)

console.log(`${out} — ${Math.round(res.size / 1024)} KB (${res.width}x${res.height})`)
