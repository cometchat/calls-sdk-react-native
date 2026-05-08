---
name: event-listeners
description: Register call event listeners using CometChatCalls.addEventListener — session status, participant, media, button click, layout, and mobile-specific events. Use when handling call events, session status, participant changes, media state, button clicks, or layout changes. Triggers on "event listener", "addEventListener", "session listener", "participant listener", "media listener", "button click", "layout listener".
inclusion: manual
---

# CometChat Calls SDK v5 — Event Listeners (React Native)

## Overview

Register event listeners using `CometChatCalls.addEventListener()`. Each call returns an unsubscribe function. Events are categorized into session status, participant, media, button click, layout, and mobile-specific groups.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Basic Pattern

```typescript
const unsubscribe = CometChatCalls.addEventListener('eventName', (payload) => {
  // handle event
});

// Later, to remove:
unsubscribe();
```

### React useEffect Cleanup

```tsx
useEffect(() => {
  const cleanup = CometChatCalls.addEventListener('onSessionJoined', () => {
    console.log('Joined session');
  });
  return () => cleanup();
}, []);
```

### Using AbortSignal for Batch Cleanup

```typescript
const controller = new AbortController();

CometChatCalls.addEventListener('onSessionJoined', () => {}, { signal: controller.signal });
CometChatCalls.addEventListener('onSessionLeft', () => {}, { signal: controller.signal });
CometChatCalls.addEventListener('onParticipantJoined', (p) => {}, { signal: controller.signal });

// Remove all listeners at once:
controller.abort();
```

### 1. Session Status Events

```typescript
CometChatCalls.addEventListener('onSessionJoined', () => {
  console.log('Connected to session');
});

CometChatCalls.addEventListener('onSessionLeft', () => {
  console.log('Left session');
});

CometChatCalls.addEventListener('onSessionTimedOut', () => {
  console.log('Session timed out');
});

CometChatCalls.addEventListener('onConnectionLost', () => {
  console.log('Connection lost');
});

CometChatCalls.addEventListener('onConnectionRestored', () => {
  console.log('Connection restored');
});

CometChatCalls.addEventListener('onConnectionClosed', () => {
  console.log('Connection closed — navigate away');
});
```

### 2. Participant Events

```typescript
CometChatCalls.addEventListener('onParticipantJoined', (participant) => {
  console.log(`${participant.name} joined`);
});

CometChatCalls.addEventListener('onParticipantLeft', (participant) => {
  console.log(`${participant.name} left`);
});

CometChatCalls.addEventListener('onParticipantListChanged', (participants) => {
  console.log('Participants:', participants.length);
});

CometChatCalls.addEventListener('onParticipantAudioMuted', (participant) => {
  console.log(`${participant.name} muted audio`);
});

CometChatCalls.addEventListener('onParticipantAudioUnmuted', (participant) => {
  console.log(`${participant.name} unmuted audio`);
});

CometChatCalls.addEventListener('onParticipantVideoPaused', (participant) => {
  console.log(`${participant.name} paused video`);
});

CometChatCalls.addEventListener('onParticipantVideoResumed', (participant) => {
  console.log(`${participant.name} resumed video`);
});

CometChatCalls.addEventListener('onParticipantHandRaised', (participant) => {
  console.log(`${participant.name} raised hand`);
});

CometChatCalls.addEventListener('onParticipantHandLowered', (participant) => {
  console.log(`${participant.name} lowered hand`);
});

CometChatCalls.addEventListener('onParticipantStartedScreenShare', (participant) => {
  console.log(`${participant.name} started screen sharing`);
});

CometChatCalls.addEventListener('onParticipantStoppedScreenShare', (participant) => {
  console.log(`${participant.name} stopped screen sharing`);
});

CometChatCalls.addEventListener('onParticipantStartedRecording', (participant) => {
  console.log(`${participant.name} started recording`);
});

CometChatCalls.addEventListener('onParticipantStoppedRecording', (participant) => {
  console.log(`${participant.name} stopped recording`);
});

CometChatCalls.addEventListener('onDominantSpeakerChanged', (participant) => {
  console.log(`Dominant speaker: ${participant.name}`);
});
```

### 3. Media Events (Local User)

```typescript
CometChatCalls.addEventListener('onAudioMuted', () => {
  // Update mute button state
});

CometChatCalls.addEventListener('onAudioUnMuted', () => {
  // Update unmute button state
});

CometChatCalls.addEventListener('onVideoPaused', () => {
  // Update video button to "off"
});

CometChatCalls.addEventListener('onVideoResumed', () => {
  // Update video button to "on"
});

CometChatCalls.addEventListener('onRecordingStarted', () => {
  // Show recording indicator
});

CometChatCalls.addEventListener('onRecordingStopped', () => {
  // Hide recording indicator
});

CometChatCalls.addEventListener('onScreenShareStarted', () => {
  // Screen share started (received from web participant)
});

CometChatCalls.addEventListener('onScreenShareStopped', () => {
  // Screen share stopped
});
```

### 4. Mobile-Specific Media Events

```typescript
CometChatCalls.addEventListener('onAudioModeChanged', (mode) => {
  // mode: 'SPEAKER' | 'EARPIECE' | 'BLUETOOTH' | 'HEADPHONES'
  console.log('Audio mode changed to:', mode);
});

CometChatCalls.addEventListener('onCameraFacingChanged', (facing) => {
  // facing: 'FRONT' | 'REAR'
  console.log('Camera facing:', facing);
});
```

### 5. Button Click Events

```typescript
CometChatCalls.addEventListener('onLeaveSessionButtonClicked', () => {
  // User clicked leave
});

CometChatCalls.addEventListener('onToggleAudioButtonClicked', () => {});
CometChatCalls.addEventListener('onToggleVideoButtonClicked', () => {});
CometChatCalls.addEventListener('onRaiseHandButtonClicked', () => {});
CometChatCalls.addEventListener('onShareInviteButtonClicked', () => {});
CometChatCalls.addEventListener('onChangeLayoutButtonClicked', () => {});
CometChatCalls.addEventListener('onParticipantListButtonClicked', () => {});
CometChatCalls.addEventListener('onRecordingToggleButtonClicked', () => {});
CometChatCalls.addEventListener('onChatButtonClicked', () => {});
CometChatCalls.addEventListener('onSwitchCameraButtonClicked', () => {});  // mobile-specific
```

### 6. Layout Events

```typescript
CometChatCalls.addEventListener('onCallLayoutChanged', (layout) => {
  console.log('Layout changed to:', layout); // 'TILE' | 'SIDEBAR' | 'SPOTLIGHT'
});

CometChatCalls.addEventListener('onParticipantListVisible', () => {
  console.log('Participant list opened');
});

CometChatCalls.addEventListener('onParticipantListHidden', () => {
  console.log('Participant list closed');
});

CometChatCalls.addEventListener('onPictureInPictureLayoutEnabled', () => {
  console.log('PiP layout enabled');
});

CometChatCalls.addEventListener('onPictureInPictureLayoutDisabled', () => {
  console.log('PiP layout disabled');
});
```

### Participant Object Shape

```typescript
interface Participant {
  pid: string;    // Participant ID (unique per session join)
  name: string;   // Display name
  uid: string;    // CometChat user ID
  avatar?: string; // Avatar URL
}
```

### Participant Actions (Programmatic)

```typescript
// Mute a participant's audio
CometChatCalls.muteParticipant(participant.uid);

// Pause a participant's video
CometChatCalls.pauseParticipantVideo(participant.uid);

// Pin a participant
CometChatCalls.pinParticipant(participant.pid, 'human');

// Unpin
CometChatCalls.unpinParticipant();

// Raise / lower hand (self)
CometChatCalls.raiseHand();
CometChatCalls.lowerHand();
CometChatCalls.toggleHand();

// Show / hide participant list
CometChatCalls.showParticipantList();
CometChatCalls.hideParticipantList();
CometChatCalls.toggleParticipantList();

// Set chat button unread count
CometChatCalls.setChatButtonUnreadCount(5);
```

## Gotchas

- `addEventListener` returns an **unsubscribe function** — call it to remove the listener
- Always clean up listeners in `useEffect` return or with `AbortSignal`
- Register listeners **before** or **alongside** the `<CometChatCalls.Component>` render
- Button click events fire **alongside** the SDK's default action (not before)
- `onParticipantListChanged` provides the full list (not a delta)
- Mobile-specific events (`onAudioModeChanged`, `onCameraFacingChanged`, `onSwitchCameraButtonClicked`, PiP events) are not available on the web SDK
- Web-specific device events (`onAudioInputDeviceChanged`, etc.) are not available on React Native
- Pinning only affects **your local view**
- `unpinParticipant()` takes no arguments — unpins whoever is currently pinned
- There is no "kick" API — only mute and pause video
