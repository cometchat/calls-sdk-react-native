import { Platform } from 'react-native';
import {
  CometChatPNHelper,
  CometChatPushNotifications,
} from '@cometchat/push-notifications-react-native';
import { CometChatVoipNotifications } from '@cometchat/push-notifications-voip-react-native';
import { AppConstants } from '../AppConstants';
import { useAppStore } from '../store/useAppStore';

/**
 * This file runs when `index.js` imports it, before anything else is awaited, and that order
 * matters. A call that woke the app was reported to CallKit and emitted before JavaScript existed,
 * so native holds it. The core package's `init()` releases it, and this subscription has to be
 * in place by then, or the ring is lost and the caller never sees "Ringing…".
 */
const voipReady = CometChatVoipNotifications.init().catch(error => {
  console.warn('[Push] Could not start the VoIP package', error);
});

// A call answered from the system UI: open the call screen. Subscribing here means it also works
// for a call answered before any screen exists.
CometChatVoipNotifications.onCallAccepted(call => {
  useAppStore.getState().setOutgoing(null);
  useAppStore.getState().setActiveCall({
    sessionId: call.sessionId,
    callType: call.callType === 'video' ? 'video' : 'audio',
  });
});

/** After every login, and when a session is restored on launch. */
export async function startPush(pushProviderId: string): Promise<void> {
  await voipReady;
  // A rejection means the OS could not ask; push can still start.
  await CometChatPNHelper.requestNotificationPermission().catch(() => false);
  await CometChatPNHelper.requestCallPermissions();
  await CometChatPushNotifications.init({
    ...(Platform.OS === 'android'
      ? { fcmProviderId: pushProviderId }
      : { apnsProviderId: pushProviderId }),
    callKitName: AppConstants.callKitName,
  });
}

/** Before logging out: it needs the session, and a device left registered keeps ringing. */
export async function stopPush(): Promise<void> {
  await CometChatPushNotifications.unregister();
  CometChatVoipNotifications.clearIdentity();
}
