import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initSDKs, restoreSession } from './src/calls/session';
import CallScreen from './src/screens/CallScreen';
import CredentialsScreen from './src/screens/CredentialsScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import OutgoingCallScreen from './src/screens/OutgoingCallScreen';
import { hasCredentials, useAppStore } from './src/store/useAppStore';
import { useTheme } from './src/theme';

function Root() {
  const theme = useTheme();
  const hydrated = useAppStore(state => state.hydrated);
  const credentials = useAppStore(state => state.credentials);
  const user = useAppStore(state => state.user);
  const activeCall = useAppStore(state => state.activeCall);
  const outgoing = useAppStore(state => state.outgoing);
  const [booted, setBooted] = useState(false);
  const [editingCredentials, setEditingCredentials] = useState(false);
  const configured = hasCredentials(credentials);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!configured) {
      setBooted(true);
      return;
    }
    setBooted(false);
    initSDKs(credentials)
      .then(() => restoreSession(credentials))
      .catch(error => console.warn('[App] Could not start the SDKs', error))
      .finally(() => setBooted(true));
  }, [hydrated, configured, credentials]);

  if (!hydrated || !booted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }
  if (!configured || editingCredentials) {
    return (
      <CredentialsScreen
        onDone={configured ? () => setEditingCredentials(false) : undefined}
        onSaved={() => setEditingCredentials(false)}
      />
    );
  }
  if (activeCall) {
    return <CallScreen call={activeCall} />;
  }
  if (outgoing) {
    return <OutgoingCallScreen request={outgoing} />;
  }
  if (!user) {
    return <LoginScreen onEditCredentials={() => setEditingCredentials(true)} />;
  }
  return <HomeScreen />;
}

function Bar() {
  const theme = useTheme();
  return (
    <StatusBar
      barStyle={theme.isDark ? 'light-content' : 'dark-content'}
      backgroundColor={theme.background}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Bar />
      <Root />
    </SafeAreaProvider>
  );
}
