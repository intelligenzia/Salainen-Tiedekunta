import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { Footer } from '@/components/Footer';
import { getCourses, type CourseEntry } from '@/lib/contentful';
import { Link, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const navItems = [
  {
    title: 'Pääaineet',
    description: 'Tutustu kognitiotieteen opintosuuntiin ja opintokokonaisuuksiin',
    href: '/majors',
  },
  {
    title: 'Kurssit',
    description: 'Selaa kaikkia tarjolla olevia kursseja',
    href: '/courses',
  },
  {
    title: 'Opettajat',
    description: 'Tutustu tiedekunnan opettajiin ja tutkijoihin',
    href: '/teachers',
  },
];

// Placeholder courses for when Contentful has no data
const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-102', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: '3' }, fields: { courseId: 'KOG-201', name: 'Neurotiede ja aivot', ects: 5 } },
  { sys: { id: '4' }, fields: { courseId: 'KOG-202', name: 'Koneoppimisen perusteet', ects: 5 } },
  { sys: { id: '5' }, fields: { courseId: 'KOG-301', name: 'Luonnollisen kielen käsittely', ects: 5 } },
  { sys: { id: '6' }, fields: { courseId: 'KOG-302', name: 'Tekoälyn filosofia', ects: 5 } },
];

// Faculty information sections
const facultyInfo = [
  {
    id: 'hallinto',
    title: 'Hallinto ja asema yliopistossa',
    content: `Tiedekunta muodostaa itsenäisen kokonaisuuden, joka on riippumaton yliopiston muusta toiminnasta. Hallinto on salamyhkäinen ja kryptinen kokonaisuus, jonka ymmärtäminen tuottaa ylivoimaisia vaikeuksia kaikille tiedekunnan toimintaa tarkkaileville. Tämän tarkoituksena on tiedekunnan toiminnan suojeleminen.

Legaalisista syistä tiedekunnan toiminta joudutaan pitämään toistaiseksi salaisena, ja pääosa opetuksesta järjestetään suljettujen ovien takana. Henkilökunta toivoo yhteiskunnan ja sen myötä yliopiston kehittyvän nykyajan tarpeita vastaavaksi siten, että sal. tdk:n toiminta voidaan tehdä lopulta täysin julkiseksi.

Salainen tiedekunta pyrkii tutkimuksen huippuyksiköksi vuonna 2005. Tämän vuoksi myös opettamista kehitetään nyt voimakkaasti ja opiskelijoita pyydetään täyttämään kurssien palautelomakkeet, joista osa on myös tämän oppaan liitteinä.`,
  },
  {
    id: 'tilat',
    title: 'Tiedekunnan tilat',
    content: `Salaisen tiedekunnan tilat vaihtavat olinpaikkaa nopeaan tahtiin. Keskeisen elementin muodostaa puhallettava toimisto, joka sijaitsee yleensä jossain kaupungin puistossa ellei satu olemaan lainassa tai paikattavana. Uusimpana hankintana tiedekunnalla on oma puhallettu (NASA:n tahattomasti lahjoittama) avaruusalus.`,
  },
  {
    id: 'hyvaksiluku',
    title: 'Opintojen hyväksilukeminen',
    content: `Muualla suoritettujen opintojen hyväksilukemisesta päätetään laitoskohtaisesti. Muissa korkeakouluissa ja tiedekunnissa ei juuri tarjota salaisen tiedekunnan kurssivaatimuksia vastaavaa opetusta, mutta joitakin taitoja opiskelija on voinut hyvinkin saavuttaa elämässään muuta kautta, esimerkiksi harrastusten piirissä.`,
  },
  {
    id: 'neuvonta',
    title: 'Opintoneuvonta',
    content: `Opintoneuvontaa annetaan pääasiassa telepaattisesti. Mikäli telepatia tuottaa ongelmia, kannattaa opiskelijan kääntyä tiedekunnan toimiston puoleen.`,
  },
  {
    id: 'opiskeluoikeus',
    title: 'Opiskeluoikeus',
    content: `Opiskeluoikeutta tiedekunnassa ei ole mitenkään rajoitettu. Opetuksesta kiinnostuneen on kuitenkin syytä huomioida kohta Opiskelijan velvollisuudet.`,
  },
  {
    id: 'velvollisuudet',
    title: 'Opiskelijan velvollisuudet',
    content: `Tiedekuntaan kirjoittautuva joutuu antamaan salassapitolupauksen, joka velvoittaa hänet salaamaan tiettyjen kurssien opettajien henkilöllisyydet, luento- ja harjoitustyöajat ja -paikat, kurssimateriaalien säilytyspaikat sekä kurssien tarkemman sisällön - myös ja eritoten poliisikuulustelussa.`,
  },
  {
    id: 'vaihto',
    title: 'Opiskelijavaihto',
    content: `Salainen tiedekunta pidättää oikeuden vaihtaa opiskelija milloin tahansa mihin tahansa. Vaihtaminen tapahtuu suurella varmuudella erityisesti, jos opiskelija epäonnistuu salassapitovelvollisuuden täyttämisessä.`,
  },
];

// Seeded random number generator for consistent daily selection
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Get a seed based on today's date (changes daily)
function getDailySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// Shuffle array with seeded random
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const random = seededRandom(seed);
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Index() {
  const router = useRouter();
  const [featuredCourses, setFeaturedCourses] = useState<CourseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        const data = await getCourses();
        const courses = data.length > 0 ? data : placeholderCourses;
        const seed = getDailySeed();
        const shuffled = shuffleWithSeed(courses, seed);
        setFeaturedCourses(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Error fetching courses:', err);
        const seed = getDailySeed();
        const shuffled = shuffleWithSeed(placeholderCourses, seed);
        setFeaturedCourses(shuffled.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCourses();
  }, []);

  return (
    <>
      <Head>
        <title>Salainen Tiedekunta - Helsingin yliopiston kognitiotieteen opintopiiri</title>
        <meta name="description" content="Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio." />
        <meta property="og:title" content="Salainen Tiedekunta" />
        <meta property="og:description" content="Helsingin yliopiston kognitiotieteen opintopiiri. Perustettu 1998." />
        <meta property="og:url" content="https://tiedekunta.com" />
        <link rel="canonical" href="https://tiedekunta.com" />
      </Head>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1">
          {/* Black Header */}
        <View className="bg-black px-6 pt-12 pb-8">
          <Text className="text-4xl font-bold text-white mb-1">
            Salainen Tiedekunta
          </Text>
          <Text className="text-lg text-white/70">
            Helsingin yliopiston kognitiotieteen opintopiiri
          </Text>
        </View>

        {/* Introduction */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-gray-700 text-sm leading-relaxed">
            Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu
            kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä
            organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on
            muutamassa vuodessa kasvanut useita laitoksia sisältäväksi
            täysimittaiseksi tiedekunnaksi.
          </Text>
        </View>

        {/* Open for Enrollment Section */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Ilmoittautuminen auki
          </Text>
          {loading ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <View className="gap-3">
              {featuredCourses.map((course) => (
                <Pressable
                  key={course.sys.id}
                  onPress={() => router.push(`/courses/${course.fields.courseId || course.sys.id}`)}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 active:bg-gray-100"
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 pr-4">
                      {course.fields.courseId && (
                        <Text className="text-gray-500 text-xs mb-1">
                          {course.fields.courseId}
                        </Text>
                      )}
                      <Text className="text-blue-600 font-medium text-sm">
                        {course.fields.name}
                      </Text>
                    </View>
                    <Text className="text-gray-600 text-sm">{course.fields.ects} op</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Navigation Links */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Selaa opintoja
          </Text>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as any} asChild>
              <Pressable className="border-b border-gray-200 py-4 active:bg-gray-50">
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 pr-4">
                    <Text className="text-blue-600 font-medium text-base">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                      {item.description}
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-lg">{'>'}</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>

        {/* Faculty Information Accordion */}
        <View className="px-6 pt-6 pb-12">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Tietoa tiedekunnasta
          </Text>
          <View className="border border-gray-200 rounded-lg overflow-hidden">
            <Accordion type="multiple" collapsible>
              {facultyInfo.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="px-4">
                    <Text className="text-gray-900 font-medium text-sm flex-1 text-left">
                      {item.title}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text className="text-gray-600 text-sm leading-relaxed m-4">
                      {item.content}
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </View>
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
