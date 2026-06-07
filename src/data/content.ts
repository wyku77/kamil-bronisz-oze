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
  { label: 'Magazyny', href: '#magazyny-energii' },
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
    { value: 1339, suffix: '', label: 'Opinii w Google · 4,9 ★' },
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
      text: 'Taryfy dynamiczne oferują już więksi sprzedawcy energii, a w 2026 dochodzą 15-minutowe rozliczenia. Z magazynem i automatyką kupujesz prąd tanio i korzystasz w szczycie — to dodatkowy zysk.',
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
  role: 'Konsultant energetyczny',
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
      a: 'Tak, ale dziś opłaca się fotowoltaika połączona z magazynem energii. Po zmianach w net-billingu cena odkupu energii oddanej do sieci jest bardzo niska, więc kluczowa jest autokonsumpcja — czyli zużywanie własnego prądu. Magazyn pozwala korzystać z energii wieczorem i w nocy, dzięki czemu cała inwestycja realnie się zwraca.',
    },
    {
      q: 'Czy magazyn energii ma sens?',
      a: 'Zdecydowanie. Magazyn zwiększa autokonsumpcję nawet do 80–90%, daje zasilanie awaryjne podczas przerw w dostawie prądu i jest niezbędny, aby zarabiać na taryfach dynamicznych. Dodatkowo w 2026 roku można otrzymać dotację na magazyn energii do 16 000 zł.',
    },
    {
      q: 'Jak działa taryfa dynamiczna?',
      a: 'W taryfie dynamicznej cena energii zmienia się co godzinę, zależnie od sytuacji na rynku. Obowiązek jej oferowania mają już więksi sprzedawcy energii (od 2024 r.), a w 2026 dochodzą 15-minutowe interwały rozliczeń i szybsza zmiana sprzedawcy. Realnie zyskują na niej osoby z magazynem energii i automatyką (HEMS) — system ładuje baterię, gdy prąd jest tani, a korzysta z niej, gdy jest najdroższy.',
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

// --- Sekcja: Magazyny energii (edukacja + obiekcje + dotacja) ---
export const energyStorage = {
  eyebrow: 'Magazyny energii',
  title: 'Dlaczego magazyn energii to dziś serce instalacji',
  lead: 'Po zmianach w rozliczeniach (net-billing) o opłacalności decyduje autokonsumpcja — ile własnej energii zużyjesz u siebie. Magazyn z inteligentnym zarządzaniem (HEMS) podnosi ją nawet do 80–90%.',
  objections: [
    {
      q: 'Czy magazyn opłaca się bez dotacji?',
      a: 'Tak. Cena odkupu nadwyżek z sieci jest dziś bardzo niska, więc kluczowe jest zużycie własnej energii. Magazyn pozwala korzystać z prądu z paneli wieczorem i w nocy, podnosząc autokonsumpcję do 80–90% — i to tu powstają realne oszczędności, niezależnie od dotacji.',
    },
    {
      q: 'Czy to bezpieczne? Słyszałem o pożarach baterii',
      a: 'Stosuję ogniwa w technologii LFP (litowo-żelazowo-fosforanowej) — najbezpieczniejszej dla domu, odpornej na przegrzanie. Magazyny mają certyfikaty, system zarządzania baterią (BMS) i zabezpieczenia.',
    },
    {
      q: 'Co zimą, gdy słońca jest mało?',
      a: 'Wtedy pracuje taryfa dynamiczna: system ładuje magazyn tanim prądem z sieci w nocy i oddaje go w drogich godzinach szczytu. Magazyn pracuje na Twój rachunek cały rok, nie tylko latem.',
    },
    {
      q: 'Ile żyje magazyn energii?',
      a: 'Nowoczesne magazyny LFP projektowane są na 6 000–10 000 cykli, co przy codziennym użyciu oznacza kilkanaście lat pracy. Producenci dają zwykle ok. 10 lat gwarancji.',
    },
    {
      q: 'Mam już fotowoltaikę — da się dołożyć magazyn?',
      a: 'W większości przypadków tak (retrofit) — przez falownik hybrydowy lub dodatkowy moduł z bramą wyspową. Na bezpłatnej analizie sprawdzam, co najlepiej pasuje do Twojej instalacji.',
    },
  ],
  subsidy: {
    badge: 'Dotacja 2026',
    title: 'Do 16 000 zł dotacji na magazyn energii',
    text: 'Zapowiedziany program „Przydomowe Magazyny Energii" przewiduje dofinansowanie do 16 000 zł — ale z warunkami: magazyn musi mieć system zarządzania energią (EMS) i umieć pracować wyspowo (off-grid). Prosty magazyn bez aktywnego sterowania może nie przejść weryfikacji.',
    note: 'Nabór planowany na II/III kwartał 2026. Dobieram rozwiązania, które te wymogi spełniają — i pomagam przejść przez formalności.',
    cta: 'Sprawdź, czy się kwalifikujesz',
  },
  tariff: {
    title: 'Tak pracuje magazyn z taryfą dynamiczną',
    lead: 'Ceny prądu zmieniają się w ciągu doby. System ładuje magazyn, gdy energia jest tania, i korzysta z niej, gdy jest najdroższa.',
    chargeLabel: 'Ładowanie (tanio)',
    dischargeLabel: 'Korzystanie z magazynu (drogo)',
  },
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
    text: 'Ciekawi Cię, ile magazyn energii zaoszczędzi u Ciebie?',
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
    'Komplet formalności i zgłoszenie w naborze (II/III kw. 2026).',
  ],
}

// --- Exit-intent (próba wyjścia) ---
export const exitIntent = {
  title: 'Zanim wyjdziesz…',
  text: 'Zostaw numer telefonu — oddzwonię z bezpłatną wyceną oszczędności i powiem, czy załapiesz się na dotację do magazynu energii 2026. Bez zobowiązań.',
  phonePlaceholder: 'Twój numer telefonu',
  button: 'Poproszę o kontakt',
  dismiss: 'Nie, dziękuję',
  successTitle: 'Dziękuję! Wkrótce się odezwę.',
  successText: 'Zadzwonię na podany numer w dogodnym terminie.',
}

// --- Opinie w Google (wizytówka firmy Begolden) ---
export const googleReviews = {
  rating: '4,9',
  count: '1 339',
  url: 'https://share.google/igMkIhQFc3MaFw0Os',
  label: 'Opinie w Google',
  note: 'opinii w Google',
  cta: 'Zobacz opinie w Google',
}
