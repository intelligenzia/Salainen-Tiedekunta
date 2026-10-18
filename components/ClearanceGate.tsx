import { Text } from '@/components/ui/text';
import { grantClearance, hasClearance } from '@/lib/clearance';
import { PLEDGE } from '@/lib/content';
import { useEffect, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

/**
 * Web-only confidentiality pledge shown over the page on the first visit.
 * Rendered after hydration so crawlers and the pre-rendered HTML still get
 * the real content underneath.
 */
export function ClearanceGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hasClearance().then((granted) => setOpen(!granted));
  }, []);

  if (Platform.OS !== 'web' || !open) return null;

  const accept = async () => {
    await grantClearance();
    setOpen(false);
  };

  return (
    <View
      role="dialog"
      aria-modal
      aria-labelledby="clearance-title"
      className="fixed inset-0 z-[100] items-center justify-center bg-paper/80 px-4 backdrop-blur-md"
    >
      <View className="w-full max-w-lg bg-surface border border-ink">
        <View className="flex-row items-center justify-between bg-ink px-5 py-2.5">
          <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-paper">
            Sal. tdk. · Arkisto
          </Text>
          <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stamp">
            Pääsy rajoitettu
          </Text>
        </View>
        <View className="gap-5 px-6 py-7 sm:px-8">
          <Text nativeID="clearance-title" role="heading" aria-level="2" className="text-ink text-[30px] leading-9 font-bold tracking-[-0.02em]">
            Salassapitolupaus
          </Text>
          <Text className="text-ink-soft text-[16px] leading-[26px]">{PLEDGE.lede}</Text>
          <View className="gap-2 border-l-2 border-stamp pl-4">
            <Text className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Sitoudun salaamaan</Text>
            {PLEDGE.items.map((item) => (
              <Text key={item} className="text-ink text-[15px] leading-6">
                — {item}
              </Text>
            ))}
          </View>
          <Text className="text-ink-muted text-[13px] leading-5">{PLEDGE.footer}</Text>
          <Pressable
            onPress={accept}
            accessibilityRole="button"
            className="mt-1 items-center bg-ink px-5 py-3.5 cursor-pointer active:opacity-80"
          >
            <Text className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-paper">
              Annan salassapitolupauksen
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
