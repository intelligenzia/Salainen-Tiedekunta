import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useColors } from '@/lib/stores/theme';
import type { ReactNode } from 'react';
import { Platform, RefreshControl, ScrollView, View } from 'react-native';

interface ScreenProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

/**
 * Page scaffold: a scroll view on the paper background with a centered
 * reading column. Native headers handle the top inset.
 */
export function Screen({ children, className, contentClassName, refreshing, onRefresh }: ScreenProps) {
  const colors = useColors();

  return (
    <ScrollView
      className={cn('flex-1 bg-paper', className)}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} tintColor={colors.muted} />
        ) : undefined
      }
    >
      <View
        className={cn(
          'w-full max-w-3xl self-center px-5 pt-4 pb-16 gap-8 web:px-6 web:pt-10 web:pb-24',
          contentClassName
        )}
      >
        {children}
      </View>
      {Platform.OS === 'web' ? <Footer /> : null}
    </ScrollView>
  );
}
