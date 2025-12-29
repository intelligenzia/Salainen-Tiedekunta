import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { getCourses, type CourseEntry } from '@/lib/contentful';

// Placeholder courses
const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-102', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: '3' }, fields: { courseId: 'KOG-201', name: 'Neurotiede ja aivot', ects: 5 } },
  { sys: { id: '4' }, fields: { courseId: 'KOG-202', name: 'Koneoppimisen perusteet', ects: 5 } },
  { sys: { id: '5' }, fields: { courseId: 'KOG-301', name: 'Luonnollisen kielen käsittely', ects: 5 } },
  { sys: { id: '6' }, fields: { courseId: 'KOG-302', name: 'Tekoälyn filosofia', ects: 5 } },
  { sys: { id: '7' }, fields: { courseId: 'KOG-401', name: 'Syväoppiminen', ects: 5 } },
  { sys: { id: '8' }, fields: { courseId: 'KOG-402', name: 'Kognitiivinen neurotiede', ects: 5 } },
];

export default function CoursesScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
      <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const totalCredits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);

  return (
    <>
      <Head>
        <title>Kurssit - Salainen Tiedekunta</title>
        <meta name="description" content="Selaa Salaisen Tiedekunnan kursseja. Kognitiotieteen, neurotieteen, tekoälyn ja filosofian opintojaksoja." />
        <meta property="og:title" content="Kurssit - Salainen Tiedekunta" />
        <meta property="og:description" content="Selaa Salaisen Tiedekunnan kursseja." />
        <link rel="canonical" href="https://tiedekunta.com/courses" />
      </Head>
      <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
        <ScrollView className="flex-1">
          {/* Black Header */}
          <View className="bg-black px-4 py-6">
            <Text className="text-2xl font-bold text-white mb-1">
              Kurssit
            </Text>
          <Text className="text-white/70 text-sm">
            {courses.length} kurssia, {totalCredits} op yhteensä
          </Text>
        </View>

        {/* Search */}
        <View className="px-4 py-4 border-b border-gray-200 bg-gray-50">
          <TextInput
            className="bg-white border border-gray-300 rounded px-4 py-3 text-gray-900"
            placeholder="Hae kursseja..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Results count */}
        {searchQuery && (
          <View className="px-4 py-3 bg-gray-100 border-b border-gray-200">
            <Text className="text-gray-600 text-sm">
              {filteredCourses.length} tulosta haulle "{searchQuery}"
            </Text>
          </View>
        )}

        {/* Courses Table */}
        <View className="bg-white">
          {/* Table Header */}
          <View className="flex-row px-4 py-3 bg-gray-50 border-b border-gray-200">
            <Text className="flex-1 text-sm font-semibold text-gray-700">Opintojakso</Text>
            <Text className="w-16 text-sm font-semibold text-gray-700 text-right">op</Text>
          </View>

          {/* Table Body */}
          {filteredCourses.map((course) => (
            <Pressable
              key={course.sys.id}
              onPress={() =>
                router.push(`/courses/${course.fields.courseId || course.sys.id}`)
              }
              className="border-b border-gray-100 active:bg-gray-50"
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
                <Text className="w-16 text-gray-600 text-sm text-right">
                  {course.fields.ects}
                </Text>
              </View>
            </Pressable>
          ))}

          {filteredCourses.length === 0 && (
            <View className="py-12 items-center">
              <Text className="text-gray-500">Ei hakutuloksia</Text>
            </View>
          )}
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
