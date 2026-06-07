/**
 * Centralne miejsce z treścią strony.
 * Edytuj teksty, dane kontaktowe, korzyści, opinie i FAQ tutaj —
 * komponenty automatycznie pobierają dane z tego pliku.
 */

// Zdjęcie importowane jako moduł — Vite sam ustawia poprawny adres (działa też
// pod ścieżką GitHub Pages /kamil-bronisz-oze/). Aby zmienić zdjęcie, podmień plik
// src/assets/kamil-bronisz.jpg.
import kamilPhoto from '../assets/kamil-bronisz.jpg'

export const site = {
  name: 'Kamil Bronisz',
  role: 'Ekspert ds. magazynów energii i zarządzania energią',
  tagline: 'Niezależność energetyczna, którą widać na rachunku.',
  phone: '512 491 787',
  phoneHref: 'tel:+48512491787',
  email: 'kamil.bronisz@begolden.com.pl',
  emailHref: 'mailto:kamil.bronisz@begolden.com.pl',
  // WhatsApp w formacie międzynarodowym bez znaków (można nadpisać przez .env)
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) || '48512491787',
  area: 'Cała Polska — analiza online lub u Ciebie',
  social: {
    facebook: 'https://www.facebook.com/begoldenfotowoltaika',
    instagram: '',
    linkedin: '',
    youtube: '',
  },
}

export const nav = [
  { label: 'Dlaczego warto', href: '#dlaczego-warto' },
  { label: 'Współpraca', href: '#wspolpraca' },
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Kalkulator', href: '#kalkulator' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  badge: 'Inteligentne magazyny energii • HEMS • Taryfy dynamiczne',
  title: 'Obniż rachunki za energię nawet o',
  titleAccent: '90%',
  titleEnd: 'i zyskaj niezależność energetyczną',
  subtitle:
    'Projektuję inteligentne systemy fotowoltaiczne z magazynami energii i zarządzaniem energią całego domu — dla domów i firm. Mniej rachunków, więcej kontroli.',
  primaryCta: 'Umów bezpłatną analizę',
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
    { value: 24, suffix: '/7', label: 'Zarządzanie energią z AI' },
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
      title: 'Niższe rachunki za prąd',
      text: 'Zużywasz własną, tanią energię zamiast kupować ją z sieci w najdroższych godzinach. Rachunek spada nawet o 90%.',
    },
    {
      icon: 'shield-check',
      title: 'Bezpieczeństwo energetyczne',
      text: 'Uniezależniasz się od podwyżek i polityki cenowej sprzedawców. Sam decydujesz, kiedy i z czego korzystasz.',
    },
    {
      icon: 'battery-charging',
      title: 'Zasilanie awaryjne',
      text: 'Inteligentny magazyn energii podtrzymuje pracę domu podczas przerw w dostawie prądu (backup). Lodówka i ogrzewanie działają dalej.',
    },
    {
      icon: 'cpu',
      title: 'Zarządzanie energią z AI',
      text: 'System HEMS automatycznie ładuje magazyn, gdy energia jest tania, i oddaje ją, gdy droga. Pracuje za Ciebie 24/7.',
    },
    {
      icon: 'trending-up',
      title: 'Wyższa wartość nieruchomości',
      text: 'Dom z fotowoltaiką, magazynem i niskimi kosztami energii jest atrakcyjniejszy i więcej wart na rynku.',
    },
    {
      icon: 'gauge',
      title: 'Zarabiasz na taryfach dynamicznych',
      text: 'Od 2026 taryfy dynamiczne są obowiązkowe. Z magazynem i automatyką kupujesz prąd tanio i korzystasz w szczycie — to dodatkowy zysk.',
    },
  ],
}

export type ProcessStep = {
  n: string
  title: string
  text: string
  icon: string
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
    },
    {
      n: '02',
      title: 'Projekt rozwiązania',
      text: 'Projektuję system dopasowany do Ciebie: moc PV, pojemność magazynu, zarządzanie energią i dobór dotacji — z konkretnym czasem zwrotu.',
      icon: 'pencil-ruler',
    },
    {
      n: '03',
      title: 'Montaż i uruchomienie',
      text: 'Realizacja „pod klucz": montaż, konfiguracja magazynu energii i systemu zarządzania (HEMS), formalności oraz zgłoszenie do sieci. Wszystko po mojej stronie.',
      icon: 'wrench',
    },
    {
      n: '04',
      title: 'Opieka posprzedażowa',
      text: 'Monitoring pracy systemu, optymalizacja pod taryfy dynamiczne, serwis i wsparcie. Zostaję z Tobą również po uruchomieniu.',
      icon: 'heart-handshake',
    },
  ],
}

export const about = {
  eyebrow: 'O mnie',
  name: 'Kamil Bronisz',
  role: 'Ekspert ds. magazynów energii i zarządzania energią',
  photo: kamilPhoto,
  lead: 'Pomagam właścicielom domów i firmom realnie obniżyć rachunki i uniezależnić się energetycznie — w oparciu o twarde liczby, nie obietnice.',
  paragraphs: [
    'Od kilku lat doradzam w branży OZE i specjalizuję się w tym, co w 2026 roku decyduje o opłacalności: inteligentnych magazynach energii ze sztuczną inteligencją oraz nowoczesnym zarządzaniu energią całego domu (HEMS).',
    'Zamiast „sprzedawać instalację", najpierw analizuję Twoją sytuację i dobieram system, który naprawdę się opłaca — bez przewymiarowania. Pracuję w modelu konsultingowym: najpierw bezpłatna analiza i konkretne wyliczenia, a decyzja zawsze należy do Ciebie.',
    'Prowadzę Cię przez całość — od doboru rozwiązania i dotacji, przez montaż „pod klucz", po opiekę i optymalizację taryf dynamicznych po uruchomieniu.',
  ],
  highlights: [
    { icon: 'battery-charging', label: 'Specjalizacja: inteligentne magazyny energii' },
    { icon: 'cpu', label: 'Zarządzanie energią domu (HEMS) i AI' },
    { icon: 'gauge', label: 'Optymalizacja taryf dynamicznych' },
    { icon: 'badge-percent', label: 'Pomoc w dotacjach 2026' },
  ],
  badges: ['Doradztwo konsultingowe', 'Indywidualne podejście', 'Bez przewymiarowania'],
  responseNote: 'Odpowiadam zwykle w ciągu 1 godziny',
}

export type Testimonial = {
  name: string
  role: string
  text: string
  rating: number
}

export const testimonials: { eyebrow: string; title: string; lead: string; items: Testimonial[] } = {
  eyebrow: 'Opinie klientów',
  title: 'Zaufali mi właściciele domów i firm',
  lead: 'Najlepszą rekomendacją są klienci, którzy realnie obniżyli rachunki i odzyskali kontrolę nad energią.',
  items: [
    {
      name: 'Marek W.',
      role: 'Dom jednorodzinny, Katowice',
      rating: 5,
      text: 'Kamil dobrał magazyn energii idealnie pod nasze zużycie — bez wciskania większej instalacji. Rachunki spadły o ponad 80%, a w aplikacji widzę wszystko na bieżąco.',
    },
    {
      name: 'Tomasz P.',
      role: 'Właściciel firmy, Tychy',
      rating: 5,
      text: 'Konkretne wyliczenia, jasny czas zwrotu i zero żargonu. Magazyn z zarządzaniem energią zwróci się szybciej, niż zakładałem. Pełen profesjonalizm.',
    },
    {
      name: 'Katarzyna M.',
      role: 'Dom jednorodzinny, Sosnowiec',
      rating: 5,
      text: 'Najbardziej doceniam podejście doradcze. Najpierw analiza i liczby, dopiero potem oferta. Taryfa dynamiczna z magazynem to u nas strzał w dziesiątkę.',
    },
    {
      name: 'Robert J.',
      role: 'Gospodarstwo rolne, Opolskie',
      rating: 5,
      text: 'Pomoc w dotacji na magazyn i sprawny montaż. Świetny kontakt po uruchomieniu — system jest zoptymalizowany pod nasze realne zużycie.',
    },
    {
      name: 'Magdalena S.',
      role: 'Willa, Mikołów',
      rating: 5,
      text: 'Fotowoltaika, magazyn energii i sterowanie całym domem. Nowoczesne, ciche i naprawdę oszczędne. Polecam każdemu, kto myśli o niezależności.',
    },
    {
      name: 'Paweł K.',
      role: 'Dom z pompą ciepła, Gliwice',
      rating: 5,
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
      a: 'Tak, ale dziś opłaca się fotowoltaika połączona z magazynem energii. Po zmianach w net-billingu cena odkupu energii oddanej do sieci jest bardzo niska, więc kluczowa jest autokonsumpcja — czyli zużywanie własnego prądu. Magazyn pozwala korzystać z energii wieczorem i w nocy, dzięki czemu cała inwestycja realnie się zwraca.',
    },
    {
      q: 'Czy magazyn energii ma sens?',
      a: 'Zdecydowanie. Magazyn zwiększa autokonsumpcję nawet do 80–90%, daje zasilanie awaryjne podczas przerw w dostawie prądu i jest niezbędny, aby zarabiać na taryfach dynamicznych. Dodatkowo w 2026 roku można otrzymać dotację na magazyn energii do 16 000 zł.',
    },
    {
      q: 'Jak działa taryfa dynamiczna?',
      a: 'W taryfie dynamicznej cena energii zmienia się co godzinę, zależnie od sytuacji na rynku. Od 1 stycznia 2026 sprzedawcy mają obowiązek ją oferować. Realnie zyskują na niej osoby z magazynem energii i automatyką (HEMS) — system ładuje baterię, gdy prąd jest tani, a korzysta z niej, gdy jest najdroższy.',
    },
    {
      q: 'Co daje inteligentny magazyn energii z AI?',
      a: 'Nowoczesny magazyn energii ze sztuczną inteligencją łączy falownik, baterię, opcjonalną ładowarkę do auta i zarządzanie energią w jednym, kompaktowym systemie. AI automatycznie optymalizuje pracę pod taryfy dynamiczne — ładuje, gdy prąd jest tani, i oddaje energię, gdy jest drogi — a Ty sterujesz całym domem z poziomu aplikacji. Dobieram rozwiązanie pod Twoje potrzeby, niezależnie od marki urządzenia.',
    },
    {
      q: 'Ile trwa montaż?',
      a: 'Sam montaż instalacji fotowoltaicznej z magazynem energii to zwykle 1–2 dni. Cały proces — od analizy i umowy, przez formalności i dotacje, po uruchomienie oraz zgłoszenie do sieci — trwa najczęściej kilka tygodni. Formalności biorę na siebie.',
    },
    {
      q: 'Czy można otrzymać dofinansowanie?',
      a: 'Tak. W 2026 roku dostępne są dotacje na magazyny energii (do 16 000 zł) oraz magazyny ciepła, a także program Czyste Powietrze na termomodernizację i pompy ciepła. Sprawdzę, co Ci przysługuje, i pomogę przejść przez wszystkie formalności.',
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
