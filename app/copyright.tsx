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

export default function CopyrightScreen() {
  const currentYear = new Date().getFullYear();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Tekijänoikeudet', url: `${SITE_URL}/copyright` },
  ]);

  return (
    <>
      <SEO
        title="Tekijänoikeudet"
        description="Salainen Tiedekunta -sovelluksen tekijänoikeustiedot."
        path="/copyright"
        jsonLd={[breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: 'Tekijänoikeudet' }} />
      <ScrollView className="flex-1 bg-paper" contentInsetAdjustmentBehavior="automatic">
        <View className="max-w-3xl mx-auto w-full p-4">
          
          <View className="mb-6 pb-4 border-b border-rule">
            <Text role="heading" aria-level="1" className="text-2xl font-bold text-ink tracking-tight">
              Tekijänoikeudet
            </Text>
            <Text className="text-ink-muted text-sm mt-1">
              Copyright Notice
            </Text>
          </View>

          
          <View className="bg-sunken rounded-2xl p-6 mb-6">
            <Text className="font-semibold text-ink text-lg text-center">
              © {currentYear} Salainen Tiedekunta ry
            </Text>
            <Text className="text-ink-muted text-sm text-center mt-2">
              Kaikki oikeudet pidätetään
            </Text>
          </View>

          <Section title="Sovellus ja verkkosivusto">
            <Paragraph>
              Salainen Tiedekunta -mobiilisovellus ja verkkosivusto ovat Salainen
              Tiedekunta ry:n omaisuutta. Sovelluksen lähdekoodi on julkaistu
              MIT-lisenssillä.
            </Paragraph>
          </Section>

          <Section title="Sisältö">
            <Paragraph>
              Sovelluksen sisältö, mukaan lukien tekstit, kuvaukset ja rakenne,
              on Salainen Tiedekunta ry:n tekijänoikeuden alaista materiaalia,
              ellei toisin mainita.
            </Paragraph>
            <Paragraph>
              Kurssitiedot ja opettajatiedot ovat peräisin Helsingin yliopiston
              julkisista tietolähteistä ja niitä käytetään tiedotustarkoituksiin.
            </Paragraph>
          </Section>

          <Section title="Tavaramerkit">
            <Paragraph>
              &quot;Salainen Tiedekunta&quot; on Intelligenzia ry:n rekisteröimätön
              tavaramerkki. Helsingin yliopisto on Helsingin yliopiston
              rekisteröity tavaramerkki.
            </Paragraph>
          </Section>

          <Section title="Kolmannen osapuolen sisältö">
            <Paragraph>
              Sovellus käyttää avoimen lähdekoodin kirjastoja, joiden
              tekijänoikeudet kuuluvat niiden alkuperäisille tekijöille.
              Täydellinen luettelo käytetyistä kirjastoista ja niiden
              lisensseistä löytyy &quot;Avoimen lähdekoodin kirjastot&quot; -sivulta.
            </Paragraph>
          </Section>

          <Section title="Käyttöoikeus">
            <Paragraph>
              Käyttäjällä on oikeus käyttää sovellusta ja sen sisältöä
              henkilökohtaisiin, ei-kaupallisiin tarkoituksiin. Sisällön
              kopioiminen, muokkaaminen tai levittäminen kaupallisiin
              tarkoituksiin ilman erillistä lupaa on kielletty.
            </Paragraph>
          </Section>

          <Section title="Yhteystiedot">
            <Paragraph>
              Tekijänoikeuksia koskevat kysymykset voi lähettää osoitteeseen:
              info@tiedekunta.fi
            </Paragraph>
          </Section>

          
          <View className="mt-8 mb-8 bg-sunken rounded-lg p-4">
            <Text className="text-ink font-semibold mb-2">
              Salainen Tiedekunta ry
            </Text>
            <Text className="text-ink-soft text-sm">
              Helsingin yliopiston kognitiotieteen opiskelijoiden opintopiiri
            </Text>
            <Text className="text-ink-muted text-sm mt-2">
              Perustettu 1998
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
