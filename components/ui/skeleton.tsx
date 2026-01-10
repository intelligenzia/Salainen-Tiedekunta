import React, { useEffect } from 'react';
import { View, Platform, AccessibilityInfo } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
}

export function Skeleton({
  className,
  width,
  height,
  borderRadius = 4,
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(0.5);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    if (Platform.OS !== 'web') {
      AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    } else if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mq.matches);
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      opacity.value = 0.6;
      return;
    }

    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );

    return () => {
      cancelAnimation(opacity);
    };
  }, [reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={[
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
      className={cn('bg-zinc-200 dark:bg-zinc-700', className)}
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <View className={cn('gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 && lines > 1 ? '70%' : '100%'}
          borderRadius={4}
        />
      ))}
    </View>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <View
      className={cn(
        'bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4',
        className
      )}
    >
      <View className="flex-row items-center mb-3">
        <Skeleton width={48} height={48} borderRadius={24} />
        <View className="flex-1 ml-3 gap-2">
          <Skeleton height={16} width="60%" />
          <Skeleton height={12} width="40%" />
        </View>
      </View>
      <SkeletonText lines={2} />
    </View>
  );
}

export function SkeletonCourseCard({ className }: { className?: string }) {
  return (
    <View
      className={cn(
        'bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex-row',
        className
      )}
    >
      <View className="flex-1 mr-3">
        <Skeleton height={12} width={60} className="mb-2" />
        <Skeleton height={18} width="80%" className="mb-1" />
        <Skeleton height={14} width="50%" />
      </View>
      <Skeleton width={44} height={44} borderRadius={8} />
    </View>
  );
}

export function SkeletonList({
  count = 5,
  renderItem,
}: {
  count?: number;
  renderItem?: (index: number) => React.ReactNode;
}) {
  return (
    <View className="gap-3">
      {Array.from({ length: count }).map((_, i) =>
        renderItem ? renderItem(i) : <SkeletonCard key={i} />
      )}
    </View>
  );
}
