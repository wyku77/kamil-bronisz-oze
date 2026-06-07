@echo off
chcp 65001 >nul
title Kamil Bronisz OZE - serwer lokalny
cd /d "%~dp0"

echo ============================================================
echo   Strona Kamil Bronisz (OZE) - uruchamianie lokalnie
echo ============================================================
echo.

REM Instalacja zaleznosci przy pierwszym uruchomieniu
if not exist "node_modules" (
  echo Pierwsze uruchomienie - instaluje zaleznosci ^(chwilke to potrwa^)...
  call npm install
  echo.
)

echo Startuje serwer... strona otworzy sie w przegladarce.
echo Adres: http://localhost:5174
echo.
echo NIE ZAMYKAJ TEGO OKNA, dopoki korzystasz ze strony.
echo Aby zatrzymac serwer: zamknij to okno lub nacisnij Ctrl+C.
echo ============================================================
echo.

call npm run dev

echo.
echo Serwer zostal zatrzymany.
pause
