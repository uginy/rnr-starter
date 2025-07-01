// Storage keys constants
export const STORAGE_KEYS = {
  // User related
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  USER_PREFERENCES: 'user_preferences',

  // App settings
  THEME: 'theme',
  LANGUAGE: 'language',
  APP_THEME: 'app_theme',
  APP_LANGUAGE: 'app_language',
  FIRST_LAUNCH: 'first_launch',

  // Cache
  API_CACHE: 'api_cache',
  LAST_SYNC: 'last_sync',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
