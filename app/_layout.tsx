import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Salainen Tiedekunta',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="majors/index"
            options={{
              title: 'Pääaineet',
              headerBackTitle: 'Takaisin',
            }}
          />
          <Stack.Screen
            name="majors/[slug]"
            options={{
              headerBackTitle: 'Pääaineet',
            }}
          />
          <Stack.Screen
            name="courses/index"
            options={{
              title: 'Kurssit',
              headerBackTitle: 'Takaisin',
            }}
          />
          <Stack.Screen
            name="courses/[id]"
            options={{
              headerBackTitle: 'Kurssit',
            }}
          />
          <Stack.Screen
            name="teachers/index"
            options={{
              title: 'Opettajat',
              headerBackTitle: 'Takaisin',
            }}
          />
          <Stack.Screen
            name="teachers/[slug]"
            options={{
              headerBackTitle: 'Opettajat',
            }}
          />
        </Stack>
        <PortalHost />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
