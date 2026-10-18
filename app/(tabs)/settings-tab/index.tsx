import { SEO } from '@/components/SEO';
import { Notice, Page, Row, Section, Segmented } from '@/components/kit';
import { resetClearance } from '@/lib/clearance';
import { useTheme } from '@/lib/stores/theme';
import Constants from 'expo-constants';
import type { Href } from 'expo-router';

const legal: { href: Href; title: string }[] = [
  { href: '/privacy', title: 'Tietosuojaseloste' },
  { href: '/terms', title: 'Käyttöehdot' },
  { href: '/license', title: 'Lisenssi' },
  { href: '/copyright', title: 'Tekijänoikeudet' },
  { href: '/open-source', title: 'Avoin lähdekoodi' },
];

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <SEO title="Asetukset" description="Salainen Tiedekunta – asetukset ja lakitiedot" path="/settings" noIndex />
      <Page>
        <Section title="Ulkoasu">
          <Segmented
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'system', label: 'Järjestelmä' },
              { value: 'light', label: 'Arkisto' },
              { value: 'dark', label: 'Pimeä' },
            ]}
          />
        </Section>

        <Section title="Lakitiedot">
          {legal.map((l) => (
            <Row key={l.title} title={l.title} href={l.href} />
          ))}
        </Section>

        <Section title="Salassapito" footer="Näytä salassapitolupaus uudelleen seuraavalla käynnistyskerralla.">
          <Row title="Peru salassapitolupaus" onPress={resetClearance} />
        </Section>

        <Notice text={`Salainen Tiedekunta · versio ${Constants.expoConfig?.version ?? '1.0.0'}`} />
      </Page>
    </>
  );
}
