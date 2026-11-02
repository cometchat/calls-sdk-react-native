---
name: ringing-integration
description: Implement ringing with the Calls SDK and the Push Notifications SDK. Use when adding outgoing or incoming calls, CometChatCalls.initiateCall, connect, endCall, "Calling…" and "Ringing…" states, cancel, decline, no-answer timeouts, or group ringing, or when replacing CometChat.initiateCall, acceptCall or rejectCall from the Chat SDK.
inclusion: manual
---

# CometChat Calls SDK v5.1 — Ringing Integration (React Native)

## Overview

Two SDKs do the work:

| SDK | Owns |
|-----|------|
| Calls SDK (`@cometchat/calls-sdk-react-native` 5.1+) | Creating the call, the media session, cancelling and ending it |
| Push Notifications SDK, VoIP package (`@cometchat/push-notifications-voip-react-native` 2.0+) | Ringing the callee's device, answering and declining. See the `voip-calling` skill |

The Chat SDK's calling methods (`CometChat.initiateCall`, `acceptCall`, `rejectCall`, `endCall`, `CallListener`) belong to the earlier flow. Do not mix them with this one.

| Stage | Caller | Callee |
|-------|--------|--------|
| Call created | `initiateCall` resolves; show "Calling…" | Push arrives; the Push SDK rings |
| Callee's device reached | `onParticipantConnected`; show "Ringing…" | Ringing |
| Callee answers | `onParticipantJoined`; mount the call component | `onCallAccepted`; mount the call component |
| Declined, busy, no answer | `onCallEnded` with `rejected`, `busy` or `unanswered` | Ring stops |
| Caller cancels | You ended it | Ring stops |

## Prerequisites

- Calls SDK set up and the user logged in (`setup` skill).
- Push configured (`voip-calling` skill).
- `react-native-webrtc` `^155.0.1`.
- `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` in `Info.plist`. Without the microphone string the system terminates the app mid-ring.

## 1. Start a call

Every Calls SDK method that can fail resolves to `{ data, error }`. Check `error` first.

```ts
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

const { data: call, error } = await CometChatCalls.initiateCall(receiverId, {
  type: 'video',          // or 'audio'
  receiverType: 'user',   // or 'group' to ring every member
  sessionSettings: { sessionType: 'VIDEO' }, // 'VOICE' for an audio call
});
if (error) {
  console.warn('Could not start the call', error);
  return;
}
```

Always set `sessionType`, in capitals. The settings freeze when the session is prepared, and settings passed to the component later are ignored.

`initiateCall` resolves while the prepare is still in flight. A failed prepare is not fatal: joining still works.

## 2. Show "Ringing…" and detect the answer

The caller stays on the prepared session and does not join until the callee has joined.

```ts
const session = CometChatCalls.getActiveSession();
const me = CometChatCalls.getLoggedInUser()?.uid;

const offs = [
  session.addEventListener('onParticipantConnected', participant => {
    if (participant.uid !== me) setStatus('Ringing…');
  }),
  session.addEventListener('onParticipantJoined', participant => {
    if (participant.uid !== me) openCallScreen(call.sessionId);
  }),
  session.addEventListener('onConnectionClosed', closeOutgoingScreen),
];
// When the screen goes away: offs.forEach(off => off());
```

`onParticipantConnected` only fires when the call reached the callee by push. A callee who got it over the websocket with the app open makes no pre-join, so the caller stays on "Calling…". Treat "Ringing…" as a nicety and never as a condition.

## 3. Learn the outcome

```ts
import { CometChatVoipNotifications } from '@cometchat/push-notifications-voip-react-native';

const off = CometChatVoipNotifications.onCallEnded(event => {
  if (event.sessionId === call.sessionId) {
    closeOutgoingScreen(event.reason); // rejected, busy, unanswered, cancelled
  }
});
```

## 4. Cancel and time out

```ts
await CometChatCalls.endCall(call.sessionId, 'cancelled');
```

Disable the end button after the first tap, and ignore an `onParticipantJoined` that arrives after you cancelled: the cancel wins.

There is no client-side ring timeout. A caller that wants its screen to time out ends the call itself:

```ts
const timer = setTimeout(() => {
  CometChatCalls.endCall(call.sessionId, 'unanswered');
  closeOutgoingScreen();
}, 45_000);
// Clear it on answer, cancel and unmount.
```

## 5. Report the outgoing call to CallKit (iOS)

Without this CallKit does not own the audio session, so a cellular call can take the microphone. These are no-ops on Android.

```ts
CometChatVoipNotifications.reportOutgoingCall(call.sessionId, calleeName, hasVideo);
// when the callee answers
CometChatVoipNotifications.reportCallConnected(call.sessionId);
// when it ends: required, or CallKit keeps the status bar and the audio session
CometChatVoipNotifications.reportCallEnded(call.sessionId, 'remoteEnded');
```

## 6. Join the session

Both sides join the same way. `connect` hands back the session already prepared for this call, without minting a second token.

```tsx
function CallScreen({ sessionId, callType, onEnd }) {
  const [callToken, setCallToken] = useState(null);

  useEffect(() => {
    const offs = [];
    let unmounted = false;
    (async () => {
      const session = await CometChatCalls.connect(sessionId, {
        sessionType: callType === 'video' ? 'VIDEO' : 'VOICE',
      });
      if (unmounted) return;
      setCallToken(session.callToken);
      offs.push(session.addEventListener('onSessionLeft', onEnd));
      offs.push(session.addEventListener('onConnectionClosed', onEnd));
    })();
    return () => {
      unmounted = true;
      offs.forEach(off => off());
    };
  }, [sessionId, callType, onEnd]);

  if (!callToken) return <Connecting />;
  return <CometChatCalls.Component callToken={callToken} />;
}
```

`CometChatCalls.Component` takes `callToken` or `sessionId`, and no event props. Subscribe on the session instead.

## 7. End a call

```ts
await CometChatCalls.getActiveSession()?.leave();
```

Use `session.leave()` rather than `CometChatCalls.leaveSession()`. It re-initialises the Calls SDK internally: wait for it to settle before preparing another session.

## Reference

See `sample-apps/cometchat-calls-sample-app-ringing-react-native`, in particular `src/calls/OutgoingCall.ts` and `src/calls/useOutgoingCall.ts`.
