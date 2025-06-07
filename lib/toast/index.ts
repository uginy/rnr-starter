// Main exports
export { toast, useToastStore } from '~/lib/stores/toast-store';
export { toastService } from './toast-service';
export { ToastProvider, withToastProvider, useToastProvider } from './toast-provider';

// Hooks
export { useToast, useToastWithConfig } from './hooks/use-toast';
export {
  useAutoErrors,
  useAutoErrorsWithSource,
  useApiErrorHandler,
  useFormErrorHandler,
} from './hooks/use-auto-errors';

// Types
export type {
  ToastType,
  ToastPosition,
  ToastAction,
  ToastConfig,
  ToastMessage,
  ToastStore,
  ToastService,
} from './types';

// Platform services (for advanced usage)
export {
  sonnerToastService,
  fallbackToastService,
} from './toast-service';

// Utilities
export {
  isI18nKey,
  getToastMessage,
  getDefaultToastMessage,
} from './utils/i18n-utils';

export {
  setupErrorInterceptor,
  configureErrorInterceptor,
  toggleErrorInterceptor,
  getErrorInterceptorConfig,
  resetErrorInterceptorConfig,
  handleErrorWithToast,
  initializeErrorInterceptor,
  cleanupErrorInterceptor,
  type ErrorInterceptorConfig,
} from './utils/error-interceptor';

// Components (for custom implementations)
export { FallbackToast } from './platforms/fallback-toast';
