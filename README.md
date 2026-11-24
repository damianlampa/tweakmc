# TweakMC

Publiczne repozytorium projektu TweakMC. Na tym etapie zawiera konfigurację narzędzi, CI i ekran „Strona w przygotowaniu”.

## Uruchomienie

Użyj Node.js z `.nvmrc` i npm 11.20.0. Zainstaluj zależności przez `npm ci` i uruchom `npm run dev`. Podgląd działa pod adresem <http://127.0.0.1:5173>.

## Kontrole

- `npm run check` sprawdza formatowanie, ESLint i typy.
- `npm run build` buduje aplikację do `dist/`, a `npm run preview` uruchamia podgląd.
- `npm run audit` sprawdza zależności.
- `npm exec -- playwright install chromium firefox webkit` instaluje przeglądarki. Następnie `npm test` sprawdza produkcyjny ekran na komputerach i urządzeniach mobilnych, w tym dostępność przez axe.

## Praca z Gitem

Husky uruchamia ESLint i Prettier dla przygotowanych plików oraz sprawdza komunikaty przez commitlint. Tytuły PR stosują Conventional Commits. Ustawienia gałęzi głównej i squash merge opisuje [konfiguracja repozytorium](.github/repository/README.md).

## Prawa autorskie

Wszelkie prawa do autorskiego kodu i materiałów zastrzeżone. Warunki są opisane w [LICENSE](LICENSE).
