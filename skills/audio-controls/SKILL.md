---
name: audio-controls
description: Control audio during calls — mute/unmute microphone. Use when implementing audio toggle or custom mute buttons. Triggers on "mute audio", "unmute", "microphone", "audio controls", "toggleAudio".
inclusion: manual
---

# CometChat Calls SDK v5 — Audio Controls (React Native)

## Overview

Programmatically control the local microphone (mute/unmute) during an active call.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Mute / Unmute

```typescript
CometChatCalls.muteAudio();    // mute microphone
CometChatCalls.unmuteAudio();  // unmute microphone
CometChatCalls.toggleAudio();  // toggle mute state
```

### Listen for Audio Events

```typescript
CometChatCalls.addEventListener('onAudioMuted', () => {
  // Update mute button to "muted" state
});

CometChatCalls.addEventListener('onAudioUnMuted', () => {
  // Update mute button to "unmuted" state
});
```

### Pre-configure (Before Joining)

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    startAudioMuted: true,  // join muted
  }}
/>
```

### Custom Mute Button Example

```tsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function MuteButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const unsub1 = CometChatCalls.addEventListener('onAudioMuted', () => setMuted(true));
    const unsub2 = CometChatCalls.addEventListener('onAudioUnMuted', () => setMuted(false));
    return () => { unsub1(); unsub2(); };
  }, []);

  return (
    <TouchableOpacity onPress={() => CometChatCalls.toggleAudio()}>
      <Text>{muted ? '🔇 Unmute' : '🔊 Mute'}</Text>
    </TouchableOpacity>
  );
}
```

## Gotchas

- `muteAudio()` / `unmuteAudio()` only work during an active session
- No device selection on React Native — use `setAudioMode()` for speaker/earpiece switching instead (see `audio-mode` skill)
- For voice calls, consider setting `startAudioMuted: false` as default
- The built-in mute button in the control panel already handles this — use these methods only for custom UI
