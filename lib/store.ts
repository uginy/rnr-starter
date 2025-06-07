import { create } from 'zustand';

interface AppState {
  count: number;
  error: string | null;
  increment: () => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  count: 0,
  error: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setError: (error: string | null) => set({ error }),
}));
