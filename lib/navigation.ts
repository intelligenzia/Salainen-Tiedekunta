import { useColors } from '@/lib/stores/theme';
import type { NativeStackNavigationOptions } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

/**
 * Shared native-stack header styling. Web renders its own header, so stacks
 * hide theirs there. `large` enables iOS large titles for tab roots.
 */
export function useStackOptions(large = false): NativeStackNavigationOptions {
  const colors = useColors();

  return {
    headerShown: !isWeb,
    headerTintColor: colors.accent,
    headerTitleStyle: { color: colors.foreground },
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal',
    headerTransparent: Platform.OS === 'ios',
    headerStyle: Platform.OS === 'ios' ? undefined : { backgroundColor: colors.background },
    contentStyle: { backgroundColor: colors.background },
    ...(large && {
      headerLargeTitle: true,
      headerLargeStyle: { backgroundColor: 'transparent' },
      headerLargeTitleShadowVisible: false,
      headerLargeTitleStyle: { color: colors.foreground },
    }),
  };
}
