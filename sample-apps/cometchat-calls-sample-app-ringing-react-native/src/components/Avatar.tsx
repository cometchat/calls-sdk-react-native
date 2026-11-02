import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme } from '../theme';

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('');

export default function Avatar({
  name,
  url,
  size = 40,
  online,
}: {
  name: string;
  url?: string;
  size?: number;
  online?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={{ width: size, height: size }}>
      {url ? (
        <Image
          source={{ uri: url }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: theme.onAccent, fontWeight: '700', fontSize: size * 0.36 }}>
            {initials(name)}
          </Text>
        </View>
      )}
      {online && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: size * 0.14,
            backgroundColor: theme.online,
            borderWidth: 2,
            borderColor: theme.background,
          }}
        />
      )}
    </View>
  );
}
