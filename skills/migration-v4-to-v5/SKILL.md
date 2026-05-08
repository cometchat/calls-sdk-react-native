---
name: migration-v4-to-v5
description: Migrate a React Native project from CometChat Calls SDK v4 to v5. Use when upgrading calls SDK version, replacing deprecated v4 APIs, migrating CallSettingsBuilder to sessionSettings, replacing OngoingCallListener with addEventListener. Triggers on "migrate calls sdk", "upgrade v4 to v5", "replace deprecated calls api", "CallSettingsBuilder to sessionSettings", "migration guide".
inclusion: manual
---

# CometChat Calls SDK — Migrate v4 to v5 (React Native)

## Overview

Calls SDK v5 is a drop-in replacement for v4. All v4 APIs are preserved as deprecated methods that internally delegate to v5 implementations. You can update the package version and existing code will compile and run without changes. This skill guides migration to the new v5 APIs.

## Migration Strategy

1. Update the package version
2. Add `CometChatCalls.login()` after authentication
3. Replace `CallSettingsBuilder` → plain `sessionSettings` prop
4. Replace `callSettings` prop → `sessionSettings` prop on Component
5. Replace `OngoingCallListener` → `addEventListener()`
6. Replace static action methods (same names, just verify)
7. Clean up removed APIs

## Step 1 — Update Package

```bash
npm install @cometchat/calls-sdk-react-native@latest
```

## Step 2 — Add Authentication

v4 required passing `authToken` to `generateToken()`. v5 introduces `CometChatCalls.login()` which caches the token.

### v4 (remove this pattern)

```typescript
const { token } = await CometChatCalls.generateToken(sessionId, authToken);
```

### v5 (replace with)

```typescript
// Call once after your app authenticates the user
await CometChatCalls.login(uid, authKey);
// OR
await CometChatCalls.loginWithAuthToken(authToken);

// Now generateToken uses the cached auth token
const { token } = await CometChatCalls.generateToken(sessionId);
```

## Step 3 — Replace Session Settings

`CallSettingsBuilder` → plain `sessionSettings` object. Note the inverted boolean logic on visibility methods.

### v4 (remove this pattern)

```typescript
const callSettings = new CometChatCalls.CallSettingsBuilder()
  .enableDefaultLayout(true)
  .setIsAudioOnlyCall(true)
  .showEndCallButton(true)
  .showSwitchCameraButton(true)
  .showMuteAudioButton(true)
  .showPauseVideoButton(true)
  .showAudioModeButton(true)
  .showRecordingButton(true)
  .startWithAudioMuted(false)
  .startWithVideoMuted(false)
  .setMode('DEFAULT')
  .setDefaultAudioMode('SPEAKER')
  .startRecordingOnCallStart(false)
  .setCallListener(new CometChatCalls.OngoingCallListener({ ... }))
  .build();
```

### v5 (replace with)

```typescript
const sessionSettings = {
  sessionType: 'VOICE',
  layout: 'SIDEBAR',
  hideControlPanel: false,
  hideLeaveSessionButton: false,
  hideSwitchCameraButton: false,
  hideToggleAudioButton: false,
  hideToggleVideoButton: false,
  hideAudioModeButton: false,
  hideRecordingButton: false,
  startAudioMuted: false,
  startVideoPaused: false,
  audioMode: 'SPEAKER',
  autoStartRecording: false,
};
```

### Builder Method Mapping

| v4 Method | v5 SessionSettings Property | Notes |
|-----------|---------------------------|-------|
| `setIsAudioOnlyCall(true)` | `sessionType: 'VOICE'` | Use `'VIDEO'` for video |
| `enableDefaultLayout(bool)` | `hideControlPanel: !bool` | Inverted logic |
| `showEndCallButton(bool)` | `hideLeaveSessionButton: !bool` | Inverted logic |
| `showSwitchCameraButton(bool)` | `hideSwitchCameraButton: !bool` | Inverted logic |
| `showMuteAudioButton(bool)` | `hideToggleAudioButton: !bool` | Inverted logic |
| `showPauseVideoButton(bool)` | `hideToggleVideoButton: !bool` | Inverted logic |
| `showAudioModeButton(bool)` | `hideAudioModeButton: !bool` | Inverted logic |
| `showRecordingButton(bool)` | `hideRecordingButton: !bool` | Inverted logic |
| `startWithAudioMuted(bool)` | `startAudioMuted: bool` | Same logic |
| `startWithVideoMuted(bool)` | `startVideoPaused: bool` | Same logic |
| `setMode('DEFAULT')` | `layout: 'SIDEBAR'` | `'DEFAULT'` maps to `'SIDEBAR'` |
| `setMode('SPOTLIGHT')` | `layout: 'SPOTLIGHT'` | Same |
| `setDefaultAudioMode(mode)` | `audioMode: mode` | Same values |
| `startRecordingOnCallStart(bool)` | `autoStartRecording: bool` | Same logic |
| `enableDraggableVideoTile(bool)` | `enableSpotlightDrag: bool` | Same logic |
| `enableVideoTileClick(bool)` | `enableSpotlightSwap: bool` | Same logic |
| `setCallListener(listener)` | Use `addEventListener()` | See Step 5 |

## Step 4 — Replace Component Prop

### v4 (remove this pattern)

```tsx
<CometChatCalls.Component callToken={token} callSettings={callSettings} />
```

### v5 (replace with)

```tsx
<CometChatCalls.Component callToken={token} sessionSettings={sessionSettings} />
```

Note: `callSettings` prop still works (deprecated) — it internally converts to v5 format.

## Step 5 — Replace Event Listeners

Replace `OngoingCallListener` with individual `addEventListener()` calls.

### v4 (remove this pattern)

```typescript
const callSettings = new CometChatCalls.CallSettingsBuilder()
  .setCallListener(new CometChatCalls.OngoingCallListener({
    onCallEnded: () => { },
    onCallEndButtonPressed: () => { },
    onUserJoined: (user) => { },
    onUserLeft: (user) => { },
    onUserListUpdated: (userList) => { },
    onRecordingStarted: (event) => { },
    onRecordingStopped: () => { },
    onUserMuted: (event) => { },
    onSessionTimeout: () => { },
  }))
  .build();
```

### v5 (replace with)

```typescript
const controller = new AbortController();
const opts = { signal: controller.signal };

CometChatCalls.addEventListener('onSessionLeft', () => { }, opts);
CometChatCalls.addEventListener('onLeaveSessionButtonClicked', () => { }, opts);
CometChatCalls.addEventListener('onParticipantJoined', (p) => { }, opts);
CometChatCalls.addEventListener('onParticipantLeft', (p) => { }, opts);
CometChatCalls.addEventListener('onParticipantListChanged', (list) => { }, opts);
CometChatCalls.addEventListener('onRecordingStarted', () => { }, opts);
CometChatCalls.addEventListener('onRecordingStopped', () => { }, opts);
CometChatCalls.addEventListener('onParticipantAudioMuted', (p) => { }, opts);
CometChatCalls.addEventListener('onSessionTimedOut', () => { }, opts);

// Cleanup all at once:
controller.abort();
```

### Event Mapping

| v4 Event | v5 Event |
|----------|----------|
| `onCallEnded` | `onSessionLeft` |
| `onCallEndButtonPressed` | `onLeaveSessionButtonClicked` |
| `onSessionTimeout` | `onSessionTimedOut` |
| `onUserJoined(user)` | `onParticipantJoined(participant)` |
| `onUserLeft(user)` | `onParticipantLeft(participant)` |
| `onUserListUpdated(list)` | `onParticipantListChanged(participants)` |
| `onRecordingStarted(event)` | `onRecordingStarted()` |
| `onRecordingStopped()` | `onRecordingStopped()` |
| `onUserMuted(event)` | `onParticipantAudioMuted(participant)` |

## Step 6 — Update Static Methods

Most action methods keep the same names:

| v4 Method | v5 Method | Notes |
|-----------|-----------|-------|
| `CometChatCalls.endSession()` | `CometChatCalls.leaveSession()` | Renamed |
| `CometChatCalls.switchToVideoCall()` | *Removed — delete usage* | |

## Step 7 — Clean Up Removed APIs

Delete usage of these removed/deprecated features:
- `switchToVideoCall()` — no replacement
- `MainVideoContainerSetting` — no replacement
- `AvatarMode` — no replacement
- `ShowSwitchToVideoCallButton` — no replacement

## Gotchas

- v5 is a drop-in replacement — you can update the package and migrate incrementally; v4 APIs still work but are deprecated
- Boolean logic is **inverted** for visibility: `showX(true)` → `hideX: false`
- `'DEFAULT'` mode maps to `'SIDEBAR'` layout in v5
- `OngoingCallListener` is replaced by individual `addEventListener()` calls with `AbortSignal` for cleanup
- `generateToken()` no longer requires `authToken` parameter — it's cached from `login()`
- The `User` object in v4 events is replaced by a simpler `Participant` object (`{ pid, name, uid, avatar }`)
- `callSettings` prop still works on the Component but is deprecated — use `sessionSettings`
