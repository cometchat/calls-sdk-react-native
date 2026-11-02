import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { CometChatVoipNotifications } from '@cometchat/push-notifications-voip-react-native';
import { ActiveCall, useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

/**
 * Both sides join the same way. `connect` hands back the session already prepared for this call
 * without minting a second token, so the join is near-instant. The end of the call comes from
 * the session: `CometChatCalls.Component` has no event props.
 */
export default function CallScreen({ call }: { call: ActiveCall }) {
  const theme = useTheme();
  const setActiveCall = useAppStore(state => state.setActiveCall);
  const [callToken, setCallToken] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const { sessionId, callType } = call;
    const offs: Array<() => void> = [];
    let ended = false;
    let unmounted = false;

    const end = () => {
      if (ended) {
        return;
      }
      ended = true;
      // CallKit keeps its status bar up, and the signalling session stays busy, until told.
      CometChatVoipNotifications.reportCallEnded(sessionId, 'ended');
      CometChatVoipNotifications.endCallUI(sessionId);
      setActiveCall(null);
    };

    (async () => {
      try {
        const session = await CometChatCalls.connect(sessionId, {
          // From the call, never hardcoded: a video call joined as VOICE has no camera.
          sessionType: callType === 'video' ? 'VIDEO' : 'VOICE',
        });
        if (unmounted) {
          return;
        }
        offs.push(
          session.addEventListener('onSessionLeft', end),
          session.addEventListener('onConnectionClosed', end),
        );
        setCallToken(session.callToken);
      } catch (error) {
        console.warn('[CallScreen] Could not join', error);
        setFailed(true);
        setTimeout(end, 1500);
      }
    })();

    return () => {
      unmounted = true;
      offs.forEach(off => off());
    };
  }, [call, setActiveCall]);

  if (!callToken) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}
      >
        {failed ? (
          <Text style={{ color: theme.error }}>Could not join the call</Text>
        ) : (
          <View style={{ alignItems: 'center', gap: 12 }}>
            <ActivityIndicator color={theme.accent} />
            <Text style={{ color: theme.textSecondary }}>Connecting…</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <CometChatCalls.Component callToken={callToken} />
    </SafeAreaView>
  );
}
