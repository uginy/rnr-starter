import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { LoadingScreen } from '~/components/ui/loading-screen';
import { useAppStore } from '../stores/app-store';

interface InitializationProviderProps {
  children: React.ReactNode;
}

export function InitializationProvider({ children }: InitializationProviderProps) {
  const { isInitialized, initializeApp } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      await initializeApp();
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }

    initialize();
  }, [initializeApp]);

  if (isLoading || !isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
