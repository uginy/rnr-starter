import { create } from 'zustand';

interface ErrorStore {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
