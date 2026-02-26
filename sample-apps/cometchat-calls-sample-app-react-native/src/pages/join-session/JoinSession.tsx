import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import Avatar from '../../components/Avatar';
import CometChatLogo from '../../components/CometChatLogo';
import { useAppStore } from '../../store/useAppStore';
import { getRandomMeetingId } from '../../utils/helpers';

interface JoinSessionProps {
  onNavigate: (screen: string) => void;
}

function JoinSession({ onNavigate }: JoinSessionProps) {
  const [sessionId, setSessionId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [inMeeting, setInMeeting] = useState(false);
  const [callToken, setCallToken] = useState<string | null>(null);
  const { user, clearUser, version } = useAppStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const cleanup = CometChatCalls.addEventListener('onConnectionClosed', () => {
      setInMeeting(false);
      setCallToken(null);
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (inMeeting && sessionId) {
      CometChatCalls.generateToken(sessionId).then(({ token }) => {
        console.log('token', token);
        setCallToken(token);
      });
    }
  }, [inMeeting, sessionId]);

  if (inMeeting && callToken) {
    return (
      <SafeAreaView style={styles.meetingContainer}>
        <CometChatCalls.Component callToken={callToken} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatarWrapper,
          { top: 16 + insets.top, right: 16 + insets.right },
        ]}
      >
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => setMenuOpen(prev => !prev)}
          activeOpacity={0.7}
        >
          <Avatar name={user?.name ?? ''} url={user?.avatar} size={45} />
        </TouchableOpacity>

        {menuOpen && (
          <>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setMenuOpen(false)}
            />
            <View style={styles.popupMenu}>
              <View style={styles.popupUserInfo}>
                <Avatar name={user?.name ?? ''} url={user?.avatar} size={32} />
                <Text style={styles.popupName}>{user?.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.popupItem}
                activeOpacity={0.7}
                onPress={async () => {
                  try {
                    await CometChatCalls.logout();
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                  clearUser();
                  onNavigate('Login');
                }}
              >
                <Text style={styles.popupLogoutIcon}>↪</Text>
                <Text style={styles.popupName}>Logout</Text>
              </TouchableOpacity>
              <View style={styles.popupFooter}>
                <Text style={styles.popupVersion}>V.{version}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      <CometChatLogo />

      <View style={styles.form}>
        <View style={styles.formContent}>
          <View style={styles.fields}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Enter Session Id</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Session ID"
                  placeholderTextColor="#858585"
                  value={sessionId}
                  onChangeText={setSessionId}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.joinButton,
              sessionId ? styles.joinButtonActive : {},
            ]}
            activeOpacity={0.7}
            disabled={!sessionId}
            onPress={() => setInMeeting(true)}
          >
            <Text style={styles.buttonText}>Join Meeting</Text>
          </TouchableOpacity>

          {!sessionId && (
            <>
              <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>Or</Text>
                <View style={styles.separatorLine} />
              </View>

              <TouchableOpacity
                style={styles.instantButton}
                activeOpacity={0.7}
                onPress={() => {
                  const meetingId = getRandomMeetingId();
                  setSessionId(meetingId);
                  setInMeeting(true);
                }}
              >
                <Text style={styles.buttonText}>Start Instant Meeting</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    backgroundColor: '#141414',
    padding: 10,
  },
  avatarWrapper: {
    position: 'absolute',
    zIndex: 10,
  },
  avatarButton: {
    width: 45,
    height: 45,
  },
  popupMenu: {
    position: 'absolute',
    top: 53,
    right: 0,
    width: 160,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#272727',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 20,
  },
  popupUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  popupLogoutIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  popupName: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
  popupFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#272727',
  },
  popupVersion: {
    fontSize: 14,
    color: '#989898',
  },
  logo: {
    width: 154,
    height: 30,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#383838',
    borderRadius: 20,
    padding: 28,
    paddingHorizontal: 40,
    gap: 20,
  },
  formContent: {
    gap: 20,
    width: '100%',
  },
  fields: {
    gap: 20,
    width: '100%',
  },
  fieldGroup: {
    gap: 4,
    width: '100%',
  },
  fieldLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: '#ffffff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
    width: '100%',
    height: 36,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#272727',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#f5f5f5',
    padding: 0,
  },
  joinButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 20,
    gap: 8,
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4c4c4c',
    borderRadius: 8,
  },
  joinButtonActive: {
    backgroundColor: '#8c78f0',
    borderColor: '#8c78f0',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#22262f',
  },
  separatorText: {
    fontSize: 12,
    color: '#94979c',
    textAlign: 'center',
  },
  instantButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 20,
    gap: 8,
    width: '100%',
    height: 40,
    backgroundColor: '#8c78f0',
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#ffffff',
  },
  meetingContainer: {
    flex: 1,
    backgroundColor: '#141414',
  },
});

export default JoinSession;
