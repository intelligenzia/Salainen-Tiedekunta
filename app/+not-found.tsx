import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Sivua ei löydy"
        description="Etsimääsi sivua ei löytynyt."
        path="/404"
      />
      <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900" edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-8xl font-bold text-zinc-200 dark:text-zinc-700">
            404
          </Text>
          <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-4 text-center">
            Sivua ei löydy
          </Text>
          <Text className="text-zinc-500 dark:text-zinc-400 text-center mt-2 max-w-sm">
            Etsimääsi sivua ei valitettavasti löytynyt. Se on saatettu poistaa tai siirtää toiseen osoitteeseen.
          </Text>
          <Pressable
            onPress={() => router.replace('/')}
            className="mt-8 bg-zinc-900 dark:bg-zinc-100 px-6 py-3 rounded-lg active:opacity-80"
          >
            <Text className="text-white dark:text-zinc-900 font-medium">
              Palaa etusivulle
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
