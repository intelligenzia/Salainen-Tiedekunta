import '../global.css';

import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WebHeader } from '@/components/WebHeader';
import { FavoritesProvider } from '@/lib/stores/favorites';
import { ThemeProvider } from '@/lib/stores/theme';

const isWeb = Platform.OS === 'web';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
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
                      backgroundColor: '#09090b',
                    },
                    headerTintColor: '#fafafa',
                    headerTitleStyle: {
                      fontWeight: '500',
                    },
                    headerBackTitle: 'Takaisin',
                    headerShadowVisible: false,
                  }}
                />
              </Stack>
              <PortalHost />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
