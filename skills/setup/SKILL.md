---
name: setup
description: Set up CometChat Calls SDK v5 for React Native. Use when installing the SDK, configuring app settings, calling init, login, or setting up platform permissions. Triggers on "setup calls sdk", "install cometchat", "initialize calls", "npm install", "login calls sdk", "Info.plist", "AndroidManifest".
inclusion: manual
---

# CometChat Calls SDK v5 — Setup (React Native)

## Overview

Install and initialize the CometChat Calls SDK v5 in a React Native project. Covers npm installation, platform configuration, `CometChatCalls.init()`, authentication with `login()` or `loginWithAuthToken()`, and native permissions.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
```

## Implementation

### 1. Install the Package

```bash
npm install @cometchat/calls-sdk-react-native@latest
```

### 2. iOS Setup

Install CocoaPods:

```bash
cd ios && pod install && cd ..
```

Add to `ios/YourApp/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for video calls</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for voice and video calls</string>
```

### 3. Android Setup

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```

### 4. Initialize the SDK

```typescript
const result = await CometChatCalls.init({
  appId: 'YOUR_APP_ID',
  region: 'us', // 'us' | 'eu' | 'in'
  authKey: 'YOUR_AUTH_KEY', // optional, can pass to login() instead
});

if (result.success) {
  console.log('Calls SDK initialized');
} else {
  console.error('Init failed:', result.error.message);
}
```

### 5. Login with UID + Auth Key (Development Only)

```typescript
try {
  const user = await CometChatCalls.login('USER_UID', 'AUTH_KEY');
  console.log('Logged in:', user.name);
} catch (error) {
  console.error('Login failed:', error.errorDescription);
}
```

If `authKey` was provided in `init()`, you can omit it from `login()`:

```typescript
const user = await CometChatCalls.login('USER_UID');
```

### 6. Login with Auth Token (Production)

```typescript
try {
  const user = await CometChatCalls.loginWithAuthToken('AUTH_TOKEN');
  console.log('Logged in:', user.name);
} catch (error) {
  console.error('Login failed:', error.errorDescription);
}
```

### 7. Check Login State

```typescript
const user = CometChatCalls.getLoggedInUser();
if (user) {
  console.log('Already logged in as:', user.name);
}

if (CometChatCalls.isUserLoggedIn()) {
  // ready to join sessions
}
```

### 8. Logout

```typescript
await CometChatCalls.logout();
```

### 9. Login Listeners (Optional)

```typescript
CometChatCalls.addLoginListener('my-listener', {
  onLoginSuccess: (user) => console.log('Login success:', user.name),
  onLoginFailure: (error) => console.error('Login failed:', error.errorDescription),
  onLogoutSuccess: () => console.log('Logged out'),
  onLogoutFailure: (error) => console.error('Logout failed:', error.errorDescription),
});

// Remove when done
CometChatCalls.removeLoginListener('my-listener');
```

## Gotchas

- Call `init()` before any other SDK method — typically in your app's root component or entry point
- `init()` returns `{ success, error }` — it does not throw
- `login()` and `loginWithAuthToken()` throw on failure — use try/catch
- Auth Key login is for development only — use Auth Token in production
- The SDK persists login state in `AsyncStorage` — users stay logged in across app restarts
- If using both Chat SDK and Calls SDK, initialize and login to both separately
- On Android, you must request runtime permissions (`PermissionsAndroid`) before joining a session
- `region` accepts both lowercase (`'us'`) and uppercase (`'US'`)

## Sample App Reference

- `sample-apps/cometchat-calls-sample-app-react-native/` — React Native CLI sample with init + login flow
