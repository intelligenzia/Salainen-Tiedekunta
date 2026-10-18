import { Text } from '@/components/ui/text';
import { useSearchShortcut } from '@/lib/hooks/useKeyboardNavigation';
import { useColors } from '@/lib/stores/theme';
import { Search, X } from 'lucide-react-native';
import { useRef } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

/**
 * In-page search for web. On iOS the stack header's native search bar is
 * used instead, so this renders nothing there.
 */
export function SearchField({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  const colors = useColors();
  const ref = useRef<any>(null);
  useSearchShortcut(ref);

  if (Platform.OS !== 'web') return null;

  return (
    <View className="flex-row items-center gap-2.5 rounded-md border border-rule bg-surface px-4 h-12">
      <Search size={18} color={colors.muted} />
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        accessibilityLabel={placeholder}
        returnKeyType="search"
        className="flex-1 text-ink text-[16px] h-full outline-none"
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} accessibilityLabel="Tyhjennä haku" hitSlop={8}>
          <X size={16} color={colors.muted} />
        </Pressable>
      ) : (
        <View className="rounded border border-rule px-1.5 py-0.5">
          <Text className="text-ink-muted text-[11px] font-mono">/</Text>
        </View>
      )}
    </View>
  );
}
