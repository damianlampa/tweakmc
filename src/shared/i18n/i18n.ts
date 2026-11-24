import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';

export type Language = 'pl' | 'en';
const storageKey = 'tweakmc-language';

function initialLanguage(): Language {
  try {
    return localStorage.getItem(storageKey) === 'en' ? 'en' : 'pl';
  } catch {
    return 'pl';
  }
}

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  document.title = i18n.t('meta.title');
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'));
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute('content', i18n.t('meta.socialTitle'));
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute('content', i18n.t('meta.socialDescription'));
});

void i18n.use(initReactI18next).init({
  resources: { pl: { translation: pl }, en: { translation: en } },
  lng: initialLanguage(),
  fallbackLng: 'pl',
  supportedLngs: ['pl', 'en'],
  initAsync: false,
  interpolation: { escapeValue: false },
});

export function changeLanguage(language: Language) {
  void i18n.changeLanguage(language);

  try {
    localStorage.setItem(storageKey, language);
  } catch {
    // The current tab still uses the selected language when storage is unavailable.
  }
}
