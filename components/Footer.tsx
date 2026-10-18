import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

const legalLinks: { href: Href; label: string }[] = [
  { href: '/privacy', label: 'Tietosuoja' },
  { href: '/terms', label: 'Käyttöehdot' },
  { href: '/license', label: 'Lisenssi' },
  { href: '/copyright', label: 'Tekijänoikeudet' },
  { href: '/open-source', label: 'Avoin lähdekoodi' },
];

/** Site footer, rendered at the end of every web page. */
export function Footer() {
  return (
    <View role="contentinfo" className="border-t border-rule">
      <View className="w-full max-w-3xl self-center px-6 py-10 gap-6">
        <View className="gap-2">
          <Text className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
            Salainen Tiedekunta
          </Text>
          <Text className="text-ink-muted text-[14px] leading-[22px] max-w-md">
            Helsingin yliopiston kognitiotieteen opintopiiri vuodesta 1998. Tämän sivuston olemassaolo on vahvistamatta.
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((link) => (
            <Link key={link.label} href={link.href} asChild>
              <Pressable accessibilityRole="link" className="cursor-pointer">
                <Text className="text-ink-soft text-[13px] underline decoration-rule-strong underline-offset-4">
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
        <Text className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          © {new Date().getFullYear()} Sal·Tdk — asiakirja SAL/ARK/001 — ei julkiseen levitykseen
        </Text>
      </View>
    </View>
  );
}
