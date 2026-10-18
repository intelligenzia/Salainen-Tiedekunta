import { Breadcrumb } from '@/components/Breadcrumb';
import { SEO } from '@/components/SEO';
import { Hero, Notice, Page, Prose, Section } from '@/components/kit';

const UPDATED = '18.10.2026';

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Lyhyesti',
    paragraphs: [
      'Salainen Tiedekunta -sovellus ja tiedekunta.com eivät kerää käyttäjistä henkilötietoja. Emme käytä analytiikkaa, mainoksia, seurantaevästeitä tai käyttäjätilejä.',
    ],
  },
  {
    title: 'Laitteelle tallennettavat tiedot',
    paragraphs: [
      'Suosikkikurssit, teemavalinta ja salassapitolupauksen hyväksyntä tallennetaan vain omalle laitteellesi (sovelluksessa laitteen muistiin, verkkosivulla selaimen paikalliseen tallennustilaan). Niitä ei lähetetä meille eikä kolmansille osapuolille. Voit poistaa ne poistamalla sovelluksen tai tyhjentämällä selaimen sivustotiedot.',
    ],
  },
  {
    title: 'Palveluntarjoajat',
    paragraphs: [
      'Kurssien, pääaineiden ja opettajien tiedot haetaan Contentful-sisällönhallintapalvelusta. Verkkosivusto toimii Netlify-palvelussa. Kuten kaikki verkkopalvelut, nämä palveluntarjoajat käsittelevät teknisiä tietoja, kuten IP-osoitetta, pyyntöjen välittämiseksi ja palvelun turvallisuuden ylläpitämiseksi. Emme saa näistä tiedoista käyttäjäkohtaisia raportteja.',
    ],
  },
  {
    title: 'Muutokset ja yhteydenotot',
    paragraphs: [
      'Päivitämme tätä selostetta tarvittaessa. Kysymykset voi lähettää X-tilille @tiedekunta (x.com/tiedekunta).',
    ],
  },
];

export default function PrivacyScreen() {
  return (
    <>
      <SEO
        title="Tietosuojaseloste"
        description="Salainen Tiedekunta ei kerää käyttäjistä henkilötietoja. Suosikit ja asetukset tallennetaan vain omalle laitteellesi."
        path="/privacy"
      />
      <Breadcrumb items={[{ label: 'Tietosuoja' }]} />
      <Page>
        <Hero kicker={`Päivitetty ${UPDATED}`} title="Tietosuojaseloste" />
        {sections.map((s) => (
          <Section key={s.title} title={s.title}>
            <Prose blocks={s.paragraphs.map((text) => ({ kind: 'paragraph' as const, text }))} />
          </Section>
        ))}
        <Notice text="Tämä on ainoa tiedekunnan asiakirja, joka ei ole salainen." />
      </Page>
    </>
  );
}
