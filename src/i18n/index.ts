import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './translations/en.json';
import de from './translations/de.json';

const LANGUAGES = {
  en,
  de,
};

const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR: {
  type: any;
  async: boolean;
  detect: (callback: (arg0: string) => void) => Promise<void>;
  init: () => void;
  cacheUserLanguage: () => void;
} = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (arg0: string) => void) => {
    const findBestAvailableLanguage =
      RNLocalize.findBestAvailableLanguage(LANG_CODES);
    if (
      Object.keys(LANGUAGES).includes(
        findBestAvailableLanguage?.languageTag ?? 'en',
      )
    ) {
      callback(findBestAvailableLanguage?.languageTag ?? 'en');
      return;
    }
    callback('en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
