import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from '@/components/ui/text';
import { getTeacher, getTeachers, getCoursesByTeacher, type TeacherEntry, type CourseEntry, type ContentfulAsset } from '@/lib/contentful';

// Generate static params for all teachers at build time
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const teachers = await getTeachers();
    return teachers.map((teacher) => ({
      slug: teacher.fields.slug,
    }));
  } catch {
    return [];
  }
}

// Placeholder data
const placeholderTeacher: TeacherEntry = {
  sys: { id: 'placeholder' },
  fields: {
    name: 'Prof. Matti Meikäläinen',
    slug: 'matti-meikalainen',
  },
};

const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-201', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: '3' }, fields: { courseId: 'KOG-301', name: 'Neurotiede ja aivot', ects: 5 } },
];

export default function TeacherDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherEntry | null>(null);
  const [avatar, setAvatar] = useState<ContentfulAsset | undefined>();
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacher() {
      if (!slug) return;
      try {
        const data = await getTeacher(slug);
        if (data) {
          setTeacher(data.teacher);
          setAvatar(data.avatar);
          // Fetch courses by this teacher
          const teacherCourses = await getCoursesByTeacher(data.teacher.sys.id);
          setCourses(teacherCourses.length > 0 ? teacherCourses : placeholderCourses);
        } else {
          setTeacher({
            ...placeholderTeacher,
            fields: { ...placeholderTeacher.fields, name: decodeURIComponent(slug).replace(/-/g, ' ') },
          });
          setCourses(placeholderCourses);
        }
      } catch (err) {
        console.error('Error fetching teacher:', err);
        setTeacher(placeholderTeacher);
        setCourses(placeholderCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacher();
  }, [slug]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!teacher) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-6">
        <Stack.Screen options={{ title: 'Opettajaa ei löytynyt' }} />
        <Text className="text-red-600 text-center">Opettajaa ei löytynyt</Text>
      </View>
    );
  }

  const teacherName = teacher.fields.name || 'Opettaja';
  const pageTitle = `${teacherName} - Salainen Tiedekunta`;
  const pageDescription = `${teacherName} - Kognitiotieteen professori Salaisessa Tiedekunnassa. Tutkimusalueet: kognitiivinen neurotiede, muisti ja oppiminen.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <link rel="canonical" href={`https://tiedekunta.com/teachers/${slug}`} />
      </Head>
      <Stack.Screen options={{ title: teacherName }} />
      <ScrollView className="flex-1 bg-white">
        {/* Profile Header */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center mr-4">
              <Text className="text-gray-500 font-bold text-2xl">
                {teacher.fields.name?.charAt(0) || 'O'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 text-xl font-bold">
                {teacher.fields.name}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                Professori, Kognitiotiede
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-gray-100 px-4 py-4 border-b border-gray-200">
          <View className="gap-2">
            <View className="flex-row">
              <Text className="text-gray-600 w-28 text-sm">Sähköposti</Text>
              <Text className="text-blue-600 flex-1 text-sm">
                {teacher.fields.slug?.replace(/-/g, '.')}@tiedekunta.fi
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-28 text-sm">Huone</Text>
              <Text className="text-gray-900 flex-1 text-sm">A312, Kognitiotalo</Text>
            </View>
            <View className="flex-row">
              <Text className="text-gray-600 w-28 text-sm">Vastaanotto</Text>
              <Text className="text-gray-900 flex-1 text-sm">Ti 14-16 (varaus sähköpostilla)</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4">
          {/* Bio */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Esittely
            </Text>
            <Text className="text-sm text-gray-700 leading-relaxed">
              {teacher.fields.name} on kognitiotieteen professori Salaisessa Tiedekunnassa.
              Hänen tutkimusalueitaan ovat kognitiivinen neurotiede, muisti ja oppiminen.
              Hän on julkaissut yli 50 tieteellistä artikkelia kansainvälisissä julkaisuissa
              ja toimii aktiivisesti kansainvälisissä tutkimushankkeissa.
            </Text>
          </View>

          {/* Research Areas */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Tutkimusalueet
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {['Kognitiivinen neurotiede', 'Muisti', 'Oppiminen', 'Tarkkaavaisuus'].map((area) => (
                <View key={area} className="bg-gray-100 px-3 py-1 rounded">
                  <Text className="text-gray-700 text-sm">{area}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Courses */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Opettamat kurssit
            </Text>
            <View className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {courses.map((course, index) => (
                <Pressable
                  key={course.sys.id}
                  onPress={() => router.push(`/courses/${course.fields.courseId || course.sys.id}`)}
                  className={`px-4 py-3 active:bg-gray-50 ${index < courses.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <View className="flex-row items-center justify-between">
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
                    <Text className="text-gray-600 text-sm">{course.fields.ects} op</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
