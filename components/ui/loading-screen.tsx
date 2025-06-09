import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { Text } from './text';

export function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the loading indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [fadeAnim, pulseAnim]);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: pulseAnim }],
        }}
        className="items-center"
      >
        <View className="mb-6">
          <ActivityIndicator
            size="large"
            color="#007AFF" // Use a nice blue color that works in both themes
          />
        </View>
        <Text className="text-muted-foreground text-base font-medium">Initializing...</Text>
      </Animated.View>
    </View>
  );
}
