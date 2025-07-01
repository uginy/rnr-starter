import { useCallback, useEffect, useState } from 'react';
import { storage } from '../storage-adapter';

export function useStorageString(key: string, defaultValue?: string) {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await storage.init();
      const v = await storage.getString(key, defaultValue);
      if (mounted) setValue(v);
    })();
    return () => {
      mounted = false;
    };
  }, [key, defaultValue]);

  const updateValue = useCallback(
    async (newValue: string | undefined) => {
      await storage.init();
      if (newValue === undefined) {
        await storage.delete(key);
      } else {
        await storage.setString(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

export function useStorageNumber(key: string, defaultValue?: number) {
  const [value, setValue] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await storage.init();
      const v = await storage.getNumber(key, defaultValue);
      if (mounted) setValue(v);
    })();
    return () => {
      mounted = false;
    };
  }, [key, defaultValue]);

  const updateValue = useCallback(
    async (newValue: number | undefined) => {
      await storage.init();
      if (newValue === undefined) {
        await storage.delete(key);
      } else {
        await storage.setNumber(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

export function useStorageBoolean(key: string, defaultValue?: boolean) {
  const [value, setValue] = useState<boolean | undefined>(defaultValue);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await storage.init();
      const v = await storage.getBoolean(key, defaultValue);
      if (mounted) setValue(v);
    })();
    return () => {
      mounted = false;
    };
  }, [key, defaultValue]);

  const updateValue = useCallback(
    async (newValue: boolean | undefined) => {
      await storage.init();
      if (newValue === undefined) {
        await storage.delete(key);
      } else {
        await storage.setBoolean(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}

export function useStorageObject<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await storage.init();
      const v = await storage.getObject<T>(key, defaultValue);
      if (mounted) setValue(v);
    })();
    return () => {
      mounted = false;
    };
  }, [key, defaultValue]);

  const updateValue = useCallback(
    async (newValue: T | undefined) => {
      await storage.init();
      if (newValue === undefined) {
        await storage.delete(key);
      } else {
        await storage.setObject(key, newValue);
      }
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue] as const;
}
