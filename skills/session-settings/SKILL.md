---
name: session-settings
description: Configure all SessionSettings options for React Native — layouts, session type, hide buttons, idle timeout, recording, audio mode. Use when customizing call UI or pre-session config. Triggers on "SessionSettings", "session settings", "hide button", "layout type", "idle timeout", "sessionType".
inclusion: manual
---

# CometChat Calls SDK v5 — Session Settings (React Native)

## Overview

`SessionSettings` is a plain object passed as the `sessionSettings` prop to `<CometChatCalls.Component>`. It configures every aspect of a call session. All properties are optional with sensible defaults.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Full Settings Example

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    // Session type & layout
    sessionType: 'VIDEO',                    // 'VIDEO' | 'VOICE'
    layout: 'TILE',                          // 'TILE' | 'SIDEBAR' | 'SPOTLIGHT'

    // Initial media state
    startAudioMuted: false,
    startVideoPaused: false,

    // Recording
    autoStartRecording: false,

    // Audio mode (mobile-specific)
    audioMode: 'SPEAKER',                    // 'SPEAKER' | 'EARPIECE' | 'BLUETOOTH' | 'HEADPHONES'

    // Timeout
    idleTimeoutPeriodBeforePrompt: 60000,    // ms before showing "extend?" prompt
    idleTimeoutPeriodAfterPrompt: 120000,    // ms after prompt before auto-end

    // Identity
    displayName: 'John Doe',
    title: 'Team Meeting',

    // Hide panels
    hideControlPanel: false,
    hideHeaderPanel: false,
    hideSessionTimer: false,
    hideNetworkIndicator: false,
    hideRecordingStatusIndicator: false,

    // Hide individual buttons
    hideLeaveSessionButton: false,
    hideToggleAudioButton: false,
    hideToggleVideoButton: false,
    hideSwitchCameraButton: false,
    hideRecordingButton: true,               // hidden by default
    hideRaiseHandButton: false,
    hideShareInviteButton: true,             // hidden by default
    hideParticipantListButton: false,
    hideChangeLayoutButton: false,
    hideChatButton: true,                    // hidden by default
    hideAudioModeButton: false,              // mobile-specific

    // Spotlight layout options
    enableSpotlightDrag: true,
    enableSpotlightSwap: true,

    // Participant context menu
    enableParticipantContextMenu: true,
  }}
/>
```

### Constants Reference

```typescript
CometChatCalls.CALL_MODE.DEFAULT     // 'SIDEBAR'
CometChatCalls.CALL_MODE.SPOTLIGHT   // 'SPOTLIGHT'

CometChatCalls.AUDIO_MODE.SPEAKER    // 'SPEAKER'
CometChatCalls.AUDIO_MODE.EARPIECE   // 'EARPIECE'
CometChatCalls.AUDIO_MODE.BLUETOOTH  // 'BLUETOOTH'
CometChatCalls.AUDIO_MODE.HEADPHONES // 'HEADPHONES'
```

### Common Presets

**Voice call:**
```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    sessionType: 'VOICE',
    layout: 'SPOTLIGHT',
    startVideoPaused: true,
    audioMode: 'EARPIECE',
  }}
/>
```

**Video call:**
```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    sessionType: 'VIDEO',
    layout: 'TILE',
    startVideoPaused: false,
  }}
/>
```

**Custom UI (hide default controls):**
```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    hideControlPanel: true,
    hideHeaderPanel: true,
  }}
/>
```

### Button Defaults

| Button | Default Hidden? |
|--------|----------------|
| Recording | Yes (`true`) |
| Share Invite | Yes (`true`) |
| Chat | Yes (`true`) |
| All others | No (`false`) |

## Gotchas

- All properties are optional — pass only what you need to override
- `sessionType` uses `'VOICE'` not "AUDIO"
- Layout values: `'TILE'`, `'SIDEBAR'`, `'SPOTLIGHT'` — all caps
- Idle timeout values are in **milliseconds**
- Recording, share invite, and chat buttons are hidden by default
- `hideControlPanel: true` hides the entire bottom bar — individual hide flags are ignored
- `hideAudioModeButton` and `audioMode` are mobile-specific (not available on web SDK)
- No `hideScreenSharingButton` — screen sharing initiation is not supported on React Native
- No `hideVirtualBackgroundButton`, `enableNoiseReduction`, or device ID selection — those are web-only
