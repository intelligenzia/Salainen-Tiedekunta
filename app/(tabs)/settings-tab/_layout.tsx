import { Stack } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: !isWeb,
        headerStyle: {
          backgroundColor: '#09090b',
        },
        headerTintColor: '#fafafa',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Asetukset',
        }}
      />
    </Stack>
  );
}
