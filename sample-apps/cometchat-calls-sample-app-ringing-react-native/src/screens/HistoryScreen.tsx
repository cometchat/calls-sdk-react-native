import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import Avatar from '../components/Avatar';
import { Button, EmptyState, IconButton } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

type Log = InstanceType<typeof CometChatCalls.CallLog>;

/** The other side of a call: the group, or whichever user is not this one. */
function peerOf(log: Log, me?: string) {
  const receiver: any = log.getReceiver();
  const initiator: any = log.getInitiator();
  if (log.getReceiverType() === 'group') {
    return { id: receiver.getGuid?.() ?? '', name: receiver.getName?.() ?? 'Group', avatar: receiver.getIcon?.() };
  }
  const other = initiator?.getUid?.() === me ? receiver : initiator;
  return { id: other?.getUid?.() ?? '', name: other?.getName?.() ?? 'Unknown', avatar: other?.getAvatar?.() };
}

const title = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

function describe(log: Log): string {
  const kind = log.getReceiverType() === 'group' ? 'Group' : title(log.getType());
  return `${kind} · ${title(log.getStatus())}`;
}

function Details({ log, onBack }: { log: Log; onBack: () => void }) {
  const theme = useTheme();
  const me = useAppStore(state => state.user?.uid);
  const setOutgoing = useAppStore(state => state.setOutgoing);
  const peer = peerOf(log, me);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <IconButton name="back" label="Back" color={theme.text} onPress={onBack} />
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Avatar name={peer.name} url={peer.avatar} size={72} />
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>{peer.name}</Text>
        <Text style={{ color: theme.textSecondary }}>{describe(log)}</Text>
        <Text style={{ color: theme.textSecondary }}>
          {new Date(log.getInitiatedAt() * 1000).toLocaleString()} · {log.getTotalDuration() || '00:00'}
        </Text>
      </View>
      <Text style={{ color: theme.textSecondary, fontWeight: '600' }}>Participants</Text>
      {log.getParticipants().map((participant: any, index) => (
        <Text key={participant.getUid?.() ?? index} style={{ color: theme.text }}>
          {participant.getName?.() ?? participant.getUid?.()}
        </Text>
      ))}
      <Button
        title={log.getReceiverType() === 'group' ? 'Ring the group again' : 'Call back'}
        disabled={!peer.id}
        onPress={() =>
          setOutgoing({
            receiverId: peer.id,
            receiverName: peer.name,
            receiverAvatar: peer.avatar,
            receiverType: log.getReceiverType() === 'group' ? 'group' : 'user',
            callType: log.getType() === 'video' ? 'video' : 'audio',
          })
        }
      />
    </ScrollView>
  );
}

export default function HistoryScreen() {
  const theme = useTheme();
  const me = useAppStore(state => state.user?.uid);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Log | null>(null);
  const request = useRef<ReturnType<InstanceType<typeof CometChatCalls.CallLogRequestBuilder>['build']> | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const authToken = CometChatCalls.getUserAuthToken();
      if (!authToken) {
        throw new Error('Not logged in');
      }
      request.current = new CometChatCalls.CallLogRequestBuilder()
        .setLimit(30)
        .setAuthToken(authToken)
        .build();
      setLogs(await request.current.fetchNext());
    } catch (e: any) {
      setError(e?.message ?? "Couldn't load your calls");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (selected) {
    return <Details log={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <FlatList
      data={logs}
      keyExtractor={log => log.getSessionID()}
      refreshing={loading}
      onRefresh={refresh}
      onEndReached={() => {
        request.current
          ?.fetchNext()
          .then(page => setLogs(list => [...list, ...page]))
          .catch(() => {});
      }}
      ListEmptyComponent={loading ? null : <EmptyState text={error || 'No calls yet'} />}
      renderItem={({ item }) => {
        const peer = peerOf(item, me);
        return (
          <Pressable
            accessibilityRole="button"
            onPress={() => setSelected(item)}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}
          >
            <Avatar name={peer.name} url={peer.avatar} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ color: theme.text, fontWeight: '500' }}>
                {peer.name}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{describe(item)}</Text>
            </View>
            <Text style={{ color: theme.textTertiary, fontSize: 12 }}>
              {item.getTotalDuration() || ''}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}
