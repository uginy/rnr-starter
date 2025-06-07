import { useEffect } from 'react';
import { useStore } from '~/lib/store';
import { useToast } from './use-toast';

/**
 * Hook for automatically showing toast notifications for errors from the main store
 */
export const useAutoErrors = () => {
  const { error } = useStore();
  const { errorI18n, error: showError } = useToast();

  useEffect(() => {
    if (error) {
      // Check if error looks like an i18n key
      const isI18nKey = /^[a-zA-Z0-9._-]+$/.test(error) && error.includes('.');

      if (isI18nKey) {
        errorI18n(error);
      } else {
        showError(error);
      }
    }
  }, [error, errorI18n, showError]);

  return { error };
};

/**
 * Check if error should be shown
 */
const shouldShowError = (error: string, shouldShow?: (error: string) => boolean): boolean => {
  return !shouldShow || shouldShow(error);
};

/**
 * Transform error message with options
 */
const transformErrorMessage = (
  error: string,
  options?: {
    prefix?: string;
    transformError?: (error: string) => string;
  }
): string => {
  let errorMessage = error;

  // Apply transformation if provided
  if (options?.transformError) {
    errorMessage = options.transformError(errorMessage);
  }

  // Add prefix if provided
  if (options?.prefix) {
    errorMessage = `${options.prefix}.${errorMessage}`;
  }

  return errorMessage;
};

/**
 * Check if message is i18n key
 */
const isI18nKey = (message: string): boolean => {
  return /^[a-zA-Z0-9._-]+$/.test(message) && message.includes('.');
};

/**
 * Show error with appropriate method
 */
const showErrorMessage = (
  message: string,
  errorI18n: (key: string) => void,
  showError: (message: string) => void
): void => {
  if (isI18nKey(message)) {
    errorI18n(message);
  } else {
    showError(message);
  }
};

/**
 * Hook for creating automatic error handling with custom error source
 */
export const useAutoErrorsWithSource = <T extends { error: string | null }>(
  source: T,
  options?: {
    prefix?: string;
    transformError?: (error: string) => string;
    shouldShow?: (error: string) => boolean;
  }
) => {
  const { errorI18n, error: showError } = useToast();

  useEffect(() => {
    if (!source.error) return;

    // Check if we should show this error
    if (!shouldShowError(source.error, options?.shouldShow)) {
      return;
    }

    // Transform error message
    const errorMessage = transformErrorMessage(source.error, options);

    // Show error with appropriate method
    showErrorMessage(errorMessage, errorI18n, showError);
  }, [source.error, errorI18n, showError, options]);

  return { error: source.error };
};

/**
 * Hook for handling API errors with automatic toast notifications
 */
export const useApiErrorHandler = () => {
  const { errorI18n, error: showError } = useToast();

  const handleApiError = (error: any, context?: string) => {
    let errorMessage = 'api.errors.unknown';

    if (error?.response?.status) {
      errorMessage = `api.errors.${error.response.status}`;
    } else if (error?.message) {
      // For non-API errors, show the actual message
      errorMessage = error.message;
    }

    // Add context if provided
    if (context) {
      errorMessage = `${context}.${errorMessage}`;
    }

    // Check if it's an i18n key
    const isI18nKey = /^[a-zA-Z0-9._-]+$/.test(errorMessage) && errorMessage.includes('.');

    if (isI18nKey) {
      errorI18n(errorMessage);
    } else {
      showError(errorMessage);
    }
  };

  return { handleApiError };
};

/**
 * Hook for handling form errors with toast notifications
 */
export const useFormErrorHandler = () => {
  const { errorI18n, error: showError } = useToast();

  const handleFormError = (errors: Record<string, any>, prefix = 'form.errors') => {
    // Get first error
    const firstErrorKey = Object.keys(errors)[0];
    if (!firstErrorKey) return;

    const firstError = errors[firstErrorKey];
    let errorMessage = firstError?.message || firstError;

    // If it looks like a validation key, use it with prefix
    if (typeof errorMessage === 'string' && /^[a-zA-Z]+$/.test(errorMessage)) {
      errorMessage = `${prefix}.${errorMessage}`;
    }

    const isI18nKey = /^[a-zA-Z0-9._-]+$/.test(errorMessage) && errorMessage.includes('.');

    if (isI18nKey) {
      errorI18n(errorMessage);
    } else {
      showError(errorMessage);
    }
  };

  return { handleFormError };
};
