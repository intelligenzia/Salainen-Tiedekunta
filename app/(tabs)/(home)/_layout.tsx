import { useStackOptions } from '@/lib/navigation';
import { useColors } from '@/lib/stores/theme';
import { Link, Stack } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function HomeLayout() {
  const colors = useColors();
  const screenOptions = useStackOptions(true);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Salainen Tiedekunta',
          headerRight: () => (
            <Link href="/settings-tab" asChild>
              <Pressable accessibilityRole="link" accessibilityLabel="Asetukset" hitSlop={8} className="p-1.5">
                <Settings size={22} color={colors.foreground} strokeWidth={1.75} />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
