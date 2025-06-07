import { create } from 'zustand';
import { toastService } from '~/lib/toast/toast-service';
import type { ToastConfig, ToastMessage, ToastStore, ToastType } from '~/lib/toast/types';

interface ToastStoreState extends ToastStore {
  // Additional state for advanced features
  queue: ToastMessage[];
  maxVisible: number;
  isPaused: boolean;
}

export const useToastStore = create<ToastStoreState>((set, get) => ({
  // State
  messages: [],
  queue: [],
  isEnabled: true,
  isPaused: false,
  maxVisible: 3,
  defaultConfig: {
    duration: 3000,
    position: 'bottom',
    dismissible: true,
    haptic: true,
  },

  // Actions
  show: (type: ToastType, message: string, config?: ToastConfig): string => {
    const state = get();
    if (!state.isEnabled) {
      return '';
    }

    const finalConfig = { ...state.defaultConfig, ...config };
    const id = toastService.show(type, message, finalConfig);

    const toastMessage: ToastMessage = {
      id,
      type,
      message,
      config: finalConfig,
      timestamp: Date.now(),
    };

    // Add to messages for tracking
    set((state) => ({
      messages: [...state.messages, toastMessage],
    }));

    // Auto-remove after duration
    if (finalConfig.duration && finalConfig.duration > 0) {
      setTimeout(() => {
        get().dismiss(id);
      }, finalConfig.duration);
    }

    return id;
  },

  showI18n: (type: ToastType, i18nKey: string, config?: ToastConfig): string => {
    const state = get();
    const toastMessage: ToastMessage = {
      id: '',
      type,
      message: i18nKey,
      isI18nKey: true,
      config,
      timestamp: Date.now(),
    };

    const id = state.show(type, i18nKey, config);

    // Update the message with the actual ID
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.timestamp === toastMessage.timestamp ? { ...msg, id, isI18nKey: true } : msg
      ),
    }));

    return id;
  },

  dismiss: (id: string): void => {
    toastService.dismiss(id);
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },

  dismissAll: (): void => {
    toastService.dismissAll();
    set({
      messages: [],
      queue: [],
    });
  },

  setEnabled: (enabled: boolean): void => {
    set({ isEnabled: enabled });
    if (!enabled) {
      get().dismissAll();
    }
  },

  setDefaultConfig: (config: Partial<ToastConfig>): void => {
    set((state) => ({
      defaultConfig: { ...state.defaultConfig, ...config },
    }));
  },

  // Additional utility actions
  pause: (): void => {
    set({ isPaused: true });
  },

  resume: (): void => {
    set({ isPaused: false });
  },

  setMaxVisible: (max: number): void => {
    set({ maxVisible: max });
  },

  // Convenience methods
  success: (message: string, config?: ToastConfig): string => {
    return get().show('success', message, config);
  },

  error: (message: string, config?: ToastConfig): string => {
    return get().show('error', message, config);
  },

  info: (message: string, config?: ToastConfig): string => {
    return get().show('info', message, config);
  },

  warning: (message: string, config?: ToastConfig): string => {
    return get().show('warning', message, config);
  },

  loading: (message: string, config?: ToastConfig): string => {
    return get().show('loading', message, config);
  },

  // I18n convenience methods
  successI18n: (i18nKey: string, config?: ToastConfig): string => {
    return get().showI18n('success', i18nKey, config);
  },

  errorI18n: (i18nKey: string, config?: ToastConfig): string => {
    return get().showI18n('error', i18nKey, config);
  },

  infoI18n: (i18nKey: string, config?: ToastConfig): string => {
    return get().showI18n('info', i18nKey, config);
  },

  warningI18n: (i18nKey: string, config?: ToastConfig): string => {
    return get().showI18n('warning', i18nKey, config);
  },

  loadingI18n: (i18nKey: string, config?: ToastConfig): string => {
    return get().showI18n('loading', i18nKey, config);
  },
}));

// Export convenience methods for global access
export const toast = {
  success: (message: string, config?: ToastConfig) =>
    useToastStore.getState().success(message, config),
  error: (message: string, config?: ToastConfig) => useToastStore.getState().error(message, config),
  info: (message: string, config?: ToastConfig) => useToastStore.getState().info(message, config),
  warning: (message: string, config?: ToastConfig) =>
    useToastStore.getState().warning(message, config),
  loading: (message: string, config?: ToastConfig) =>
    useToastStore.getState().loading(message, config),
  dismiss: (id: string) => useToastStore.getState().dismiss(id),
  dismissAll: () => useToastStore.getState().dismissAll(),

  // I18n methods
  successI18n: (key: string, config?: ToastConfig) =>
    useToastStore.getState().successI18n(key, config),
  errorI18n: (key: string, config?: ToastConfig) => useToastStore.getState().errorI18n(key, config),
  infoI18n: (key: string, config?: ToastConfig) => useToastStore.getState().infoI18n(key, config),
  warningI18n: (key: string, config?: ToastConfig) =>
    useToastStore.getState().warningI18n(key, config),
  loadingI18n: (key: string, config?: ToastConfig) =>
    useToastStore.getState().loadingI18n(key, config),
};
