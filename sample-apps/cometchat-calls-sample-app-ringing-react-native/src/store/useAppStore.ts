import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConstants } from '../AppConstants';

export type Region = 'US' | 'EU' | 'IN';
export type Appearance = 'system' | 'light' | 'dark';

export interface AppCredentials {
  appId: string;
  authKey: string;
  region: Region;
  pushProviderId: string;
}

export interface AppUser {
  uid: string;
  name: string;
  avatar?: string;
}

/** The call on screen: what `CallScreen` joins. */
export interface ActiveCall {
  sessionId: string;
  callType: 'audio' | 'video';
}

/** The call being placed: what `OutgoingCallScreen` starts. */
export interface OutgoingRequest {
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  receiverType: 'user' | 'group';
  callType: 'audio' | 'video';
}

interface AppState {
  credentials: AppCredentials;
  setCredentials: (credentials: AppCredentials) => void;
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
  hydrated: boolean;
  setHydrated: () => void;
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  activeCall: ActiveCall | null;
  setActiveCall: (call: ActiveCall | null) => void;
  outgoing: OutgoingRequest | null;
  setOutgoing: (request: OutgoingRequest | null) => void;
}

export const hasCredentials = (c: AppCredentials) =>
  Boolean(c.appId && c.authKey && c.region && c.pushProviderId);

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      credentials: {
        appId: AppConstants.appId,
        authKey: AppConstants.authKey,
        region: AppConstants.region,
        pushProviderId: AppConstants.pushProviderId,
      },
      setCredentials: credentials => set({ credentials }),
      appearance: 'system',
      setAppearance: appearance => set({ appearance }),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      user: null,
      setUser: user => set({ user }),
      activeCall: null,
      setActiveCall: activeCall => set({ activeCall }),
      outgoing: null,
      setOutgoing: outgoing => set({ outgoing }),
    }),
    {
      name: 'cometchat-ringing-sample',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        credentials: state.credentials,
        appearance: state.appearance,
      }),
      onRehydrateStorage: () => state => state?.setHydrated(),
    },
  ),
);
