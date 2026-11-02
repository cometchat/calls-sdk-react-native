import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import Avatar from '../components/Avatar';
import { EmptyState, Field, IconButton } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

const PAGE_SIZE = 30;

export default function UsersScreen() {
  const theme = useTheme();
  const me = useAppStore(state => state.user?.uid);
  const setOutgoing = useAppStore(state => state.setOutgoing);
  const [users, setUsers] = useState<CometChat.User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // A page that arrives after the list was reset is dropped: a slow page from an old keyword must
  // not replace the results for the new one.
  const generation = useRef(0);
  const request = useRef<CometChat.UsersRequest | null>(null);
  const hasMore = useRef(true);
  const inFlight = useRef(false);

  const loadMore = useCallback(() => {
    if (!request.current || !hasMore.current || inFlight.current) {
      return;
    }
    inFlight.current = true;
    setLoading(true);
    const current = generation.current;
    request.current
      .fetchNext()
      .then(page => {
        if (current !== generation.current) {
          return;
        }
        hasMore.current = page.length >= PAGE_SIZE;
        setUsers(list => [...list, ...page.filter(user => user.getUid() !== me)]);
      })
      .catch((e: any) => {
        if (current === generation.current) {
          hasMore.current = false;
          setError(e?.message ?? "Couldn't load users");
        }
      })
      .finally(() => {
        if (current === generation.current) {
          inFlight.current = false;
          setLoading(false);
        }
      });
  }, [me]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generation.current += 1;
      inFlight.current = false;
      hasMore.current = true;
      setUsers([]);
      setError('');
      const keyword = search.trim();
      const builder = new CometChat.UsersRequestBuilder().setLimit(PAGE_SIZE);
      request.current = (keyword ? builder.setSearchKeyword(keyword) : builder).build();
      loadMore();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, loadMore]);

  const call = (user: CometChat.User, callType: 'audio' | 'video') =>
    setOutgoing({
      receiverId: user.getUid(),
      receiverName: user.getName(),
      receiverAvatar: user.getAvatar(),
      receiverType: 'user',
      callType,
    });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Field label="Search" value={search} onChangeText={setSearch} />
      </View>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={users}
        keyExtractor={user => user.getUid()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ padding: 32 }} color={theme.accent} />
          ) : (
            <EmptyState text={error || 'No users'} />
          )
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
            <Avatar
              name={item.getName()}
              url={item.getAvatar()}
              online={item.getStatus() === 'online'}
            />
            <Text numberOfLines={1} style={{ flex: 1, color: theme.text, fontWeight: '500' }}>
              {item.getName()}
            </Text>
            <IconButton name="phone" label={`Voice call ${item.getName()}`} onPress={() => call(item, 'audio')} />
            <IconButton name="video" label={`Video call ${item.getName()}`} onPress={() => call(item, 'video')} />
          </View>
        )}
      />
    </View>
  );
}
