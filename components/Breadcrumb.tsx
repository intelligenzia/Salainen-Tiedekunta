import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { Fragment } from 'react';
import { Platform, Pressable, View } from 'react-native';

interface BreadcrumbItem {
  label: string;
  href?: Href;
}

/** Web-only trail above detail pages. Native relies on the back button. */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (Platform.OS !== 'web') return null;

  const trail: BreadcrumbItem[] = [{ label: 'Etusivu', href: '/' }, ...items];

  return (
    <View role="navigation" aria-label="Murupolku" className="bg-paper">
      <View className="w-full max-w-3xl self-center px-6 pt-6 flex-row flex-wrap items-center gap-2">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <Fragment key={index}>
              {index > 0 ? <Text className="text-ink-muted text-sm">/</Text> : null}
              {item.href && !last ? (
                <Link href={item.href} asChild>
                  <Pressable accessibilityRole="link" className="cursor-pointer">
                    <Text className="text-ink-muted text-sm underline decoration-rule-strong underline-offset-4">
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              ) : (
                <Text aria-current="page" className="text-ink text-sm font-medium" numberOfLines={1}>
                  {item.label}
                </Text>
              )}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
