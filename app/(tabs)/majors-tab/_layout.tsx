import { useStackOptions } from '@/lib/navigation';
import { Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';

export default function Layout() {
  const router = useRouter();
  const screenOptions = useStackOptions(true);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Pääaineet',
          headerSearchBarOptions:
            Platform.OS === 'web'
              ? undefined
              : {
                  placeholder: 'Hae pääaineita',
                  cancelButtonText: 'Peruuta',
                  hideWhenScrolling: false,
                  onChangeText: (event) => router.setParams({ q: event.nativeEvent.text || undefined }),
                },
        }}
      />
    </Stack>
  );
}
