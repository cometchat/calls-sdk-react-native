import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppConstants } from '../AppConstants';
import { initSDKs, login } from '../calls/session';
import Avatar from '../components/Avatar';
import { Button, Field } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

interface SampleUser {
  uid: string;
  name: string;
  avatar?: string;
}

export default function LoginScreen({ onEditCredentials }: { onEditCredentials: () => void }) {
  const theme = useTheme();
  const credentials = useAppStore(state => state.credentials);
  const [uid, setUid] = useState('');
  const [samples, setSamples] = useState<SampleUser[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(AppConstants.sampleUsersURL)
      .then(response => response.json())
      .then((json: any) => setSamples(json.users ?? []))
      .catch(() => setSamples([]));
  }, []);

  const signIn = async (value: string) => {
    setBusy(true);
    setError('');
    try {
      await initSDKs(credentials);
      await login(value.trim(), credentials);
    } catch (e: any) {
      setError(e?.errorDescription ?? e?.message ?? 'Could not log in');
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700' }}>Log in</Text>
        <Text style={{ color: theme.textSecondary }}>
          Use a different user on each device, then call one from the other.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {samples.map(sample => (
            <Pressable
              key={sample.uid}
              accessibilityRole="button"
              disabled={busy}
              onPress={() => signIn(sample.uid)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                padding: 8,
                borderRadius: 9,
                backgroundColor: theme.background2,
              }}
            >
              <Avatar name={sample.name} url={sample.avatar} size={28} />
              <Text style={{ color: theme.text }}>{sample.name}</Text>
            </Pressable>
          ))}
        </View>
        <Field label="UID" value={uid} onChangeText={setUid} />
        {!!error && <Text style={{ color: theme.error }}>{error}</Text>}
        <Button title="Continue" disabled={!uid.trim()} loading={busy} onPress={() => signIn(uid)} />
        <Button title="Change app credentials" secondary onPress={onEditCredentials} />
      </ScrollView>
    </SafeAreaView>
  );
}
