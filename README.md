# Aplikacja mobilna do ewidencji wydatków i dochodów

Aplikacja mobilna (React Native + Expo) do rejestrowania wydatków i dochodów w podziale na kategorie,
z miesięcznym podsumowaniem, powiadomieniami i głosowym odczytem salda. Dane przechowywane są lokalnie
w bazie SQLite na urządzeniu.

## Wymagania

- [Node.js](https://nodejs.org/) (wersja LTS)
- [Yarn](https://yarnpkg.com/)
- Telefon z systemem **Android** lub **iOS** z zainstalowaną aplikacją **Expo Go**
  (Google Play / App Store, https://expo.dev/go)

## Uruchomienie

1. Zainstaluj zależności:

   ```bash
   yarn install
   ```

2. Uruchom serwer deweloperski Expo:

   ```bash
   yarn start
   ```

   Polecenie uruchamia `expo start --tunnel`, więc telefon nie musi być w tej samej sieci co komputer.
   Przy pierwszym uruchomieniu Expo może poprosić o zgodę na instalację pakietu `@expo/ngrok` – należy ją potwierdzić.

3. Otwórz aplikację na telefonie:
   - **Android** – otwórz Expo Go i zeskanuj kod QR wyświetlony w terminalu,
   - **iOS** – zeskanuj kod QR aparatem telefonu i otwórz link w Expo Go.

4. Przy pierwszym uruchomieniu zezwól aplikacji na wysyłanie powiadomień.

## Budowanie aplikacji (Android i iOS)

Aplikację można zbudować zarówno na **Androida**, jak i na **iOS** przy pomocy usługi EAS Build
(konfiguracja w pliku `eas.json`). Wymagane jest konto Expo, a w przypadku iOS – konto Apple Developer.

```bash
npx eas login                      # logowanie do konta Expo
npx eas build --platform android   # build na Androida
npx eas build --platform ios       # build na iOS
npx eas build --platform all       # build na obie platformy
```

Gotowe buildy są dostępne na stronie https://expo.dev w sekcji „Builds”.

## Struktura projektu

- `app/` – ekrany aplikacji (ekran główny, wydatki, dochody) i nawigacja
- `components/` – komponenty interfejsu (formularz transakcji, lista transakcji, wybór kategorii)
- `types/` – definicje typów TypeScript
- `utils/` – inicjalizacja bazy danych i obsługa powiadomień
