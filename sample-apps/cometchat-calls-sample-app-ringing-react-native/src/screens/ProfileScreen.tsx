import React, { useEffect, useState } from 'react';
import { BackHandler, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../calls/session';
import Avatar from '../components/Avatar';
import { Button, IconButton } from '../components/ui';
import { Appearance, useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';
import packageJson from '../../package.json';

const APPEARANCES: Appearance[] = ['system', 'light', 'dark'];

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  const theme = useTheme();
  const { user, credentials, appearance, setAppearance } = useAppStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  const row = (label: string, value: string) => (
    <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
      <Text style={{ color: theme.textSecondary }}>{label}</Text>
      <Text selectable numberOfLines={1} style={{ color: theme.text, flexShrink: 1 }}>
        {value}
      </Text>
    </View>
  );

  const signOut = async () => {
    setBusy(true);
    setError('');
    try {
      await logout();
    } catch (e: any) {
      setError(e?.message ?? 'Could not sign out. Check your connection and try again.');
      setBusy(false);
    }
  };

  const deps = packageJson.dependencies;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <IconButton name="back" label="Back" color={theme.text} onPress={onBack} />
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Avatar name={user?.name ?? ''} url={user?.avatar} size={72} />
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>{user?.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {APPEARANCES.map(item => (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: item === appearance }}
              onPress={() => setAppearance(item)}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 9,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item === appearance ? theme.accent : theme.background2,
              }}
            >
              <Text style={{ color: item === appearance ? theme.onAccent : theme.text }}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
        {row('UID', user?.uid ?? '')}
        {row('App ID', credentials.appId)}
        {row('Region', credentials.region)}
        {row('Push provider', credentials.pushProviderId)}
        {row('Calls SDK', deps['@cometchat/calls-sdk-react-native'])}
        {row('Chat SDK', deps['@cometchat/chat-sdk-react-native'])}
        {row('Push SDK', deps['@cometchat/push-notifications-voip-react-native'])}
        {!!error && <Text style={{ color: theme.error }}>{error}</Text>}
        <Button title="Sign out" danger loading={busy} onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
