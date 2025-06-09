import { MMKV } from 'react-native-mmkv';

/**
 * MMKV Storage wrapper with TypeScript support
 * Provides a convenient interface for storing and retrieving data
 */
class MMKVStorage {
  private storage: MMKV;

  constructor(id = 'default') {
    this.storage = new MMKV({
      id,
      encryptionKey: undefined, // Add encryption key if needed
    });
  }

  /**
   * Store a string value
   */
  setString(key: string, value: string): void {
    this.storage.set(key, value);
  }

  /**
   * Get a string value
   */
  getString(key: string, defaultValue?: string): string | undefined {
    return this.storage.getString(key) ?? defaultValue;
  }

  /**
   * Store a number value
   */
  setNumber(key: string, value: number): void {
    this.storage.set(key, value);
  }

  /**
   * Get a number value
   */
  getNumber(key: string, defaultValue?: number): number | undefined {
    return this.storage.getNumber(key) ?? defaultValue;
  }

  /**
   * Store a boolean value
   */
  setBoolean(key: string, value: boolean): void {
    this.storage.set(key, value);
  }

  /**
   * Get a boolean value
   */
  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    return this.storage.getBoolean(key) ?? defaultValue;
  }

  /**
   * Store an object (will be JSON stringified)
   */
  setObject<T>(key: string, value: T): void {
    this.storage.set(key, JSON.stringify(value));
  }

  /**
   * Get an object (will be JSON parsed)
   */
  getObject<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const jsonString = this.storage.getString(key);
      if (jsonString) {
        return JSON.parse(jsonString) as T;
      }
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  /**
   * Check if a key exists
   */
  contains(key: string): boolean {
    return this.storage.contains(key);
  }

  /**
   * Delete a key
   */
  delete(key: string): void {
    this.storage.delete(key);
  }

  /**
   * Get all keys
   */
  getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }

  /**
   * Clear all data
   */
  clearAll(): void {
    this.storage.clearAll();
  }

  /**
   * Get storage size in bytes
   */
  size(): number {
    return this.storage.size;
  }
}

// Create default storage instance
export const storage = new MMKVStorage();

// Create separate instances for different purposes
export const userStorage = new MMKVStorage('user');
export const settingsStorage = new MMKVStorage('settings');
export const cacheStorage = new MMKVStorage('cache');

// Export class for custom instances
export { MMKVStorage };

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
