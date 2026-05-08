---
name: custom-ui
description: Build custom call UI — hide default header/control panel and render your own React Native views around the call component. Use when hiding default controls and building your own call interface. Triggers on "custom control panel", "custom UI", "hideControlPanel", "custom call interface", "custom buttons".
inclusion: manual
---

# CometChat Calls SDK v5 — Custom UI (React Native)

## Overview

Customize the call interface by hiding default SDK panels and rendering your own React Native views around the `<CometChatCalls.Component>`.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### 1. Hide Default Panels

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    hideControlPanel: true,   // hide entire bottom bar
    hideHeaderPanel: true,    // hide top header
  }}
/>
```

### 2. Render Custom Controls Around the Component

```tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function CustomCallScreen({ callToken }: { callToken: string }) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    const unsubs = [
      CometChatCalls.addEventListener('onAudioMuted', () => setMuted(true)),
      CometChatCalls.addEventListener('onAudioUnMuted', () => setMuted(false)),
      CometChatCalls.addEventListener('onVideoPaused', () => setVideoOff(true)),
      CometChatCalls.addEventListener('onVideoResumed', () => setVideoOff(false)),
    ];
    return () => unsubs.forEach(fn => fn());
  }, []);

  return (
    <View style={styles.container}>
      {/* Custom header */}
      <View style={styles.header}>
        <Text style={styles.title}>Team Meeting</Text>
      </View>

      {/* SDK call UI */}
      <View style={styles.callContainer}>
        <CometChatCalls.Component
          callToken={callToken}
          sessionSettings={{
            hideControlPanel: true,
            hideHeaderPanel: true,
          }}
        />
      </View>

      {/* Custom control bar */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, muted && styles.buttonActive]}
          onPress={() => CometChatCalls.toggleAudio()}
        >
          <Text style={styles.buttonText}>{muted ? '🔇' : '🔊'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, videoOff && styles.buttonActive]}
          onPress={() => CometChatCalls.toggleVideo()}
        >
          <Text style={styles.buttonText}>{videoOff ? '📷' : '🚫'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => CometChatCalls.switchCamera()}
        >
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endButton}
          onPress={() => CometChatCalls.leaveSession()}
        >
          <Text style={styles.buttonText}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  header: { padding: 16, alignItems: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  callContainer: { flex: 1 },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: 16, padding: 20 },
  button: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2d2d2d', alignItems: 'center', justifyContent: 'center' },
  buttonActive: { backgroundColor: '#ef4444' },
  endButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ef4444', alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 20 },
});
```

### 3. Hide Individual Buttons (Partial Customization)

Instead of hiding the entire panel, selectively hide buttons:

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    hideRecordingButton: true,
    hideShareInviteButton: true,
    hideChatButton: true,
    hideChangeLayoutButton: true,
    // Keep the rest visible
  }}
/>
```

### Available Static Methods for Custom Controls

```typescript
// Audio
CometChatCalls.muteAudio();
CometChatCalls.unmuteAudio();
CometChatCalls.toggleAudio();

// Video
CometChatCalls.pauseVideo();
CometChatCalls.resumeVideo();
CometChatCalls.toggleVideo();
CometChatCalls.switchCamera();

// Session
CometChatCalls.leaveSession();
CometChatCalls.endSessionForAll();

// Recording
CometChatCalls.startRecording();
CometChatCalls.stopRecording();
CometChatCalls.toggleRecording();

// Layout
CometChatCalls.setLayout('TILE');       // 'TILE' | 'SIDEBAR' | 'SPOTLIGHT'

// Hand raise
CometChatCalls.raiseHand();
CometChatCalls.lowerHand();
CometChatCalls.toggleHand();

// Audio mode (mobile)
CometChatCalls.setAudioMode('SPEAKER'); // 'SPEAKER' | 'EARPIECE' | 'BLUETOOTH' | 'HEADPHONES'

// PiP
CometChatCalls.enablePictureInPictureLayout();
CometChatCalls.disablePictureInPictureLayout();

// Participants
CometChatCalls.showParticipantList();
CometChatCalls.hideParticipantList();
CometChatCalls.toggleParticipantList();
CometChatCalls.pinParticipant(pid, 'human');
CometChatCalls.unpinParticipant();
CometChatCalls.muteParticipant(uid);
CometChatCalls.pauseParticipantVideo(uid);

// Chat badge
CometChatCalls.setChatButtonUnreadCount(5);
```

## Gotchas

- You **cannot** inject views inside the call component — the SDK owns that view tree
- Render your custom UI **outside** the component (above, below, or overlaid with absolute positioning)
- `hideControlPanel: true` hides the entire bottom bar — individual hide flags are ignored when this is set
- Use event listeners to sync your custom button states with actual media state
- All action methods are static on `CometChatCalls` — no instance needed
- No CSS theming on React Native — customization is limited to hiding panels and rendering your own views
