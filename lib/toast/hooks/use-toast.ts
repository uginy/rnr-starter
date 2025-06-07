import { useToastStore } from '~/lib/stores/toast-store';
import type { ToastConfig, ToastType } from '../types';

/**
 * Main hook for using toast notifications
 */
export const useToast = () => {
  const {
    messages,
    isEnabled,
    defaultConfig,
    show,
    showI18n,
    dismiss,
    dismissAll,
    setEnabled,
    setDefaultConfig,
    success,
    error,
    info,
    warning,
    loading,
    successI18n,
    errorI18n,
    infoI18n,
    warningI18n,
    loadingI18n,
  } = useToastStore();

  return {
    // State
    messages,
    isEnabled,
    defaultConfig,

    // Core actions
    show,
    showI18n,
    dismiss,
    dismissAll,

    // Configuration
    setEnabled,
    setDefaultConfig,

    // Convenience methods
    success,
    error,
    info,
    warning,
    loading,

    // I18n convenience methods
    successI18n,
    errorI18n,
    infoI18n,
    warningI18n,
    loadingI18n,

    // Utility functions
    isVisible: (id: string) => messages.some((msg) => msg.id === id),
    getToast: (id: string) => messages.find((msg) => msg.id === id),
    getActiveToasts: () => messages,
    hasActiveToasts: () => messages.length > 0,

    // Batch operations
    dismissAllOfType: (type: ToastType) => {
      const toastsOfType = messages.filter((msg) => msg.type === type);
      for (const toast of toastsOfType) {
        dismiss(toast.id);
      }
    },

    // Configuration shortcuts
    enableToasts: () => setEnabled(true),
    disableToasts: () => setEnabled(false),

    // Quick config updates
    setDuration: (duration: number) => setDefaultConfig({ duration }),
    setPosition: (position: 'top' | 'bottom' | 'center') => setDefaultConfig({ position }),
    setHaptic: (haptic: boolean) => setDefaultConfig({ haptic }),
  };
};

/**
 * Hook for creating toast with predefined config
 */
export const useToastWithConfig = (config: ToastConfig) => {
  const toast = useToast();

  return {
    ...toast,
    show: (type: ToastType, message: string, overrideConfig?: ToastConfig) =>
      toast.show(type, message, { ...config, ...overrideConfig }),
    showI18n: (type: ToastType, i18nKey: string, overrideConfig?: ToastConfig) =>
      toast.showI18n(type, i18nKey, { ...config, ...overrideConfig }),
    success: (message: string, overrideConfig?: ToastConfig) =>
      toast.success(message, { ...config, ...overrideConfig }),
    error: (message: string, overrideConfig?: ToastConfig) =>
      toast.error(message, { ...config, ...overrideConfig }),
    info: (message: string, overrideConfig?: ToastConfig) =>
      toast.info(message, { ...config, ...overrideConfig }),
    warning: (message: string, overrideConfig?: ToastConfig) =>
      toast.warning(message, { ...config, ...overrideConfig }),
    loading: (message: string, overrideConfig?: ToastConfig) =>
      toast.loading(message, { ...config, ...overrideConfig }),
  };
};
