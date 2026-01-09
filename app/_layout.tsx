import '../global.css';

import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { WebHeader } from '@/components/WebHeader';

const isWeb = Platform.OS === 'web';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {isWeb && <WebHeader />}
        <Stack
          screenOptions={{
            headerShown: !isWeb,
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
            }}
          />
          <Stack.Screen
            name="majors/[slug]"
            options={{
              title: 'Pääaine',
            }}
          />
          <Stack.Screen
            name="courses/index"
            options={{
              title: 'Kurssit',
            }}
          />
          <Stack.Screen
            name="courses/[id]"
            options={{
              title: 'Kurssi',
            }}
          />
          <Stack.Screen
            name="teachers/index"
            options={{
              title: 'Opettajat',
            }}
          />
          <Stack.Screen
            name="teachers/[slug]"
            options={{
              title: 'Opettaja',
            }}
          />
        </Stack>
        <PortalHost />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
