/**
 * Prerendering strony głównej (SPA → statyczny HTML).
 *
 * Po `vite build` strona to pusty <div id="root"></div> — roboty (Bing, social,
 * crawlery AI) nie wykonują JS i widzą pustą stronę. Ten skrypt uruchamia realną
 * przeglądarkę (Chromium), renderuje aplikację i wstrzykuje gotową treść do
 * dist/index.html. React następnie „hydratuje" istniejący DOM (patrz main.tsx).
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
const indexPath = resolve('dist/index.html')

const server = await preview({ preview: { port: PORT, strictPort: true } })
const url = `http://localhost:${PORT}/`

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  // Ograniczamy ruch — liczniki i animacje wejścia od razu ustawiają stan końcowy.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('#root > *', { timeout: 30000 })
  // Daj animacjom wejścia (framer-motion) chwilę na ustabilizowanie się.
  await new Promise((r) => setTimeout(r, 2000))

  const rootHtml = await page.$eval('#root', (el) => el.innerHTML)

  const template = readFileSync(indexPath, 'utf8')
  const out = template.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${rootHtml}</div>`,
  )

  if (out === template) {
    throw new Error('Nie znaleziono pustego <div id="root"></div> w dist/index.html')
  }

  writeFileSync(indexPath, out, 'utf8')
  console.log(`✓ Prerender: wstrzyknięto ${rootHtml.length} B treści do dist/index.html`)
} finally {
  await browser.close()
  await server.httpServer.close()
}

process.exit(0)
