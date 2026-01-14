import { Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export default function CoursesLayout() {
  const router = useRouter();

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
        headerLargeTitle: true,
        headerLargeStyle: {
          backgroundColor: '#09090b',
        },
        headerLargeTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Kurssit',
          headerSearchBarOptions: isWeb
            ? undefined
            : {
                placeholder: 'Hae kursseja...',
                cancelButtonText: 'Peruuta',
                hideWhenScrolling: false,
                onChangeText: (event) => {
                  const query = event.nativeEvent.text;
                  router.setParams({ q: query || undefined });
                },
              },
        }}
      />
    </Stack>
  );
}
