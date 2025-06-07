import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import type { ToastConfig, ToastMessage, ToastService, ToastType } from '../types';
import { getToastMessage } from '../utils/i18n-utils';

interface FallbackToastProps {
  message: ToastMessage;
  onDismiss: (id: string) => void;
}

const FallbackToast: React.FC<FallbackToastProps> = ({ message, onDismiss }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(50));

  const animateOut = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(message.id);
    });
  }, [opacity, translateY, onDismiss, message.id]);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const duration = message.config?.duration || 3000;
    if (duration > 0) {
      const timer = setTimeout(() => {
        animateOut();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message.config?.duration, opacity, translateY, animateOut]);

  const getToastStyleObject = (type: ToastType) => {
    const baseStyle = {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 12,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8, // For Android shadow
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#22c55e' }; // green-500
      case 'error':
        return { ...baseStyle, backgroundColor: '#ef4444' }; // red-500
      case 'info':
        return { ...baseStyle, backgroundColor: '#3b82f6' }; // blue-500
      case 'warning':
        return { ...baseStyle, backgroundColor: '#f59e0b' }; // yellow-500
      case 'loading':
        return { ...baseStyle, backgroundColor: '#6b7280' }; // gray-500
      default:
        return { ...baseStyle, backgroundColor: '#6b7280' }; // gray-500
    }
  };

  const getTextStyleObject = (type: ToastType) => {
    return {
      color: type === 'warning' ? '#000' : '#fff',
      fontSize: 16,
      fontWeight: '500' as const,
      flex: 1,
    };
  };

  const getIconForType = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'loading':
        return '⏳';
      default:
        return 'ℹ️';
    }
  };

  const translatedMessage = getToastMessage(message.message);

  return (
    <Animated.View
      style={{
        ...getToastStyleObject(message.type),
        opacity,
        transform: [{ translateY }],
      }}
    >
      {/* Icon */}
      <View style={{ marginRight: 12 }}>
        <Text style={{ fontSize: 18 }}>{getIconForType(message.type)}</Text>
      </View>

      {/* Content */}
      <Text style={getTextStyleObject(message.type)}>{translatedMessage}</Text>

      {/* Action Button */}
      {message.config?.action && (
        <Pressable
          onPress={message.config.action.onClick}
          style={{
            marginLeft: 12,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Text
            style={{
              color: message.type === 'warning' ? '#000' : '#fff',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            {message.config.action.label}
          </Text>
        </Pressable>
      )}

      {/* Dismiss Button */}
      {message.config?.dismissible !== false && (
        <Pressable
          onPress={animateOut}
          style={{
            marginLeft: 8,
            padding: 6,
            borderRadius: 12,
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text
            style={{
              color: message.type === 'warning' ? '#000' : '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            ×
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

class FallbackToastService implements ToastService {
  private listeners = new Set<(messages: ToastMessage[]) => void>();
  private messages: ToastMessage[] = [];

  show(type: ToastType, message: string, config?: ToastConfig): string {
    const id = Date.now().toString();
    const toastMessage: ToastMessage = {
      id,
      type,
      message,
      config,
      timestamp: Date.now(),
    };

    this.messages.push(toastMessage);
    this.notifyListeners();

    return id;
  }

  dismiss(id: string): void {
    this.messages = this.messages.filter((msg) => msg.id !== id);
    this.notifyListeners();
  }

  dismissAll(): void {
    this.messages = [];
    this.notifyListeners();
  }

  subscribe(listener: (messages: ToastMessage[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener([...this.messages]);
    }
  }
}

export const fallbackToastService = new FallbackToastService();
export { FallbackToast };
