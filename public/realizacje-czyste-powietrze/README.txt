Galeria realizacji "przed–po" dla podstrony Czyste Powietrze.

Wrzuć tutaj zdjęcia domów (np. dom1-przed.jpg, dom1-po.jpg) — najlepiej w proporcji
zbliżonej do poziomej, ok. 1200 px szerokości, lekkie (JPG).

Potem w pliku public/czyste-powietrze.html, w skrypcie, uzupełnij tablicę GALLERY, np.:

  var GALLERY = [
    { before: 'realizacje-czyste-powietrze/dom1-przed.jpg',
      after:  'realizacje-czyste-powietrze/dom1-po.jpg',
      cap: 'Wymiana kopciucha na pompę ciepła — Świdnik' },
  ];

Gdy tablica nie jest pusta, sekcja "Realizacje — przed i po" pokaże pary zdjęć
zamiast komunikatu "w przygotowaniu".
