import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { useAppStore } from '../../store/useAppStore';
import CometChatLogo from '../../components/CometChatLogo';

interface SampleUser {
  name: string;
  uid: string;
  avatar: string;
}

const sampleUsers: SampleUser[] = [
  {
    name: 'Andrew Joseph',
    uid: 'cometchat-uid-1',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-1.webp',
  },
  {
    name: 'George Alan',
    uid: 'cometchat-uid-2',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-2.webp',
  },
  {
    name: 'Nancy Grace',
    uid: 'cometchat-uid-3',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-3.webp',
  },
  {
    name: 'Susan Marie',
    uid: 'cometchat-uid-4',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-4.webp',
  },
  {
    name: 'John Paul',
    uid: 'cometchat-uid-5',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-5.webp',
  },
];

interface LoginProps {
  onNavigate: (screen: string) => void;
}

function Login({ onNavigate }: LoginProps) {
  const [uidInput, setUidInput] = useState('cometchat-uid-1');
  const { user, setUser } = useAppStore();

  useEffect(() => {
    if (user) {
      onNavigate('JoinSession');
    }
  }, [user]);

  const handleLogin = () => {
    if (!uidInput.trim()) {
      return;
    }
    CometChatCalls.login(uidInput).then(loggedInUser => {
      setUser({
        uid: loggedInUser.uid,
        name: loggedInUser.name,
        avatar: loggedInUser.avatar,
      });
    });
  };

  const rows = [sampleUsers.slice(0, 3), sampleUsers.slice(3, 5)];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CometChatLogo />

      <View style={styles.form}>
        <View style={styles.usersSection}>
          <View style={styles.usersSectionInner}>
            <Text style={styles.title}>Sign in to CometChat</Text>
          </View>

          <View style={styles.usersGrid}>
            <Text style={styles.label}>Choose a Sample User</Text>
            {rows.map((row, rowIndex) => (
              <View style={styles.profileRow} key={rowIndex}>
                {row.map(sampleUser => {
                  const isSelected = uidInput === sampleUser.uid;
                  return (
                    <TouchableOpacity
                      key={sampleUser.uid}
                      style={[
                        styles.profileCard,
                        isSelected && styles.profileCardSelected,
                      ]}
                      onPress={() => setUidInput(sampleUser.uid)}
                      activeOpacity={0.7}
                    >
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Text style={styles.checkMark}>✓</Text>
                        </View>
                      )}
                      <View style={styles.avatar}>
                        <Image
                          source={{ uri: sampleUser.avatar }}
                          style={styles.avatarImage}
                        />
                      </View>
                      <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>
                          {sampleUser.name}
                        </Text>
                        <Text style={styles.profileUid}>{sampleUser.uid}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or</Text>
          <View style={styles.separatorLine} />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.fields}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Enter UID</Text>
              <View style={styles.fieldInputWrapper}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter UID here"
                  placeholderTextColor="#727272"
                  value={uidInput}
                  onChangeText={setUidInput}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.7}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate('Credentials')}>
              <Text style={styles.credentialsLink}>
                Change{' '}
                <Text style={styles.credentialsLinkSpan}>App Credentials</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    backgroundColor: '#141414',
    padding: 10,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    borderRadius: 20,
    padding: 28,
    paddingHorizontal: 40,
    gap: 28,
    overflow: 'hidden',
  },
  usersSection: {
    gap: 20,
  },
  usersSectionInner: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  usersGrid: {
    gap: 8,
    width: '100%',
  },
  label: {
    fontWeight: '500',
    fontSize: 12,
    color: '#e0e0e0',
  },
  profileRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  profileCard: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#232323',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    borderRadius: 8,
    position: 'relative',
  },
  profileCardSelected: {
    borderColor: '#6852d6',
  },
  checkBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: '#6852d6',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileInfo: {
    gap: 4,
    width: '100%',
    alignItems: 'center',
  },
  profileName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  profileUid: {
    fontSize: 12,
    color: '#a1a1a1',
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2d2d2d',
  },
  separatorText: {
    fontSize: 14,
    color: '#727272',
  },
  bottomSection: {
    gap: 20,
    width: '100%',
  },
  fields: {
    width: '100%',
  },
  fieldGroup: {
    gap: 2,
    width: '100%',
  },
  fieldLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: '#e0e0e0',
  },
  fieldInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
    padding: 8,
    backgroundColor: '#232323',
    borderWidth: 1,
    borderColor: '#2d2d2d',
    borderRadius: 8,
    marginTop: 4,
  },
  fieldInput: {
    flex: 1,
    fontSize: 14,
    color: '#f5f5f5',
    padding: 0,
  },
  buttonSection: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 40,
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: '#6852d6',
    borderRadius: 8,
  },
  loginButtonText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#f9f8fd',
  },
  credentialsLink: {
    fontSize: 14,
    color: '#727272',
    textAlign: 'center',
  },
  credentialsLinkSpan: {
    color: '#6852d6',
  },
});

export default Login;
