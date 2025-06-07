import type { ComponentType } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastConfig {
  duration?: number;
  position?: ToastPosition;
  icon?: string | ComponentType;
  action?: ToastAction;
  dismissible?: boolean;
  haptic?: boolean; // Only for native platforms
}

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  isI18nKey?: boolean;
  config?: ToastConfig;
  timestamp: number;
}

export interface ToastStore {
  messages: ToastMessage[];
  isEnabled: boolean;
  defaultConfig: ToastConfig;

  // Actions
  show: (type: ToastType, message: string, config?: ToastConfig) => string;
  showI18n: (type: ToastType, i18nKey: string, config?: ToastConfig) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  setEnabled: (enabled: boolean) => void;
  setDefaultConfig: (config: Partial<ToastConfig>) => void;

  // Convenience methods
  success: (message: string, config?: ToastConfig) => string;
  error: (message: string, config?: ToastConfig) => string;
  info: (message: string, config?: ToastConfig) => string;
  warning: (message: string, config?: ToastConfig) => string;
  loading: (message: string, config?: ToastConfig) => string;

  // I18n convenience methods
  successI18n: (i18nKey: string, config?: ToastConfig) => string;
  errorI18n: (i18nKey: string, config?: ToastConfig) => string;
  infoI18n: (i18nKey: string, config?: ToastConfig) => string;
  warningI18n: (i18nKey: string, config?: ToastConfig) => string;
  loadingI18n: (i18nKey: string, config?: ToastConfig) => string;
}

export interface ToastService {
  show: (type: ToastType, message: string, config?: ToastConfig) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
