import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Toaster } from 'sonner';
import { useToastStore } from '~/lib/stores/toast-store';
import { FallbackToast, fallbackToastService } from './platforms/fallback-toast';
import { toastService } from './toast-service';
import type { ToastConfig } from './types';
import { type ErrorInterceptorConfig, initializeErrorInterceptor } from './utils/error-interceptor';

interface ToastProviderProps {
  children: React.ReactNode;
  defaultConfig?: Partial<ToastConfig>;
  errorInterceptor?: Partial<ErrorInterceptorConfig>;
  enableErrorInterceptor?: boolean;
}

const FallbackToastContainer: React.FC = () => {
  const [messages, setMessages] = React.useState<any[]>([]);

  useEffect(() => {
    // Subscribe to fallback toast service if we're using it
    if (toastService.isFallbackService) {
      const unsubscribe = fallbackToastService.subscribe(setMessages);
      return unsubscribe;
    }
  }, []);

  if (!toastService.isFallbackService || messages.length === 0) {
    return null;
  }

  return Platform.OS === 'web' ? (
    <div
      style={
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          pointerEvents: 'none',
        } as React.CSSProperties
      }
    >
      {messages.map((message) => (
        <FallbackToast
          key={message.id}
          message={message}
          onDismiss={fallbackToastService.dismiss.bind(fallbackToastService)}
        />
      ))}
    </div>
  ) : (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      {messages.map((message) => (
        <FallbackToast
          key={message.id}
          message={message}
          onDismiss={fallbackToastService.dismiss.bind(fallbackToastService)}
        />
      ))}
    </View>
  );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultConfig,
  errorInterceptor,
  enableErrorInterceptor = true,
}) => {
  const { setDefaultConfig } = useToastStore();

  useEffect(() => {
    // Set default configuration if provided
    if (defaultConfig) {
      setDefaultConfig(defaultConfig);
    }
  }, [defaultConfig, setDefaultConfig]);

  useEffect(() => {
    // Initialize error interceptor if enabled
    if (enableErrorInterceptor) {
      const cleanup = initializeErrorInterceptor(errorInterceptor);
      return cleanup;
    }
  }, [enableErrorInterceptor, errorInterceptor]);

  // For web platform, use Sonner's Toaster
  if (Platform.OS === 'web') {
    return (
      <>
        {children}
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          duration={defaultConfig?.duration || 3000}
        />
        <FallbackToastContainer />
      </>
    );
  }

  // For native platforms, just render children with fallback container
  return (
    <>
      {children}
      <FallbackToastContainer />
    </>
  );
};

/**
 * Higher-order component for wrapping app with ToastProvider
 */
export const withToastProvider = <P extends object>(
  Component: React.ComponentType<P>,
  providerProps?: Omit<ToastProviderProps, 'children'>
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <ToastProvider {...providerProps}>
      <Component {...props} />
    </ToastProvider>
  );

  WrappedComponent.displayName = `withToastProvider(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

/**
 * Hook to check if ToastProvider is available in the tree
 */
export const useToastProvider = () => {
  const isProvided = React.useContext(React.createContext(false));

  return {
    isProvided,
    warning: !isProvided
      ? 'ToastProvider not found in component tree. Make sure to wrap your app with ToastProvider.'
      : null,
  };
};
