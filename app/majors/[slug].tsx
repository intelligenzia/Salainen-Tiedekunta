import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getMajor, getMajors, type CourseEntry, type MajorEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createStudyProgramSchema, SITE_URL } from '@/lib/seo';
import { useTheme } from '@/lib/stores/theme';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';

const isWeb = Platform.OS === 'web';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const majors = await getMajors();
    return majors.map((major) => ({
      slug: major.fields.slug || major.sys.id,
    }));
  } catch {
    return [];
  }
}

const placeholderCourses: CourseEntry[] = [
  { sys: { id: 'course-1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: 'course-2' }, fields: { courseId: 'KOG-102', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: 'course-3' }, fields: { courseId: 'KOG-201', name: 'Neurotiede ja aivot', ects: 5 } },
];

const placeholderMajor: MajorEntry = {
  sys: { id: 'placeholder' },
  fields: { name: 'Kognitiotiede', slug: 'kognitiotiede' },
};

interface LoaderData {
  major: MajorEntry | null;
  courses: CourseEntry[];
}

export async function loader({ params }: { params: { slug: string } }): Promise<LoaderData> {
  if (!isWeb) return { major: null, courses: [] };
  try {
    const data = await getMajor(params.slug);
    if (data) {
      return {
        major: data.major,
        courses: data.courses.length > 0 ? data.courses : placeholderCourses,
      };
    }
    return {
      major: { ...placeholderMajor, fields: { ...placeholderMajor.fields, name: decodeURIComponent(params.slug) } },
      courses: placeholderCourses,
    };
  } catch {
    return { major: placeholderMajor, courses: placeholderCourses };
  }
}

export default function MajorDetailScreen({ loaderData }: { loaderData?: LoaderData }) {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { isDark } = useTheme();
  const [major, setMajor] = useState<MajorEntry | null>(loaderData?.major ?? null);
  const [courses, setCourses] = useState<CourseEntry[]>(loaderData?.courses ?? []);
  const [loading, setLoading] = useState(!isWeb || !loaderData?.major);

  useEffect(() => {
    if (isWeb && loaderData?.major) return;

    async function fetchMajor() {
      if (!slug) return;
      try {
        const data = await getMajor(slug);
        if (data) {
          setMajor(data.major);
          setCourses(data.courses.length > 0 ? data.courses : placeholderCourses);
        } else {
          setMajor({ ...placeholderMajor, fields: { ...placeholderMajor.fields, name: decodeURIComponent(slug) } });
          setCourses(placeholderCourses);
        }
      } catch (err) {
        console.error('Error fetching major:', err);
        setMajor(placeholderMajor);
        setCourses(placeholderCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchMajor();
  }, [slug, loaderData?.major]);

  if (loading) {
    return (
      <View className="flex-1 bg-white dark:bg-zinc-900 justify-center items-center">
        <ActivityIndicator size="large" color={isDark ? '#a1a1aa' : '#71717a'} />
      </View>
    );
  }

  const totalCredits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);
  const majorName = major?.fields.name || 'Pääaine';
  const majorSlug = major?.fields.slug || slug;
  const pageDescription = `${majorName} - ${courses.length} kurssia, ${totalCredits} opintopistettä. Salaisen Tiedekunnan opintosuunta.`;

  const programSchema = createStudyProgramSchema({
    name: majorName,
    slug: majorSlug,
    description: pageDescription,
    totalCredits: totalCredits,
    courses: courses.map((c) => ({
      name: c.fields.name,
      courseId: c.fields.courseId || c.sys.id,
    })),
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Pääaineet', url: `${SITE_URL}/majors` },
    { name: majorName, url: `${SITE_URL}/majors/${majorSlug}` },
  ]);

  return (
    <>
      <SEO
        title={majorName}
        description={pageDescription}
        path={`/majors/${majorSlug}`}
        jsonLd={[programSchema, breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: majorName }} />
      <ScrollView className="flex-1 bg-white dark:bg-zinc-900">
        <View className="max-w-4xl mx-auto w-full">
        
        <View className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 tracking-tight">
            {major?.fields.name}
          </Text>
          <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
            {courses.length} kurssia · {totalCredits} op yhteensä
          </Text>
        </View>

        
        <View className="bg-zinc-50 dark:bg-zinc-800 px-4 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Opintojen rakenne</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-zinc-600 dark:text-zinc-400 text-sm">Perusopinnot</Text>
              <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium tabular-nums">25 op</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-zinc-600 dark:text-zinc-400 text-sm">Aineopinnot</Text>
              <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium tabular-nums">35 op</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700 mt-2">
              <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold">Yhteensä</Text>
              <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold tabular-nums">60 op</Text>
            </View>
          </View>
        </View>

        
        <View className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <Text className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Tämä opintosuunta tarjoaa kattavan katsauksen kognitiotieteen keskeisiin
            aiheisiin ja menetelmiin. Opinnot koostuvat perus- ja aineopinnoista.
          </Text>
        </View>

        
        <View className="p-4">
          <Text className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
            Kurssit
          </Text>
          <View className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
            
            <View className="flex-row px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <Text className="flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Opintojakso</Text>
              <Text className="w-12 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-right">op</Text>
            </View>

            
            {courses.map((course, index) => (
              <Link
                key={course.sys.id}
                href={`/courses/${course.fields.courseId || course.sys.id}`}
                asChild
              >
                <Link.Trigger>
                  <Pressable
                    className={`active:bg-zinc-50 dark:active:bg-zinc-700 ${index < courses.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-700' : ''}`}
                  >
                    <View className="flex-row px-4 py-3 items-center">
                      <View className="flex-1 pr-4">
                        {course.fields.courseId && (
                          <Text className="text-zinc-400 dark:text-zinc-500 text-xs mb-1 font-mono">
                            {course.fields.courseId}
                          </Text>
                        )}
                        <Text className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
                          {course.fields.name}
                        </Text>
                      </View>
                      <Text className="w-12 text-zinc-500 dark:text-zinc-400 text-sm text-right tabular-nums">
                        {course.fields.ects}
                      </Text>
                    </View>
                  </Pressable>
                </Link.Trigger>
                <Link.Preview />
              </Link>
            ))}
          </View>
        </View>
        </View>
      </ScrollView>
    </>
  );
}
