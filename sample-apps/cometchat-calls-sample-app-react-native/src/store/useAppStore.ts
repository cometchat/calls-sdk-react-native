import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Region = 'US' | 'EU' | 'IN';

interface User {
  uid: string;
  name?: string;
  avatar?: string;
}

interface AppCredentials {
  appId: string;
  authKey: string;
  region: Region;
}

interface AppState {
  version: string;
  credentials: AppCredentials;
  setCredentials: (credentials: AppCredentials) => void;
  clearCredentials: () => void;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  reset: () => void;
}

const initialCredentials: AppCredentials = {
  appId: '',
  authKey: '',
  region: 'US',
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      version: '5.0.0',
      credentials: initialCredentials,
      setCredentials: credentials => set({ credentials }),
      clearCredentials: () => set({ credentials: initialCredentials }),
      user: null,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
      reset: () => set({ credentials: initialCredentials, user: null }),
    }),
    {
      name: 'cometchat-credentials',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ credentials: state.credentials }),
    },
  ),
);
