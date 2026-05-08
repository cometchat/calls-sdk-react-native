---
name: recording
description: Record call sessions with start/stop, auto-start recording, and recording events. Use when implementing call recording or showing recording indicators. Triggers on "recording", "record call", "auto start recording", "recording events", "startRecording".
inclusion: manual
---

# CometChat Calls SDK v5 — Recording (React Native)

## Overview

Record call sessions server-side. Supports manual start/stop, auto-start via session settings, and event listeners for recording state. Recordings are accessible via the CometChat Dashboard.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Start / Stop Recording

```typescript
CometChatCalls.startRecording();
CometChatCalls.stopRecording();
CometChatCalls.toggleRecording();
```

### Auto-Start Recording (SessionSettings)

```tsx
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    autoStartRecording: true,
    hideRecordingButton: false,  // show button (hidden by default)
  }}
/>
```

### Listen for Recording Events (Local)

```typescript
CometChatCalls.addEventListener('onRecordingStarted', () => {
  // Show recording indicator
});

CometChatCalls.addEventListener('onRecordingStopped', () => {
  // Hide recording indicator
});
```

### Track Participant Recording

```typescript
CometChatCalls.addEventListener('onParticipantStartedRecording', (participant) => {
  console.log(`${participant.name} started recording`);
});

CometChatCalls.addEventListener('onParticipantStoppedRecording', (participant) => {
  console.log(`${participant.name} stopped recording`);
});
```

### Custom Recording Button Example

```tsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function RecordButton() {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    const unsub1 = CometChatCalls.addEventListener('onRecordingStarted', () => setRecording(true));
    const unsub2 = CometChatCalls.addEventListener('onRecordingStopped', () => setRecording(false));
    return () => { unsub1(); unsub2(); };
  }, []);

  return (
    <TouchableOpacity onPress={() => CometChatCalls.toggleRecording()}>
      <Text>{recording ? '⏹ Stop Recording' : '⏺ Record'}</Text>
    </TouchableOpacity>
  );
}
```

## Gotchas

- Recording must be **enabled** in your CometChat Dashboard
- The recording button is **hidden by default** — use `hideRecordingButton: false` to show it
- All participants are notified when recording starts
- Recordings are stored server-side and available after the call ends
- `startRecording()` / `stopRecording()` only work during an active session
