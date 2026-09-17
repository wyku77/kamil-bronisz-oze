/**
 * Centralne miejsce z treścią strony.
 * Edytuj teksty, dane kontaktowe, korzyści, opinie i FAQ tutaj —
 * komponenty automatycznie pobierają dane z tego pliku.
 */

// Zdjęcie importowane jako moduł — Vite sam ustawia poprawny adres (działa też
// pod ścieżką GitHub Pages /kamil-bronisz-oze/). Aby zmienić zdjęcie, podmień plik
// src/assets/kamil-bronisz.jpg.
import kamilPhoto from '../assets/kamil-bronisz.jpg'

// Zdjęcia realizacji (zoptymalizowane) — przypisane do opinii klientów.
import r1 from '../assets/realizacje/20241212_134324.jpg'
import r2 from '../assets/realizacje/20254688_15685.jpg'
import r3 from '../assets/realizacje/IMG-20260129-WA0007.jpg'
import r4 from '../assets/realizacje/IMG-20260402-WA0005.jpg'
import r5 from '../assets/realizacje/IMG-20260402-WA0007.jpg'
import r6 from '../assets/realizacje/IMG-20260415-WA0003.jpg'

// Logotypy marek (pełny kolor) — pasek zaufania pod hero.
import logoSigenergy from '../assets/marki/sigenergy.png'
import logoFoxess from '../assets/marki/foxess.jpg'
import logoSolax from '../assets/marki/solax.png'
import logoDeye from '../assets/marki/deye.png'
import logoJinko from '../assets/marki/jinko.png'
import logoLesso from '../assets/marki/lesso.png'
import logoTwsolar from '../assets/marki/tw-solar.jpg'

// Ikony 3D (Higgsfield) — sekcje Dlaczego warto, Współpraca, O mnie
import icNizszeRachunki from '../assets/grafiki/ikony/nizsze-rachunki.webp'
import icZasilanieAwaryjne from '../assets/grafiki/ikony/zasilanie-awaryjne.webp'
import icZarzadzanieAi from '../assets/grafiki/ikony/zarzadzanie-ai.webp'
import icZyskTaryfy from '../assets/grafiki/ikony/zysk-taryfy.webp'
import icAnaliza from '../assets/grafiki/ikony/analiza.webp'
import icProjekt from '../assets/grafiki/ikony/projekt.webp'
import icMontaz from '../assets/grafiki/ikony/montaz.webp'
import icOpieka from '../assets/grafiki/ikony/opieka.webp'
import icMagazyn from '../assets/grafiki/ikony/magazyn.webp'
import icHems from '../assets/grafiki/ikony/hems.webp'
import icTaryfy from '../assets/grafiki/ikony/taryfy.webp'
import icDotacje from '../assets/grafiki/ikony/dotacje.webp'

export const brands = {
  label: 'Pracuję na sprawdzonym sprzęcie uznanych marek',
  items: [
    { src: logoSigenergy, alt: 'Sigenergy' },
    { src: logoFoxess, alt: 'FoxESS' },
    { src: logoSolax, alt: 'SolaX' },
    { src: logoDeye, alt: 'Deye' },
    { src: logoJinko, alt: 'Jinko Solar' },
    { src: logoLesso, alt: 'Lesso' },
    { src: logoTwsolar, alt: 'TW-Solar' },
  ],
}

export const site = {
  name: 'Kamil Bronisz',
  role: 'Konsultant energetyczny',
  tagline: 'Niezależność energetyczna, którą widać na rachunku.',
  phone: '512 491 787',
  phoneHref: 'tel:+48512491787',
  email: 'kamil.bronisz@begolden.com.pl',
  emailHref: 'mailto:kamil.bronisz@begolden.com.pl',
  // WhatsApp w formacie międzynarodowym bez znaków (można nadpisać przez .env)
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '48512491787',
  // Wstępnie wypełniona wiadomość — niższy próg wejścia (pełnoprawna ścieżka leadowa)
  whatsappText:
    'Dzień dobry, chcę porozmawiać o magazynie energii i fotowoltaice. Proszę o kontakt.',
  get whatsappHref() {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(this.whatsappText)}`
  },
  area: 'Całe województwo lubelskie · analiza online w całej Polsce',
  social: {
    facebook: 'https://www.facebook.com/begoldenfotowoltaika',
    instagram: '',
    linkedin: '',
    youtube: '',
  },
}

export const nav = [
  { label: 'Magazyny', href: '#magazyny-energii' },
  { label: 'Kalkulator', href: '#kalkulator' },
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export const hero = {
  badge: 'Inteligentne magazyny energii • HEMS • Taryfy dynamiczne',
  title: 'Przestań oddawać energię do sieci za bezcen.',
  titleAccent: 'Zacznij ją magazynować.',
  titleEnd: '',
  subtitle:
    'Projektuję inteligentne systemy fotowoltaiczne z magazynami energii i zarządzaniem energią całego domu — dla domów i firm. Mniej rachunków, więcej kontroli.',
  primaryCta: 'Zostaw numer — oddzwonię',
  secondaryCta: 'Oblicz swoje oszczędności',
  trust: [
    'Bezpłatna, niezobowiązująca analiza',
    'Dobór bez przewymiarowania',
    'Pomoc w dotacjach 2026',
  ],
  stats: [
    { value: 90, suffix: '%', label: 'Mniejsze rachunki za prąd' },
    { value: 16000, prefix: '', suffix: ' zł', label: 'Dotacja na magazyn energii' },
    { value: 85, suffix: '%', label: 'Autokonsumpcji z magazynem' },
    { value: 1380, suffix: '', label: 'Opinii Google firmy Begolden · 4,9 ★' },
  ],
  floating: {
    savingsLabel: 'Oszczędność rachunku',
    savingsValue: '−90%',
    savingsNote: 'przy magazynie i taryfie dynamicznej',
    liveLabel: 'Magazyn naładowany',
    liveValue: '94%',
    liveNote: '⚡ energia na wieczór gotowa',
  },
}

export type Benefit = {
  icon: string
  /** Ikona 3D (plik) — gdy jest, zastępuje ikonę liniową. */
  image?: string
  title: string
  text: string
}

export const benefits: { eyebrow: string; title: string; lead: string; items: Benefit[] } = {
  eyebrow: 'Dlaczego warto',
  title: 'Więcej niż panele — kompletny, inteligentny system energetyczny',
  lead: 'W 2026 roku sama fotowoltaika to za mało. Prawdziwą wartość daje magazyn energii i mądre zarządzanie zużyciem. Oto, co realnie zyskujesz.',
  items: [
    {
      icon: 'piggy-bank',
      image: icNizszeRachunki,
      title: 'Niższe rachunki za prąd',
      text: 'Zużywasz własną, tanią energię zamiast drogiej z sieci. Rachunek spada nawet o 90%.',
    },
    {
      icon: 'battery-charging',
      image: icZasilanieAwaryjne,
      title: 'Zasilanie awaryjne (backup)',
      text: 'Gdy w okolicy znika prąd, Twój dom działa dalej — magazyn w ułamku sekundy przechodzi w tryb wyspowy. Lodówka, ogrzewanie, internet i oświetlenie pracują bez przerwy, a większy zestaw podtrzyma kluczowe obwody nawet przez 1–2 dni.',
    },
    {
      icon: 'cpu',
      image: icZarzadzanieAi,
      title: 'Zarządzanie energią z AI',
      text: 'System HEMS automatycznie ładuje magazyn, gdy energia jest tania, i oddaje ją, gdy droga. Pracuje za Ciebie 24/7.',
    },
    {
      icon: 'gauge',
      image: icZyskTaryfy,
      title: 'Zarabiasz na taryfach dynamicznych',
      text: 'Z magazynem i automatyką kupujesz prąd, gdy jest tani, a korzystasz z niego, gdy jest drogi — to dodatkowy zysk co miesiąc.',
    },
  ],
}

export type ProcessStep = {
  n: string
  title: string
  text: string
  icon: string
  /** Ikona 3D (plik) — gdy jest, zastępuje ikonę liniową. */
  image?: string
}

export const process: { eyebrow: string; title: string; lead: string; steps: ProcessStep[] } = {
  eyebrow: 'Jak wygląda współpraca',
  title: 'Od pierwszej rozmowy do gotowego systemu',
  lead: 'Pracuję w modelu konsultingowym — najpierw konkretne liczby i analiza, dopiero potem decyzja. Pierwszy krok jest w pełni bezpłatny.',
  steps: [
    {
      n: '01',
      title: 'Bezpłatna analiza i konsultacja',
      text: 'Poznaję Twoje zużycie i rachunki, analizuję potrzeby i przygotowuję symulację oszczędności oraz dobór rozwiązania. Bez zobowiązań.',
      icon: 'clipboard-list',
      image: icAnaliza,
    },
    {
      n: '02',
      title: 'Projekt rozwiązania',
      text: 'Projektuję system dopasowany do Ciebie: moc PV, pojemność magazynu, zarządzanie energią i dobór dotacji — z konkretnym czasem zwrotu.',
      icon: 'pencil-ruler',
      image: icProjekt,
    },
    {
      n: '03',
      title: 'Montaż i uruchomienie',
      text: 'Realizacja „pod klucz": montaż, konfiguracja magazynu energii i systemu zarządzania (HEMS), formalności oraz zgłoszenie do sieci. Wszystko po mojej stronie.',
      icon: 'wrench',
      image: icMontaz,
    },
    {
      n: '04',
      title: 'Opieka posprzedażowa',
      text: 'Monitoring pracy systemu, optymalizacja pod taryfy dynamiczne, serwis i wsparcie. Zostaję z Tobą również po uruchomieniu.',
      icon: 'heart-handshake',
      image: icOpieka,
    },
  ],
}

export const about = {
  eyebrow: 'O mnie',
  name: 'Kamil Bronisz',
  role: 'Konsultant energetyczny',
  photo: kamilPhoto,
  lead: 'Pomagam właścicielom domów i firmom realnie obniżyć rachunki i uniezależnić się energetycznie — w oparciu o twarde liczby, nie obietnice.',
  paragraphs: [
    'Od 5 lat doradzam w branży OZE i specjalizuję się w tym, co w 2026 roku decyduje o opłacalności: inteligentnych magazynach energii ze sztuczną inteligencją oraz nowoczesnym zarządzaniu energią całego domu (HEMS).',
    'Zamiast „sprzedawać instalację", najpierw analizuję Twoją sytuację i dobieram system, który naprawdę się opłaca — bez przewymiarowania. Pracuję w modelu konsultingowym: najpierw bezpłatna analiza i konkretne wyliczenia, a decyzja zawsze należy do Ciebie.',
    'Prowadzę Cię przez całość — od doboru rozwiązania i dotacji, przez montaż „pod klucz", po opiekę i optymalizację taryf dynamicznych po uruchomieniu. A dom z fotowoltaiką i magazynem jest dodatkowo więcej wart na rynku.',
  ],
  highlights: [
    { icon: 'battery-charging', image: icMagazyn, label: 'Specjalizacja: inteligentne magazyny energii' },
    { icon: 'cpu', image: icHems, label: 'Zarządzanie energią domu (HEMS) i AI' },
    { icon: 'gauge', image: icTaryfy, label: 'Optymalizacja taryf dynamicznych' },
    { icon: 'badge-percent', image: icDotacje, label: 'Pomoc w dotacjach 2026' },
  ],
  badges: ['Doradztwo konsultingowe', 'Indywidualne podejście', 'Bez przewymiarowania'],
  responseNote: 'Odpowiadam zwykle w ciągu 1 godziny',
}

// --- Obszar działania (lokalne SEO: woj. lubelskie) ---
export const serviceArea = {
  eyebrow: 'Obszar działania',
  title: 'Działam w całym województwie lubelskim',
  lead: 'Osobiście dojeżdżam do klientów w Lublinie i okolicach — magazyny energii, fotowoltaika oraz pompy ciepła i wymiana pieca (Czyste Powietrze). W pozostałej części Polski prowadzę bezpłatną analizę i doradztwo online.',
  cities: ['Lublin', 'Świdnik', 'Lubartów', 'Łęczna', 'Parczew', 'Puławy', 'Opole Lubelskie', 'Kraśnik'],
  note: 'Twojej miejscowości nie ma na liście? Napisz lub zadzwoń — obsługuję całe województwo lubelskie.',
}

export type Testimonial = {
  name: string
  role: string
  text: string
  rating: number
  photo: string
}

export const testimonials: { eyebrow: string; title: string; lead: string; items: Testimonial[] } = {
  eyebrow: 'Realizacje i opinie',
  title: 'Zaufali mi właściciele domów i firm',
  lead: 'Najlepszą rekomendacją są realne realizacje i klienci, którzy obniżyli rachunki i odzyskali kontrolę nad energią.',
  items: [
    {
      name: 'Marek W.',
      role: 'Dom jednorodzinny, Lublin',
      rating: 5,
      photo: r1,
      text: 'Kamil dobrał magazyn energii idealnie pod nasze zużycie — bez wciskania większej instalacji. Rachunki spadły o ponad 80%, a w aplikacji widzę wszystko na bieżąco.',
    },
    {
      name: 'Tomasz P.',
      role: 'Właściciel firmy, Puławy',
      rating: 5,
      photo: r5,
      text: 'Konkretne wyliczenia, jasny czas zwrotu i zero żargonu. Magazyn z zarządzaniem energią zwróci się szybciej, niż zakładałem. Pełen profesjonalizm.',
    },
    {
      name: 'Katarzyna M.',
      role: 'Dom jednorodzinny, Świdnik',
      rating: 5,
      photo: r3,
      text: 'Najbardziej doceniam podejście doradcze. Najpierw analiza i liczby, dopiero potem oferta. Taryfa dynamiczna z magazynem to u nas strzał w dziesiątkę.',
    },
    {
      name: 'Robert J.',
      role: 'Gospodarstwo rolne, Wojciechów',
      rating: 5,
      photo: r6,
      text: 'Pomoc w dotacji na magazyn i sprawny montaż. Świetny kontakt po uruchomieniu — system jest zoptymalizowany pod nasze realne zużycie.',
    },
    {
      name: 'Magdalena S.',
      role: 'Willa, Nałęczów',
      rating: 5,
      photo: r4,
      text: 'Fotowoltaika, magazyn energii i sterowanie całym domem. Nowoczesne, ciche i naprawdę oszczędne. Polecam każdemu, kto myśli o niezależności.',
    },
    {
      name: 'Paweł K.',
      role: 'Dom z pompą ciepła, Kraśnik',
      rating: 5,
      photo: r2,
      text: 'Dom z pompą ciepła i autem elektrycznym to spore zużycie — Kamil policzył wszystko i dobrał magazyn tak, że rachunki są minimalne. Wielkie dzięki.',
    },
  ],
}

export type Faq = { q: string; a: string }

export const faq: { eyebrow: string; title: string; lead: string; items: Faq[] } = {
  eyebrow: 'FAQ',
  title: 'Najczęściej zadawane pytania',
  lead: 'Masz inne pytanie? Napisz lub zadzwoń — chętnie wszystko wyjaśnię.',
  items: [
    {
      q: 'Czy fotowoltaika nadal się opłaca?',
      a: 'Tak — ale dziś opłaca się fotowoltaika połączona z magazynem energii. Cena odkupu nadwyżek oddanych do sieci jest niska, dlatego o opłacalności decyduje magazyn. Szczegóły w sekcji Magazyny energii.',
    },
    {
      q: 'Jak działa taryfa dynamiczna?',
      a: 'Cena prądu zmienia się w ciągu doby. Obowiązek oferowania taryf dynamicznych mają już więksi sprzedawcy (od 2024 r.), a w 2026 dochodzą 15-minutowe interwały rozliczeń i szybsza zmiana sprzedawcy. Najwięcej zyskują osoby z magazynem energii — jak to działa, pokazuję w sekcji Magazyny energii.',
    },
    {
      q: 'Co daje inteligentny magazyn energii z AI?',
      a: 'Nowoczesny magazyn energii ze sztuczną inteligencją łączy falownik, baterię, opcjonalną ładowarkę do auta i zarządzanie energią w jednym, kompaktowym systemie. AI automatycznie optymalizuje pracę pod taryfy dynamiczne — ładuje, gdy prąd jest tani, i oddaje energię, gdy jest drogi — a Ty sterujesz całym domem z poziomu aplikacji. Najczęściej dobieram do tego Sigenergy — z systemem zarządzania energią (EMS) i pracą wyspową, co spełnia też wymogi nowej dotacji.',
    },
    {
      q: 'Ile trwa montaż?',
      a: 'Sam montaż instalacji fotowoltaicznej z magazynem energii to zwykle 1–2 dni. Cały proces — od analizy i umowy, przez formalności i dotacje, po uruchomienie oraz zgłoszenie do sieci — trwa najczęściej kilka tygodni. Formalności biorę na siebie.',
    },
    {
      q: 'Czy można otrzymać dofinansowanie?',
      a: 'Tak. Nabór programu „Przydomowe Magazyny Energii" — do **16 000 zł** na magazyn energii — rusza w **IV kwartale 2026** i potrwa **do wyczerpania środków**. Dlatego warto przygotować się wcześniej: kto ma dobrany system i komplet dokumentów, złoży wniosek od razu po starcie. Poza tym dostępne są dofinansowania do magazynów ciepła oraz program Czyste Powietrze na termomodernizację i pompy ciepła. Sprawdzę, co Ci przysługuje, i pomogę z formalnościami.',
    },
    {
      q: 'W jakich miastach działasz?',
      a: 'Osobiście obsługuję całe województwo lubelskie — m.in. Lublin, Świdnik, Lubartów, Łęczna, Parczew, Puławy, Opole Lubelskie i Kraśnik. W pozostałej części Polski prowadzę bezpłatną analizę i doradztwo online.',
    },
    {
      q: 'Czy magazyn energii jest bezpieczny? Słyszałem o pożarach baterii',
      a: 'Stosuję ogniwa w technologii **LFP** (litowo-żelazowo-fosforanowej) — najbezpieczniejszej dla domu, odpornej na przegrzanie. Każdy magazyn ma certyfikaty, system zarządzania baterią (BMS) i zabezpieczenia.',
    },
    {
      q: 'Co zimą, gdy słońca jest mało?',
      a: 'Wtedy pracuje taryfa dynamiczna: system ładuje magazyn tanim prądem z sieci w nocy i oddaje go w drogich godzinach szczytu. Dzięki temu magazyn pracuje na Twój rachunek **przez cały rok**, nie tylko latem.',
    },
    {
      q: 'Ile żyje magazyn energii?',
      a: 'Nowoczesne magazyny LFP projektowane są na **6 000–10 000 cykli** — przy codziennym użyciu to kilkanaście lat pracy. Producenci dają zwykle ok. **10 lat gwarancji**.',
    },
    {
      q: 'Mam już fotowoltaikę — da się dołożyć magazyn?',
      a: 'W większości przypadków tak (**retrofit**) — przez falownik hybrydowy lub dodatkowy moduł z bramą wyspową. Na bezpłatnej analizie sprawdzam, co najlepiej pasuje do Twojej instalacji.',
    },
  ],
}

export const finalCta = {
  eyebrow: 'Zrób pierwszy krok',
  title: 'Sprawdź, ile możesz zaoszczędzić',
  lead: 'Bezpłatna, niezobowiązująca analiza Twojego zużycia. Otrzymasz konkretne liczby: dobór magazynu, oszczędności i czas zwrotu — bez sprzedażowej prezentacji.',
  primary: 'Bezpłatna analiza',
  secondary: 'Oblicz w kalkulatorze',
}

// --- Sekcja: Magazyny energii (edukacja + obiekcje + dotacja) ---
export const energyStorage = {
  eyebrow: 'Magazyny energii',
  title: 'Dlaczego magazyn energii to dziś serce instalacji',
  lead: 'Po zmianach w rozliczeniach (net-billing) o opłacalności decyduje autokonsumpcja — ile własnej energii zużyjesz u siebie. Magazyn z inteligentnym zarządzaniem (HEMS) podnosi ją nawet do 80–90%.',
  miniCase: {
    badge: 'Przykład z życia',
    title: 'Dom 5 000 kWh/rok + magazyn 10 kWh',
    loss: 'Bez magazynu większość taniej energii z paneli oddajesz do sieci za grosze — a wieczorem odkupujesz ją drożej. Magazyn kończy ten układ.',
    before: { label: 'Sama fotowoltaika', self: '30%', selfLabel: 'autokonsumpcja', bill: '~580 zł', billLabel: 'rachunek / mies.' },
    after: { label: 'Fotowoltaika + magazyn z AI', self: '86%', selfLabel: 'autokonsumpcja', bill: '~70 zł', billLabel: 'rachunek / mies.' },
  },
  tariff: {
    title: 'Tak pracuje magazyn z taryfą dynamiczną',
    lead: 'Ceny prądu zmieniają się w ciągu doby. System ładuje magazyn, gdy energia jest tania, i korzysta z niej, gdy jest najdroższa.',
    chargeLabel: 'Ładowanie (tanio)',
    dischargeLabel: 'Korzystanie z magazynu (drogo)',
  },
}

// --- Interaktywna ilustracja „jak działa dom z magazynem" (grafika poglądowa, nie realizacja) ---
// x / y = położenie punktu w % szerokości / wysokości grafiki src/assets/grafiki/dom-system-energii-*.webp
export const energySystem = {
  title: 'Jak działa inteligentny dom z magazynem',
  hint: 'Wybierz element, żeby zobaczyć, co robi w Twoim domu.',
  alt: 'Ilustracja poglądowa: dom z fotowoltaiką, magazynem energii, ładowarką samochodu elektrycznego, pompą ciepła i przyłączem do sieci, połączonych przepływami energii',
  defaultId: 'magazyn',
  points: [
    {
      id: 'panele',
      short: 'Panele PV',
      title: 'Panele fotowoltaiczne',
      text: 'W dzień produkują prąd. Bez magazynu nadwyżki oddajesz do sieci za grosze — a wieczorem kupujesz drogi prąd z powrotem.',
      x: 47.2,
      y: 21.1,
    },
    {
      id: 'magazyn',
      short: 'Magazyn energii',
      title: 'Magazyn energii z falownikiem',
      text: 'Serce systemu. Zatrzymuje energię z paneli na wieczór i noc, a przy awarii sieci przechodzi w tryb wyspowy — dom działa dalej.',
      x: 35.5,
      y: 49.4,
    },
    {
      id: 'hems',
      short: 'Zarządzanie (HEMS)',
      title: 'Inteligentne zarządzanie energią (HEMS)',
      text: 'System z AI sam decyduje, kiedy ładować magazyn, kiedy zasilać dom, a kiedy kupić prąd z sieci — tak, żeby rachunek był jak najniższy.',
      x: 63.1,
      y: 52.2,
    },
    {
      id: 'auto',
      short: 'Auto elektryczne',
      title: 'Ładowanie samochodu',
      text: 'Auto elektryczne lub hybrydę plug-in ładujesz własną energią z paneli albo w najtańszych godzinach nocnych.',
      x: 27.2,
      y: 63.9,
    },
    {
      id: 'pompa',
      short: 'Pompa ciepła',
      title: 'Pompa ciepła',
      text: 'Ogrzewanie i ciepła woda zasilane energią z paneli i magazynu — zamiast drogiego prądu w godzinach szczytu.',
      x: 75.8,
      y: 53.1,
    },
    {
      id: 'siec',
      short: 'Sieć i taryfa',
      title: 'Sieć i taryfa dynamiczna',
      text: 'Gdy ceny prądu spadają, magazyn ładuje się tanio z sieci, a gdy rosną — zasila dom. Zarabiasz na różnicy cen w ciągu doby.',
      x: 87.2,
      y: 17.8,
    },
  ],
}

// --- Sekcja: Konsultant, nie akwizytor + porównanie ---
export const approach = {
  eyebrow: 'Konsultant, nie akwizytor',
  title: 'Najpierw liczby, potem decyzja — zawsze Twoja',
  lead: 'Nie pukam do drzwi i nie wciskam największej instalacji. Pracuję w modelu konsultingowym: liczę, co realnie się opłaca, a Ty decydujesz bez presji.',
  bad: {
    title: 'Typowy akwizytor',
    items: [
      'Naciska na szybką decyzję „tylko dziś promocja"',
      'Sprzedaje jak największą instalację',
      'Liczy swoją prowizję, nie Twój zwrot',
      'Znika po podpisaniu umowy',
    ],
  },
  good: {
    title: 'Konsultant energetyczny',
    items: [
      'Najpierw bezpłatna analiza i twarde liczby',
      'Dobór bez przewymiarowania',
      'Liczę Twój czas zwrotu, nie swoją prowizję',
      'Opieka i optymalizacja po uruchomieniu',
    ],
  },
  table: {
    title: 'Sama fotowoltaika vs fotowoltaika z magazynem',
    head: ['', 'Sama PV', 'PV + magazyn z AI'],
    rows: [
      { label: 'Autokonsumpcja energii', pv: '~30%', full: '80–90%' },
      { label: 'Prąd wieczorem i w nocy', pv: 'z sieci (drogo)', full: 'z magazynu' },
      { label: 'Zasilanie awaryjne (backup)', pv: 'nie', full: 'tak' },
      { label: 'Zysk z taryfy dynamicznej', pv: 'znikomy', full: 'tak (arbitraż)' },
      { label: 'Dotacja 2026', pv: 'nie obejmuje paneli', full: 'do 16 000 zł' },
      { label: 'Niezależność od podwyżek', pv: 'częściowa', full: 'wysoka' },
    ],
  },
}

// --- Lekkie paski CTA pomiędzy sekcjami ---
export const sectionCtas = {
  afterBenefits: {
    text: 'Ciekawi Cię, ile magazyn energii zaoszczędzi właśnie u Ciebie?',
    button: 'Oblicz moje oszczędności',
    href: '#kalkulator',
    label: 'cta_after_benefits',
  },
  afterTestimonials: {
    text: 'Chcesz takie same oszczędności u siebie?',
    button: 'Umów bezpłatną analizę',
    href: '#kontakt',
    label: 'cta_after_testimonials',
  },
}

// --- Miękki lead magnet (e-mail → checklista) ---
export const leadMagnet = {
  eyebrow: 'Bezpłatny poradnik',
  title: 'Czy załapiesz się na dotację do magazynu energii w 2026?',
  lead: 'Zostaw numer telefonu, a od razu odblokuję checklistę 7 punktów, które decydują o dotacji i opłacalności magazynu. Oddzwonię z bezpłatną, niezobowiązującą analizą.',
  phonePlaceholder: 'Twój numer telefonu',
  emailPlaceholder: 'E-mail (opcjonalnie — wyślę kopię)',
  button: 'Pokaż checklistę',
  coverAlt: 'Okładka checklisty „Dotacja na magazyn energii 2026" na tablecie — 7 punktów, które decydują o dotacji i opłacalności magazynu',
  consent: 'Zostawiając numer, zgadzasz się na kontakt telefoniczny w sprawie analizy. Bez zobowiązań.',
  successTitle: 'Gotowe! Oto Twoja checklista 👇',
  successNote: 'Oddzwonię w dogodnym terminie i prześlę pełny poradnik.',
  checklist: [
    'Magazyn ma system zarządzania energią (EMS/HEMS) — bez tego dotacja może nie przysługiwać.',
    'Magazyn potrafi pracować wyspowo (off-grid) — wymóg nowego programu.',
    'Pojemność dobrana do realnego zużycia wieczorno-nocnego (bez przewymiarowania).',
    'Ogniwa w technologii LFP — bezpieczeństwo i długa żywotność.',
    'Falownik hybrydowy lub gotowość pod retrofit, jeśli masz już fotowoltaikę.',
    'Integracja z taryfą dynamiczną — zarabianie na różnicy cen energii.',
    'Komplet formalności gotowy przed startem naboru (IV kwartał 2026) — środki są do wyczerpania.',
  ],
}

// --- Exit-intent (próba wyjścia) ---
export const exitIntent = {
  title: 'Zanim wyjdziesz…',
  text: 'Zostaw numer telefonu — oddzwonię z bezpłatną wyceną oszczędności i powiem, czy załapiesz się na dotację do magazynu energii 2026. Bez zobowiązań.',
  phonePlaceholder: 'Twój numer telefonu',
  button: 'Oddzwoń do mnie',
  dismiss: 'Nie, dziękuję',
  successTitle: 'Dziękuję! Wkrótce się odezwę.',
  successText: 'Zadzwonię na podany numer w dogodnym terminie.',
}

// --- Opinie w Google (wizytówka firmy Begolden) ---
export const googleReviews = {
  rating: '4,9',
  count: '1 380',
  url: 'https://share.google/igMkIhQFc3MaFw0Os',
  label: 'Opinie w Google',
  note: 'opinii w Google',
  attribution: 'Oceny firmy Begolden, z którą realizuję instalacje',
  cta: 'Zobacz opinie w Google',
  short: '4,9 ★ w Google',
  local: 'Realizacje magazynów energii — całe województwo lubelskie',
}

// --- Kwalifikacja leada: kiedy planuje inwestycję (sygnał „temperatury") ---
export const leadTimeframe = {
  label: 'Kiedy planujesz inwestycję?',
  placeholder: 'Wybierz…',
  options: [
    { value: 'asap', label: 'Jak najszybciej' },
    { value: '1-3m', label: 'W ciągu 1–3 miesięcy' },
    { value: 'rozeznanie', label: 'Na razie się rozeznaję' },
  ],
}

// --- Mikrocopy redukujące tarcie pod formularzami ---
export const leadMicrocopy = 'Oddzwaniam zwykle w ciągu 1 h • bez zobowiązań • bez nachalnej sprzedaży'

// --- Pasek naboru dotacji (FOMO oparte na realnym terminie) ---
export const subsidyDeadline = {
  // Nabór „Przydomowe Magazyny Energii" rusza w IV kwartale 2026 — dokładna data nie jest jeszcze znana,
  // więc NIE odliczamy dni (licznik do umownej daty sugerowałby nieprawdziwy termin).
  // Gdy data będzie znana: wpisz ją tutaj (np. '2026-11-03T00:00:00'). Pasek sam zacznie odliczać dni,
  // a po starcie przełączy się na `passed` + `textStarted`.
  targetDate: null as string | null,
  badge: 'Nabór: IV kwartał 2026',
  label: 'Dotacja na magazyn energii 2026',
  text: 'Nabór „Przydomowe Magazyny Energii" (do 16 000 zł na magazyn) rusza w IV kwartale 2026 i potrwa do wyczerpania środków. Przygotuj dobór i dokumenty, zanim ruszą wnioski.',
  textStarted: 'Nabór „Przydomowe Magazyny Energii" (do 16 000 zł na magazyn) już trwa. Pula jest ograniczona — sprawdź, czy się łapiesz, zanim środki się wyczerpią.',
  unitOne: 'dzień do startu naboru',
  unitMany: 'dni do startu naboru',
  cta: 'Sprawdź, czy się łapiesz',
  passed: 'Nabór trwa — wnioski przyjmowane do wyczerpania środków.',
}
