import React from 'react';
import { View, Platform, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { ChevronRight, Home } from 'lucide-react-native';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Only show on web
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View
      className="flex-row items-center flex-wrap py-3 px-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
      accessibilityRole="navigation"
      accessibilityLabel="Breadcrumb"
    >
      <View className="flex-row items-center max-w-4xl mx-auto w-full">
        {/* Home icon */}
        <Link href="/" asChild>
          <Pressable
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 active:bg-zinc-200"
            accessibilityLabel="Etusivu"
            accessibilityRole="link"
          >
            <Home size={16} color="#71717a" />
          </Pressable>
        </Link>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={14} color="#a1a1aa" style={{ marginHorizontal: 8 }} />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} asChild>
                <Pressable
                  className="hover:underline active:opacity-70"
                  accessibilityRole="link"
                >
                  <Text className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            ) : (
              <Text
                className="text-zinc-900 dark:text-zinc-100 text-sm font-medium"
                accessibilityRole="text"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Text>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
