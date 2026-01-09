import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getCourse, getCourses, type CourseEntry, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createCourseSchema, SITE_URL } from '@/lib/seo';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';

const isWeb = Platform.OS === 'web';

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

interface LoaderData {
  course: CourseEntry | null;
  teachers: TeacherEntry[];
}

export async function loader({ params }: { params: { id: string } }): Promise<LoaderData> {
  if (!isWeb) return { course: null, teachers: [] };
  try {
    const data = await getCourse(params.id);
    if (data) {
      return {
        course: data.course,
        teachers: data.teachers.length > 0 ? data.teachers : placeholderTeachers,
      };
    }
    return {
      course: { ...placeholderCourse, fields: { ...placeholderCourse.fields, courseId: params.id } },
      teachers: placeholderTeachers,
    };
  } catch {
    return { course: placeholderCourse, teachers: placeholderTeachers };
  }
}

export default function CourseDetailScreen({ loaderData }: { loaderData?: LoaderData }) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<CourseEntry | null>(loaderData?.course ?? null);
  const [teachers, setTeachers] = useState<TeacherEntry[]>(loaderData?.teachers ?? []);
  const [loading, setLoading] = useState(!isWeb || !loaderData?.course);

  useEffect(() => {
    if (isWeb && loaderData?.course) return;

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
  }, [id, loaderData?.course]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#71717a" />
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-6">
        <Stack.Screen options={{ title: 'Kurssia ei löytynyt' }} />
        <Text className="text-red-600 text-center">Kurssia ei löytynyt</Text>
      </View>
    );
  }

  const { name, courseId, ects, description } = course.fields;
  const descriptionText = description ? documentToPlainTextString(description) : null;

  const pageDescription = descriptionText?.slice(0, 160) || `${name} - ${ects} opintopistettä. Salaisen Tiedekunnan opintojakso.`;

  const courseSchema = createCourseSchema({
    name: name,
    courseId: courseId,
    description: pageDescription,
    ects: ects,
    teachers: teachers
      .filter((t) => t.fields.name)
      .map((t) => ({
        name: t.fields.name!,
        slug: t.fields.slug,
      })),
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Kurssit', url: `${SITE_URL}/courses` },
    { name: courseId || name, url: `${SITE_URL}/courses/${courseId || id}` },
  ]);

  return (
    <>
      <SEO
        title={`${courseId} ${name}`}
        description={pageDescription}
        path={`/courses/${courseId || id}`}
        type="article"
        jsonLd={[courseSchema, breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: courseId || name }} />
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-4xl mx-auto w-full">
        {/* Course Header */}
        <View className="p-4 border-b border-zinc-200">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-zinc-900 text-xl font-semibold mb-1 tracking-tight">
                {name}
              </Text>
              {courseId && (
                <Text className="text-zinc-400 text-sm font-mono">
                  {courseId}
                </Text>
              )}
            </View>
            <View className="bg-zinc-900 px-3 py-1 rounded">
              <Text className="text-zinc-50 font-medium tabular-nums">{ects} op</Text>
            </View>
          </View>
        </View>

        {/* Course Metadata */}
        <View className="bg-zinc-50 px-4 py-4 border-b border-zinc-200">
          <View className="gap-2">
            <View className="flex-row">
              <Text className="text-zinc-500 w-40 text-sm">Vastuuorganisaatio</Text>
              <Text className="text-zinc-900 flex-1 text-sm font-medium">Salainen Tiedekunta</Text>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-40 text-sm">Vastaava opettaja</Text>
              <View className="flex-1">
                {teachers.map((teacher, index) => (
                  <Pressable
                    key={teacher.sys.id}
                    onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
                  >
                    <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                      {teacher.fields.name}{index < teachers.length - 1 ? ', ' : ''}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-40 text-sm">Opintojakson taso</Text>
              <Text className="text-zinc-900 flex-1 text-sm font-medium">Perusopinnot</Text>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-40 text-sm">Opetuskieli</Text>
              <Text className="text-zinc-900 flex-1 text-sm font-medium">suomi</Text>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-40 text-sm">Ajoitus</Text>
              <Text className="text-zinc-900 flex-1 text-sm font-medium">1. vuosi, syksy</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4">
          {/* Course Implementations */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Opintojakson suoritusvaihtoehdot
            </Text>
            <View className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <View className="bg-zinc-50 px-4 py-3 border-b border-zinc-200">
                <View className="flex-row">
                  <Text className="flex-1 text-xs font-medium text-zinc-500 uppercase tracking-wide">Toteutus</Text>
                  <Text className="w-20 text-xs font-medium text-zinc-500 uppercase tracking-wide">Ajankohta</Text>
                </View>
              </View>
              <Pressable className="px-4 py-3 border-b border-zinc-100 active:bg-zinc-50">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                      {courseId}-2024-1
                    </Text>
                    <Text className="text-zinc-400 text-xs mt-1">
                      Luento + tentti
                    </Text>
                  </View>
                  <Text className="w-20 text-sm text-zinc-500">Syksy 2024</Text>
                </View>
              </Pressable>
              <Pressable className="px-4 py-3 active:bg-zinc-50">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                      {courseId}-2025-1
                    </Text>
                    <Text className="text-zinc-400 text-xs mt-1">
                      Luento + tentti
                    </Text>
                  </View>
                  <Text className="w-20 text-sm text-zinc-500">Kevät 2025</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Course Information */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Opintojakson tiedot
            </Text>

            {/* Osaamistavoitteet */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-zinc-900 mb-2">
                Osaamistavoitteet
              </Text>
              <View className="pl-4">
                <Text className="text-sm text-zinc-600 mb-1">
                  Opintojakson suoritettuaan opiskelija:
                </Text>
                <View className="gap-1">
                  <Text className="text-sm text-zinc-600">
                    • ymmärtää kognitiotieteen keskeiset käsitteet ja teoriat
                  </Text>
                  <Text className="text-sm text-zinc-600">
                    • tuntee kognitiotieteen tutkimusmenetelmät
                  </Text>
                  <Text className="text-sm text-zinc-600">
                    • osaa soveltaa kognitiotieteellistä ajattelua käytännön ongelmiin
                  </Text>
                  <Text className="text-sm text-zinc-600">
                    • kykenee analysoimaan kognitiivisia prosesseja tieteellisesti
                  </Text>
                </View>
              </View>
            </View>

            {/* Asiasisältö */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-zinc-900 mb-2">
                Asiasisältö
              </Text>
              <Text className="text-sm text-zinc-600 pl-4">
                {descriptionText ||
                  `Tällä opintojaksolla perehdytään kognitiotieteen keskeisiin käsitteisiin ja tutkimusmenetelmiin. Kurssi antaa yleiskuvan kognitiotieteen monitieteisestä luonteesta ja sen keskeisistä tutkimuskohteista, kuten havaitseminen, muisti, ajattelu ja kieli.

Opiskelijat tutustuvat kognitiotieteen historiaan ja sen yhteyksiin filosofiaan, psykologiaan, neurotieteeseen, kielitieteeseen ja tekoälyyn.`}
              </Text>
            </View>

            {/* Suoritustavat */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-zinc-900 mb-2">
                Suoritustavat
              </Text>
              <View className="pl-4">
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-zinc-600">Luennot</Text>
                  <Text className="text-sm text-zinc-500 tabular-nums">24 t</Text>
                </View>
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-zinc-600">Harjoitukset</Text>
                  <Text className="text-sm text-zinc-500 tabular-nums">12 t</Text>
                </View>
                <View className="flex-row justify-between py-1">
                  <Text className="text-sm text-zinc-600">Itsenäinen työskentely</Text>
                  <Text className="text-sm text-zinc-500 tabular-nums">97 t</Text>
                </View>
                <View className="flex-row justify-between py-1 border-t border-zinc-200 mt-1 pt-2">
                  <Text className="text-sm text-zinc-900 font-medium">Yhteensä</Text>
                  <Text className="text-sm text-zinc-900 font-medium tabular-nums">133 t</Text>
                </View>
              </View>
            </View>

            {/* Arviointi */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-zinc-900 mb-2">
                Arviointi
              </Text>
              <Text className="text-sm text-zinc-600 pl-4">
                Arvosana-asteikko 0–5. Tentti 70%, harjoitustyöt 30%.
              </Text>
            </View>

            {/* Esitietovaatimukset */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-zinc-900 mb-2">
                Esitietovaatimukset
              </Text>
              <Text className="text-sm text-zinc-600 pl-4">
                Ei vaadittavia esitietoja. Kurssi soveltuu ensimmäisen vuoden opiskelijoille.
              </Text>
            </View>
          </View>

          {/* Related Study Module */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Opintokokonaisuus
            </Text>
            <Pressable
              className="bg-white border border-zinc-200 rounded-lg p-4 active:bg-zinc-50"
              onPress={() => router.push('/majors')}
            >
              <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                Kognitiotieteen perusopinnot (25 op)
              </Text>
              <Text className="text-zinc-400 text-xs mt-1">
                Tämä opintojakso kuuluu kognitiotieteen perusopintoihin
              </Text>
            </Pressable>
          </View>
        </View>
        </View>
      </ScrollView>
    </>
  );
}
