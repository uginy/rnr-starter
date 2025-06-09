import { getLocales } from 'expo-localization';
import { Platform } from 'react-native';
import { create } from 'zustand';
import i18n from '../i18n';
import { STORAGE_KEYS, settingsStorage } from '../storage';

interface AppStore {
  isInitialized: boolean;
  theme: 'light' | 'dark';
  language: string;
  initializeApp: () => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
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
      // Synchronously load theme from MMKV
      const savedTheme = settingsStorage.getString(STORAGE_KEYS.APP_THEME);
      const theme =
        savedTheme && (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';

      // Synchronously load language
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
        const savedLanguage = settingsStorage.getString(STORAGE_KEYS.APP_LANGUAGE);
        if (savedLanguage) {
          language = savedLanguage;
        } else {
          // Fall back to device locale for native
          const deviceLocale = getLocales()[0]?.languageCode || 'en';
          language = deviceLocale === 'ru' ? 'ru' : 'en';
        }
      }

      // Set i18n language synchronously
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

  setTheme: (theme: 'light' | 'dark') => {
    settingsStorage.setString(STORAGE_KEYS.APP_THEME, theme);
    set({ theme });
  },

  setLanguage: (language: string) => {
    // Save to storage
    if (Platform.OS === 'web') {
      setWebLanguage(language);
    } else {
      settingsStorage.setString(STORAGE_KEYS.APP_LANGUAGE, language);
    }

    // Update i18n
    i18n.changeLanguage(language);
    set({ language });
  },
}));
