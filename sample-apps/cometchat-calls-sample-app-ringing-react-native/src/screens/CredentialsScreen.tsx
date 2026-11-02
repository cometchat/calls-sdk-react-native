import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Field } from '../components/ui';
import { Region, useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

const REGIONS: Region[] = ['US', 'EU', 'IN'];
const PROVIDER_LABEL = Platform.OS === 'android' ? 'FCM Provider ID' : 'APNs Provider ID';

export default function CredentialsScreen({
  onDone,
  onSaved,
}: {
  onDone?: () => void;
  onSaved: () => void;
}) {
  const theme = useTheme();
  const { credentials, setCredentials } = useAppStore();
  const [appId, setAppId] = useState(credentials.appId);
  const [authKey, setAuthKey] = useState(credentials.authKey);
  const [region, setRegion] = useState(credentials.region);
  const [pushProviderId, setPushProviderId] = useState(credentials.pushProviderId);
  const complete = Boolean(appId.trim() && authKey.trim() && pushProviderId.trim());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700' }}>App credentials</Text>
        <Text style={{ color: theme.textSecondary }}>
          From your app in the CometChat dashboard. The provider ID is under Notifications → Push.
        </Text>
        <Field label="App ID" value={appId} onChangeText={setAppId} />
        <Field label="Auth Key" value={authKey} onChangeText={setAuthKey} />
        <View style={{ gap: 6 }}>
          <Text style={{ color: theme.textSecondary, fontSize: 13, fontWeight: '500' }}>Region</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {REGIONS.map(item => (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected: item === region }}
                onPress={() => setRegion(item)}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 9,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item === region ? theme.accent : theme.background2,
                }}
              >
                <Text style={{ color: item === region ? theme.onAccent : theme.text }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Field label={PROVIDER_LABEL} value={pushProviderId} onChangeText={setPushProviderId} />
        <Button
          title="Save"
          disabled={!complete}
          onPress={() => {
            setCredentials({
              appId: appId.trim(),
              authKey: authKey.trim(),
              region,
              pushProviderId: pushProviderId.trim(),
            });
            onSaved();
          }}
        />
        {onDone && <Button title="Cancel" secondary onPress={onDone} />}
      </ScrollView>
    </SafeAreaView>
  );
}
