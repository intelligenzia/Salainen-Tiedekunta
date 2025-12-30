import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from '@/components/ui/text';
import { getMajor, getMajors, type MajorEntry, type CourseEntry } from '@/lib/contentful';

// Generate static params for all majors at build time
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

// Placeholder courses
const placeholderCourses: CourseEntry[] = [
  {
    sys: { id: 'course-1' },
    fields: {
      courseId: 'KOG-101',
      name: 'Johdatus kognitiotieteeseen',
      ects: 5,
    },
  },
  {
    sys: { id: 'course-2' },
    fields: {
      courseId: 'KOG-102',
      name: 'Kognitiivinen psykologia',
      ects: 5,
    },
  },
  {
    sys: { id: 'course-3' },
    fields: {
      courseId: 'KOG-201',
      name: 'Neurotiede ja aivot',
      ects: 5,
    },
  },
  {
    sys: { id: 'course-4' },
    fields: {
      courseId: 'KOG-202',
      name: 'Koneoppimisen perusteet',
      ects: 5,
    },
  },
  {
    sys: { id: 'course-5' },
    fields: {
      courseId: 'KOG-301',
      name: 'Luonnollisen kielen käsittely',
      ects: 5,
    },
  },
];

const placeholderMajor: MajorEntry = {
  sys: { id: 'placeholder' },
  fields: {
    name: 'Kognitiotiede',
    slug: 'kognitiotiede',
  },
};

export default function MajorDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [major, setMajor] = useState<MajorEntry | null>(null);
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [slug]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const totalCredits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);
  const majorName = major?.fields.name || 'Pääaine';
  const pageTitle = `${majorName} - Salainen Tiedekunta`;
  const pageDescription = `${majorName} - ${courses.length} kurssia, ${totalCredits} opintopistettä. Salaisen Tiedekunnan opintosuunta.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <link rel="canonical" href={`https://tiedekunta.com/majors/${slug}`} />
      </Head>
      <Stack.Screen options={{ title: majorName }} />
      <ScrollView className="flex-1 bg-white">
        {/* Header Info */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-900 mb-1">
            {major?.fields.name}
          </Text>
          <Text className="text-gray-600 text-sm">
            {courses.length} kurssia, {totalCredits} op yhteensä
          </Text>
        </View>

        {/* Study Structure */}
        <View className="bg-gray-100 px-4 py-4 border-b border-gray-200">
          <Text className="text-sm font-semibold text-gray-900 mb-3">Opintojen rakenne</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Perusopinnot</Text>
              <Text className="text-gray-900 text-sm font-medium">25 op</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Aineopinnot</Text>
              <Text className="text-gray-900 text-sm font-medium">35 op</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-gray-200 mt-2">
              <Text className="text-gray-900 text-sm font-semibold">Yhteensä</Text>
              <Text className="text-gray-900 text-sm font-semibold">60 op</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-sm text-gray-700 leading-relaxed">
            Tämä opintosuunta tarjoaa kattavan katsauksen kognitiotieteen keskeisiin
            aiheisiin ja menetelmiin. Opinnot koostuvat perus- ja aineopinnoista.
          </Text>
        </View>

        {/* Courses List */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Kurssit
          </Text>
          <View className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <View className="flex-row px-4 py-3 bg-gray-50 border-b border-gray-200">
              <Text className="flex-1 text-sm font-semibold text-gray-700">Opintojakso</Text>
              <Text className="w-12 text-sm font-semibold text-gray-700 text-right">op</Text>
            </View>

            {/* Table Body */}
            {courses.map((course, index) => (
              <Pressable
                key={course.sys.id}
                onPress={() => router.push(`/courses/${course.fields.courseId || course.sys.id}`)}
                className={`active:bg-gray-50 ${index < courses.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="flex-row px-4 py-3 items-center">
                  <View className="flex-1 pr-4">
                    {course.fields.courseId && (
                      <Text className="text-gray-500 text-xs mb-1">
                        {course.fields.courseId}
                      </Text>
                    )}
                    <Text className="text-blue-600 text-sm font-medium">
                      {course.fields.name}
                    </Text>
                  </View>
                  <Text className="w-12 text-gray-600 text-sm text-right">
                    {course.fields.ects}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
