import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon, { IconName } from './Icon';
import { useTheme } from '../theme';

export function Button({
  title,
  onPress,
  disabled,
  loading,
  danger,
  secondary,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  secondary?: boolean;
}) {
  const theme = useTheme();
  const background = danger ? theme.error : secondary ? theme.background2 : theme.accent;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        height: 46,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: background,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? theme.text : theme.onAccent} />
      ) : (
        <Text style={{ color: secondary ? theme.text : theme.onAccent, fontWeight: '600' }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const theme = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: theme.textSecondary, fontSize: 13, fontWeight: '500' }}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={theme.textTertiary}
        {...props}
        style={{
          height: 44,
          borderRadius: 9,
          paddingHorizontal: 12,
          color: theme.text,
          backgroundColor: theme.background2,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      />
    </View>
  );
}

export function IconButton({
  name,
  label,
  onPress,
  disabled,
  color,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      disabled={disabled}
      onPress={onPress}
      style={{
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 19,
        backgroundColor: theme.background2,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Icon name={name} color={color ?? theme.accent} size={20} />
    </Pressable>
  );
}

export function EmptyState({ text }: { text: string }) {
  const theme = useTheme();
  return (
    <View style={{ padding: 32, alignItems: 'center' }}>
      <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>{text}</Text>
    </View>
  );
}
