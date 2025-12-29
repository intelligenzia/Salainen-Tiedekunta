import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { SafeAreaView } from 'react-native-safe-area-context';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Text } from '@/components/ui/text';
import { getCourse, getCourses, type CourseEntry, type TeacherEntry } from '@/lib/contentful';

// Generate static params for all courses at build time
export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const courses = await getCourses();
    return courses.map((course) => ({
      id: course.fields.courseId || course.sys.id,
    }));
  } catch {
    return [];
  }
}

// Placeholder data
const placeholderCourse: CourseEntry = {
  sys: { id: 'placeholder' },
  fields: {
    courseId: 'KOG-101',
    name: 'Johdatus kognitiotieteeseen',
    ects: 5,
  },
};

const placeholderTeachers: TeacherEntry[] = [
  { sys: { id: 't1' }, fields: { name: 'Prof. Matti Meikäläinen', slug: 'matti-meikalainen' } },
];

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<CourseEntry | null>(null);
  const [teachers, setTeachers] = useState<TeacherEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!id) return;
      try {
        const data = await getCourse(id);
        if (data) {
          setCourse(data.course);
          setTeachers(data.teachers.length > 0 ? data.teachers : placeholderTeachers);
        } else {
          setCourse({ ...placeholderCourse, fields: { ...placeholderCourse.fields, courseId: id } });
          setTeachers(placeholderTeachers);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setCourse(placeholderCourse);
        setTeachers(placeholderTeachers);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
        <Stack.Screen options={{ title: 'Kurssia ei löytynyt' }} />
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-destructive text-center">Kurssia ei löytynyt</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { name, courseId, ects, description } = course.fields;
  const descriptionText = description ? documentToPlainTextString(description) : null;

  const pageTitle = `${courseId || name} - Salainen Tiedekunta`;
  const pageDescription = descriptionText?.slice(0, 160) || `${name} - ${ects} opintopistettä. Salaisen Tiedekunnan opintojakso.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={`${courseId} ${name}`} />
        <meta property="og:description" content={pageDescription} />
        <link rel="canonical" href={`https://tiedekunta.com/courses/${courseId || id}`} />
      </Head>
      <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView className="flex-1">
          {/* Black Header */}
          <View className="bg-black px-4 py-6">
            {/* Breadcrumb */}
          <View className="flex-row flex-wrap mb-4">
            <Pressable onPress={() => router.push('/courses')}>
              <Text className="text-white/70 text-sm">Kurssit</Text>
            </Pressable>
            <Text className="text-white/50 text-sm mx-2">/</Text>
            <Text className="text-white text-sm">{courseId || name}</Text>
          </View>

          {/* Course Title */}
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-white text-2xl font-bold mb-1">
                {courseId}
              </Text>
              <Text className="text-white text-lg">
                {name}
              </Text>
            </View>
            <View className="bg-white/10 px-3 py-1 rounded">
              <Text className="text-white font-semibold">{ects} op</Text>
            </View>
          </View>
        </View>

        {/* Course Metadata */}
        <View className="bg-gray-100 px-4 py-4 border-b border-gray-200">
          <View className="gap-2">
            <View className="flex-row">
              <Text className="text-gray-600 w-40 text-sm">Vastuuorganisaatio</Text>
              <Text className="text-gray-900 flex-1 text-sm font-medium">Salainen Tiedekunta</Text>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-40 text-sm">Vastaava opettaja</Text>
              <View className="flex-1">
                {teachers.map((teacher, index) => (
                  <Pressable
                    key={teacher.sys.id}
                    onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
                  >
                    <Text className="text-blue-600 text-sm font-medium">
                      {teacher.fields.name}{index < teachers.length - 1 ? ', ' : ''}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-40 text-sm">Opintojakson taso</Text>
              <Text className="text-gray-900 flex-1 text-sm font-medium">Perusopinnot</Text>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-40 text-sm">Opetuskieli</Text>
              <Text className="text-gray-900 flex-1 text-sm font-medium">suomi</Text>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-40 text-sm">Ajoitus</Text>
              <Text className="text-gray-900 flex-1 text-sm font-medium">1. vuosi, syksy</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4">
          {/* Course Implementations */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Opintojakson suoritusvaihtoehdot
            </Text>
            <View className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <View className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <View className="flex-row">
                  <Text className="flex-1 text-sm font-semibold text-gray-700">Toteutus</Text>
                  <Text className="w-20 text-sm font-semibold text-gray-700">Ajankohta</Text>
                </View>
              </View>
              <Pressable className="px-4 py-3 border-b border-gray-100 active:bg-gray-50">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-blue-600 text-sm font-medium">
                      {courseId}-2024-1
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      Luento + tentti
                    </Text>
                  </View>
                  <Text className="w-20 text-sm text-gray-600">Syksy 2024</Text>
                </View>
              </Pressable>
              <Pressable className="px-4 py-3 active:bg-gray-50">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-blue-600 text-sm font-medium">
                      {courseId}-2025-1
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      Luento + tentti
                    </Text>
                  </View>
                  <Text className="w-20 text-sm text-gray-600">Kevät 2025</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Course Information */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Opintojakson tiedot
            </Text>

            {/* Osaamistavoitteet */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Osaamistavoitteet
              </Text>
              <View className="pl-4">
                <Text className="text-sm text-gray-700 mb-1">
                  Opintojakson suoritettuaan opiskelija:
                </Text>
                <View className="gap-1">
                  <Text className="text-sm text-gray-700">
                    - ymmärtää kognitiotieteen keskeiset käsitteet ja teoriat
                  </Text>
                  <Text className="text-sm text-gray-700">
                    - tuntee kognitiotieteen tutkimusmenetelmät
                  </Text>
                  <Text className="text-sm text-gray-700">
                    - osaa soveltaa kognitiotieteellistä ajattelua käytännön ongelmiin
                  </Text>
                  <Text className="text-sm text-gray-700">
                    - kykenee analysoimaan kognitiivisia prosesseja tieteellisesti
                  </Text>
                </View>
              </View>
            </View>

            {/* Asiasisältö */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Asiasisältö
              </Text>
              <Text className="text-sm text-gray-700 pl-4">
                {descriptionText ||
                  `Tällä opintojaksolla perehdytään kognitiotieteen keskeisiin käsitteisiin ja tutkimusmenetelmiin. Kurssi antaa yleiskuvan kognitiotieteen monitieteisestä luonteesta ja sen keskeisistä tutkimuskohteista, kuten havaitseminen, muisti, ajattelu ja kieli.

Opiskelijat tutustuvat kognitiotieteen historiaan ja sen yhteyksiin filosofiaan, psykologiaan, neurotieteeseen, kielitieteeseen ja tekoälyyn.`}
              </Text>
            </View>

            {/* Suoritustavat */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Suoritustavat
              </Text>
              <View className="pl-4">
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-gray-700">Luennot</Text>
                  <Text className="text-sm text-gray-600">24 t</Text>
                </View>
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-gray-700">Harjoitukset</Text>
                  <Text className="text-sm text-gray-600">12 t</Text>
                </View>
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-gray-700">Itsenäinen työskentely</Text>
                  <Text className="text-sm text-gray-600">97 t</Text>
                </View>
                <View className="flex-row justify-between py-1 border-t border-gray-200 mt-1 pt-2">
                  <Text className="text-sm text-gray-900 font-medium">Yhteensä</Text>
                  <Text className="text-sm text-gray-900 font-medium">133 t</Text>
                </View>
              </View>
            </View>

            {/* Arviointi */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Arviointi
              </Text>
              <Text className="text-sm text-gray-700 pl-4">
                Arvosana-asteikko 0-5. Tentti 70%, harjoitustyöt 30%.
              </Text>
            </View>

            {/* Esitietovaatimukset */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Esitietovaatimukset
              </Text>
              <Text className="text-sm text-gray-700 pl-4">
                Ei vaadittavia esitietoja. Kurssi soveltuu ensimmäisen vuoden opiskelijoille.
              </Text>
            </View>
          </View>

          {/* Related Study Module */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Opintokokonaisuus
            </Text>
            <Pressable
              className="bg-white border border-gray-200 rounded-lg p-4 active:bg-gray-50"
              onPress={() => router.push('/majors')}
            >
              <Text className="text-blue-600 text-sm font-medium">
                Kognitiotieteen perusopinnot (25 op)
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                Tämä opintojakso kuuluu kognitiotieteen perusopintoihin
              </Text>
            </Pressable>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
