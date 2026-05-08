---
name: join-session
description: Join a CometChat call session using CometChatCalls.Component with callToken and sessionSettings. Use when joining calls, rendering the call UI, voice vs video calls, or generating tokens. Triggers on "join session", "join call", "start call", "CometChatCalls.Component", "callToken".
inclusion: manual
---

# CometChat Calls SDK v5 — Join Session (React Native)

## Overview

Join a call session by rendering `<CometChatCalls.Component>` with a call token and optional session settings. The component handles connection, media, and the full call UI.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Generate Token + Render Component

```tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function CallScreen({ sessionId }: { sessionId: string }) {
  const [callToken, setCallToken] = useState<string | null>(null);

  useEffect(() => {
    CometChatCalls.generateToken(sessionId).then(({ token }) => {
      setCallToken(token);
    });
  }, [sessionId]);

  if (!callToken) return null;

  return (
    <View style={styles.container}>
      <CometChatCalls.Component
        callToken={callToken}
        sessionSettings={{
          sessionType: 'VIDEO',
          layout: 'TILE',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### Voice Call vs Video Call

```tsx
// Video call
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    sessionType: 'VIDEO',
    layout: 'TILE',
    startVideoPaused: false,
  }}
/>

// Voice call
<CometChatCalls.Component
  callToken={callToken}
  sessionSettings={{
    sessionType: 'VOICE',
    layout: 'SPOTLIGHT',
    startVideoPaused: true,
  }}
/>
```

### Handle Session End

```tsx
useEffect(() => {
  const cleanup = CometChatCalls.addEventListener('onConnectionClosed', () => {
    // Navigate away from call screen
    navigation.goBack();
  });
  return () => cleanup();
}, []);
```

### Leave Session

```typescript
CometChatCalls.leaveSession();
```

### End Session for All

```typescript
CometChatCalls.endSessionForAll();
```

## Gotchas

- The `<CometChatCalls.Component>` must be rendered in a container with `flex: 1` or explicit dimensions
- All participants must use the **same session ID** to join the same call
- `sessionType` values are `'VIDEO'` and `'VOICE'` (not "AUDIO")
- `generateToken()` requires the user to be logged in — it uses the cached auth token
- The component handles token verification, connection, and UI rendering internally
- When the component unmounts, the session is cleaned up automatically
- Listen for `onConnectionClosed` to know when to navigate away from the call screen
