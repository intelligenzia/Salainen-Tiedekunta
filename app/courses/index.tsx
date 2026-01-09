import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getCourses, type CourseEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';

const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-102', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: '3' }, fields: { courseId: 'KOG-201', name: 'Neurotiede ja aivot', ects: 5 } },
  { sys: { id: '4' }, fields: { courseId: 'KOG-202', name: 'Koneoppimisen perusteet', ects: 5 } },
];

const isWeb = Platform.OS === 'web';

export async function loader() {
  if (!isWeb) return { courses: [] };
  try {
    const courses = await getCourses();
    return { courses: courses.length > 0 ? courses : placeholderCourses };
  } catch {
    return { courses: placeholderCourses };
  }
}

export default function CoursesScreen({ loaderData }: { loaderData?: { courses: CourseEntry[] } }) {
  const router = useRouter();
  const initialCourses = loaderData?.courses ?? [];
  const [courses, setCourses] = useState<CourseEntry[]>(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState<CourseEntry[]>(initialCourses);
  const [loading, setLoading] = useState(!isWeb || initialCourses.length === 0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isWeb && initialCourses.length > 0) return;

    async function fetchCourses() {
      try {
        const data = await getCourses();
        const courseList = data.length > 0 ? data : placeholderCourses;
        setCourses(courseList);
        setFilteredCourses(courseList);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setCourses(placeholderCourses);
        setFilteredCourses(placeholderCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredCourses(
        courses.filter(
          (c) =>
            c.fields.name.toLowerCase().includes(query) ||
            c.fields.courseId?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, courses]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#71717a" />
      </View>
    );
  }

  const courseListSchema = createItemListSchema(
    'Salaisen Tiedekunnan kurssit',
    courses.slice(0, 100).map((course, index) => ({
      name: `${course.fields.courseId} ${course.fields.name}`,
      url: `${SITE_URL}/courses/${course.fields.courseId || course.sys.id}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Kurssit', url: `${SITE_URL}/courses` },
  ]);

  return (
    <>
      <SEO
        title="Kurssit"
        description="Selaa Salaisen Tiedekunnan kursseja. Kognitiotieteen, neurotieteen, tekoälyn ja filosofian opintojaksoja."
        path="/courses"
        jsonLd={[courseListSchema, breadcrumbSchema]}
      />
      <Stack.Screen
        options={{
          title: `Kurssit (${courses.length})`,
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-4xl mx-auto w-full">
          <View className="px-4 py-4 border-b border-zinc-200 bg-zinc-50">
            <TextInput
              className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900"
              placeholder="Hae kursseja..."
              placeholderTextColor="#a1a1aa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {searchQuery && (
            <View className="px-4 py-3 bg-zinc-100 border-b border-zinc-200">
              <Text className="text-zinc-600 text-sm">
                {filteredCourses.length} tulosta haulle "{searchQuery}"
              </Text>
            </View>
          )}

          <View className="bg-white">
            <View className="flex-row px-4 py-3 bg-zinc-50 border-b border-zinc-200">
              <Text className="flex-1 text-xs font-medium text-zinc-500 uppercase tracking-wide">Opintojakso</Text>
              <Text className="w-16 text-xs font-medium text-zinc-500 uppercase tracking-wide text-right">op</Text>
            </View>

            {filteredCourses.map((course) => (
              <Pressable
                key={course.sys.id}
                onPress={() =>
                  router.push(`/courses/${course.fields.courseId || course.sys.id}`)
                }
                className="border-b border-zinc-100 active:bg-zinc-50"
              >
                <View className="flex-row px-4 py-3 items-center">
                  <View className="flex-1 pr-4">
                    {course.fields.courseId && (
                      <Text className="text-zinc-400 text-xs mb-1 font-mono">
                        {course.fields.courseId}
                      </Text>
                    )}
                    <Text className="text-zinc-900 text-sm font-medium underline underline-offset-2 decoration-zinc-300">
                      {course.fields.name}
                    </Text>
                  </View>
                  <Text className="w-16 text-zinc-500 text-sm text-right tabular-nums">
                    {course.fields.ects}
                  </Text>
                </View>
              </Pressable>
            ))}

            {filteredCourses.length === 0 && (
              <View className="py-12 items-center">
                <Text className="text-zinc-400">Ei hakutuloksia</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
