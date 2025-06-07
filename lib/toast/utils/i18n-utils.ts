import i18n from '~/lib/i18n';

/**
 * Check if a string is a valid i18n key
 */
export const isI18nKey = (text: string): boolean => {
  // Check if the text looks like an i18n key (contains dots and no spaces)
  const looksLikeKey = /^[a-zA-Z0-9._-]+$/.test(text) && text.includes('.');

  // If it looks like a key, check if it exists in i18n
  if (looksLikeKey) {
    return i18n.exists(text);
  }

  return false;
};

/**
 * Get translated message, fallback to original if not a key
 */
export const getToastMessage = (text: string): string => {
  if (isI18nKey(text)) {
    return i18n.t(text);
  }
  return text;
};

/**
 * Get default toast messages for different types
 */
export const getDefaultToastMessage = (type: string): string => {
  const key = `toast.${type}.default`;
  if (i18n.exists(key)) {
    return i18n.t(key);
  }

  // Fallback messages if i18n keys don't exist
  const fallbacks: Record<string, string> = {
    success: 'Success!',
    error: 'Something went wrong',
    info: 'Information',
    warning: 'Warning',
    loading: 'Loading...',
  };

  return fallbacks[type] || 'Notification';
};
