import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import GroupsScreen from './GroupsScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import UsersScreen from './UsersScreen';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme';

type Tab = 'Users' | 'Groups' | 'History';
const TABS: Tab[] = ['Users', 'Groups', 'History'];

export default function HomeScreen() {
  const theme = useTheme();
  const user = useAppStore(state => state.user);
  const [tab, setTab] = useState<Tab>('Users');
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) {
    return <ProfileScreen onBack={() => setShowProfile(false)} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: theme.text, fontSize: 22, fontWeight: '700' }}>{tab}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() => setShowProfile(true)}
        >
          <Avatar name={user?.name ?? ''} url={user?.avatar} size={36} />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {tab === 'Users' && <UsersScreen />}
        {tab === 'Groups' && <GroupsScreen />}
        {tab === 'History' && <HistoryScreen />}
      </View>
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: theme.border }}>
        {TABS.map(item => (
          <Pressable
            key={item}
            accessibilityRole="tab"
            accessibilityState={{ selected: item === tab }}
            onPress={() => setTab(item)}
            style={{ flex: 1, paddingVertical: 14, alignItems: 'center' }}
          >
            <Text
              style={{
                color: item === tab ? theme.accent : theme.textSecondary,
                fontWeight: item === tab ? '700' : '500',
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
