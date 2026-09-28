/**
 * Treść podstrony Czyste Powietrze (czyste-powietrze.html → src/cp/).
 * Teksty przeniesione 1:1 z dawnej statycznej podstrony public/czyste-powietrze.html.
 * FAQ musi zgadzać się z danymi strukturalnymi FAQPage w czyste-powietrze.html (<head>).
 */

// Sekcja otwierająca: PRAWDZIWA realizacja (r6) — tylko kadr i skalowanie, bez AI.
// Eksport: grafiki-ai/cp-grafiki/hero-realizacja-2026.mjs
import heroPo960 from '../assets/grafiki/cp/hero-realizacja-po-960.webp'
import heroPo1440 from '../assets/grafiki/cp/hero-realizacja-po-1440.webp'
import heroPo2000 from '../assets/grafiki/cp/hero-realizacja-po-2000.webp'
import heroPrzed240 from '../assets/grafiki/cp/hero-realizacja-przed-240.webp'
import heroPrzed400 from '../assets/grafiki/cp/hero-realizacja-przed-400.webp'

// Logotypy producentów — białe + kolorowe (grafiki-ai/logotypy-biale.mjs src/assets/producenci)
import pPanasonic from '../assets/producenci/biale/panasonic.png'
import pMidea from '../assets/producenci/biale/midea.png'
import pFerroli from '../assets/producenci/biale/ferroli.png'
import pPereko from '../assets/producenci/biale/pereko.png'
import pKfa from '../assets/producenci/biale/kfa-armatura.png'
import pWalendowscy from '../assets/producenci/biale/walendowscy.png'
import pPanasonicK from '../assets/producenci/kolor/panasonic.png'
import pMideaK from '../assets/producenci/kolor/midea.png'
import pFerroliK from '../assets/producenci/kolor/ferroli.png'
import pPerekoK from '../assets/producenci/kolor/pereko.png'
import pKfaK from '../assets/producenci/kolor/kfa-armatura.png'
import pWalendowscyK from '../assets/producenci/kolor/walendowscy.png'

/** Grafiki z public/grafiki-czyste-powietrze/ (ścieżki względne — strona leży w katalogu głównym). */
const g = (plik: string) => `grafiki-czyste-powietrze/${plik}`

export const cpWhatsappText =
  'Dzień dobry, chcę zapytać o dotację Czyste Powietrze (wymiana pieca / termomodernizacja). Proszę o kontakt.'

export const cpNav = {
  items: [
    { label: 'Finansowanie', href: '#finansowanie' },
    { label: 'Wymiana pieca', href: '#zrodla' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  mobileItems: [
    { label: 'Sprawdź, czy się łapiesz', href: '#kwalifikacja' },
    { label: 'Co możesz sfinansować', href: '#finansowanie' },
    { label: 'Na co wymienić piec', href: '#zrodla' },
    { label: 'Poziomy dofinansowania', href: '#poziomy' },
    { label: 'Realizacje', href: '#realizacje' },
    { label: 'Najczęstsze pytania', href: '#faq' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
}

export const cpHero = {
  badge: 'Czyste Powietrze 2026 · całe woj. lubelskie',
  badgeShort: 'Czyste Powietrze · Lubelskie',
  // Nagłówek bez zmian względem dawnej podstrony
  title: 'Program',
  titleAccent: 'Czyste Powietrze',
  titleEnd: '— wymiana starego pieca i termomodernizacja z dofinansowaniem',
  subtitle:
    'Wymiana pieca bez stresu z formalnościami — od wniosku po wypłatę dotacji. Sprawdź w 20 sekund, czy się łapiesz.',
  primaryCta: 'Sprawdź, czy się kwalifikujesz',
  trust: ['Całe województwo lubelskie', 'Formalności biorę na siebie', 'Łączę z PV i magazynem energii'],
  person: {
    note: 'oddzwaniam osobiście',
    company: 'Docieplenia i wymiany pieców realizuję z Begolden',
  },
  image: {
    src: heroPo1440,
    srcSet: `${heroPo960} 960w, ${heroPo1440} 1440w, ${heroPo2000} 2000w`,
    alt: 'Prawdziwa realizacja z województwa lubelskiego: dom po dociepleniu i nowej elewacji z brązowym pasem',
  },
  before: {
    src: heroPrzed240,
    srcSet: `${heroPrzed240} 240w, ${heroPrzed400} 400w`,
    alt: 'Ten sam dom przed termomodernizacją: stara elewacja z płytek',
  },
  stats: [
    { value: 100, prefix: 'do ', suffix: '%', label: 'kosztów pokrytych z dotacji' },
    { value: 20, suffix: ' sek', label: 'i znasz wstępny wynik' },
    { value: 5, suffix: ' lat', label: 'doświadczenia w branży OZE' },
    { value: 1380, suffix: '', label: 'opinii Google firmy Begolden · 4,9 ★' },
  ],
  // Dłuższy opis programu — przeniesiony z pierwszego ekranu do sekcji „Co możesz sfinansować"
  programText:
    'Czyste Powietrze to rządowy program dla właścicieli i współwłaścicieli domów jednorodzinnych. Dopłaca do wymiany starego „kopciucha" na nowoczesne źródło ciepła — **pompę ciepła, piec na pellet lub piec zgazowujący drewno** — a także do ocieplenia domu, wymiany okien i drzwi oraz wentylacji. Sprawdzę, czy się kwalifikujesz, dobiorę najlepsze rozwiązanie i poprowadzę Cię przez cały wniosek.',
}

export const cpProducers = {
  label: 'Dobieram sprawdzony sprzęt renomowanych producentów',
  items: [
    { src: pPanasonic, color: pPanasonicK, alt: 'Panasonic', h: 20 },
    { src: pMidea, color: pMideaK, alt: 'Midea', h: 30 },
    { src: pFerroli, color: pFerroliK, alt: 'Ferroli', h: 30 },
    { src: pPereko, color: pPerekoK, alt: 'Pereko', h: 19 },
    { src: pKfa, color: pKfaK, alt: 'KFA Armatura', h: 26 },
    { src: pWalendowscy, color: pWalendowscyK, alt: 'Walendowscy', h: 36 },
  ],
}

// --- Quiz kwalifikacyjny (#kwalifikacja). Wartości `v` trafiają do leada — nie zmieniaj ich. ---
export const cpQuiz = {
  eyebrow: 'Sprawdź w 20 sekund',
  title: 'Czy łapiesz się na Czyste Powietrze?',
  lead: 'Odpowiedz na 5 krótkich pytań — od razu zobaczysz wstępny wynik. Dokładny poziom dofinansowania policzę dla Ciebie po krótkiej rozmowie.',
  questions: [
    {
      key: 'owner',
      label: 'Czy jesteś właścicielem lub współwłaścicielem domu jednorodzinnego?',
      options: [
        { v: 'tak', label: 'Tak' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      key: 'heat',
      label: 'Czym teraz ogrzewasz dom?',
      options: [
        { v: 'wegiel', label: 'Stary piec węglowy („kopciuch")' },
        { v: 'gaz', label: 'Piec gazowy' },
        { v: 'drewno', label: 'Piec / kominek na drewno' },
        { v: 'elektr', label: 'Ogrzewanie elektryczne' },
        { v: 'inne', label: 'Inne' },
      ],
    },
    {
      key: 'insul',
      label: 'Czy Twój dom jest już ocieplony?',
      options: [
        { v: 'tak', label: 'Tak' },
        { v: 'czesc', label: 'Częściowo' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      key: 'newsrc',
      label: 'Jakie nowe źródło ciepła Cię interesuje?',
      options: [
        { v: 'pompa', label: 'Pompa ciepła' },
        { v: 'pellet', label: 'Piec peletowy' },
        { v: 'zgaz', label: 'Piec zgazowujący drewno' },
        { v: 'niewiem', label: 'Nie wiem — doradź' },
      ],
    },
    {
      key: 'when',
      label: 'Kiedy planujesz wymianę?',
      options: [
        { v: 'asap', label: 'Jak najszybciej' },
        { v: 'do3m', label: 'Do 3 miesięcy' },
        { v: 'do12m', label: '3–12 miesięcy' },
        { v: 'rozeznaje', label: 'Na razie się rozeznaję' },
      ],
    },
  ] as const,
  voivodeships: [
    'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
    'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie',
    'zachodniopomorskie',
  ],
  formTitle: 'Zostaw numer — oddzwonię i policzę Twój poziom dofinansowania.',
  formSub: 'Bez zobowiązań. Krótka, konkretna rozmowa.',
  submit: 'Oddzwońcie do mnie — policzcie moją dotację',
  note: '🔒 Dane bezpieczne, zgodnie z RODO · oddzwaniam zwykle tego samego dnia',
  thanksTitle: 'Dziękuję! 📞',
  thanks: 'Mam Twój numer — oddzwonię i sprawdzimy Twój poziom dofinansowania w Czyste Powietrze. Do usłyszenia!',
}

export const cpFinancing = {
  eyebrow: 'Zakres dotacji',
  title: 'Co możesz sfinansować',
  lead: 'Zakres dofinansowania zależy od wybranej ścieżki i poziomu dotacji.',
  items: [
    { img: g('ikona-zrodlo-ciepla.webp'), title: 'Wymiana źródła ciepła', text: 'Wymiana starego „kopciucha" na nowoczesne ogrzewanie: pompę ciepła, piec na pellet lub piec zgazowujący drewno.' },
    { img: g('ikona-ocieplenie.webp'), title: 'Ocieplenie domu', text: 'Docieplenie ścian, dachu, stropów i podłóg — niższe zużycie energii na ogrzewanie.' },
    { img: g('ikona-okna-drzwi.webp'), title: 'Okna i drzwi', text: 'Wymiana stolarki okiennej i drzwiowej na energooszczędną.' },
    { img: g('ikona-wentylacja.webp'), title: 'Wentylacja z rekuperacją', text: 'Odzysk ciepła z powietrza — komfort i dodatkowe oszczędności.' },
    { img: g('ikona-co-cwu.webp'), title: 'Instalacja c.o. i c.w.u.', text: 'Modernizacja instalacji grzewczej i ciepłej wody użytkowej.' },
    { img: g('ikona-audyt.webp'), title: 'Audyt energetyczny', text: 'W wybranych ścieżkach dofinansowany audyt, który wskazuje optymalny zakres prac.' },
  ],
}

export const cpSources = {
  eyebrow: 'Wymiana pieca',
  title: 'Na co wymienić stary piec?',
  lead: 'Nie ma jednej dobrej drogi — dobieram źródło ciepła pod Twój dom, budżet i dostęp do paliwa. Oto trzy najczęstsze kierunki:',
  items: [
    {
      img: g('zrodlo-pompa-ciepla.webp'),
      alt: 'Pompa ciepła powietrzna — jednostka zewnętrzna (ilustracja poglądowa)',
      title: 'Pompa ciepła',
      for: 'Dla ceniących wygodę i najniższe rachunki',
      plus: ['Najniższe koszty eksploatacji', 'Bezobsługowa, świetna z PV i taryfą dynamiczną', 'Czyste ciepło — bez komina, dymu i paliwa'],
      warn: ['Wyższy koszt startu — ale najwyższe dotacje'],
    },
    {
      img: g('zrodlo-piec-peletowy.webp'),
      alt: 'Piec peletowy z zasobnikiem na pellet (ilustracja poglądowa)',
      title: 'Piec peletowy',
      for: 'Dla chcących „klasyczne" ciepło bez przebudowy',
      plus: ['Niższy koszt inwestycji', 'Automatyczny podajnik — wygoda obsługi', 'Bez dużej modernizacji instalacji c.o.'],
      warn: ['Trzeba dokupywać pellet i czyścić piec'],
    },
    {
      img: g('zrodlo-piec-zgazowujacy.webp'),
      alt: 'Piec zgazowujący drewno z drewnem opałowym (ilustracja poglądowa)',
      title: 'Piec zgazowujący drewno',
      for: 'Dla mających dostęp do taniego drewna',
      plus: ['Najtańsze paliwo, wysoka sprawność', 'Niezależność od cen prądu i gazu'],
      warn: ['Wymaga bufora ciepła', 'Ręczny załadunek drewna'],
    },
  ],
  note: 'Nie wiesz, co wybrać? To naturalne — na bezpłatnej analizie porównam koszty i dobiorę rozwiązanie pod Twój dom. Często najlepszy efekt daje połączenie nowego źródła ciepła z fotowoltaiką i magazynem energii.',
  band: {
    title: 'Nie zgaduj — policzę Twój poziom dotacji za darmo',
    text: 'Zostaw numer albo napisz na WhatsApp. Oddzwaniam tego samego dnia, bez zobowiązań.',
    button: 'Sprawdź dotację',
  },
}

export const cpLevels = {
  eyebrow: 'Poziomy dotacji',
  title: 'Trzy poziomy dofinansowania',
  lead: 'Dotacja pokrywa **procent kosztów kwalifikowanych** — im niższy dochód w gospodarstwie, tym wyższy udział dofinansowania.',
  items: [
    { img: g('ikona-poziom-podstawowy.webp'), tag: 'Poziom podstawowy', amt: 'do 40%', text: 'Dla wyższych dochodów — niższy udział dotacji, ale wciąż realne wsparcie do kosztów.' },
    { img: g('ikona-poziom-podwyzszony.webp'), tag: 'Poziom podwyższony', amt: 'do 70%', text: 'Dla średnich dochodów — znacząco wyższy udział dofinansowania w kosztach inwestycji.' },
    { img: g('ikona-poziom-najwyzszy.webp'), tag: 'Poziom najwyższy', amt: 'do 100%', text: 'Dla najniższych dochodów i kompleksowej termomodernizacji — nawet pełne pokrycie kosztów kwalifikowanych.' },
  ],
  note: 'Procenty i progi dochodowe programu Czyste Powietrze bywają aktualizowane przez NFOŚiGW. Na bezpłatnej analizie sprawdzę aktualny stan, Twoją realną kwalifikację i **policzę konkretną kwotę w złotówkach** dla Twojego zakresu prac — bez zgadywania.',
  deadline: {
    title: 'Nabór i terminy — nie czekaj do ostatniej chwili',
    lead: 'Czyste Powietrze to program z określonym horyzontem, nie nabór „na zawsze".',
    text: 'Program zaplanowano **do 2029 roku**, ale budżet i zasady bywają aktualizowane przez NFOŚiGW, a kolejne nabory potrafią zaostrzać warunki. Im wcześniej złożysz wniosek, tym pewniejsze dofinansowanie i spokojniejsza realizacja — najlepiej z zapasem przed sezonem grzewczym.',
  },
}

export const cpProcess = {
  eyebrow: 'Współpraca',
  title: 'Jak wygląda współpraca — krok po kroku',
  lead: 'Prowadzę Cię od pierwszej rozmowy aż po wypłatę dotacji. Formalności biorę na siebie.',
  steps: [
    { img: g('ikona-krok-analiza.webp'), title: 'Analiza kwalifikacji', text: 'Sprawdzam, czy i na jakim poziomie się kwalifikujesz oraz co realnie Ci przysługuje — bez zgadywania.' },
    { img: g('ikona-krok-dobor.webp'), title: 'Dobór źródła ciepła i zakresu', text: 'Porównuję pompę ciepła, piec peletowy i piec zgazowujący drewno, dobieram zakres prac (np. źródło + ocieplenie) pod Twój dom i budżet.' },
    { img: g('ikona-krok-wniosek.webp'), title: 'Wniosek i formalności', text: 'Kompletujemy dokumenty i składamy wniosek — przeprowadzam Cię przez cały proces.' },
    { img: g('ikona-krok-realizacja.webp'), title: 'Realizacja', text: 'Montaż nowego źródła ciepła i pozostałych prac przez sprawdzonych wykonawców.' },
    { img: g('ikona-krok-rozliczenie.webp'), title: 'Rozliczenie dotacji', text: 'Pomagam rozliczyć inwestycję i wypłacić dofinansowanie. Mogę też połączyć ją z PV i magazynem energii.' },
  ],
}

export type Realizacja = {
  id: string
  title: string
  meta: string
  before: { src: string; srcSet?: string; alt: string; label?: string }
  after: { src: string; srcSet: string; alt: string }
}

const rz = (n: number, beforeAlt: string, afterAlt: string, title: string, meta: string): Realizacja => {
  const p = (s: string, w: number) => `realizacje-czyste-powietrze/r${n}-${s}-${w}.webp`
  return {
    id: `r${n}`,
    title,
    meta,
    before: { src: p('przed', 1200), srcSet: `${p('przed', 800)} 800w, ${p('przed', 1200)} 1200w`, alt: beforeAlt },
    after: { src: p('po', 1200), srcSet: `${p('po', 800)} 800w, ${p('po', 1200)} 1200w`, alt: afterAlt },
  }
}

export const cpRealizacje = {
  eyebrow: 'Realizacje',
  title: 'Realizacje — przed i po',
  lead: 'Prawdziwe zdjęcia z domów klientów z województwa lubelskiego. Przełącz **Przed / Po** albo przewiń w bok, żeby zobaczyć kolejne realizacje.',
  googleNote: 'Wszystkie docieplenia i wymiany pieców realizuję z firmą Begolden — tu zobaczysz jej oceny.',
  items: [
    rz(6, 'Dom z zielonym dachem przed dociepleniem: elewacja z płytek, zima', 'Dom z zielonym dachem po dociepleniu: biała elewacja z brązowym pasem', 'Dom z zielonym dachem', 'Docieplenie i elewacja z dekoracyjnym pasem'),
    rz(4, 'Dom z cegły przed dociepleniem: elewacja frontowa', 'Dom z cegły po dociepleniu: gładka, biała elewacja frontowa', 'Dom z cegły — front', 'Docieplenie ścian i nowa elewacja'),
    rz(5, 'Dom z cegły przed dociepleniem: ściana szczytowa i zadaszenie wejścia', 'Ten sam dom z cegły po dociepleniu: ściana szczytowa i zadaszenie wejścia', 'Dom z cegły — strona wejścia', 'Ten sam dom, widok na szczyt i zadaszenie'),
    rz(3, 'Dom z poddaszem przed termomodernizacją: elewacja z płytek', 'Dom z poddaszem po dociepleniu: biała elewacja z brązowym cokołem', 'Dom z poddaszem', 'Docieplenie, nowa elewacja i cokół'),
    rz(2, 'Dom z balkonem przed termomodernizacją: zniszczona, odpadająca elewacja', 'Dom z balkonem po dociepleniu: nowa, biała elewacja', 'Dom z balkonem', 'Docieplenie ścian i nowa elewacja'),
    {
      // Zdjęcie „w trakcie" istnieje tylko w 800 px
      ...rz(1, '', 'Ten sam dom po remoncie: nowy dach z blachodachówki, docieplone i otynkowane ściany', 'Stary dom drewniany', 'Nowy dach, docieplenie ścian i elewacja'),
      before: {
        src: 'realizacje-czyste-powietrze/r1-przed-800.webp',
        alt: 'Stary dom drewniany w trakcie prac: nowa więźba i membrana dachowa, widok z drona',
        label: 'W trakcie',
      },
    },
  ] as Realizacja[],
  band: {
    title: 'Chcesz takiego efektu u siebie?',
    text: 'Sprawdź w 20 sekund, czy łapiesz się na dotację — resztę policzę za Ciebie.',
    button: 'Sprawdź dotację',
  },
}

export const cpAbout = {
  eyebrow: 'Kto Ci pomoże',
  role: 'Konsultant energetyczny · 5 lat w branży OZE',
  paragraphs: [
    'Od **5 lat** doradzam właścicielom domów w fotowoltaice, magazynach energii i wymianie źródła ciepła — przeprowadziłem przez ten proces dziesiątki rodzin na terenie **całego województwa lubelskiego**. Wiem, gdzie wnioski się „sypią" i jak tego uniknąć.',
    'Prowadzę Cię przez Czyste Powietrze i powiązane dotacje od A do Z — od doboru źródła ciepła, przez wniosek, po wypłatę. Działam doradczo: tłumaczę opcje prostym językiem i dobieram rozwiązanie, które najszybciej obniży Twoje rachunki — bez sprzedażowej presji.',
  ],
  proof: 'Realizacje OZE — całe województwo lubelskie',
  why: {
    title: 'Dlaczego ja, a nie pierwszy lepszy instalator',
    lead: 'Większość firm sprzeda Ci to, co akurat ma w ofercie. Ja pracuję inaczej.',
    items: [
      { img: g('ikona-niezaleznosc.webp'), title: 'Nie jestem instalatorem jednej marki', text: 'Dobieram źródło ciepła i sprzęt **niezależnie** — pod Twój dom i budżet, a nie pod magazyn jednego producenta.' },
      { img: g('ikona-wspolpraca.webp'), title: 'Prowadzę od wniosku po wypłatę', text: 'Nie znikam po podpisie. Zostaję z Tobą do **rozliczenia i wypłaty dotacji** — pilnuję terminów i statusu wniosku.' },
      { img: g('ikona-formalnosci.webp'), title: 'Formalności biorę na siebie', text: 'Wniosek, dokumenty, kontakt z programem — kompletuję i prowadzę to za Ciebie, żeby nic się nie „posypało".' },
      { img: g('ikona-laczenie-dotacji.webp'), title: 'Łączę dotacje w jedną całość', text: 'Planuję Czyste Powietrze razem z **fotowoltaiką i magazynem energii** — tak, by maksymalnie obniżyć rachunki.' },
    ],
  },
}

export const cpFaq = {
  eyebrow: 'FAQ',
  title: 'Najczęstsze pytania',
  lead: 'Krótko o zasadach programu. Nie ma tu Twojego pytania? Zadzwoń albo zostaw numer — wyjaśnię Twój przypadek.',
  items: [
    { q: 'Kto może skorzystać?', a: 'Właściciele i współwłaściciele domów jednorodzinnych (lub wydzielonego lokalu z księgą wieczystą). Poziom dotacji zależy od dochodu, a zakres dofinansowanych prac zależy również od wyniku audytu energetycznego.' },
    { q: 'Czy mogę dostać pieniądze z góry?', a: 'W części ścieżek programu możliwe jest prefinansowanie, czyli wypłata zaliczki przed zakończeniem prac. Sprawdzę, czy kwalifikujesz się do tej opcji.' },
    { q: 'Czy stary piec trzeba zlikwidować?', a: 'Tak — warunkiem wymiany jest trwałe usunięcie starego, nieekologicznego źródła ciepła. Pomagam dopiąć ten wymóg formalnie.' },
    { q: 'Najpierw wniosek czy wymiana pieca?', a: 'Zwykle zaczynamy od wniosku i kwalifikacji, a dopiero potem realizujemy prace — żeby nie stracić dofinansowania. Doradzę właściwą kolejność w Twoim przypadku.' },
    { q: 'Mam piec gazowy — czy się łapię?', a: 'To zależy od aktualnych zasad programu i Twojej sytuacji. Na analizie sprawdzę, czy i w jakim zakresie kwalifikujesz się do wsparcia.' },
    { q: 'Ile czeka się na wypłatę?', a: 'Czas zależy od kompletności dokumentów i etapu programu. Pilnuję terminów i statusu wniosku, żeby nie było przestojów.' },
    { q: 'Czy łączę to z dotacją na magazyn / PV?', a: 'Tak — Czyste Powietrze, dotacja na magazyn energii i fotowoltaika to różne programy; planuję je tak, by się uzupełniały i maksymalnie obniżyły rachunki.' },
    { q: 'Jakich dokumentów potrzebuję?', a: 'Najczęściej dane nieruchomości, informacja o dochodzie i o obecnym źródle ciepła. Dokładną listę przygotuję pod Twój przypadek — formalności biorę na siebie.' },
    { q: 'W jakich miastach działasz?', a: 'Obsługuję całe województwo lubelskie — m.in. Lublin, Świdnik, Lubartów, Łęczna, Parczew, Puławy, Opole Lubelskie i Kraśnik. Dojeżdżam do klienta, a wstępną analizę mogę też wykonać zdalnie.' },
  ],
}

export const cpContact = {
  eyebrow: 'Kontakt • bezpłatnie',
  title: 'Sprawdź, czy łapiesz się na Czyste Powietrze',
  lead: 'Bezpłatna analiza — sprawdzę Twój poziom dofinansowania i połączę go z oszczędnościami z fotowoltaiki i magazynu energii.',
  formTitle: 'Zostaw numer — oddzwonię i policzę Twoją dotację',
  whenLabel: 'Kiedy planujesz wymianę?',
  submit: 'Zostaw numer — oddzwonię',
  note: '🔒 Dane bezpieczne, zgodnie z RODO · oddzwaniam zwykle tego samego dnia',
  thanks: 'Mam Twój numer — oddzwonię i sprawdzimy Twój poziom dofinansowania w Czyste Powietrze. W pilnej sprawie zadzwoń pod',
}

export const cpFooter = {
  about:
    'Pomagam przejść przez program Czyste Powietrze — od doboru źródła ciepła, przez wniosek, po wypłatę dotacji — i łączę go z fotowoltaiką oraz magazynem energii.',
  disclaimer: 'Informacje mają charakter ogólny i nie stanowią porady; aktualne warunki programu określa NFOŚiGW.',
}
