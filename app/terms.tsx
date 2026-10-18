import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { createBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-ink mb-2 tracking-tight">{title}</Text>
      {children}
    </View>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-ink-soft text-sm leading-relaxed mb-3">{children}</Text>
  );
}

export default function TermsScreen() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Käyttöehdot', url: `${SITE_URL}/terms` },
  ]);

  return (
    <>
      <SEO
        title="Käyttöehdot"
        description="Salainen Tiedekunta -sovelluksen käyttöehdot."
        path="/terms"
        jsonLd={[breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: 'Käyttöehdot' }} />
      <ScrollView className="flex-1 bg-paper" contentInsetAdjustmentBehavior="automatic">
        <View className="max-w-3xl mx-auto w-full p-4">
          
          <View className="mb-6 pb-4 border-b border-rule">
            <Text role="heading" aria-level="1" className="text-2xl font-bold text-ink tracking-tight">
              Käyttöehdot
            </Text>
            <Text className="text-ink-muted text-sm mt-1">
              Päivitetty: 18.10.2026
            </Text>
          </View>

          <Section title="1. Yleistä">
            <Paragraph>
              Nämä käyttöehdot koskevat Salainen Tiedekunta -mobiilisovellusta ja
              verkkosivustoa (jäljempänä &quot;Palvelu&quot;). Käyttämällä Palvelua hyväksyt
              nämä käyttöehdot.
            </Paragraph>
            <Paragraph>
              Palvelun tarjoaa Salainen Tiedekunta ry, Helsingin yliopiston
              kognitiotieteen opiskelijoiden opintopiiri.
            </Paragraph>
          </Section>

          <Section title="2. Palvelun kuvaus">
            <Paragraph>
              Palvelu tarjoaa tietoa kognitiotieteen opinnoista, kursseista,
              opettajista ja pääaineista Helsingin yliopistossa. Palvelu on
              tarkoitettu opiskelijoille, opettajille ja muille kognitiotieteestä
              kiinnostuneille.
            </Paragraph>
          </Section>

          <Section title="3. Käyttöoikeus">
            <Paragraph>
              Palvelu on ilmainen ja avoin kaikille käyttäjille. Käyttäjällä on
              oikeus käyttää Palvelua henkilökohtaisiin, ei-kaupallisiin
              tarkoituksiin näiden käyttöehtojen mukaisesti.
            </Paragraph>
          </Section>

          <Section title="4. Käyttäjän velvollisuudet">
            <Paragraph>
              Käyttäjä sitoutuu käyttämään Palvelua lain ja hyvien tapojen
              mukaisesti. Käyttäjä ei saa käyttää Palvelua tavalla, joka voi
              vahingoittaa Palvelua, muita käyttäjiä tai kolmansia osapuolia.
            </Paragraph>
          </Section>

          <Section title="5. Sisältö ja tekijänoikeudet">
            <Paragraph>
              Palvelun sisältö, mukaan lukien tekstit, kuvat, logot ja ohjelmisto,
              on suojattu tekijänoikeuksin. Käyttäjä ei saa kopioida, muokata tai
              levittää Palvelun sisältöä ilman erillistä lupaa.
            </Paragraph>
            <Paragraph>
              Palvelun kurssi-, pääaine- ja opettajatiedot ovat Salaisen Tiedekunnan omaa, satiirista sisältöä. Ne eivät ole Helsingin yliopiston virallisia tietoja.
            </Paragraph>
          </Section>

          <Section title="6. Vastuunrajoitukset">
            <Paragraph>
              Palvelu tarjotaan &quot;sellaisenaan&quot; ilman takuita. Emme takaa Palvelun
              keskeytymätöntä tai virheetöntä toimintaa. Emme vastaa Palvelun
              käytöstä aiheutuvista välittömistä tai välillisistä vahingoista.
            </Paragraph>
            <Paragraph>
              Kurssitiedot ja aikataulut voivat muuttua. Tarkista aina
              ajantasaiset tiedot Helsingin yliopiston virallisista lähteistä.
            </Paragraph>
          </Section>

          <Section title="7. Yksityisyys">
            <Paragraph>
              Palvelu ei kerää käyttäjistä henkilötietoja. Sovellus tallentaa
              paikallisesti laitteelle käyttäjän suosikit ja asetukset, mutta
              näitä tietoja ei lähetetä palvelimelle.
            </Paragraph>
          </Section>

          <Section title="8. Muutokset käyttöehtoihin">
            <Paragraph>
              Pidätämme oikeuden muuttaa näitä käyttöehtoja milloin tahansa.
              Muutoksista ilmoitetaan Palvelussa. Jatkamalla Palvelun käyttöä
              muutosten jälkeen käyttäjä hyväksyy muutetut käyttöehdot.
            </Paragraph>
          </Section>

          <Section title="9. Sovellettava laki">
            <Paragraph>
              Näihin käyttöehtoihin sovelletaan Suomen lakia. Mahdolliset
              erimielisyydet pyritään ratkaisemaan ensisijaisesti neuvottelemalla.
            </Paragraph>
          </Section>

          <Section title="10. Yhteystiedot">
            <Paragraph>
              Kysymykset käyttöehdoista voi lähettää X-tilille @tiedekunta (x.com/tiedekunta).
            </Paragraph>
          </Section>
        </View>
      </ScrollView>
    </>
  );
}
