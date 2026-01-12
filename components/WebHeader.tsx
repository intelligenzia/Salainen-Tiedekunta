import { Platform, View, Pressable, useWindowDimensions, Modal } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/lib/stores/theme';
import { Sun, Moon, Monitor, Menu, X, Home, GraduationCap, BookOpen, Users } from 'lucide-react-native';
import { useState, useCallback } from 'react';

const navItems = [
  { href: '/', label: 'Etusivu', icon: Home },
  { href: '/majors', label: 'Pääaineet', icon: GraduationCap },
  { href: '/courses', label: 'Kurssit', icon: BookOpen },
  { href: '/teachers', label: 'Opettajat', icon: Users },
];

// Breakpoint for mobile (matches Tailwind's md breakpoint)
const MOBILE_BREAKPOINT = 768;

export function WebHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = width < MOBILE_BREAKPOINT;

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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Mobile menu modal
  const MobileMenu = () => (
    <Modal
      visible={menuOpen}
      animationType="fade"
      transparent
      onRequestClose={closeMenu}
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={closeMenu}
      >
        <View className="absolute top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800">
          {/* Menu header */}
          <View className="flex-row items-center justify-between px-4 h-14 border-b border-zinc-800">
            <Text className="text-zinc-50 font-semibold">Menu</Text>
            <Pressable
              onPress={closeMenu}
              className="p-2 -mr-2 rounded-md active:bg-zinc-800"
              accessibilityLabel="Sulje menu"
            >
              <X size={24} color="#fafafa" />
            </Pressable>
          </View>

          {/* Nav items */}
          <View className="p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href as any} asChild>
                  <Pressable
                    onPress={closeMenu}
                    accessibilityRole="link"
                    accessibilityLabel={item.label}
                    accessibilityState={{ selected: active }}
                    className={`flex-row items-center px-4 py-3 rounded-lg mb-1 ${
                      active ? 'bg-zinc-800' : 'active:bg-zinc-800'
                    }`}
                  >
                    <Icon size={20} color={active ? '#fafafa' : '#a1a1aa'} />
                    <Text
                      className={`ml-3 text-base ${
                        active ? 'text-zinc-50 font-medium' : 'text-zinc-400'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>

          {/* Theme toggle in menu */}
          <View className="px-2 mt-4 pt-4 border-t border-zinc-800">
            <Pressable
              onPress={() => {
                toggleTheme();
              }}
              className="flex-row items-center px-4 py-3 rounded-lg active:bg-zinc-800"
              accessibilityRole="button"
              accessibilityLabel={`Vaihda teemaa: ${themeLabel}`}
            >
              <ThemeIcon size={20} color="#a1a1aa" />
              <Text className="ml-3 text-base text-zinc-400">
                {themeLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <>
      <View className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
        <View className="max-w-4xl mx-auto px-4 h-14 flex-row items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" asChild>
            <Pressable
              className="flex-row items-center"
              accessibilityRole="link"
              accessibilityLabel="Salainen Tiedekunta etusivu"
            >
              <Text className="text-zinc-50 font-semibold text-lg tracking-tight">
                Sal. tdk.
              </Text>
            </Pressable>
          </Link>

          {/* Desktop navigation */}
          {!isMobile && (
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
          )}

          {/* Mobile: current page indicator + hamburger */}
          {isMobile && (
            <View className="flex-row items-center gap-2">
              {/* Current page indicator */}
              <View className="px-2 py-1 bg-zinc-800 rounded">
                <Text className="text-zinc-300 text-xs">
                  {navItems.find((item) => isActive(item.href))?.label || 'Menu'}
                </Text>
              </View>

              {/* Theme toggle */}
              <Pressable
                onPress={toggleTheme}
                accessibilityRole="button"
                accessibilityLabel={`Vaihda teemaa: ${themeLabel}`}
                className="p-2 rounded-md active:bg-zinc-800"
              >
                <ThemeIcon size={20} color="#a1a1aa" />
              </Pressable>

              {/* Hamburger menu button */}
              <Pressable
                onPress={() => setMenuOpen(true)}
                accessibilityRole="button"
                accessibilityLabel="Avaa menu"
                className="p-2 -mr-2 rounded-md active:bg-zinc-800"
              >
                <Menu size={24} color="#fafafa" />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* Mobile menu */}
      {isMobile && <MobileMenu />}
    </>
  );
}


