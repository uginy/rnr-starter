import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { setAndroidNavigationBar } from './android-navigation-bar';
import { useAppStore } from './stores/app-store';

export function useColorScheme() {
  const { setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();
  const { theme, setTheme, isInitialized } = useAppStore();

  // Синхронизируем NativeWind только после инициализации и при смене темы
  useEffect(() => {
    if (isInitialized) {
      setNativewindColorScheme(theme);
    }
  }, [theme, isInitialized, setNativewindColorScheme]);

  // Только один способ смены темы!
  const setColorSchemeWithStorage = (scheme: 'light' | 'dark') => {
    setTheme(scheme);
    // Не вызываем setNativewindColorScheme здесь!
  };

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
