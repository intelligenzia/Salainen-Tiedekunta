import { Link, Stack, useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Platform, Pressable } from 'react-native';

const isWeb = Platform.OS === 'web';

export default function HomeLayout() {
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
          title: 'Salainen Tiedekunta',
          headerRight: () => (
            <Link
              href="/settings-tab"
              asChild
            >
              <Pressable
                accessibilityRole="link"
                accessibilityLabel="Asetukset"
                className="p-2"
              >
                <Settings size={22} color="#fafafa" />
                </Pressable>
              </Link>
            ),
          }}
        />
      </Stack>
    );
  }
