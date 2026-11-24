# TweakMC.pl

Frontend sieci serwerów Minecraft TweakMC. Aplikacja korzysta z Reacta, Vite, Tailwind CSS i Three.js.

## Uruchomienie lokalne

Do pracy potrzebujesz Node.js 22 od wersji 22.22.1 albo Node.js 24 lub nowszego, a także npm i Git. W katalogu projektu zainstaluj zależności i uruchom serwer deweloperski.

```sh
npm ci
npm run dev
```

Otwórz [lokalny podgląd](http://127.0.0.1:5173).

## Podstrony

| Adres    | Zawartość                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------- |
| `/`      | Strona główna z globusem 3D, trybami gry, EarthSMP, instrukcją dołączenia, rankingiem i Discordem |
| `/sklep` | Doładowania portfela gracza                                                                       |
| `/mapa`  | Podgląd mapy i Dynmap przez proxy                                                                 |
| `/admin` | Panel demonstracyjny. Hasło testowe to `tweakmc2026`                                              |

## Kontrole projektu

`npm test` uruchamia kolejno sprawdzenie formatowania, typów w plikach JS/JSX oraz lint. Poszczególne kontrole można uruchomić przez `npm run format`, `npm run types` i `npm run lint`. Polecenie `npm run format-fix` zapisuje poprawki formatowania.

### Commity i hooki Git

Podczas `npm ci` skrypt `prepare` włącza Husky w lokalnym repozytorium. Przed commitem `lint-staged` uruchamia ESLint z automatycznymi poprawkami dla przygotowanych plików JavaScript i JSX, a następnie formatuje je Prettierem. Pozostałe obsługiwane pliki formatuje sam Prettier. Poprawki trafiają do indeksu Git. Cały projekt można poprawić poleceniami `npm run lint-fix` i `npm run format-fix`.

Hook `commit-msg` sprawdza wiadomość według Conventional Commits. Podaj typ, opcjonalny zakres w nawiasie i krótki opis zmiany, np. `fix(sklep): popraw walidację nicku` albo `docs: opisz uruchomienie mapy`.

## Konfiguracja integracji

Adresy serwera Minecraft, Discorda, mapy i endpointów sklepu znajdują się w `src/config.js`. Sklep domyślnie wyświetla dane poglądowe. Po podłączeniu backendu Stripe i pluginu Minecraft ustaw `shopApiEnabled` na `true` i ponownie zbuduj aplikację. Backend odpowiada za autoryzację endpointów administratora.

## Build i wdrożenie

```sh
npm run build
npm run preview
```

Podgląd produkcyjny działa pod [adresem lokalnym](http://127.0.0.1:4173). Na hosting opublikuj zawartość `dist/` wraz z plikami `.htaccess` dla Apache i `_redirects` dla hostingu obsługującego tę regułę. W Netlify lub Cloudflare Pages ustaw polecenie budowania `npm run build` i katalog publikacji `dist`. Gotowy folder można też przesłać przez [Netlify Drop](https://app.netlify.com/drop).
