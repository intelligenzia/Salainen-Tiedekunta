import '../global.css';

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { WebHeader } from '@/components/WebHeader';
import { FavoritesProvider } from '@/lib/stores/favorites';
import { ThemeProvider, useTheme } from '@/lib/stores/theme';
import { LanguageProvider } from '@/lib/stores/language';
import { getThemeColors } from '@/lib/theme-colors';
import { initializeAnalytics } from '@/lib/analytics';
import { queryPersister, persistOptions } from '@/lib/query-persister';

const isWeb = Platform.OS === 'web';

// Create a client with improved retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: 'always' as const,
    },
  },
});

function AppNavigator() {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <>
      {isWeb && <WebHeader />}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />


        <Stack.Screen
          name="courses/[id]"
          options={{
            headerShown: !isWeb,
            title: 'Kurssi',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="majors/[slug]"
          options={{
            headerShown: !isWeb,
            title: 'Pääaine',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="teachers/[slug]"
          options={{
            headerShown: !isWeb,
            title: 'Opettaja',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />

                <Stack.Screen
                  name="courses/index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="majors/index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="teachers/index"
                  options={{
                    headerShown: false,
                  }}
                />



        <Stack.Screen
          name="terms"
          options={{
            headerShown: !isWeb,
            title: 'Käyttöehdot',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="license"
          options={{
            headerShown: !isWeb,
            title: 'Lisenssi',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="copyright"
          options={{
            headerShown: !isWeb,
            title: 'Tekijänoikeudet',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="open-source"
          options={{
            headerShown: !isWeb,
            title: 'Avoimen lähdekoodin kirjastot',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.foreground,
            headerTitleStyle: {
              fontWeight: '500',
            },
            headerBackTitle: 'Takaisin',
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <PortalHost />
    </>
  );
}

export default function RootLayout() {
  // Initialize Vexo analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Use PersistQueryClientProvider for web, regular provider for native
  const QueryProvider = isWeb && queryPersister ? PersistQueryClientProvider : QueryClientProvider;

  const providerProps = isWeb && queryPersister
    ? {
        client: queryClient,
        persistOptions: {
          ...persistOptions,
          persister: queryPersister,
        },
      }
    : { client: queryClient };

  return (
    <QueryProvider {...providerProps}>
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
    </QueryProvider>
  );
}
