import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Store = {
  count: number;
  inc: () => void;
};

export const useAuth = create<Store>()(
  persist(
    (set, get) => ({
      count: 0,
      inc: () => set({ count: get().count + 1 }),
    }),
    {
      name: 'auth-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
