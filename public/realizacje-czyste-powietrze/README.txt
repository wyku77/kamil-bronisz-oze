Galeria realizacji "przed–po" dla podstrony Czyste Powietrze (sekcja #realizacje).

Pliki: rN-przed-800.webp / rN-przed-1200.webp oraz rN-po-800.webp / rN-po-1200.webp
(kadr 3:2, WebP). Karty są wpisane w HTML w public/czyste-powietrze.html — każda realizacja
to jeden blok <article class="rz-card">. Nową realizację dodajesz, kopiując blok i podmieniając
nazwy plików, opisy (alt), tytuł i opis prac.

Przygotowanie zdjęć (kadrowanie + rozmycie numerów domów/tablic) robi skrypt lokalny:
  node grafiki-ai/realizacje-cp/przygotuj.mjs
(folder grafiki-ai/ jest poza repozytorium — oryginały zdjęć zostają tylko lokalnie).

Zasada: to PRAWDZIWE zdjęcia realizacji — bez retuszu AI i bez zmieniania wyglądu domów.
Dopuszczalne jest tylko kadrowanie, skalowanie i ukrywanie danych prywatnych.
