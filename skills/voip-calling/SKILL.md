---
name: voip-calling
description: Ring the callee in every app state (foreground, background, locked, killed) with the CometChat Push Notifications SDK 2.0 VoIP package on React Native. Use when adding FCM or APNs setup for calls, PushKit, CallKit, the Android ringing screen, registerForVoIPPushes, registerBackgroundCallTask, CometChatVoipNotifications, onCallAccepted, or when a call does not ring.
inclusion: manual
---

# CometChat Calls SDK v5.1 — VoIP Calling (Push Notifications SDK 2.0, React Native)

## Overview

`@cometchat/push-notifications-voip-react-native` turns a CometChat call push into a ringing phone: on Android a call-style notification and a full-screen screen, on iOS CallKit. It prepares the session while the phone rings, handles Answer and Decline, and registers the push tokens.

Your app sets it up once and shows its own call screen when the user answers. **Do not create your own `PKPushRegistry`.** You do not need CallKeep, Notifee or `@react-native-firebase`.

## Prerequisites

```bash
npm install @cometchat/push-notifications-react-native @cometchat/push-notifications-voip-react-native
cd ios && pod install
```

- Calls SDK 5.1+ and React Native 0.78+.
- `@cometchat/chat-sdk-react-native` 4.0.10+ when the app also uses the Chat SDK.
- CometChat dashboard → Notifications → Push: an **FCM provider** for Android and an **APNs provider** for iOS, and their provider IDs.
  - The APNs provider's Bundle ID must be your app's, and its production switch must match the build: off for builds run from Xcode, on for TestFlight and App Store builds.

## 1. Android

Add `google-services.json` to `android/app/` and apply the plugin:

```groovy
// android/build.gradle, in buildscript dependencies
classpath("com.google.gms:google-services:4.4.2")

// android/app/build.gradle
apply plugin: "com.google.gms.google-services"
```

The package ships its FCM service, ringing screen and permissions, so no other native code is needed. If another `FirebaseMessagingService` exists, only one of them receives pushes: see "Coexisting with another FCM service" in the package README.

For apps targeting Android 14+, declare in Play Console under **App content**: the **full-screen intent** permission as core calling functionality, and the **Phone call** foreground service type.

## 2. iOS

Enable **Push Notifications**, and **Background Modes** with Audio, Remote notifications and Voice over IP. Add `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` to `Info.plist`.

```swift
import react_native_cometchat_push_notifications
import react_native_cometchat_push_notifications_voip

// in application(_:didFinishLaunchingWithOptions:), BEFORE factory.startReactNative(...)
CometChatPushNotificationsAppDelegate.registerForVoIPPushes()

func application(_ application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  CometChatPushNotificationsAppDelegate.didRegisterAPNsToken(deviceToken)
}
```

## 3. `index.js`

At module scope, never inside a component:

```js
import { registerBackgroundCallTask } from '@cometchat/push-notifications-voip-react-native';

// Lets a killed Android app send a decline. Without it the caller keeps ringing.
registerBackgroundCallTask();
```

## 4. Initialise, in this order

The order is not a style choice. A call that woke the app is held natively until the core `init()` releases it, so the VoIP subscription must exist by then. It must also be the first thing awaited on startup, ahead of any credentials read or login.

```ts
import {
  CometChatPNHelper,
  CometChatPushNotifications,
} from '@cometchat/push-notifications-react-native';
import { CometChatVoipNotifications } from '@cometchat/push-notifications-voip-react-native';

// At startup, with no arguments: only subscribes to the call events.
const voipReady = CometChatVoipNotifications.init();

// After every login, and when a session is restored on launch.
async function startPush() {
  await voipReady;
  await CometChatPNHelper.requestNotificationPermission().catch(() => false);
  await CometChatPNHelper.requestCallPermissions();
  await CometChatPushNotifications.init({
    fcmProviderId: FCM_PROVIDER_ID,
    apnsProviderId: APNS_PROVIDER_ID,
    callKitName: 'Acme',
  });
}
```

A calls-only app, with no Chat SDK, passes everything to one call instead: `CometChatVoipNotifications.init({ appId, region, fcmProviderId, apnsProviderId, callKitName })`.

## 5. Answer

```ts
CometChatVoipNotifications.onCallAccepted(call => {
  openCallScreen(call.sessionId, call.callType);
});
```

There is no separate accept call to make. Subscribing late is safe: a call answered before your screen mounted is held for the first subscriber. Every field of a call payload arrives from Android as a string, so compare `isPeerCall` with `"true"` and coerce `expiresAtMs`.

Then join as in the `ringing-integration` skill. When an answered call ends, release it:

```ts
CometChatVoipNotifications.endCallUI(sessionId);
```

Without this the signalling session stays active and later calls read as busy.

## 6. Decline, miss, second call

The package handles these. Decline sends `endCall(sessionId, 'rejected')`, or `'busy'` while in another call. A ring that times out posts a missed call and sends nothing. A second call rings over the first, and only the user's own Decline sends `busy`.

Showing your own incoming screen? Tell the package, or both will ring:

```ts
CometChatVoipNotifications.notifyCallScreenOpen(sessionId);
const off = CometChatVoipNotifications.onRingEnded(event => {
  // "answered" means the accepted call is on its way here: keep the screen up.
  if (event.sessionId === sessionId && event.reason !== 'answered') closeScreen();
});
// On close: off(); CometChatVoipNotifications.notifyCallScreenClosed(sessionId);
```

## 7. Log out

```ts
await CometChatPushNotifications.unregister(); // needs the session, so it comes first
CometChatVoipNotifications.clearIdentity();
await CometChatCalls.logout();
```

If `unregister()` fails, stay logged in so the user can retry. Otherwise the device keeps ringing for the user who left.

## When a call does not ring

```ts
await CometChatPushNotifications.ensureRingReady();  // notifications off, channel muted, full-screen revoked, Do Not Disturb
await CometChatPushNotifications.verifyPushSetup();  // everything that can be checked from the device
await CometChatPushNotifications.openRingSettings(); // the settings screen that fixes it
```

- iOS: an APNs provider whose production switch does not match the build rejects the push.
- Android: some manufacturers block call screens through battery optimisation or an overlay restriction, and these are device settings.
- Physical devices only for iOS: PushKit and CallKit do not work in the simulator.

## Reference

See `sample-apps/cometchat-calls-sample-app-ringing-react-native`: `index.js`, `src/calls/push.ts` and `ios/CometChatCallsRinging/AppDelegate.swift`.
