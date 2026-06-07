# Kamil Bronisz — strona-ekspert i maszyna do leadów OZE

Nowoczesna, premium strona nastawiona na **pozyskiwanie leadów** dla sprzedaży:
inteligentnych **magazynów energii z AI**, **fotowoltaiki z magazynem**, systemów
**zarządzania energią domu (HEMS)**, **taryf dynamicznych** i konsultingu energetycznego.

Sercem strony jest **interaktywny kalkulator oszczędności z lead magnetem** — przed
pełnymi wynikami użytkownik zostawia dane kontaktowe, które trafiają w gotowej, płaskiej
strukturze do dalszej automatyzacji (n8n / Airtable / Google Sheets / CRM).

Strona realizuje element **„Strona + kalkulator (lead magnet)"** ze strategii
*Maszyna do Leadów OZE 2026–2030* (priorytet #2) i jest przygotowana pod ruch z
**Meta Ads, Google Ads i SEO**.

---

## 🚀 Jak uruchomić

### Najprościej (Windows)
Kliknij dwukrotnie **`START-STRONA.bat`**. Przy pierwszym uruchomieniu zainstaluje
zależności, potem otworzy stronę pod `http://localhost:5174`.

### Ręcznie
```bash
npm install
npm run dev        # serwer deweloperski (http://localhost:5174)
npm run build      # produkcyjny build do folderu dist/
npm run preview    # podgląd buildu produkcyjnego
npm run typecheck  # sprawdzenie typów TypeScript
```

---

## 🧱 Technologia

- **Vite 5** + **React 18** + **TypeScript** (spójne z projektem „OZE Business Club")
- **Tailwind CSS 3** — system stylów, paleta: złoto / grafit / czerń + akcent niebieski
- **Framer Motion** — delikatne animacje wejścia, liczniki, wykresy
- **lucide-react** — ikony

Kod jest podzielony na komponenty, w pełni responsywny, zoptymalizowany pod SEO i
przygotowany pod dalszą rozbudowę.

---

## 📁 Struktura projektu

```
src/
├── data/content.ts            # CAŁA treść strony (teksty, FAQ, opinie) — edytuj tutaj
├── lib/
│   ├── calc.ts                # silnik kalkulatora + STAŁE rynkowe 2026 (do strojenia)
│   ├── leads.ts               # wysyłka i struktura leada + wstępny lead scoring
│   ├── analytics.ts           # zdarzenia dataLayer (GTM / Google Ads / Meta Pixel)
│   └── format.ts              # formatowanie liczb (pl-PL)
├── components/
│   ├── Navbar, Hero, Benefits, Process, About,
│   │   Testimonials, FAQ, FinalCTA, Contact, Footer, FloatingActions
│   ├── calculator/            # Calculator (orkiestrator), Form, LeadGate, Results, SavingsChart
│   └── ui/                    # Reveal, SmartImage, CountUp, Logo, Icon
└── App.tsx                    # kolejność sekcji
```

### Gdzie co zmienić
- **Teksty, dane kontaktowe, FAQ, opinie** → `src/data/content.ts`
- **Założenia kalkulatora** (ceny energii, uzysk PV, koszty, dotacje) → sekcja `STAŁE`
  w `src/lib/calc.ts`
- **Zdjęcie Kamila** → podmień `src/assets/kamil-bronisz.jpg`
- **Numery telefonu / e-mail / WhatsApp / social** → `site` w `src/data/content.ts`

---

## 🎯 Sekcje strony

1. **Hero** — nagłówek o 90% oszczędności + 2× CTA (analiza / kalkulator) + statystyki
2. **Dlaczego warto** — 6 korzyści (niższe rachunki, bezpieczeństwo, backup, AI, wartość
   nieruchomości, taryfy dynamiczne)
3. **Jak wygląda współpraca** — 4 kroki (analiza → projekt → montaż → opieka)
4. **O mnie** — Kamil Bronisz jako ekspert od magazynów energii i HEMS
5. **Kalkulator oszczędności** — interaktywny, z lead magnetem (patrz niżej)
6. **Opinie klientów**
7. **FAQ** — 6 pytań zgodnych z briefem (+ dane strukturalne FAQ)
8. **CTA końcowe** — „Sprawdź ile możesz zaoszczędzić"
9. **Kontakt** — formularz rezerwacji bezpłatnej analizy

---

## 🧮 Jak działa kalkulator + lead magnet

Przepływ: **Formularz → Bramka leadowa (lead magnet) → Pełne wyniki**

1. Klient podaje: miesięczny rachunek / roczne zużycie, województwo, rodzaj obiektu
   (dom / firma / gospodarstwo) oraz opcjonalnie: pompa ciepła, samochód elektryczny,
   klimatyzacja, taryfa dynamiczna.
2. Po kliknięciu „Oblicz oszczędności" pokazuje się **haczyk** (szacowane roczne
   oszczędności) i formularz: **imię, telefon, e-mail, kod pocztowy, zgoda marketingowa**.
3. Po zapisaniu danych odblokowują się **pełne wyniki**: rekomendowana moc PV, pojemność
   magazynu, autokonsumpcja (pierścień), roczne oszczędności, projekcja 10/20 lat (wykres),
   **czas zwrotu PO dofinansowaniu**, dofinansowanie, redukcja CO₂.

> Kalkulator uwzględnia dofinansowanie z zapowiedzianego programu **„Przydomowe Magazyny Energii"**
> — dotacja wyłącznie na **magazyn energii, maks. 16 000 zł**. Program **nie obejmuje dofinansowania
> do paneli PV**. Model **zakłada z góry korzystanie z taryfy dynamicznej** i obecny, duży arbitraż
> cenowy — dzięki temu orientacyjny czas zwrotu typowej instalacji domowej to ok. **3,8–4,4 lat**,
> a dla obiektów z **samochodem elektrycznym / hybrydą plug-in** (ładowanie w tanich godzinach) jest
> jeszcze krótszy. Parametry programu, arbitrażu i kosztów ustawisz w sekcji `STAŁE` w `src/lib/calc.ts`.

> ⚠️ Wyniki są **orientacyjne** (założenia w `src/lib/calc.ts`) i służą jako narzędzie
> generujące leady — dokładne wyliczenie powstaje na bezpłatnej analizie.

---

## 🔌 Integracja leadów (n8n / Airtable / Google Sheets / CRM)

Każdy lead (z kalkulatora i z formularza kontaktowego) przechodzi przez `submitLead()`
w `src/lib/leads.ts`:

- Jeśli ustawisz zmienną **`VITE_LEAD_WEBHOOK_URL`** → lead leci `POST`-em (JSON) na ten
  adres. **To jest tryb produkcyjny.**
- Jeśli zmiennej brak → lead zapisuje się w `localStorage` (tryb deweloperski) i loguje w
  konsoli. Można go wyeksportować funkcją `exportLocalLeads()`.

### Konfiguracja
1. Skopiuj `.env.example` → `.env`
2. Wklej adres webhooka (najwygodniej **n8n** lub **Make.com**):
   ```
   VITE_LEAD_WEBHOOK_URL=https://twoj-n8n.example.com/webhook/leady-oze
   VITE_WHATSAPP=48512491787
   ```

### Struktura payloadu (płaska — mapuje się 1:1 na kolumny Airtable / Sheets)
```jsonc
{
  "name": "Jan Kowalski", "phone": "600100200", "email": "jan@example.com",
  "postalCode": "40-750", "consent": true,
  "objectType": "dom", "voivodeship": "slaskie",
  "monthlyBill": 600, "annualConsumption": 0,
  "heatPump": true, "ev": false, "ac": false, "dynamicTariff": true,
  "pvPowerKwp": 7.5, "storageKwh": 12, "selfConsumptionPct": 83,
  "annualSavings": 7200, "savings10y": 90500, "savings20y": 238000,
  "paybackYears": 6.4, "investmentNet": 41000, "subsidy": 16000, "co2PerYear": 4900,
  "source": "kalkulator", "submittedAt": "2026-06-06T17:13:39Z",
  "pageUrl": "...", "referrer": "...",
  "utmSource": "facebook", "utmMedium": "cpc", "utmCampaign": "magazyny-2026",
  "utmTerm": "", "utmContent": "wariant-a",
  "leadScore": 78, "leadTemperature": "goracy"
}
```

### Przykładowy scenariusz n8n / Make (zgodny ze strategią)
`Webhook → utwórz/aktualizuj kontakt w CRM → (leadTemperature) → SMS+e-mail z analizą →
jeśli „goracy": link do kalendarza (Cal.com) → przypomnienia 24h/2h → powiadomienie na WhatsApp`.

Pola `utm_*` są automatycznie czytane z adresu URL — gotowe pod atrybucję kampanii.

---

## 📈 Analityka i konwersje (Meta Ads / Google Ads)

`src/lib/analytics.ts` wypycha zdarzenia do `window.dataLayer` (oraz do Meta Pixela,
jeśli `fbq` jest obecne). Kluczowe zdarzenia:

| Zdarzenie               | Kiedy                                  | Konwersja |
|-------------------------|----------------------------------------|-----------|
| `calculator_complete`   | po przeliczeniu kalkulatora            | mikro     |
| `lead_submit`           | po zostawieniu danych (lead!)          | **główna**|
| `cta_click`             | kliknięcia w CTA (z etykietą)          | pomocnicza|

Wystarczy wpiąć **Google Tag Manager** (lub Meta Pixel) w `index.html` i ustawić te
zdarzenia jako konwersje w Meta Ads / Google Ads.

---

## 🔍 SEO

- `title`, `meta description`, `keywords`, **Open Graph** i **Twitter Card** → `index.html`
- **Dane strukturalne** schema.org: `ProfessionalService` + `Person` + `FAQPage`
- Hierarchia nagłówków **H1 → H2 → H3**, frazy: *magazyn energii, fotowoltaika z magazynem
  energii, inteligentny magazyn energii z AI, inteligentny dom, zarządzanie energią, taryfy dynamiczne*
- `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`

> Po wdrożeniu na docelową domenę zmień adresy `https://kamilbronisz.pl/` w `index.html`,
> `robots.txt`, `sitemap.xml` oraz wgraj grafikę `public/og-image.jpg` (1200×630).

---

## ☁️ Wdrożenie

Statyczny build (`npm run build` → folder `dist/`). Hosting: **Netlify**, **Cloudflare
Pages** lub **Vercel** (plik `public/_redirects` zapewnia poprawne działanie SPA).
Pamiętaj o ustawieniu `VITE_LEAD_WEBHOOK_URL` w zmiennych środowiskowych hostingu.

---

## 🛣️ Kolejne etapy rozwoju

Patrz sekcja „Kolejne etapy" na końcu rozmowy / w podsumowaniu — m.in. integracja z CRM,
automatyzacja przez Make.com, lead scoring, chatbot AI, raporty PDF, panel klienta oraz
system poleceń.
