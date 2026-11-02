import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, Pressable, Text, View } from 'react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import { Button, EmptyState, IconButton } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

/** "Ada, Ben, Cy" or "Ada, Ben, Cy +2". */
export function groupName(names: string[]): string {
  const clean = names.map(name => name.trim()).filter(Boolean);
  if (clean.length === 0) {
    return 'Group call';
  }
  const head = clean.slice(0, 3).join(', ');
  return clean.length > 3 ? `${head} +${clean.length - 3}` : head;
}

/**
 * Creates a private group and adds the members. They are added in a second call so a member who
 * cannot be added does not stop the group from being created.
 */
async function createGroup(members: CometChat.User[]): Promise<CometChat.Group> {
  const guid = `grp-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  const name = groupName(members.map(member => member.getName()));
  const created = (await CometChat.createGroup(
    new CometChat.Group(guid, name, CometChat.GROUP_TYPE.PRIVATE),
  )) as CometChat.Group;
  await CometChat.addMembersToGroup(
    guid,
    members.map(
      member => new CometChat.GroupMember(member.getUid(), CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
    ),
    [],
  ).catch(error => console.warn('[NewGroupCall] Adding members failed', error));
  return created;
}

export default function NewGroupCallScreen({ onBack }: { onBack: () => void }) {
  const theme = useTheme();
  const me = useAppStore(state => state.user?.uid);
  const setOutgoing = useAppStore(state => state.setOutgoing);
  const [users, setUsers] = useState<CometChat.User[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  useEffect(() => {
    new CometChat.UsersRequestBuilder()
      .setLimit(50)
      .build()
      .fetchNext()
      .then(page => setUsers(page.filter(user => user.getUid() !== me)))
      .catch((e: any) => setError(e?.message ?? "Couldn't load users"));
  }, [me]);

  const toggle = (uid: string) =>
    setPicked(current => {
      const next = new Set(current);
      if (!next.delete(uid)) {
        next.add(uid);
      }
      return next;
    });

  const ring = async (callType: 'audio' | 'video') => {
    setBusy(true);
    setError('');
    try {
      const group = await createGroup(users.filter(user => picked.has(user.getUid())));
      setOutgoing({
        receiverId: group.getGuid(),
        receiverName: group.getName(),
        receiverType: 'group',
        callType,
      });
    } catch (e: any) {
      setError(e?.message ?? "Couldn't create the group");
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }}>
        <IconButton name="back" label="Back" color={theme.text} onPress={onBack} />
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>New group call</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={user => user.getUid()}
        ListEmptyComponent={<EmptyState text={error || 'No users'} />}
        renderItem={({ item }) => {
          const selected = picked.has(item.getUid());
          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() => toggle(item.getUid())}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}
            >
              <Avatar name={item.getName()} url={item.getAvatar()} />
              <Text numberOfLines={1} style={{ flex: 1, color: theme.text, fontWeight: '500' }}>
                {item.getName()}
              </Text>
              {selected && <Icon name="check" color={theme.accent} />}
            </Pressable>
          );
        }}
      />
      {!!error && users.length > 0 && (
        <Text style={{ color: theme.error, paddingHorizontal: 16 }}>{error}</Text>
      )}
      <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
        <View style={{ flex: 1 }}>
          <Button title="Voice" disabled={picked.size === 0} loading={busy} onPress={() => ring('audio')} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Video" disabled={picked.size === 0} loading={busy} onPress={() => ring('video')} />
        </View>
      </View>
    </View>
  );
}
