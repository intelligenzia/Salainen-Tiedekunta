import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getCourse, getCourses, type CourseEntry, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createCourseSchema, SITE_URL } from '@/lib/seo';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';
import {
  BookOpen,
  Users,
  GraduationCap,
  Globe,
  Calendar,
  Clock,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Layers,
} from 'lucide-react-native';

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

// Section Card Component
function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  children: React.ReactNode;
}) {
  return (
    <View
      className="bg-white rounded-xl border border-zinc-200 overflow-hidden mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <Icon size={18} color="#3f3f46" />
        <Text className="text-zinc-700 font-semibold text-sm ml-2">{title}</Text>
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

// Metadata Row Component
function MetaRow({
  icon: Icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: string | React.ReactNode;
  onPress?: () => void;
}) {
  const Content = (
    <View className="flex-row items-center py-2">
      <View className="w-8 items-center">
        <Icon size={16} color="#71717a" />
      </View>
      <Text className="text-zinc-500 text-sm w-28">{label}</Text>
      {typeof value === 'string' ? (
        <Text
          className={`flex-1 text-sm font-medium ${onPress ? 'text-zinc-900 underline underline-offset-2 decoration-zinc-300' : 'text-zinc-900'}`}
        >
          {value}
        </Text>
      ) : (
        <View className="flex-1">{value}</View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className="active:bg-zinc-50 -mx-4 px-4">
        {Content}
      </Pressable>
    );
  }

  return Content;
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
      <View className="flex-1 bg-zinc-50 justify-center items-center">
        <ActivityIndicator size="large" color="#71717a" />
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 bg-zinc-50 justify-center items-center p-6">
        <Stack.Screen options={{ title: 'Kurssia ei löytynyt' }} />
        <AlertCircle size={48} color="#ef4444" />
        <Text className="text-red-600 text-center mt-4 font-medium">Kurssia ei löytynyt</Text>
        <Text className="text-zinc-500 text-center text-sm mt-2">
          Tarkista kurssikoodi ja yritä uudelleen
        </Text>
      </View>
    );
  }

  const { name, courseId, ects, description } = course.fields;
  const descriptionText = description ? documentToPlainTextString(description) : null;

  const pageDescription =
    descriptionText?.slice(0, 160) || `${name} - ${ects} opintopistettä. Salaisen Tiedekunnan opintojakso.`;

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
      <ScrollView className="flex-1 bg-zinc-50">
        <View className="max-w-4xl mx-auto w-full">
          {/* Course Header - Hero Section */}
          <View className="bg-zinc-900 px-4 py-6">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                {courseId && (
                  <Text className="text-zinc-400 text-sm font-mono mb-2 tracking-wide">
                    {courseId}
                  </Text>
                )}
                <Text className="text-white text-xl font-semibold tracking-tight leading-tight">
                  {name}
                </Text>
              </View>
              <View className="bg-white px-4 py-2 rounded-lg">
                <Text className="text-zinc-900 text-lg font-bold tabular-nums">{ects}</Text>
                <Text className="text-zinc-500 text-xs text-center">op</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row mt-4 gap-4">
              <View className="flex-row items-center">
                <Clock size={14} color="#a1a1aa" />
                <Text className="text-zinc-400 text-xs ml-1">133 t työmäärä</Text>
              </View>
              <View className="flex-row items-center">
                <Calendar size={14} color="#a1a1aa" />
                <Text className="text-zinc-400 text-xs ml-1">Syksy 2024</Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="p-4">
            {/* Course Metadata Card */}
            <SectionCard title="Perustiedot" icon={FileText}>
              <MetaRow icon={BookOpen} label="Organisaatio" value="Salainen Tiedekunta" />
              <MetaRow
                icon={Users}
                label="Opettaja"
                value={
                  <View>
                    {teachers.map((teacher, index) => (
                      <Pressable
                        key={teacher.sys.id}
                        onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
                        className="active:opacity-70"
                      >
                        <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                          {teacher.fields.name}
                          {index < teachers.length - 1 ? ', ' : ''}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                }
              />
              <MetaRow icon={GraduationCap} label="Taso" value="Perusopinnot" />
              <MetaRow icon={Globe} label="Kieli" value="suomi" />
              <MetaRow icon={Calendar} label="Ajoitus" value="1. vuosi, syksy" />
            </SectionCard>

            {/* Course Implementations */}
            <SectionCard title="Tulevat toteutukset" icon={Calendar}>
              <Pressable className="flex-row items-center py-3 border-b border-zinc-100 active:bg-zinc-50 -mx-4 px-4">
                <View className="flex-1">
                  <Text className="text-zinc-900 text-sm font-medium">{courseId}-2024-1</Text>
                  <Text className="text-zinc-500 text-xs mt-0.5">Luento + tentti</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-emerald-100 px-2 py-1 rounded mr-2">
                    <Text className="text-emerald-700 text-xs font-medium">Ilmoittautuminen auki</Text>
                  </View>
                  <Text className="text-zinc-400 text-sm mr-2">Syksy 2024</Text>
                  <ChevronRight size={16} color="#d4d4d8" />
                </View>
              </Pressable>
              <Pressable className="flex-row items-center py-3 active:bg-zinc-50 -mx-4 px-4">
                <View className="flex-1">
                  <Text className="text-zinc-900 text-sm font-medium">{courseId}-2025-1</Text>
                  <Text className="text-zinc-500 text-xs mt-0.5">Luento + tentti</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 text-sm mr-2">Kevät 2025</Text>
                  <ChevronRight size={16} color="#d4d4d8" />
                </View>
              </Pressable>
            </SectionCard>

            {/* Learning Objectives */}
            <SectionCard title="Osaamistavoitteet" icon={Target}>
              <Text className="text-zinc-600 text-sm mb-3">
                Opintojakson suoritettuaan opiskelija:
              </Text>
              {[
                'ymmärtää kognitiotieteen keskeiset käsitteet ja teoriat',
                'tuntee kognitiotieteen tutkimusmenetelmät',
                'osaa soveltaa kognitiotieteellistä ajattelua käytännön ongelmiin',
                'kykenee analysoimaan kognitiivisia prosesseja tieteellisesti',
              ].map((objective, index) => (
                <View key={index} className="flex-row items-start mb-2">
                  <CheckCircle size={16} color="#22c55e" style={{ marginTop: 2 }} />
                  <Text className="text-zinc-700 text-sm ml-2 flex-1">{objective}</Text>
                </View>
              ))}
            </SectionCard>

            {/* Course Content */}
            <SectionCard title="Asiasisältö" icon={BookOpen}>
              <Text className="text-zinc-600 text-sm leading-relaxed">
                {descriptionText ||
                  `Tällä opintojaksolla perehdytään kognitiotieteen keskeisiin käsitteisiin ja tutkimusmenetelmiin. Kurssi antaa yleiskuvan kognitiotieteen monitieteisestä luonteesta ja sen keskeisistä tutkimuskohteista, kuten havaitseminen, muisti, ajattelu ja kieli.

Opiskelijat tutustuvat kognitiotieteen historiaan ja sen yhteyksiin filosofiaan, psykologiaan, neurotieteeseen, kielitieteeseen ja tekoälyyn.`}
              </Text>
            </SectionCard>

            {/* Workload */}
            <SectionCard title="Työmäärä" icon={Clock}>
              {[
                { label: 'Luennot', hours: 24 },
                { label: 'Harjoitukset', hours: 12 },
                { label: 'Itsenäinen työskentely', hours: 97 },
              ].map((item, index) => (
                <View key={index} className="flex-row items-center justify-between py-2 border-b border-zinc-100">
                  <Text className="text-zinc-600 text-sm">{item.label}</Text>
                  <Text className="text-zinc-900 text-sm tabular-nums">{item.hours} t</Text>
                </View>
              ))}
              <View className="flex-row items-center justify-between pt-3">
                <Text className="text-zinc-900 text-sm font-semibold">Yhteensä</Text>
                <Text className="text-zinc-900 text-sm font-semibold tabular-nums">133 t</Text>
              </View>
            </SectionCard>

            {/* Assessment */}
            <SectionCard title="Arviointi" icon={CheckCircle}>
              <View className="flex-row items-center mb-3">
                <View className="bg-zinc-100 px-3 py-1 rounded-full">
                  <Text className="text-zinc-700 text-sm font-medium">Asteikko 0–5</Text>
                </View>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center">
                  <View className="w-24">
                    <Text className="text-zinc-600 text-sm">Tentti</Text>
                  </View>
                  <View className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <View className="h-full bg-zinc-700 rounded-full" style={{ width: '70%' }} />
                  </View>
                  <Text className="text-zinc-900 text-sm font-medium ml-3 w-10 text-right">70%</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-24">
                    <Text className="text-zinc-600 text-sm">Harjoitustyöt</Text>
                  </View>
                  <View className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <View className="h-full bg-zinc-500 rounded-full" style={{ width: '30%' }} />
                  </View>
                  <Text className="text-zinc-900 text-sm font-medium ml-3 w-10 text-right">30%</Text>
                </View>
              </View>
            </SectionCard>

            {/* Prerequisites */}
            <SectionCard title="Esitietovaatimukset" icon={AlertCircle}>
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-lg mr-3">
                  <CheckCircle size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-900 text-sm font-medium">Ei vaadittavia esitietoja</Text>
                  <Text className="text-zinc-500 text-xs mt-0.5">
                    Kurssi soveltuu ensimmäisen vuoden opiskelijoille
                  </Text>
                </View>
              </View>
            </SectionCard>

            {/* Related Study Module */}
            <Pressable
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden mb-8 active:bg-zinc-50"
              onPress={() => router.push('/majors')}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <View className="flex-row items-center p-4">
                <View className="bg-zinc-900 p-3 rounded-lg mr-4">
                  <Layers size={24} color="#fff" />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">
                    Kuuluu kokonaisuuteen
                  </Text>
                  <Text className="text-zinc-900 font-semibold">Kognitiotieteen perusopinnot</Text>
                  <Text className="text-zinc-500 text-sm">25 op</Text>
                </View>
                <ChevronRight size={24} color="#d4d4d8" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
