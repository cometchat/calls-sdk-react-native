import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import { EmptyState, IconButton } from '../components/ui';
import NewGroupCallScreen from './NewGroupCallScreen';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

export default function GroupsScreen() {
  const theme = useTheme();
  const setOutgoing = useAppStore(state => state.setOutgoing);
  const [groups, setGroups] = useState<CometChat.Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    new CometChat.GroupsRequestBuilder()
      .setLimit(50)
      .joinedOnly(true)
      .build()
      .fetchNext()
      .then(setGroups)
      .catch((e: any) => setError(e?.message ?? "Couldn't load groups"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const call = (group: CometChat.Group, callType: 'audio' | 'video') =>
    setOutgoing({
      receiverId: group.getGuid(),
      receiverName: group.getName(),
      receiverAvatar: group.getIcon(),
      receiverType: 'group',
      callType,
    });

  if (creating) {
    return <NewGroupCallScreen onBack={() => setCreating(false)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={groups}
        keyExtractor={group => group.getGuid()}
        refreshing={loading}
        onRefresh={load}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ padding: 32 }} color={theme.accent} />
          ) : (
            <EmptyState text={error || 'No groups yet. Tap + to ring a new group.'} />
          )
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
            <Avatar name={item.getName()} url={item.getIcon()} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ color: theme.text, fontWeight: '500' }}>
                {item.getName()}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                {item.getMembersCount()} members
              </Text>
            </View>
            <IconButton name="phone" label={`Voice call ${item.getName()}`} onPress={() => call(item, 'audio')} />
            <IconButton name="video" label={`Video call ${item.getName()}`} onPress={() => call(item, 'video')} />
          </View>
        )}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="New group call"
        onPress={() => setCreating(true)}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          width: 52,
          height: 52,
          borderRadius: 26,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.accent,
        }}
      >
        <Icon name="plus" color={theme.onAccent} />
      </Pressable>
    </View>
  );
}
