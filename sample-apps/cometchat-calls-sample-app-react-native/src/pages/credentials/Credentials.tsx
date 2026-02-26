import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppStore, Region } from '../../store/useAppStore';
import CometChatLogo from '../../components/CometChatLogo';

const regions: { key: Region; label: string; emoji: string }[] = [
  { key: 'US', label: 'US', emoji: '🇺🇸' },
  { key: 'EU', label: 'EU', emoji: '🇪🇺' },
  { key: 'IN', label: 'IN', emoji: '🇮🇳' },
];

interface CredentialsProps {
  onNavigate: (screen: string) => void;
}

function Credentials({ onNavigate }: CredentialsProps) {
  const { setCredentials } = useAppStore();
  const [selectedRegion, setSelectedRegion] = useState<Region>('US');
  const [appId, setAppId] = useState('');
  const [authKey, setAuthKey] = useState('');

  return (
    <View style={styles.container}>
      <CometChatLogo />

      <View style={styles.form}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>App Credentials</Text>
        </View>

        <View style={styles.formContent}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Region</Text>
            <View style={styles.regionRow}>
              {regions.map(region => {
                const isSelected = selectedRegion === region.key;
                return (
                  <TouchableOpacity
                    key={region.key}
                    style={[
                      styles.regionButton,
                      isSelected && styles.regionButtonSelected,
                    ]}
                    onPress={() => setSelectedRegion(region.key)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.flagIcon}>{region.emoji}</Text>
                    <Text style={styles.regionLabel}>{region.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>App ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter the app ID"
                placeholderTextColor="#858585"
                value={appId}
                onChangeText={setAppId}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Auth Key</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter the Auth Key"
                placeholderTextColor="#858585"
                value={authKey}
                onChangeText={setAuthKey}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.7}
            onPress={() => {
              setCredentials({
                region: selectedRegion,
                appId,
                authKey,
              });
              onNavigate('Login');
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#4c4c4c',
    borderRadius: 20,
    padding: 28,
    paddingHorizontal: 40,
    gap: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  formContent: {
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
  regionRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  regionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    gap: 4,
    height: 40,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#383838',
    borderRadius: 8,
  },
  regionButtonSelected: {
    backgroundColor: '#15102b',
    borderColor: '#6852d6',
  },
  flagIcon: {
    fontSize: 16,
  },
  regionLabel: {
    fontWeight: '500',
    fontSize: 14,
    color: '#989898',
    textAlign: 'center',
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
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 20,
    gap: 8,
    width: '100%',
    height: 40,
    backgroundColor: '#6852d6',
    borderRadius: 8,
  },
  continueButtonText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#ffffff',
  },
});

export default Credentials;
