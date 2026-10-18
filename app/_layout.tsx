import '../global.css';

import { ClearanceGate } from '@/components/ClearanceGate';
import { WebHeader } from '@/components/WebHeader';
import { hasClearance } from '@/lib/clearance';
import { useStackOptions } from '@/lib/navigation';
import { FavoritesProvider } from '@/lib/stores/favorites';
import { LanguageProvider } from '@/lib/stores/language';
import { ThemeProvider, useTheme } from '@/lib/stores/theme';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const isWeb = Platform.OS === 'web';

SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: (failureCount, error: any) => {
        // Don't retry client errors
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

const detailScreens = ['courses/[id]', 'majors/[slug]', 'teachers/[slug]'] as const;

const legalScreens = [
  { name: 'privacy', title: 'Tietosuoja' },
  { name: 'terms', title: 'Käyttöehdot' },
  { name: 'license', title: 'Lisenssi' },
  { name: 'copyright', title: 'Tekijänoikeudet' },
  { name: 'open-source', title: 'Avoin lähdekoodi' },
] as const;

function AppNavigator() {
  const { isDark } = useTheme();
  const router = useRouter();
  const stackOptions = useStackOptions();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
    if (isWeb) return;
    // Native asks for the confidentiality pledge once, on first launch
    hasClearance().then((granted) => {
      if (!granted) router.push('/clearance');
    });
  }, [router]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {isWeb && <WebHeader />}
      <Stack screenOptions={{ ...stackOptions, headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {detailScreens.map((name) => (
          <Stack.Screen key={name} name={name} options={{ headerShown: !isWeb }} />
        ))}
        <Stack.Screen name="courses/index" />
        <Stack.Screen name="majors/index" />
        <Stack.Screen name="teachers/index" />
        <Stack.Screen
          name="clearance"
          options={{ presentation: 'fullScreenModal', gestureEnabled: false, headerShown: false }}
        />
        {legalScreens.map(({ name, title }) => (
          <Stack.Screen key={name} name={name} options={{ headerShown: !isWeb, title }} />
        ))}
      </Stack>
      {isWeb && <ClearanceGate />}
      <PortalHost />
    </>
  );
}

export default function RootLayout() {
  const tree = (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );

  return <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider>;
}
