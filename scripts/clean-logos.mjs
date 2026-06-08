// Normalizuje loga producentów: usuwa wklejone tło (szachownica/biel) z Panasonica
// i Midei, przycina marginesy wszystkich logo dla równego rozmiaru.
// Uruchom: node scripts/clean-logos.mjs
import sharp from 'sharp'
import fs from 'node:fs'

const dir = 'public/loga-producentow/'

// Wytnij jasne/szare tło (białe + szachownica) na przezroczystość, potem przytnij.
async function keyoutLight(inFile, outFile) {
  const buf = fs.readFileSync(dir + inFile)
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const ch = info.channels
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
    // piksel „tła": mało nasycony (szary/biały) i jasny → przezroczysty
    if (mx - mn < 30 && mn > 150) data[i + 3] = 0
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } })
    .trim({ threshold: 10 })
    .png()
    .toFile(dir + outFile)
}

// Tylko przytnij margines (zachowaj tło/kolory).
async function trimOnly(inFile, outFile) {
  const buf = fs.readFileSync(dir + inFile)
  await sharp(buf).trim({ threshold: 12 }).toFile(dir + outFile)
}

await keyoutLight('panasonic.png', 'panasonic.png')
await keyoutLight('Midea.jpg', 'Midea.png')
await trimOnly('Ferroli.png', 'Ferroli.png')
await trimOnly('kfa-armatura.png', 'kfa-armatura.png')
await trimOnly('pereko.jpg', 'pereko.jpg')
await trimOnly('walendowscy.png', 'walendowscy.png')
console.log('Loga znormalizowane.')
