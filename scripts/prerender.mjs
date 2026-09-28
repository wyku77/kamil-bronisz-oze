/**
 * Prerendering stron (SPA → statyczny HTML): strona główna i podstrona Czyste Powietrze.
 *
 * Po `vite build` strony to pusty <div id="root"></div> — roboty (Bing, social,
 * crawlery AI) nie wykonują JS i widzą pustą stronę. Ten skrypt uruchamia realną
 * przeglądarkę (Chromium), renderuje aplikację i wstrzykuje gotową treść do
 * dist/*.html. React następnie renderuje stronę od nowa (patrz src/main.tsx).
 *
 * Wstrzykujemy WYŁĄCZNIE zawartość #root — nagłówek <head> (meta, dane
 * strukturalne, fonty) zostaje nietknięty, więc nic się nie dubluje.
 *
 * Uruchamiane automatycznie jako `postbuild` (po `npm run build`).
 */
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PORT = 4188
const PAGES = [
  { path: '/', file: 'dist/index.html' },
  { path: '/czyste-powietrze.html', file: 'dist/czyste-powietrze.html' },
]

const server = await preview({ preview: { port: PORT, strictPort: true } })
const origin = `http://localhost:${PORT}`

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  for (const { path, file } of PAGES) {
    const page = await browser.newPage()
    // Ograniczamy ruch — liczniki i animacje wejścia od razu ustawiają stan końcowy.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await page.goto(origin + path, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForSelector('#root > *', { timeout: 30000 })
    // Daj animacjom wejścia (framer-motion) chwilę na ustabilizowanie się.
    await new Promise((r) => setTimeout(r, 2000))

    const rawRootHtml = await page.$eval('#root', (el) => el.innerHTML)
    await page.close()
    // Puppeteer serializuje bezwzględne URL-e zasobów z origin podglądu
    // (http://localhost:4188/assets/...). Na produkcji muszą być względne, więc
    // usuwamy origin — zostają ścieżki typu /assets/... (działają na kamilbronisz.pl).
    const rootHtml = rawRootHtml.split(origin).join('')

    const filePath = resolve(file)
    const template = readFileSync(filePath, 'utf8')
    const out = template.replace(/<div id="root"><\/div>/, `<div id="root">${rootHtml}</div>`)

    if (out === template) {
      throw new Error(`Nie znaleziono pustego <div id="root"></div> w ${file}`)
    }

    writeFileSync(filePath, out, 'utf8')
    console.log(`✓ Prerender ${path}: wstrzyknięto ${rootHtml.length} B treści do ${file}`)
  }
} finally {
  await browser.close()
  await server.httpServer.close()
}

process.exit(0)
