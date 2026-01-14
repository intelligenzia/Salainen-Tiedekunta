import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { useTheme } from '@/lib/stores/theme';
import { useRouter } from 'expo-router';
import { Check, ChevronRight, Copyright, FileText, Globe, Moon, Package, Scale, Sun } from 'lucide-react-native';
import { Linking, Pressable, ScrollView, View } from 'react-native';

interface SettingsItemProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  description?: string;
  onPress: () => void;
  isDark: boolean;
  showChevron?: boolean;
}

function SettingsItem({ icon: Icon, title, description, onPress, isDark, showChevron = true }: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-4 bg-white dark:bg-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-700"
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-700 items-center justify-center mr-3">
        <Icon size={20} color={isDark ? '#a1a1aa' : '#3f3f46'} />
      </View>
      <View className="flex-1">
        <Text className="text-zinc-900 dark:text-zinc-100 text-base font-medium">{title}</Text>
        {description && (
          <Text className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">{description}</Text>
        )}
      </View>
      {showChevron && <ChevronRight size={20} color={isDark ? '#52525b' : '#d4d4d8'} />}
    </Pressable>
  );
}

interface SettingsOptionProps {
  title: string;
  selected: boolean;
  onPress: () => void;
  isDark: boolean;
}

function SettingsOption({ title, selected, onPress, isDark }: SettingsOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-700 border-b border-zinc-100 dark:border-zinc-700"
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Text className={`text-base ${selected ? 'text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}>
        {title}
      </Text>
      {selected && <Check size={20} color={isDark ? '#fafafa' : '#18181b'} />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { isDark, theme, setTheme } = useTheme();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Asetukset', url: `${SITE_URL}/settings` },
  ]);

  return (
    <>
      <SEO
        title="Asetukset"
        description="Salainen Tiedekunta - Asetukset ja lailliset tiedot"
        path="/settings"
        jsonLd={[breadcrumbSchema]}
      />
      <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
        <View className="max-w-4xl mx-auto w-full">

          {/* Theme Selection */}
          <View className="mt-6">
            <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide px-4 mb-2">
              Ulkoasu
            </Text>
            <View className="bg-white dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
              <SettingsOption
                title="Vaalea"
                selected={theme === 'light'}
                onPress={() => setTheme('light')}
                isDark={isDark}
              />
              <SettingsOption
                title="Tumma"
                selected={theme === 'dark'}
                onPress={() => setTheme('dark')}
                isDark={isDark}
              />
              <SettingsOption
                title="Järjestelmä"
                selected={theme === 'system'}
                onPress={() => setTheme('system')}
                isDark={isDark}
              />
            </View>
          </View>

          {/* Language Selection */}
          <View className="mt-6">
            <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide px-4 mb-2">
              Kieli
            </Text>
            <View className="bg-white dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
              <SettingsOption
                title="Suomi"
                selected={true}
                onPress={() => {}}
                isDark={isDark}
              />
              <SettingsOption
                title="English"
                selected={false}
                onPress={() => {}}
                isDark={isDark}
              />
            </View>
          </View>

          {/* Legal Information */}
          <View className="mt-6">
            <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide px-4 mb-2">
              Lakitiedot
            </Text>
            <View className="bg-white dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
              <SettingsItem
                icon={FileText}
                title="Käyttöehdot"
                description="Sovelluksen käyttöehdot"
                onPress={() => router.push('/terms')}
                isDark={isDark}
              />
              <SettingsItem
                icon={Scale}
                title="Lisenssi"
                description="MIT-lisenssi"
                onPress={() => router.push('/license')}
                isDark={isDark}
              />
              <SettingsItem
                icon={Copyright}
                title="Tekijänoikeudet"
                description="© 2024 Salainen Tiedekunta"
                onPress={() => router.push('/copyright')}
                isDark={isDark}
              />
              <SettingsItem
                icon={Package}
                title="Avoimen lähdekoodin kirjastot"
                description="Käytetyt kolmannen osapuolen paketit"
                onPress={() => router.push('/open-source')}
                isDark={isDark}
              />
            </View>
          </View>

          
          <View className="mt-8 px-4 pb-8">
            <View className="items-center">
              <Text className="text-zinc-400 dark:text-zinc-500 text-sm">Salainen Tiedekunta</Text>
              <Text className="text-zinc-300 dark:text-zinc-600 text-xs mt-1">Versio 1.0.0</Text>
              <Text className="text-zinc-400 dark:text-zinc-500 text-sm mt-4">
                © {new Date().getFullYear()} Salainen Tiedekunta
              </Text>
              <Pressable onPress={() => Linking.openURL('https://perttu.dev')} className="mt-2">
                <Text className="text-zinc-500 dark:text-zinc-400 text-xs underline underline-offset-2">
                  perttu.dev
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
