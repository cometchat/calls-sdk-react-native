import { CometChat } from '@cometchat/chat-sdk-react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { startPush, stopPush } from './push';
import { AppCredentials, AppUser, useAppStore } from '../store/useAppStore';

let initializedFor: string | null = null;

/** Both SDKs: the Chat SDK lists users and groups, the Calls SDK owns calls. */
export async function initSDKs({ appId, region, authKey }: AppCredentials): Promise<void> {
  if (initializedFor === appId) {
    return;
  }
  const settings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region.toLowerCase())
    .autoEstablishSocketConnection(true)
    .build();
  await CometChat.init(appId, settings);
  const { error } = await CometChatCalls.init({ appId, region, authKey });
  if (error) {
    throw new Error(error.message ?? 'The Calls SDK could not start');
  }
  initializedFor = appId;
}

const toAppUser = (user: CometChat.User): AppUser => ({
  uid: user.getUid(),
  name: user.getName(),
  avatar: user.getAvatar(),
});

/** A session restored on launch. Returns false when there is none. */
export async function restoreSession(credentials: AppCredentials): Promise<boolean> {
  const chatUser = await CometChat.getLoggedinUser();
  if (!chatUser) {
    return false;
  }
  if (!CometChatCalls.isUserLoggedIn()) {
    await CometChatCalls.login(chatUser.getUid(), credentials.authKey);
  }
  useAppStore.getState().setUser(toAppUser(chatUser));
  startPush(credentials.pushProviderId).catch(error =>
    console.warn('[Push] Could not start', error),
  );
  return true;
}

export async function login(uid: string, credentials: AppCredentials): Promise<void> {
  const chatUser = await CometChat.login(uid, credentials.authKey);
  await CometChatCalls.login(uid, credentials.authKey);
  useAppStore.getState().setUser(toAppUser(chatUser));
  startPush(credentials.pushProviderId).catch(error =>
    console.warn('[Push] Could not start', error),
  );
}

/**
 * Unregisters first: it needs the session, so after a logout it fails and this device keeps
 * ringing for the user who left. If it fails (offline, say), stay logged in so the user can retry.
 */
export async function logout(): Promise<void> {
  await stopPush();
  await CometChatCalls.logout();
  await CometChat.logout();
  useAppStore.getState().setUser(null);
}
