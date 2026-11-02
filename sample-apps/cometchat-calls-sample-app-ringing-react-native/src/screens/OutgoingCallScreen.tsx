import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOutgoingCall } from '../calls/useOutgoingCall';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import { OutgoingRequest } from '../store/useAppStore';
import { useTheme } from '../theme';

export default function OutgoingCallScreen({ request }: { request: OutgoingRequest }) {
  const theme = useTheme();
  const { statusText, canCancel, cancel } = useOutgoingCall(request);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 32,
        backgroundColor: theme.background,
      }}
    >
      <View style={{ alignItems: 'center', gap: 12, marginTop: 64 }}>
        <Avatar name={request.receiverName} url={request.receiverAvatar} size={96} />
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700' }}>
          {request.receiverName}
        </Text>
        <Text accessibilityLiveRegion="polite" style={{ color: theme.textSecondary }}>
          {statusText}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="End call"
        disabled={!canCancel}
        onPress={cancel}
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.error,
          opacity: canCancel ? 1 : 0.5,
          marginBottom: 32,
        }}
      >
        <View style={{ transform: [{ rotate: '135deg' }] }}>
          <Icon name="phone" color={theme.onAccent} size={28} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
