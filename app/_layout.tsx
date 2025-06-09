import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Appearance, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LanguageToggle } from '~/components/LanguageToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';
import { ToastProvider } from '~/lib/toast';
import { useColorScheme } from '~/lib/useColorScheme';
import '~/lib/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InitializationProvider } from '~/lib/providers/InitializationProvider';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();
  const { t } = useTranslation();

  // Conditional provider wrapper for native platforms
  const ProviderWrapper =
    Platform.OS !== 'web'
      ? require('@gorhom/bottom-sheet').BottomSheetModalProvider
      : React.Fragment;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitializationProvider>
        <ProviderWrapper>
          <ToastProvider enableErrorInterceptor>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
                <Stack>
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: true,
                      title: t('navigation.title'),
                      headerRight: () => (
                        <View className="gap-4 flex flex-row">
                          <LanguageToggle />
                          <ThemeToggle />
                        </View>
                      ),
                    }}
                  />
                </Stack>
              </SafeAreaView>
              <PortalHost />
            </ThemeProvider>
          </ToastProvider>
        </ProviderWrapper>
      </InitializationProvider>
    </GestureHandlerRootView>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light');
  }, []);
}

function noop() {}
