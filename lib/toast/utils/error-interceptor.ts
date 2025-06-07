import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { toast } from '~/lib/stores/toast-store';

/**
 * Configuration for error interceptor
 */
export interface ErrorInterceptorConfig {
  enabled: boolean;
  showNetworkErrors: boolean;
  showServerErrors: boolean;
  showClientErrors: boolean;
  ignoredStatuses: number[];
  customErrorMap: Record<number, string>;
  prefix: string;
}

const defaultConfig: ErrorInterceptorConfig = {
  enabled: true,
  showNetworkErrors: true,
  showServerErrors: true,
  showClientErrors: true,
  ignoredStatuses: [401], // Often handled separately for auth
  customErrorMap: {},
  prefix: 'api.errors',
};

let config = { ...defaultConfig };

/**
 * Response interceptor for handling API errors
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => response;

/**
 * Handle network errors
 */
const handleNetworkError = (error: AxiosError): boolean => {
  if (!error.response && config.showNetworkErrors) {
    toast.errorI18n(`${config.prefix}.network`);
    return true;
  }
  return false;
};

/**
 * Check if status should be ignored
 */
const shouldIgnoreStatus = (status: number): boolean => {
  return config.ignoredStatuses.includes(status);
};

/**
 * Check if error type should be shown
 */
const shouldShowError = (status: number): boolean => {
  const isClientError = status >= 400 && status < 500;
  const isServerError = status >= 500;

  if (isClientError && !config.showClientErrors) {
    return false;
  }

  if (isServerError && !config.showServerErrors) {
    return false;
  }

  return true;
};

/**
 * Get error message key for status
 */
const getErrorKey = (status: number): string => {
  // Use custom error message if available
  if (config.customErrorMap[status]) {
    return config.customErrorMap[status];
  }

  // Default error message based on status
  let errorKey = `${config.prefix}.${status}`;

  // Fallback to generic messages for unmapped statuses
  const isClientError = status >= 400 && status < 500;
  const isServerError = status >= 500;

  if (isClientError) {
    errorKey = `${config.prefix}.client`;
  } else if (isServerError) {
    errorKey = `${config.prefix}.server`;
  }

  return errorKey;
};

/**
 * Handle response errors
 */
const handleResponseError = (error: AxiosError): void => {
  if (!error.response) return;

  const status = error.response.status;

  if (shouldIgnoreStatus(status) || !shouldShowError(status)) {
    return;
  }

  const errorKey = getErrorKey(status);
  toast.errorI18n(errorKey);
};

/**
 * Error interceptor for handling API errors
 */
const errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  if (!config.enabled) {
    return Promise.reject(error);
  }

  // Handle network errors
  if (handleNetworkError(error)) {
    return Promise.reject(error);
  }

  // Handle response errors
  handleResponseError(error);

  return Promise.reject(error);
};

/**
 * Setup error interceptor for axios
 */
export const setupErrorInterceptor = (
  axiosInstance = axios,
  customConfig?: Partial<ErrorInterceptorConfig>
) => {
  // Update config
  if (customConfig) {
    config = { ...config, ...customConfig };
  }

  // Add interceptors
  const responseInterceptorId = axiosInstance.interceptors.response.use(
    responseInterceptor,
    errorInterceptor
  );

  // Return cleanup function
  return () => {
    axiosInstance.interceptors.response.eject(responseInterceptorId);
  };
};

/**
 * Configure error interceptor
 */
export const configureErrorInterceptor = (newConfig: Partial<ErrorInterceptorConfig>) => {
  config = { ...config, ...newConfig };
};

/**
 * Enable/disable error interceptor
 */
export const toggleErrorInterceptor = (enabled: boolean) => {
  config.enabled = enabled;
};

/**
 * Get current configuration
 */
export const getErrorInterceptorConfig = (): ErrorInterceptorConfig => ({ ...config });

/**
 * Reset configuration to defaults
 */
export const resetErrorInterceptorConfig = () => {
  config = { ...defaultConfig };
};

/**
 * Manually handle error with toast (for custom error handling)
 */
export const handleErrorWithToast = (error: any, context?: string, customMessage?: string) => {
  if (customMessage) {
    toast.error(customMessage);
    return;
  }

  let errorKey = `${config.prefix}.unknown`;

  if (error?.response?.status) {
    errorKey = `${config.prefix}.${error.response.status}`;
  } else if (!error.response) {
    errorKey = `${config.prefix}.network`;
  }

  if (context) {
    errorKey = `${context}.${errorKey}`;
  }

  toast.errorI18n(errorKey);
};

// Auto-setup for default axios instance
let defaultCleanup: (() => void) | null = null;

/**
 * Initialize error interceptor with default settings
 */
export const initializeErrorInterceptor = (customConfig?: Partial<ErrorInterceptorConfig>) => {
  // Cleanup previous setup
  if (defaultCleanup) {
    defaultCleanup();
  }

  // Setup new interceptor
  defaultCleanup = setupErrorInterceptor(axios, customConfig);

  return defaultCleanup;
};

/**
 * Cleanup default error interceptor
 */
export const cleanupErrorInterceptor = () => {
  if (defaultCleanup) {
    defaultCleanup();
    defaultCleanup = null;
  }
};
