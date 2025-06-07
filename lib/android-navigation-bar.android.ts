import * as NavigationBar from 'expo-navigation-bar';
import { NAV_THEME } from '~/lib/constants';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  try {
    await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
    await NavigationBar.setBackgroundColorAsync(
      theme === 'dark' ? NAV_THEME.dark.background : NAV_THEME.light.background
    );
  } catch (error) {
    // Silently handle navigation bar API errors
  }
}
