import { getLocales } from 'expo-localization';
import { Platform } from 'react-native';
import { create } from 'zustand';
import i18n from '../i18n';
import { storage } from '../storage-adapter';
import { STORAGE_KEYS } from '../storage-keys';

interface AppStore {
  isInitialized: boolean;
  theme: 'light' | 'dark';
  language: string;
  initializeApp: () => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => Promise<void>;
  setLanguage: (language: string) => Promise<void>;
}

// Web storage fallback for language
const getWebLanguage = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem('app-language');
  }
  return null;
};

const setWebLanguage = (language: string): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('app-language', language);
  }
};

export const useAppStore = create<AppStore>((set, get) => ({
  isInitialized: false,
  theme: 'dark', // Default theme
  language: 'en', // Default language

  initializeApp: async () => {
    try {
      await storage.init();
      // Load theme from storage
      const savedTheme = await storage.getString(STORAGE_KEYS.APP_THEME);
      const theme =
        savedTheme && (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';

      // Load language
      let language: string;

      if (Platform.OS === 'web') {
        const savedLanguage = getWebLanguage();
        if (savedLanguage) {
          language = savedLanguage;
        } else {
          // Fall back to device locale for web
          const deviceLocale = navigator.language?.split('-')[0] || 'en';
          language = deviceLocale === 'ru' ? 'ru' : 'en';
        }
      } else {
        const savedLanguage = await storage.getString(STORAGE_KEYS.APP_LANGUAGE);
        if (savedLanguage) {
          language = savedLanguage;
        } else {
          // Fall back to device locale for native
          const locales = getLocales();
          const deviceLocale = locales[0]?.languageCode || 'en';
          language = deviceLocale === 'ru' ? 'ru' : 'en';
        }
      }

      // Set i18n language
      await i18n.changeLanguage(language);

      // Update store with loaded values
      set({
        theme,
        language,
        isInitialized: true,
      });
    } catch (error) {
      // Fallback to defaults if anything fails
      console.warn('Failed to initialize app settings:', error);
      set({
        theme: 'dark',
        language: 'en',
        isInitialized: true,
      });
    }
  },

  setTheme: async (theme: 'light' | 'dark') => {
    await storage.init();
    await storage.setString(STORAGE_KEYS.APP_THEME, theme);
    set({ theme });
  },

  setLanguage: async (language: string) => {
    await storage.init();
    // Save to storage
    if (Platform.OS === 'web') {
      setWebLanguage(language);
    } else {
      await storage.setString(STORAGE_KEYS.APP_LANGUAGE, language);
    }

    // Update i18n
    await i18n.changeLanguage(language);
    set({ language });
  },
}));
