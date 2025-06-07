import { Platform } from 'react-native';
import { fallbackToastService } from './platforms/fallback-toast';
import { sonnerToastService } from './platforms/sonner-toast';
import type { ToastConfig, ToastService, ToastType } from './types';

class ToastServiceManager implements ToastService {
  private service: ToastService;

  constructor() {
    this.service = this.getPlatformService();
  }

  private getPlatformService(): ToastService {
    try {
      if (Platform.OS === 'web') {
        return sonnerToastService;
      }

      // For native platforms (iOS/Android), use fallback for better styling control
      // You can switch back to burntToastService if you prefer native system toasts
      return fallbackToastService;
    } catch (error) {
      console.warn('Failed to initialize platform-specific toast service, using fallback:', error);
      return fallbackToastService;
    }
  }

  show(type: ToastType, message: string, config?: ToastConfig): string {
    try {
      return this.service.show(type, message, config);
    } catch (error) {
      console.warn('Toast service failed, using fallback:', error);
      // If primary service fails, use fallback
      return fallbackToastService.show(type, message, config);
    }
  }

  dismiss(id: string): void {
    try {
      this.service.dismiss(id);
    } catch (error) {
      console.warn('Failed to dismiss toast:', error);
    }
  }

  dismissAll(): void {
    try {
      this.service.dismissAll();
    } catch (error) {
      console.warn('Failed to dismiss all toasts:', error);
    }
  }

  // Additional utility methods
  success(message: string, config?: ToastConfig): string {
    return this.show('success', message, config);
  }

  error(message: string, config?: ToastConfig): string {
    return this.show('error', message, config);
  }

  info(message: string, config?: ToastConfig): string {
    return this.show('info', message, config);
  }

  warning(message: string, config?: ToastConfig): string {
    return this.show('warning', message, config);
  }

  loading(message: string, config?: ToastConfig): string {
    return this.show('loading', message, config);
  }

  // Check if we're using fallback service (useful for rendering custom toasts)
  get isFallbackService(): boolean {
    return this.service === fallbackToastService;
  }

  // Get fallback service for custom toast rendering
  get fallbackService() {
    return fallbackToastService;
  }
}

// Export singleton instance
export const toastService = new ToastServiceManager();

// Export individual platform services for advanced usage
export { sonnerToastService, fallbackToastService };
