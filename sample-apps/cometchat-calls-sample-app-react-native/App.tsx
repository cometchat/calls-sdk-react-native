import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import Login from './src/pages/login/Login';
import JoinSession from './src/pages/join-session/JoinSession';
import Credentials from './src/pages/credentials/Credentials';
import { useAppStore } from './src/store/useAppStore';

type Screen = 'Login' | 'JoinSession' | 'Credentials';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Login');
  const credentials = useAppStore(state => state.credentials);
  const setUser = useAppStore(state => state.setUser);
  const clearUser = useAppStore(state => state.clearUser);

  useEffect(() => {
    const initCometChatCalls = async () => {
      const { appId, region, authKey } = credentials;

      if (!appId || !region || !authKey) {
        return;
      }

      const { error } = await CometChatCalls.init({
        appId,
        region,
        authKey,
      });

      if (error) {
        console.error('CometChatCalls initialization failed:', error);
      } else {
        console.log('CometChatCalls initialized successfully');
      }
    };

    initCometChatCalls();
  }, [credentials]);

  useEffect(() => {
    const user = CometChatCalls.getLoggedInUser();
    if (user) {
      setUser(user);
    } else {
      clearUser();
    }
  }, [currentScreen]);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      {currentScreen === 'Login' && <Login onNavigate={handleNavigate} />}
      {currentScreen === 'JoinSession' && (
        <JoinSession onNavigate={handleNavigate} />
      )}
      {currentScreen === 'Credentials' && (
        <Credentials onNavigate={handleNavigate} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
