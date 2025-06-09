import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { setAndroidNavigationBar } from './android-navigation-bar';
import { useAppStore } from './stores/app-store';

export function useColorScheme() {
  const { setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();
  const { theme, setTheme, isInitialized } = useAppStore();

  // Sync with nativewind when store is initialized
  useEffect(() => {
    if (isInitialized) {
      setNativewindColorScheme(theme);
    }
  }, [theme, isInitialized, setNativewindColorScheme]);

  // Enhanced setColorScheme that updates store and navigation bar
  const setColorSchemeWithStorage = (scheme: 'light' | 'dark') => {
    setTheme(scheme);
    setNativewindColorScheme(scheme);
    setAndroidNavigationBar(scheme);
  };

  // Enhanced toggleColorScheme that saves to storage
  const toggleColorSchemeWithStorage = () => {
    const newScheme = theme === 'dark' ? 'light' : 'dark';
    setColorSchemeWithStorage(newScheme);
  };

  return {
    colorScheme: theme,
    isDarkColorScheme: theme === 'dark',
    setColorScheme: setColorSchemeWithStorage,
    toggleColorScheme: toggleColorSchemeWithStorage,
  };
}
