import { Platform, View, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/lib/stores/theme';
import { Sun, Moon, Monitor } from 'lucide-react-native';

const navItems = [
  { href: '/', label: 'Etusivu' },
  { href: '/majors', label: 'Pääaineet' },
  { href: '/courses', label: 'Kurssit' },
  { href: '/teachers', label: 'Opettajat' },
];

export function WebHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme, isDark } = useTheme();

  if (Platform.OS !== 'web') {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const themeLabel =
    theme === 'light' ? 'Vaalea teema' : theme === 'dark' ? 'Tumma teema' : 'Järjestelmän teema';

  return (
    <View className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <View className="max-w-4xl mx-auto px-4 h-14 flex-row items-center justify-between w-full">
        <Link href="/" asChild>
          <Pressable
            className="flex-row items-center gap-2"
            accessibilityRole="link"
            accessibilityLabel="Salainen Tiedekunta etusivu"
          >
            <Text className="text-zinc-50 font-semibold text-lg tracking-tight">
              Sal. tdk.
            </Text>
          </Pressable>
        </Link>

        <View className="flex-row items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as any} asChild>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: isActive(item.href) }}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-zinc-800'
                    : 'hover:bg-zinc-900 active:bg-zinc-800'
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive(item.href)
                      ? 'text-zinc-50 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          ))}

          {/* Theme toggle */}
          <Pressable
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel={`Vaihda teemaa: ${themeLabel}`}
            className="ml-2 p-2 rounded-md hover:bg-zinc-900 active:bg-zinc-800"
          >
            <ThemeIcon size={18} color="#a1a1aa" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
