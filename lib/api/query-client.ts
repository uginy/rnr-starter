import { QueryClient } from '@tanstack/react-query';
import { toastService } from '~/lib/toast/toast-service';

// Global error handler for React Query
const globalErrorHandler = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'An error occurred';
  toastService.error(`API Error: ${message}`);
};

// Configure React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: globalErrorHandler,
    },
  },
});
