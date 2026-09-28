Galeria realizacji "przed–po" dla podstrony Czyste Powietrze (sekcja #realizacje).

Pliki: rN-przed-800.webp / rN-przed-1200.webp oraz rN-po-800.webp / rN-po-1200.webp
(kadr 3:2, WebP). Lista kart jest w src/data/cp.ts (cpRealizacje.items) — każda realizacja
to jedno wywołanie rz(numer, opis „przed", opis „po", tytuł, opis prac). Nową realizację dodajesz,
dopisując kolejną pozycję i wrzucając tu pliki o tej samej nazwie.

Przygotowanie zdjęć (kadrowanie + rozmycie numerów domów/tablic) robi skrypt lokalny:
  node grafiki-ai/realizacje-cp/przygotuj.mjs
(folder grafiki-ai/ jest poza repozytorium — oryginały zdjęć zostają tylko lokalnie).

Zdjęcie w sekcji otwierającej (ten sam dom co 1. karta, r6) eksportuje:
  node grafiki-ai/cp-grafiki/hero-realizacja-2026.mjs  → src/assets/grafiki/cp/

Zasada: to PRAWDZIWE zdjęcia realizacji — bez retuszu AI i bez zmieniania wyglądu domów.
Dopuszczalne jest tylko kadrowanie, skalowanie i ukrywanie danych prywatnych.
