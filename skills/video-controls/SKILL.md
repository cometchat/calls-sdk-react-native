---
name: video-controls
description: Control video during calls — pause/resume camera, switch between front and back camera. Use when implementing camera toggle, front/back switch, or custom video buttons. Triggers on "pause video", "resume video", "switch camera", "camera toggle", "video controls", "front camera", "back camera".
inclusion: manual
---

# CometChat Calls SDK v5 — Video Controls (React Native)

## Overview

Programmatically control the local camera (pause/resume) and switch between front and back cameras during an active call.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Pause / Resume Video

```typescript
CometChatCalls.pauseVideo();   // turn off camera
CometChatCalls.resumeVideo();  // turn on camera
CometChatCalls.toggleVideo();  // toggle camera state
```

### Switch Camera (Front ↔ Back)

```typescript
CometChatCalls.switchCamera();  // toggle front/back camera
```

### Listen for Video Events

```typescript
CometChatCalls.addEventListener('onVideoPaused', () => {
  // Update video button to "off" state
});

CometChatCalls.addEventListener('onVideoResumed', () => {
  // Update video button to "on" state
});

CometChatCalls.addEventListener('onCameraFacingChanged', (facing) => {
  // facing: 'FRONT' | 'REAR'
  console.log('Camera now facing:', facing);
});

CometChatCalls.addEventListener('onSwitchCameraButtonClicked', () => {
  // Fires when user taps the built-in switch camera button
});
```

### Pre-configure (Before Joining)

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    sessionType: 'VIDEO',
    startVideoPaused: false,
    hideSwitchCameraButton: false,
  }}
/>
```

### Custom Video Controls Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function VideoControls() {
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    const unsub1 = CometChatCalls.addEventListener('onVideoPaused', () => setVideoOff(true));
    const unsub2 = CometChatCalls.addEventListener('onVideoResumed', () => setVideoOff(false));
    return () => { unsub1(); unsub2(); };
  }, []);

  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <TouchableOpacity onPress={() => CometChatCalls.toggleVideo()}>
        <Text>{videoOff ? '📷 Camera On' : '🚫 Camera Off'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => CometChatCalls.switchCamera()}>
        <Text>🔄 Flip</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Gotchas

- `pauseVideo()` / `resumeVideo()` only work during an active session
- `switchCamera()` toggles between front and back — there's no way to select a specific camera by ID on mobile
- For voice calls (`sessionType: 'VOICE'`), set `startVideoPaused: true`
- Camera permissions must be granted before joining — the SDK requests them but you should handle denial gracefully
- No `getVideoInputDevices()` or `setVideoInputDevice()` on React Native — those are web-only
