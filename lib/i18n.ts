import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';

// Translation resources
const resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: 'en', // Set default language, will be overridden by store

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  // React Native specific options
  react: {
    useSuspense: false,
  },
});

export default i18n;
