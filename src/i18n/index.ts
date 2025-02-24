import i18n, { InitOptions, TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { CONSTANTS } from '$/constants';

import en from './translations/en.json';

const resources = {
  en: {
    translation: en,
  },
};

type Language = keyof typeof resources;

const supportedLngs = Object.keys(resources);

const initOptions: InitOptions = {
  resources,
  fallbackLng: 'en',
  load: 'languageOnly',
  appendNamespaceToMissingKey: false,
  preload: ['en'],
  debug: import.meta.env.DEV,
  returnDetails: false,
  returnObjects: false,
  interpolation: {
    prefix: '((',
    suffix: '))',
  },
  supportedLngs,
  react: {
    useSuspense: import.meta.env.DEV,
  },
  cleanCode: true,
  nonExplicitSupportedLngs: true,
  detection: {
    lookupCookie: CONSTANTS.LOCALE,
    lookupSessionStorage: CONSTANTS.LOCALE,
    lookupLocalStorage: CONSTANTS.LOCALE,
    convertDetectedLanguage(lng) {
      [lng] = lng.split(/-/);

      if (!supportedLngs.includes(lng)) return 'en';

      return lng;
    },
    order: ['localStorage', 'navigator'],
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

declare module 'i18next' {
  interface i18n {
    language: Language;
    changeLanguage(lang: Language): Promise<void>;
    t: TFunction<'translations'>;
  }

  interface CustomTypeOptions {
    defaultNS: 'translations';
    resources: {
      translations: typeof en;
    };
  }
}

export type { Language };

export default i18n;
