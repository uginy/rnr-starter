import { Platform } from 'react-native';

// Helper to detect web
function isWeb() {
  return Platform.OS === 'web';
}

async function getAsyncStorage() {
  const mod = await import('@react-native-async-storage/async-storage');
  return mod.default;
}

async function getSecureStore() {
  const mod = await import('expo-secure-store');
  return mod;
}

export class UniversalStorage {
  private type: 'secure' | 'async';
  private asyncStorage: any;
  private secureStore: any;

  constructor() {
    this.type = isWeb() ? 'async' : 'secure';
  }

  async init() {
    if (this.type === 'secure') {
      this.secureStore = await getSecureStore();
    } else {
      this.asyncStorage = await getAsyncStorage();
    }
  }

  async setString(key: string, value: string) {
    if (this.type === 'secure') {
      await this.secureStore.setItemAsync(key, value);
    } else {
      await this.asyncStorage.setItem(key, value);
    }
  }

  async getString(key: string, defaultValue?: string): Promise<string | undefined> {
    if (this.type === 'secure') {
      const v = await this.secureStore.getItemAsync(key);
      return v ?? defaultValue;
    } else {
      const v = await this.asyncStorage.getItem(key);
      return v ?? defaultValue;
    }
  }

  async setNumber(key: string, value: number) {
    await this.setString(key, String(value));
  }

  async getNumber(key: string, defaultValue?: number): Promise<number | undefined> {
    const v = await this.getString(key);
    return v !== undefined ? Number(v) : defaultValue;
  }

  async setBoolean(key: string, value: boolean) {
    await this.setString(key, value ? '1' : '0');
  }

  async getBoolean(key: string, defaultValue?: boolean): Promise<boolean | undefined> {
    const v = await this.getString(key);
    if (v === undefined) return defaultValue;
    return v === '1';
  }

  async setObject<T>(key: string, value: T) {
    await this.setString(key, JSON.stringify(value));
  }

  async getObject<T>(key: string, defaultValue?: T): Promise<T | undefined> {
    try {
      const jsonString = await this.getString(key);
      if (jsonString) {
        return JSON.parse(jsonString) as T;
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  }

  async contains(key: string): Promise<boolean> {
    if (this.type === 'secure') {
      const v = await this.secureStore.getItemAsync(key);
      return v !== null && v !== undefined;
    } else {
      const v = await this.asyncStorage.getItem(key);
      return v !== null;
    }
  }

  async delete(key: string) {
    if (this.type === 'secure') {
      await this.secureStore.deleteItemAsync(key);
    } else {
      await this.asyncStorage.removeItem(key);
    }
  }

  // getAllKeys and clearAll are not supported in SecureStore, so only for AsyncStorage
  async getAllKeys(): Promise<string[]> {
    if (this.type === 'async' && typeof this.asyncStorage.getAllKeys === 'function') {
      return await this.asyncStorage.getAllKeys();
    }
    return [];
  }

  async clearAll() {
    if (this.type === 'async' && typeof this.asyncStorage.clear === 'function') {
      await this.asyncStorage.clear();
    }
  }
}

export const storage = new UniversalStorage();
