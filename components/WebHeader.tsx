import { Text } from '@/components/ui/text';
import { useColors, useTheme } from '@/lib/stores/theme';
import { Link, usePathname, type Href } from 'expo-router';
import { Monitor, Moon, Sun } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

const navItems: { href: Href; label: string; match: string }[] = [
  { href: '/majors', label: 'Pääaineet', match: '/majors' },
  { href: '/courses', label: 'Kurssit', match: '/courses' },
  { href: '/teachers', label: 'Opettajat', match: '/teachers' },
];

const themeLabels = {
  light: 'Vaalea teema',
  dark: 'Tumma teema',
  system: 'Järjestelmän teema',
} as const;

export function WebHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const colors = useColors();

  if (Platform.OS !== 'web') return null;

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <View role="banner" className="sticky top-0 z-50">
      {/* Classification strip */}
      <View className="bg-[#0e0e0f] border-b border-rule">
        <View className="w-full max-w-3xl self-center flex-row items-center justify-between px-4 sm:px-6 h-7">
          <Text className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#eeedea]">
            Luokiteltu
          </Text>
          <Text className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0444f]">
            Pääsy vain valtuutetuille
          </Text>
        </View>
      </View>

      <View className="bg-paper/90 border-b border-rule backdrop-blur-md">
        <View className="w-full max-w-3xl self-center px-4 sm:px-6 h-14 flex-row items-center justify-between gap-2">
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Salainen Tiedekunta, etusivu" className="flex-row items-center gap-2.5 cursor-pointer">
              <View className="h-5 w-5 items-center justify-center border-2 border-ink">
                <View className="h-1.5 w-1.5 bg-stamp" />
              </View>
              <Text className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">Sal·Tdk</Text>
            </Pressable>
          </Link>

          <View role="navigation" className="flex-row items-center">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.match);
              return (
                <Link key={item.match} href={item.href} asChild>
                  <Pressable
                    accessibilityRole="link"
                    aria-current={active ? 'page' : undefined}
                    className="px-2.5 sm:px-3 py-2 cursor-pointer active:opacity-60"
                  >
                    <Text
                      className={
                        active
                          ? 'text-ink text-[14px] font-semibold underline decoration-stamp decoration-2 underline-offset-[6px]'
                          : 'text-ink-soft text-[14px]'
                      }
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
            <Pressable
              onPress={toggleTheme}
              accessibilityRole="button"
              accessibilityLabel={`${themeLabels[theme]}. Vaihda teemaa.`}
              className="ml-1 h-9 w-9 items-center justify-center cursor-pointer active:opacity-60"
            >
              <ThemeIcon size={16} color={colors.muted} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
