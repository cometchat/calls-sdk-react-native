import { useColorScheme } from 'react-native';
import { useAppStore } from './store/useAppStore';

const light = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  background2: '#F5F5F5',
  background3: '#ECECEC',
  border: '#ECECEC',
  accent: '#6D5DF6',
  accentSoft: 'rgba(109, 93, 246, 0.08)',
  text: '#181A20',
  textSecondary: '#7E7E7E',
  textTertiary: '#9E9E9E',
  online: '#2EB57D',
  error: '#D9235E',
  onAccent: '#FFFFFF',
};

export type Theme = typeof light;

const dark: Theme = {
  background: '#1A1D21',
  card: '#222529',
  background2: '#26282C',
  background3: '#2C2D30',
  border: '#35373B',
  accent: '#6D5DF6',
  accentSoft: 'rgba(109, 93, 246, 0.08)',
  text: '#D1D2D3',
  textSecondary: '#9A9B9D',
  textTertiary: '#6E6F71',
  online: '#2BAC76',
  error: '#E01E5A',
  onAccent: '#FFFFFF',
};

export function useTheme(): Theme & { isDark: boolean } {
  const system = useColorScheme();
  const appearance = useAppStore(state => state.appearance);
  const isDark = appearance === 'system' ? system === 'dark' : appearance === 'dark';
  return { ...(isDark ? dark : light), isDark };
}
