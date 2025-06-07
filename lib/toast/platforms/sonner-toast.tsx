import React from 'react';
import { toast as sonnerToast } from 'sonner';
import type { ToastConfig, ToastService, ToastType } from '../types';
import { getToastMessage } from '../utils/i18n-utils';

class SonnerToastService implements ToastService {
  show(type: ToastType, message: string, config?: ToastConfig): string {
    const translatedMessage = getToastMessage(message);

    const sonnerConfig = {
      duration: config?.duration || 3000,
      position: this.mapPosition(config?.position),
      dismissible: config?.dismissible !== false,
      action: config?.action
        ? {
            label: config.action.label,
            onClick: config.action.onClick,
          }
        : undefined,
      icon: config?.icon ? this.renderIcon(config.icon) : undefined,
    };

    let toastId: string | number;

    switch (type) {
      case 'success':
        toastId = sonnerToast.success(translatedMessage, sonnerConfig);
        break;
      case 'error':
        toastId = sonnerToast.error(translatedMessage, sonnerConfig);
        break;
      case 'info':
        toastId = sonnerToast.info(translatedMessage, sonnerConfig);
        break;
      case 'warning':
        toastId = sonnerToast.warning(translatedMessage, sonnerConfig);
        break;
      case 'loading':
        toastId = sonnerToast.loading(translatedMessage, sonnerConfig);
        break;
      default:
        toastId = sonnerToast(translatedMessage, sonnerConfig);
        break;
    }

    return toastId.toString();
  }

  dismiss(id: string): void {
    sonnerToast.dismiss(Number(id));
  }

  dismissAll(): void {
    sonnerToast.dismiss();
  }

  private mapPosition(
    position?: string
  ): 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' {
    switch (position) {
      case 'top':
        return 'top-center';
      case 'center':
        return 'top-center'; // Sonner doesn't have true center, use top-center
      case 'bottom':
        return 'bottom-center';
      default:
        return 'bottom-center'; // Default as per requirements
    }
  }

  private renderIcon(icon: string | React.ComponentType): React.ReactNode {
    if (typeof icon === 'string') {
      return icon;
    }

    if (React.isValidElement(icon)) {
      return icon;
    }

    // If it's a component type, render it
    const IconComponent = icon as React.ComponentType;
    return <IconComponent />;
  }
}

export const sonnerToastService = new SonnerToastService();
