import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { useTheme } from '@/lib/stores/theme';
import { Stack } from 'expo-router';
import { ExternalLink } from 'lucide-react-native';
import { Linking, Platform, Pressable, ScrollView, View } from 'react-native';

const isWeb = Platform.OS === 'web';

// Dependencies from package.json
const dependencies = [
  { name: '@contentful/rich-text-plain-text-renderer', version: '^17.1.6', license: 'MIT', url: 'https://github.com/contentful/rich-text' },
  { name: '@contentful/rich-text-react-renderer', version: '^16.1.6', license: 'MIT', url: 'https://github.com/contentful/rich-text' },
  { name: '@contentful/rich-text-types', version: '^17.2.5', license: 'MIT', url: 'https://github.com/contentful/rich-text' },
  { name: '@expo/vector-icons', version: '^15.0.3', license: 'MIT', url: 'https://github.com/expo/vector-icons' },
  { name: '@legendapp/list', version: '^2.0.19', license: 'MIT', url: 'https://github.com/LegendApp/legend-list' },
  { name: '@react-native-async-storage/async-storage', version: '^2.2.0', license: 'MIT', url: 'https://github.com/react-native-async-storage/async-storage' },
  { name: '@react-navigation/bottom-tabs', version: '^7.4.0', license: 'MIT', url: 'https://github.com/react-navigation/react-navigation' },
  { name: '@react-navigation/elements', version: '^2.6.3', license: 'MIT', url: 'https://github.com/react-navigation/react-navigation' },
  { name: '@react-navigation/native', version: '^7.1.8', license: 'MIT', url: 'https://github.com/react-navigation/react-navigation' },
  { name: '@rn-primitives/accordion', version: '^1.2.0', license: 'MIT', url: 'https://github.com/roninoss/rn-primitives' },
  { name: '@rn-primitives/portal', version: '^1.3.0', license: 'MIT', url: 'https://github.com/roninoss/rn-primitives' },
  { name: '@rn-primitives/slot', version: '^1.2.0', license: 'MIT', url: 'https://github.com/roninoss/rn-primitives' },
  { name: '@tanstack/react-query', version: '^5.90.16', license: 'MIT', url: 'https://github.com/TanStack/query' },
  { name: 'class-variance-authority', version: '^0.7.1', license: 'Apache-2.0', url: 'https://github.com/joe-bell/cva' },
  { name: 'clsx', version: '^2.1.1', license: 'MIT', url: 'https://github.com/lukeed/clsx' },
  { name: 'expo', version: '~54.0.30', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-constants', version: '~18.0.12', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-font', version: '~14.0.10', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-haptics', version: '~15.0.8', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-image', version: '~3.0.11', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-linking', version: '~8.0.11', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-router', version: '~6.0.21', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-server', version: '^1.0.5', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-splash-screen', version: '~31.0.13', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-status-bar', version: '~3.0.9', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-symbols', version: '~1.0.8', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-system-ui', version: '~6.0.9', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'expo-web-browser', version: '~15.0.10', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'lucide-react-native', version: '^0.562.0', license: 'ISC', url: 'https://github.com/lucide-icons/lucide' },
  { name: 'nativewind', version: '^4.2.1', license: 'MIT', url: 'https://github.com/marklawlor/nativewind' },
  { name: 'react', version: '19.1.0', license: 'MIT', url: 'https://github.com/facebook/react' },
  { name: 'react-dom', version: '19.1.0', license: 'MIT', url: 'https://github.com/facebook/react' },
  { name: 'react-native', version: '0.81.5', license: 'MIT', url: 'https://github.com/facebook/react-native' },
  { name: 'react-native-gesture-handler', version: '~2.28.0', license: 'MIT', url: 'https://github.com/software-mansion/react-native-gesture-handler' },
  { name: 'react-native-reanimated', version: '~4.1.1', license: 'MIT', url: 'https://github.com/software-mansion/react-native-reanimated' },
  { name: 'react-native-safe-area-context', version: '~5.6.0', license: 'MIT', url: 'https://github.com/th3rdwave/react-native-safe-area-context' },
  { name: 'react-native-screens', version: '~4.16.0', license: 'MIT', url: 'https://github.com/software-mansion/react-native-screens' },
  { name: 'react-native-svg', version: '15.12.1', license: 'MIT', url: 'https://github.com/software-mansion/react-native-svg' },
  { name: 'react-native-web', version: '~0.21.0', license: 'MIT', url: 'https://github.com/necolas/react-native-web' },
  { name: 'tailwind-merge', version: '^3.4.0', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' },
  { name: 'tailwindcss-animate', version: '^1.0.7', license: 'MIT', url: 'https://github.com/jamiebuilds/tailwindcss-animate' },
];

const devDependencies = [
  { name: '@types/react', version: '~19.1.0', license: 'MIT', url: 'https://github.com/DefinitelyTyped/DefinitelyTyped' },
  { name: 'eslint', version: '^9.25.0', license: 'MIT', url: 'https://github.com/eslint/eslint' },
  { name: 'eslint-config-expo', version: '~10.0.0', license: 'MIT', url: 'https://github.com/expo/expo' },
  { name: 'prettier-plugin-tailwindcss', version: '^0.5.11', license: 'MIT', url: 'https://github.com/tailwindlabs/prettier-plugin-tailwindcss' },
  { name: 'tailwindcss', version: '3.4.17', license: 'MIT', url: 'https://github.com/tailwindlabs/tailwindcss' },
  { name: 'typescript', version: '~5.9.2', license: 'Apache-2.0', url: 'https://github.com/microsoft/TypeScript' },
];

interface PackageItemProps {
  name: string;
  version: string;
  license: string;
  url: string;
  isDark: boolean;
}

function PackageItem({ name, version, license, url, isDark }: PackageItemProps) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700 active:bg-zinc-50 dark:active:bg-zinc-700"
      accessibilityRole="link"
      accessibilityLabel={`${name} - ${license} lisenssi`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">{name}</Text>
          <Text className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">{version}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded mr-2">
            <Text className="text-zinc-600 dark:text-zinc-300 text-xs font-mono">{license}</Text>
          </View>
          <ExternalLink size={14} color={isDark ? '#71717a' : '#a1a1aa'} />
        </View>
      </View>
    </Pressable>
  );
}

export default function OpenSourceScreen() {
  const { isDark } = useTheme();
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Avoimen lähdekoodin kirjastot', url: `${SITE_URL}/open-source` },
  ]);

  return (
    <>
      <SEO
        title="Avoimen lähdekoodin kirjastot"
        description="Salainen Tiedekunta -sovelluksessa käytetyt avoimen lähdekoodin kirjastot ja niiden lisenssit."
        path="/open-source"
        jsonLd={[breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: 'Avoimen lähdekoodin kirjastot' }} />
      <ScrollView className="flex-1 bg-white dark:bg-zinc-900">
        <View className="max-w-4xl mx-auto w-full">
          
          <View className="p-4 border-b border-zinc-200 dark:border-zinc-700">
            <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Avoimen lähdekoodin kirjastot
            </Text>
            <Text className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 leading-relaxed">
              Tämä sovellus käyttää seuraavia avoimen lähdekoodin kirjastoja.
              Kiitämme kaikkia kehittäjiä heidän työstään.
            </Text>
          </View>

          
          <View className="mt-4">
            <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide px-4 mb-2">
              Riippuvuudet ({dependencies.length})
            </Text>
            <View className="bg-white dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
              {dependencies.map((pkg) => (
                <PackageItem key={pkg.name} {...pkg} isDark={isDark} />
              ))}
            </View>
          </View>

          
          <View className="mt-6 mb-8">
            <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide px-4 mb-2">
              Kehitysriippuvuudet ({devDependencies.length})
            </Text>
            <View className="bg-white dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
              {devDependencies.map((pkg) => (
                <PackageItem key={pkg.name} {...pkg} isDark={isDark} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
