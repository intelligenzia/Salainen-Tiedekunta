import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SkeletonCard, SkeletonText } from '@/components/ui/skeleton';
import { getCourse, getCourses, type CourseEntry, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createCourseSchema, SITE_URL } from '@/lib/seo';
import { useCourse } from '@/lib/hooks/useQueries';
import { useFavorites } from '@/lib/stores/favorites';
import { useTheme } from '@/lib/stores/theme';
import { haptics } from '@/lib/haptics';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Platform, Pressable, RefreshControl, ScrollView, View, Share } from 'react-native';
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
  Heart,
  Share2,
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

export async function loader({ params }: { params: { id: string } }) {
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

// Section Card Component with dark mode
function SectionCard({
  title,
  icon: Icon,
  children,
  isDark,
}: {
  title: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <View
      className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
      accessibilityRole="region"
      accessibilityLabel={title}
    >
      <View className="flex-row items-center px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
        <Icon size={18} color={isDark ? '#a1a1aa' : '#3f3f46'} />
        <Text className="text-zinc-700 dark:text-zinc-200 font-semibold text-sm ml-2">{title}</Text>
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

// Metadata Row Component with dark mode
function MetaRow({
  icon: Icon,
  label,
  value,
  onPress,
  isDark,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: string | React.ReactNode;
  onPress?: () => void;
  isDark: boolean;
}) {
  const Content = (
    <View className="flex-row items-center py-2">
      <View className="w-8 items-center">
        <Icon size={16} color={isDark ? '#a1a1aa' : '#71717a'} />
      </View>
      <Text className="text-zinc-500 dark:text-zinc-400 text-sm w-28">{label}</Text>
      {typeof value === 'string' ? (
        <Text
          className={`flex-1 text-sm font-medium ${
            onPress
              ? 'text-zinc-900 dark:text-zinc-100 underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-600'
              : 'text-zinc-900 dark:text-zinc-100'
          }`}
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
      <Pressable
        onPress={onPress}
        className="active:bg-zinc-50 dark:active:bg-zinc-700 -mx-4 px-4"
        accessibilityRole="button"
      >
        {Content}
      </Pressable>
    );
  }

  return Content;
}

export default function CourseDetailScreen({
  loaderData,
}: {
  loaderData?: { course: CourseEntry | null; teachers: TeacherEntry[] };
}) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isDark } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Use React Query for data fetching
  const { data, isLoading, refetch, isRefetching } = useCourse(id || '');

  const course = data?.course ?? loaderData?.course ?? null;
  const teachers = data?.teachers ?? loaderData?.teachers ?? placeholderTeachers;

  const courseId = course?.fields.courseId || id || '';
  const isFav = isFavorite(courseId);

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(() => {
    haptics.selection();
    toggleFavorite(courseId);
  }, [courseId, toggleFavorite]);

  // Handle share
  const handleShare = useCallback(async () => {
    haptics.light();
    try {
      await Share.share({
        title: `${course?.fields.courseId} ${course?.fields.name}`,
        message: `Tutustu kurssiin ${course?.fields.name} Salaisen Tiedekunnan sivuilla: ${SITE_URL}/courses/${courseId}`,
        url: `${SITE_URL}/courses/${courseId}`,
      });
    } catch {
      // Ignore share errors
    }
  }, [course, courseId]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    haptics.light();
    refetch();
  }, [refetch]);

  if (isLoading && !course) {
    return (
      <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
        <Stack.Screen options={{ title: 'Ladataan...' }} />
        <View className="p-4 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 bg-zinc-50 dark:bg-zinc-900 justify-center items-center p-6">
        <Stack.Screen options={{ title: 'Kurssia ei löytynyt' }} />
        <AlertCircle size={48} color="#ef4444" />
        <Text className="text-red-600 text-center mt-4 font-medium">Kurssia ei löytynyt</Text>
        <Text className="text-zinc-500 dark:text-zinc-400 text-center text-sm mt-2">
          Tarkista kurssikoodi ja yritä uudelleen
        </Text>
      </View>
    );
  }

  const { name, ects, description } = course.fields;
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

  const schemaBreadcrumbs = createBreadcrumbSchema([
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
        jsonLd={[courseSchema, schemaBreadcrumbs]}
      />
      <Stack.Screen options={{ title: courseId || name }} />

      {/* Breadcrumb for web */}
      <Breadcrumb
        items={[
          { label: 'Kurssit', href: '/courses' },
          { label: courseId || name },
        ]}
      />

      <ScrollView
        className="flex-1 bg-zinc-50 dark:bg-zinc-900"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={isDark ? '#a1a1aa' : '#71717a'}
            colors={['#71717a']}
          />
        }
      >
        <View className="max-w-4xl mx-auto w-full">
          {/* Course Header - Hero Section */}
          <View className="bg-zinc-900 dark:bg-zinc-800 px-4 py-6">
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
              <View className="items-end">
                <View className="bg-white dark:bg-zinc-100 px-4 py-2 rounded-lg mb-2">
                  <Text className="text-zinc-900 text-lg font-bold tabular-nums">{ects}</Text>
                  <Text className="text-zinc-500 text-xs text-center">op</Text>
                </View>
                {/* Action buttons */}
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={handleToggleFavorite}
                    accessibilityRole="button"
                    accessibilityLabel={isFav ? 'Poista suosikeista' : 'Lisää suosikiksi'}
                    className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-700 items-center justify-center active:bg-zinc-700"
                  >
                    <Heart
                      size={20}
                      color={isFav ? '#ef4444' : '#a1a1aa'}
                      fill={isFav ? '#ef4444' : 'transparent'}
                    />
                  </Pressable>
                  <Pressable
                    onPress={handleShare}
                    accessibilityRole="button"
                    accessibilityLabel="Jaa kurssi"
                    className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-700 items-center justify-center active:bg-zinc-700"
                  >
                    <Share2 size={20} color="#a1a1aa" />
                  </Pressable>
                </View>
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
            <SectionCard title="Perustiedot" icon={FileText} isDark={isDark}>
              <MetaRow icon={BookOpen} label="Organisaatio" value="Salainen Tiedekunta" isDark={isDark} />
              <MetaRow
                icon={Users}
                label="Opettaja"
                isDark={isDark}
                value={
                  <View>
                    {teachers.map((teacher, index) => (
                      <Pressable
                        key={teacher.sys.id}
                        onPress={() => {
                          haptics.light();
                          router.push(`/teachers/${teacher.fields.slug}`);
                        }}
                        className="active:opacity-70"
                        accessibilityRole="link"
                        accessibilityLabel={`Avaa ${teacher.fields.name} profiili`}
                      >
                        <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-600">
                          {teacher.fields.name}
                          {index < teachers.length - 1 ? ', ' : ''}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                }
              />
              <MetaRow icon={GraduationCap} label="Taso" value="Perusopinnot" isDark={isDark} />
              <MetaRow icon={Globe} label="Kieli" value="suomi" isDark={isDark} />
              <MetaRow icon={Calendar} label="Ajoitus" value="1. vuosi, syksy" isDark={isDark} />
            </SectionCard>

            {/* Course Implementations */}
            <SectionCard title="Tulevat toteutukset" icon={Calendar} isDark={isDark}>
              <Pressable
                className="flex-row items-center py-3 border-b border-zinc-100 dark:border-zinc-700 active:bg-zinc-50 dark:active:bg-zinc-700 -mx-4 px-4"
                accessibilityRole="button"
                accessibilityLabel={`${courseId}-2024-1 toteutus, ilmoittautuminen auki`}
              >
                <View className="flex-1">
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                    {courseId}-2024-1
                  </Text>
                  <Text className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Luento + tentti</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded mr-2">
                    <Text className="text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      Ilmoittautuminen auki
                    </Text>
                  </View>
                  <Text className="text-zinc-400 text-sm mr-2">Syksy 2024</Text>
                  <ChevronRight size={16} color={isDark ? '#71717a' : '#d4d4d8'} />
                </View>
              </Pressable>
              <Pressable
                className="flex-row items-center py-3 active:bg-zinc-50 dark:active:bg-zinc-700 -mx-4 px-4"
                accessibilityRole="button"
              >
                <View className="flex-1">
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                    {courseId}-2025-1
                  </Text>
                  <Text className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">Luento + tentti</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 text-sm mr-2">Kevät 2025</Text>
                  <ChevronRight size={16} color={isDark ? '#71717a' : '#d4d4d8'} />
                </View>
              </Pressable>
            </SectionCard>

            {/* Learning Objectives */}
            <SectionCard title="Osaamistavoitteet" icon={Target} isDark={isDark}>
              <Text className="text-zinc-600 dark:text-zinc-300 text-sm mb-3">
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
                  <Text className="text-zinc-700 dark:text-zinc-200 text-sm ml-2 flex-1">{objective}</Text>
                </View>
              ))}
            </SectionCard>

            {/* Course Content */}
            <SectionCard title="Asiasisältö" icon={BookOpen} isDark={isDark}>
              <Text className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                {descriptionText ||
                  `Tällä opintojaksolla perehdytään kognitiotieteen keskeisiin käsitteisiin ja tutkimusmenetelmiin. Kurssi antaa yleiskuvan kognitiotieteen monitieteisestä luonteesta ja sen keskeisistä tutkimuskohteista, kuten havaitseminen, muisti, ajattelu ja kieli.

Opiskelijat tutustuvat kognitiotieteen historiaan ja sen yhteyksiin filosofiaan, psykologiaan, neurotieteeseen, kielitieteeseen ja tekoälyyn.`}
              </Text>
            </SectionCard>

            {/* Workload */}
            <SectionCard title="Työmäärä" icon={Clock} isDark={isDark}>
              {[
                { label: 'Luennot', hours: 24 },
                { label: 'Harjoitukset', hours: 12 },
                { label: 'Itsenäinen työskentely', hours: 97 },
              ].map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-700"
                >
                  <Text className="text-zinc-600 dark:text-zinc-300 text-sm">{item.label}</Text>
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm tabular-nums">{item.hours} t</Text>
                </View>
              ))}
              <View className="flex-row items-center justify-between pt-3">
                <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold">Yhteensä</Text>
                <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold tabular-nums">133 t</Text>
              </View>
            </SectionCard>

            {/* Assessment */}
            <SectionCard title="Arviointi" icon={CheckCircle} isDark={isDark}>
              <View className="flex-row items-center mb-3">
                <View className="bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded-full">
                  <Text className="text-zinc-700 dark:text-zinc-200 text-sm font-medium">Asteikko 0–5</Text>
                </View>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center">
                  <View className="w-24">
                    <Text className="text-zinc-600 dark:text-zinc-300 text-sm">Tentti</Text>
                  </View>
                  <View className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <View className="h-full bg-zinc-700 dark:bg-zinc-300 rounded-full" style={{ width: '70%' }} />
                  </View>
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium ml-3 w-10 text-right">
                    70%
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-24">
                    <Text className="text-zinc-600 dark:text-zinc-300 text-sm">Harjoitustyöt</Text>
                  </View>
                  <View className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <View className="h-full bg-zinc-500 rounded-full" style={{ width: '30%' }} />
                  </View>
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium ml-3 w-10 text-right">
                    30%
                  </Text>
                </View>
              </View>
            </SectionCard>

            {/* Prerequisites */}
            <SectionCard title="Esitietovaatimukset" icon={AlertCircle} isDark={isDark}>
              <View className="flex-row items-center">
                <View className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                  <CheckCircle size={20} color={isDark ? '#93c5fd' : '#2563eb'} />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                    Ei vaadittavia esitietoja
                  </Text>
                  <Text className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                    Kurssi soveltuu ensimmäisen vuoden opiskelijoille
                  </Text>
                </View>
              </View>
            </SectionCard>

            {/* Related Study Module */}
            <Pressable
              className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden mb-8 active:bg-zinc-50 dark:active:bg-zinc-700"
              onPress={() => {
                haptics.light();
                router.push('/majors');
              }}
              accessibilityRole="button"
              accessibilityLabel="Avaa Kognitiotieteen perusopinnot"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <View className="flex-row items-center p-4">
                <View className="bg-zinc-900 dark:bg-zinc-100 p-3 rounded-lg mr-4">
                  <Layers size={24} color={isDark ? '#18181b' : '#fff'} />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wide mb-0.5">
                    Kuuluu kokonaisuuteen
                  </Text>
                  <Text className="text-zinc-900 dark:text-zinc-100 font-semibold">
                    Kognitiotieteen perusopinnot
                  </Text>
                  <Text className="text-zinc-500 dark:text-zinc-400 text-sm">25 op</Text>
                </View>
                <ChevronRight size={24} color={isDark ? '#71717a' : '#d4d4d8'} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
