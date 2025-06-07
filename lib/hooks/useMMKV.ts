import { useCallback, useEffect, useState } from 'react';
import { type StorageKey, storage } from '../storage';

/**
 * Hook for storing and retrieving string values from MMKV
 */
export function useMMKVString(key: StorageKey, defaultValue?: string) {
  const [value, setValue] = useState<string | undefined>(() =>
    storage.getString(key, defaultValue)
  );

  const updateValue = useCallback(
    (newValue: string | undefined) => {
      if (newValue === undefined) {
        storage.delete(key);
      } else {
        storage.setString(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

/**
 * Hook for storing and retrieving number values from MMKV
 */
export function useMMKVNumber(key: StorageKey, defaultValue?: number) {
  const [value, setValue] = useState<number | undefined>(() =>
    storage.getNumber(key, defaultValue)
  );

  const updateValue = useCallback(
    (newValue: number | undefined) => {
      if (newValue === undefined) {
        storage.delete(key);
      } else {
        storage.setNumber(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

/**
 * Hook for storing and retrieving boolean values from MMKV
 */
export function useMMKVBoolean(key: StorageKey, defaultValue?: boolean) {
  const [value, setValue] = useState<boolean | undefined>(() =>
    storage.getBoolean(key, defaultValue)
  );

  const updateValue = useCallback(
    (newValue: boolean | undefined) => {
      if (newValue === undefined) {
        storage.delete(key);
      } else {
        storage.setBoolean(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

/**
 * Hook for storing and retrieving object values from MMKV
 */
export function useMMKVObject<T>(key: StorageKey, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>(() => storage.getObject<T>(key, defaultValue));

  const updateValue = useCallback(
    (newValue: T | undefined) => {
      if (newValue === undefined) {
        storage.delete(key);
      } else {
        storage.setObject(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

/**
 * Hook for listening to storage changes
 */
export function useMMKVListener(key: StorageKey, callback: (newValue: any) => void) {
  useEffect(() => {
    // MMKV doesn't have built-in listeners, but we can create a simple polling mechanism
    // or implement a custom event system if needed
    const interval = setInterval(() => {
      const currentValue = storage.getString(key);
      callback(currentValue);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [key, callback]);
}
