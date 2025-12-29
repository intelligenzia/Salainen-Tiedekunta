import { View, Pressable, Linking } from 'react-native';
import { Text } from '@/components/ui/text';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-black px-6 py-8 mt-auto">
      <Text className="text-white/70 text-sm text-center mb-2">
        {currentYear} Salainen Tiedekunta. Kaikki oikeudet pidätetään.
      </Text>
      <Pressable onPress={() => Linking.openURL('https://perttu.dev')}>
        <Text className="text-white/50 text-xs text-center">
          Sivuston toteutus: perttu.dev
        </Text>
      </Pressable>
    </View>
  );
}
