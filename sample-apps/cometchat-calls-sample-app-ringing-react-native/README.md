# CometChat Calls SDK — Ringing Sample App (React Native)

A sample React Native app showing 1:1 and group ringing calls with the **Calls SDK** and the **Push Notifications SDK**.
The caller places and ends the call with the Calls SDK. The callee's phone rings through the Push Notifications SDK's
VoIP package, with the full-screen ringing screen on Android and CallKit on iOS, in the foreground, in the background,
locked or killed. The session is prepared while it rings, so the call connects as soon as it is answered.

## Prerequisites

- Node.js 20.19.4 or later
- React Native 0.84, as set in `package.json`
- **Physical devices** to receive calls: PushKit and CallKit do not work in the iOS simulator, and FCM needs Google Play services
- A [CometChat](https://www.cometchat.com/) app with:
  - App ID, Auth Key and Region (US, EU or IN)
  - Under Notifications → Push, an **FCM provider** for Android and an **APNs provider** for iOS, and their provider IDs
- **Android**: a Firebase project with this app's package name, and its `google-services.json`
- **iOS**: Xcode 26 or later, and an Apple developer team that can sign the app with the Push Notifications capability

## Setup

1. Clone the repository and install:
   ```sh
   git clone https://github.com/cometchat/calls-sdk-react-native.git
   cd calls-sdk-react-native/sample-apps/cometchat-calls-sample-app-ringing-react-native
   npm install
   ```
2. **Android**: put your `google-services.json` in `android/app/`. The build fails without it, and it is ignored by
   git. The app's package name is `com.cometchat.calls.sampleapp.ringing.reactnative`; change `applicationId` in
   `android/app/build.gradle` if you registered a different one.
3. **iOS**: install the pods and open the workspace:
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   open CometChatCallsRinging.xcworkspace
   ```
   Under **Signing & Capabilities**, pick your team and change the bundle identifier to one your team owns. The project
   already has the Push Notifications capability and the Audio, Remote notifications and Voice over IP background modes.
4. In the CometChat dashboard, set up an APNs provider for that bundle identifier with a token-based (`.p8`) key. Its
   "Enable Production Mode" switch must match the build: off for builds run from Xcode, on for TestFlight and App Store
   builds.
5. Run on two devices:
   ```sh
   npm run android
   npm run ios -- --device
   ```
   On first launch, enter your **App ID**, **Auth Key**, **Region** and the **Push Provider ID** for that platform (FCM on
   Android, APNs on iOS), or set them in `src/AppConstants.ts` before building. An Auth Key belongs in a development
   build only: use auth tokens from your server in production.
6. Log in as a different user on each device and call one from the other.

`aps-environment` is `development`, matching a development provisioning profile. A TestFlight or App Store build needs
`production`.

## Screens

- **Users**: everyone in the app, with presence. The phone and video buttons ring that person.
- **Groups**: the groups you have joined. The buttons ring every member. **+** opens **New group call**, which creates a
  private group with the people you pick and rings it.
- **History**: your call logs: who, voice/video/group, the outcome and the duration. Tap a call for its details and to
  call back or ring the group again. Pull to refresh.
- **Profile**: tap your avatar in the top-right corner. It shows your UID, the System / Light / Dark appearance, the
  app's credentials and the SDK version ranges from `package.json`, and **Sign out**.

## How a call works

**Placing a call** (`src/calls/useOutgoingCall.ts`)

1. `CometChatCalls.initiateCall(receiver, options)` creates the call, rings the callee (every member, with
   `receiverType: 'group'`) and starts preparing the session. The session settings freeze at this point, so
   `sessionType` is always set.
2. `onParticipantConnected`: the callee's phone has the session, so "Calling…" becomes "Ringing…". This only happens when
   the call reached the callee by push.
3. `onParticipantJoined`: the callee answered, and the call screen joins the prepared session.
4. The end button withdraws the call with `CometChatCalls.endCall(sessionId, 'cancelled')`, and no answer after 45
   seconds with `'unanswered'`. Both stop the callee's phone ringing.
5. A decline or busy arrives through `CometChatVoipNotifications.onCallEnded`. A ringing call also reads the server's call
   log every 3 seconds, so the outcome still shows if that event never arrives.

On iOS the call is reported to CallKit with `reportOutgoingCall`, `reportCallConnected` and `reportCallEnded`, so CallKit
owns the audio session.

Every decision is made by `src/calls/OutgoingCall.ts`, a small state machine with no React or SDK code in it. Its tests
are in `__tests__/OutgoingCall.test.ts`.

**Receiving a call** (`index.js`, `src/calls/push.ts`, `ios/CometChatCallsRinging/AppDelegate.swift`)

The app writes no incoming-call screen: the VoIP package rings, prepares the session while it rings, and sends a decline
itself. The app does four things:

1. In `AppDelegate`, `registerForVoIPPushes()` runs before React Native starts, because iOS terminates an app woken by a
   VoIP push unless the call reaches CallKit in time.
2. In `index.js`, `registerBackgroundCallTask()` runs at module scope, so a killed Android app can send a decline.
3. `src/calls/push.ts` calls `CometChatVoipNotifications.init()` before anything else is awaited, then
   `CometChatPushNotifications.init()` after login. Reversing these loses the ring that woke the app.
4. `onCallAccepted` opens the call screen (`src/screens/CallScreen.tsx`), which joins with
   `CometChatCalls.connect(sessionId, settings)` and leaves when the session reports `onSessionLeft` or
   `onConnectionClosed`.

**Signing out** (`src/calls/session.ts`): `CometChatPushNotifications.unregister()` runs first. It needs the session, and a
device left registered keeps ringing for the user who left.

## Project structure

```
App.tsx                          # Boot, and which screen is showing
index.js                         # Background call task, VoIP subscription
src/
├── AppConstants.ts              # Optional credential defaults (empty)
├── theme.ts                     # Light and dark colours
├── calls/
│   ├── OutgoingCall.ts          # Outgoing call state machine
│   ├── useOutgoingCall.ts       # Feeds it SDK events; timers, endCall, CallKit reports
│   ├── push.ts                  # Push and VoIP setup, call answered
│   └── session.ts               # SDK init, login, restore, logout
├── components/                  # Avatar, icons, buttons
├── screens/                     # Credentials, Login, Home, Users, Groups, NewGroupCall,
│                                # History, Profile, OutgoingCall, Call
└── store/useAppStore.ts         # Credentials, appearance, the call on screen
```

## Troubleshooting

| Symptom | Check |
|---|---|
| Android build fails on `google-services` | `android/app/google-services.json` is missing, or its package name differs from `applicationId` |
| The callee does not ring | Provider ID and credentials on the callee; on iOS, the provider's Production Mode matches the build. On Android, battery optimisation and overlay restrictions on some manufacturers' devices |
| The caller stays on "Calling…" | The callee's app was already in the foreground and got the call over the websocket, or the callee has no working push |
| The app crashes as a call rings on iOS | `NSMicrophoneUsageDescription` was removed from `Info.plist` |
| A video call has no camera | `sessionType` must be `'VIDEO'`, in capitals, when the session is prepared |

**Skills used:** `setup`, `ringing-integration`, `voip-calling`, `session-settings`, `event-listeners`

## Help and Support

For issues running the project or integrating with our SDKs, consult our [documentation](https://www.cometchat.com/docs/calls/react-native/overview) or create a [support ticket](https://help.cometchat.com/hc/en-us).
