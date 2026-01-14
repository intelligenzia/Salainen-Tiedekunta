import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { Linking, Pressable, View } from 'react-native';

const legalLinks = [
  { href: '/terms', label: 'Käyttöehdot' },
  { href: '/license', label: 'Lisenssi' },
  { href: '/copyright', label: 'Tekijänoikeudet' },
  { href: '/open-source', label: 'Avoimen lähdekoodin kirjastot' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-zinc-950 px-6 py-8 mt-auto border-t border-zinc-800">
      <View className="max-w-4xl mx-auto w-full">
        
        <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href as any} asChild>
              <Pressable accessibilityRole="link" accessibilityLabel={link.label}>
                <Text className="text-zinc-500 text-xs hover:text-zinc-300 underline underline-offset-2 decoration-zinc-700">
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>

        
        <Text className="text-zinc-400 text-sm text-center mb-2">
          © {currentYear} Salainen Tiedekunta
        </Text>
        <Pressable onPress={() => Linking.openURL('https://perttu.dev')}>
          <Text className="text-zinc-600 text-xs text-center underline underline-offset-2 decoration-zinc-700">
            perttu.dev
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
