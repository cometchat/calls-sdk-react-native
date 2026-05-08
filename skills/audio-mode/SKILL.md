---
name: audio-mode
description: Control audio output mode on mobile — switch between speaker, earpiece, Bluetooth, and headphones. Use when implementing audio routing, speaker toggle, or handling audio device changes. Triggers on "audio mode", "speaker", "earpiece", "bluetooth audio", "headphones", "setAudioMode", "audio routing".
inclusion: manual
---

# CometChat Calls SDK v5 — Audio Mode (React Native)

## Overview

Switch the audio output between speaker, earpiece, Bluetooth, and headphones during an active call. This is a mobile-specific feature not available on the web SDK.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Set Audio Mode

```typescript
CometChatCalls.setAudioMode('SPEAKER');     // route to loudspeaker
CometChatCalls.setAudioMode('EARPIECE');    // route to earpiece
CometChatCalls.setAudioMode('BLUETOOTH');   // route to connected Bluetooth device
CometChatCalls.setAudioMode('HEADPHONES');  // route to wired headphones
```

### Listen for Audio Mode Changes

```typescript
CometChatCalls.addEventListener('onAudioModeChanged', (mode) => {
  // mode: 'SPEAKER' | 'EARPIECE' | 'BLUETOOTH' | 'HEADPHONES'
  console.log('Audio mode changed to:', mode);
});
```

### Set Default Audio Mode (Before Joining)

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    audioMode: 'SPEAKER',         // default audio output
    hideAudioModeButton: false,   // show the audio mode button
  }}
/>
```

### Custom Audio Mode Picker Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

type AudioMode = 'SPEAKER' | 'EARPIECE' | 'BLUETOOTH' | 'HEADPHONES';

function AudioModePicker() {
  const [currentMode, setCurrentMode] = useState<AudioMode>('SPEAKER');

  useEffect(() => {
    const unsub = CometChatCalls.addEventListener('onAudioModeChanged', (mode) => {
      setCurrentMode(mode);
    });
    return () => unsub();
  }, []);

  const modes: { mode: AudioMode; label: string }[] = [
    { mode: 'SPEAKER', label: '🔊 Speaker' },
    { mode: 'EARPIECE', label: '📱 Earpiece' },
    { mode: 'BLUETOOTH', label: '🎧 Bluetooth' },
    { mode: 'HEADPHONES', label: '🎵 Headphones' },
  ];

  return (
    <View style={styles.container}>
      {modes.map(({ mode, label }) => (
        <TouchableOpacity
          key={mode}
          style={[styles.button, currentMode === mode && styles.active]}
          onPress={() => CometChatCalls.setAudioMode(mode)}
        >
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8 },
  button: { padding: 8, borderRadius: 8, backgroundColor: '#2d2d2d' },
  active: { backgroundColor: '#6852d6' },
  text: { color: '#fff', fontSize: 12 },
});
```

### Constants

```typescript
CometChatCalls.AUDIO_MODE.SPEAKER     // 'SPEAKER'
CometChatCalls.AUDIO_MODE.EARPIECE    // 'EARPIECE'
CometChatCalls.AUDIO_MODE.BLUETOOTH   // 'BLUETOOTH'
CometChatCalls.AUDIO_MODE.HEADPHONES  // 'HEADPHONES'
```

## Gotchas

- `setAudioMode()` only works during an active session
- Bluetooth mode only works if a Bluetooth audio device is connected — otherwise it may fall back to speaker
- Headphones mode only works if wired headphones are plugged in
- The `onAudioModeChanged` event fires when the mode changes for any reason (user action, device connected/disconnected)
- For voice calls, the default is typically `EARPIECE`; for video calls, it's `SPEAKER`
- `hideAudioModeButton: true` hides the built-in audio mode button — use this when providing your own picker
- This feature is not available on the web SDK — it's mobile-only
- On Android, ensure `BLUETOOTH` and `BLUETOOTH_CONNECT` permissions are in your manifest
