import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAppStore } from '~/lib/stores/app-store';

const themeColors = {
  light: '#F8FAFC', // светлый фон
  dark: '#18181B', // тёмный фон
};

const ANIMATION_DURATION = 700;

export const AnimatedThemeView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useAppStore();
  const bg = useSharedValue(themeColors[theme]);

  useEffect(() => {
    bg.value = withTiming(themeColors[theme], { duration: ANIMATION_DURATION });
  }, [theme]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    flex: 1,
  }));

  return <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
