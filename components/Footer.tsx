import { View, Pressable, Linking } from 'react-native';
import { Text } from '@/components/ui/text';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-zinc-950 px-6 py-8 mt-auto border-t border-zinc-800">
      <Text className="text-zinc-400 text-sm text-center mb-2">
        © {currentYear} Salainen Tiedekunta
      </Text>
      <Pressable onPress={() => Linking.openURL('https://perttu.dev')}>
        <Text className="text-zinc-600 text-xs text-center underline underline-offset-2 decoration-zinc-700">
          perttu.dev
        </Text>
      </Pressable>
    </View>
  );
}
