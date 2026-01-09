import { Platform, View, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Text } from '@/components/ui/text';

const navItems = [
  { href: '/', label: 'Etusivu' },
  { href: '/majors', label: 'Pääaineet' },
  { href: '/courses', label: 'Kurssit' },
  { href: '/teachers', label: 'Opettajat' },
];

export function WebHeader() {
  const pathname = usePathname();

  if (Platform.OS !== 'web') {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <View className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <View className="max-w-4xl mx-auto px-4 h-14 flex-row items-center justify-between w-full">
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-2">
            <Text className="text-zinc-50 font-semibold text-lg tracking-tight">
              Sal. tdk.
            </Text>
          </Pressable>
        </Link>

        <View className="flex-row items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as any} asChild>
              <Pressable
                className={`px-3 py-2 rounded-md ${
                  isActive(item.href)
                    ? 'bg-zinc-800'
                    : 'hover:bg-zinc-900 active:bg-zinc-800'
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive(item.href)
                      ? 'text-zinc-50 font-medium'
                      : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

