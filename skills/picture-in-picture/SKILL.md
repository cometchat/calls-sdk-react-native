---
name: picture-in-picture
description: Enable Picture-in-Picture mode for calls in React Native. Use when implementing PiP, floating call window, or minimized call view. Triggers on "picture in picture", "PiP", "pip mode", "floating window", "enablePictureInPictureLayout".
inclusion: manual
---

# CometChat Calls SDK v5 — Picture-in-Picture (React Native)

## Overview

PiP lets users continue calls in a compact view while navigating other parts of your app. The SDK adjusts the call UI layout to fit the smaller view. Your app manages when to enable/disable PiP.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### Enable / Disable PiP Layout

```typescript
// Tell SDK to adjust UI for PiP (compact layout, hide controls)
CometChatCalls.enablePictureInPictureLayout();

// Restore full UI
CometChatCalls.disablePictureInPictureLayout();
```

### Listen for PiP Events

```typescript
CometChatCalls.addEventListener('onPictureInPictureLayoutEnabled', () => {
  // Hide custom overlays/controls that won't fit in PiP
});

CometChatCalls.addEventListener('onPictureInPictureLayoutDisabled', () => {
  // Show custom overlays/controls again
});
```

### In-App PiP Example

Render the call component in a small floating view when the user navigates away:

```tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';

function CallWithPiP({ callToken, isPiP }: { callToken: string; isPiP: boolean }) {
  useEffect(() => {
    if (isPiP) {
      CometChatCalls.enablePictureInPictureLayout();
    } else {
      CometChatCalls.disablePictureInPictureLayout();
    }
  }, [isPiP]);

  return (
    <View style={isPiP ? styles.pip : styles.fullscreen}>
      <CometChatCalls.Component
        callToken={callToken}
        sessionSettings={{ sessionType: 'VIDEO' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: { flex: 1 },
  pip: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
```

### Android Native PiP

For true OS-level PiP on Android, configure your activity in `AndroidManifest.xml`:

```xml
<activity
    android:name=".MainActivity"
    android:supportsPictureInPicture="true"
    android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation" />
```

Then handle PiP mode changes in your native Android code or via a React Native PiP library, calling `enablePictureInPictureLayout()` when entering PiP.

## Gotchas

- The SDK only adjusts the **call UI layout** — your app decides when to enter/exit PiP
- `enablePictureInPictureLayout()` hides controls and optimizes the layout for a small view
- Always call `disablePictureInPictureLayout()` when returning to full screen
- On iOS, there's no system-level PiP for in-app views — implement it as a small floating `View`
- On Android, native PiP requires API 26+ and manifest configuration
- Hide any custom overlays when PiP is enabled — they won't be usable in the small window
