import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getCourses, type CourseEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Search, BookOpen, Clock, ChevronRight } from 'lucide-react-native';

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
      <Tabs.Screen
        options={{
          title: `Kurssit`,
        }}
      />
      <ScrollView className="flex-1 bg-zinc-50">
        <View className="max-w-4xl mx-auto w-full">
          {/* Search Header */}
          <View className="px-4 py-4 bg-white border-b border-zinc-200">
            <View className="flex-row items-center bg-zinc-100 rounded-xl px-4 py-3">
              <Search size={20} color="#71717a" />
              <TextInput
                className="flex-1 ml-3 text-zinc-900 text-base"
                placeholder="Hae kursseja..."
                placeholderTextColor="#a1a1aa"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            {searchQuery && (
              <Text className="text-zinc-500 text-sm mt-2">
                {filteredCourses.length} tulosta
              </Text>
            )}
          </View>

          {/* Stats Bar */}
          <View className="flex-row px-4 py-3 bg-zinc-100 border-b border-zinc-200">
            <View className="flex-row items-center mr-6">
              <BookOpen size={16} color="#71717a" />
              <Text className="text-zinc-600 text-sm ml-2">{courses.length} kurssia</Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#71717a" />
              <Text className="text-zinc-600 text-sm ml-2">
                {courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0)} op yhteensä
              </Text>
            </View>
          </View>

          {/* Course Cards */}
          <View className="p-4 gap-3">
            {filteredCourses.map((course) => (
              <Pressable
                key={course.sys.id}
                onPress={() =>
                  router.push(`/courses/${course.fields.courseId || course.sys.id}`)
                }
                className="bg-white rounded-xl border border-zinc-200 overflow-hidden active:bg-zinc-50"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <View className="p-4">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      {course.fields.courseId && (
                        <Text className="text-zinc-400 text-xs mb-1 font-mono tracking-wide">
                          {course.fields.courseId}
                        </Text>
                      )}
                      <Text className="text-zinc-900 text-base font-medium leading-snug">
                        {course.fields.name}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="bg-zinc-900 px-2.5 py-1 rounded-lg mr-2">
                        <Text className="text-white text-sm font-medium tabular-nums">
                          {course.fields.ects} op
                        </Text>
                      </View>
                      <ChevronRight size={20} color="#d4d4d8" />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}

            {filteredCourses.length === 0 && (
              <View className="py-12 items-center">
                <Search size={48} color="#d4d4d8" />
                <Text className="text-zinc-400 mt-4">Ei hakutuloksia</Text>
                <Text className="text-zinc-300 text-sm mt-1">Kokeile toista hakusanaa</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
