import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

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

// Check if we're on web platform
const isWeb = Platform.OS === 'web';

// Web storage fallback
const webStorage = {
  getItem: (key: string): Promise<string | null> => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return Promise.resolve(window.localStorage.getItem(key));
    }
    return Promise.resolve(null);
  },
  setItem: (key: string, value: string): Promise<void> => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    return Promise.resolve();
  },
};

// Language detection and storage
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from storage
      const storage = isWeb ? webStorage : AsyncStorage;
      const savedLanguage = await storage.getItem('app-language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fall back to device locale
      const deviceLocale = getLocales()[0]?.languageCode || 'en';
      const supportedLanguage = deviceLocale === 'ru' ? 'ru' : 'en';
      callback(supportedLanguage);
    } catch (error) {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      const storage = isWeb ? webStorage : AsyncStorage;
      await storage.setItem('app-language', lng);
    } catch (error) {
      // Silently handle storage errors
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // React Native specific options
    react: {
      useSuspense: false,
    },
  });

export default i18n;
