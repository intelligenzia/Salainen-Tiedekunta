import { Text } from '@/components/ui/text';
import { useColors } from '@/lib/stores/theme';
import { cn } from '@/lib/utils';
import { Heart, Link2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

/** Favourite and copy-link buttons under a course title on the web (native puts these in the header). */
export function WebActions({
  favorite,
  onToggleFavorite,
  onShare,
}: {
  favorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}) {
  const colors = useColors();
  const base = 'flex-row items-center gap-2 rounded-md border px-3.5 py-2 cursor-pointer';

  return (
    <View className="flex-row gap-2">
      <Pressable
        onPress={onToggleFavorite}
        accessibilityRole="button"
        accessibilityState={{ selected: favorite }}
        className={cn(base, favorite ? 'border-stamp bg-stamp-soft' : 'border-rule-strong active:bg-sunken')}
      >
        <Heart size={14} color={favorite ? colors.accent : colors.foreground} fill={favorite ? colors.accent : 'transparent'} />
        <Text className={cn('font-mono text-[12px] uppercase tracking-[0.08em]', favorite ? 'text-stamp' : 'text-ink')}>
          {favorite ? 'Suosikeissa' : 'Lisää suosikiksi'}
        </Text>
      </Pressable>
      <Pressable onPress={onShare} accessibilityRole="button" className={cn(base, 'border-rule-strong active:bg-sunken')}>
        <Link2 size={14} color={colors.foreground} />
        <Text className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink">Kopioi linkki</Text>
      </Pressable>
    </View>
  );
}
