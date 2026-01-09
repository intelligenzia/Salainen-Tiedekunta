import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getCoursesByTeacher, getTeacher, getTeachers, type ContentfulAsset, type CourseEntry, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createPersonSchema, SITE_URL } from '@/lib/seo';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';

const isWeb = Platform.OS === 'web';

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

const placeholderTeacher: TeacherEntry = {
  sys: { id: 'placeholder' },
  fields: { name: 'Prof. Matti Meikäläinen', slug: 'matti-meikalainen' },
};

const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-201', name: 'Kognitiivinen psykologia', ects: 5 } },
];

interface LoaderData {
  teacher: TeacherEntry | null;
  avatar?: ContentfulAsset;
  courses: CourseEntry[];
}

export async function loader({ params }: { params: { slug: string } }): Promise<LoaderData> {
  if (!isWeb) return { teacher: null, courses: [] };
  try {
    const data = await getTeacher(params.slug);
    if (data) {
      const teacherCourses = await getCoursesByTeacher(data.teacher.sys.id);
      return {
        teacher: data.teacher,
        avatar: data.avatar,
        courses: teacherCourses.length > 0 ? teacherCourses : placeholderCourses,
      };
    }
    return {
      teacher: { ...placeholderTeacher, fields: { ...placeholderTeacher.fields, name: decodeURIComponent(params.slug).replace(/-/g, ' ') } },
      courses: placeholderCourses,
    };
  } catch {
    return { teacher: placeholderTeacher, courses: placeholderCourses };
  }
}

export default function TeacherDetailScreen({ loaderData }: { loaderData?: LoaderData }) {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherEntry | null>(loaderData?.teacher ?? null);
  const [, setAvatar] = useState<ContentfulAsset | undefined>(loaderData?.avatar);
  const [courses, setCourses] = useState<CourseEntry[]>(loaderData?.courses ?? []);
  const [loading, setLoading] = useState(!isWeb || !loaderData?.teacher);

  useEffect(() => {
    if (isWeb && loaderData?.teacher) return;

    async function fetchTeacher() {
      if (!slug) return;
      try {
        const data = await getTeacher(slug);
        if (data) {
          setTeacher(data.teacher);
          setAvatar(data.avatar);
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
  }, [slug, loaderData?.teacher]);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#71717a" />
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
  const teacherSlug = teacher.fields.slug || slug;
  const pageDescription = `${teacherName} - Kognitiotieteen professori Salaisessa Tiedekunnassa. Tutkimusalueet: kognitiivinen neurotiede, muisti ja oppiminen.`;

  const email = `${teacherSlug?.replace(/-/g, '.')}@tiedekunta.fi`;

  const personSchema = createPersonSchema({
    name: teacherName,
    slug: teacherSlug,
    jobTitle: 'Professori, Kognitiotiede',
    email: email,
    description: pageDescription,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Opettajat', url: `${SITE_URL}/teachers` },
    { name: teacherName, url: `${SITE_URL}/teachers/${teacherSlug}` },
  ]);

  return (
    <>
      <SEO
        title={teacherName}
        description={pageDescription}
        path={`/teachers/${teacherSlug}`}
        type="profile"
        jsonLd={[personSchema, breadcrumbSchema]}
      />
      <Stack.Screen options={{ title: teacherName }} />
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-4xl mx-auto w-full">
        {/* Profile Header */}
        <View className="p-4 border-b border-zinc-200">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full bg-zinc-900 items-center justify-center mr-4">
              <Text className="text-zinc-50 font-semibold text-xl">
                {teacher.fields.name?.charAt(0) || 'O'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-zinc-900 text-xl font-semibold tracking-tight">
                {teacher.fields.name}
              </Text>
              <Text className="text-zinc-500 text-sm mt-1">
                Professori · Kognitiotiede
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-zinc-50 px-4 py-4 border-b border-zinc-200">
          <View className="gap-2">
            <View className="flex-row">
              <Text className="text-zinc-500 w-28 text-sm">Sähköposti</Text>
              <Text className="text-zinc-900 flex-1 text-sm underline underline-offset-2 decoration-zinc-300">
                {teacher.fields.slug?.replace(/-/g, '.')}@tiedekunta.fi
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-28 text-sm">Huone</Text>
              <Text className="text-zinc-900 flex-1 text-sm">A312, Kognitiotalo</Text>
            </View>
            <View className="flex-row">
              <Text className="text-zinc-500 w-28 text-sm">Vastaanotto</Text>
              <Text className="text-zinc-900 flex-1 text-sm">Ti 14–16 (varaus sähköpostilla)</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="p-4">
          {/* Bio */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Esittely
            </Text>
            <Text className="text-sm text-zinc-600 leading-relaxed">
              {teacher.fields.name} on kognitiotieteen professori Salaisessa Tiedekunnassa.
              Hänen tutkimusalueitaan ovat kognitiivinen neurotiede, muisti ja oppiminen.
              Hän on julkaissut yli 50 tieteellistä artikkelia kansainvälisissä julkaisuissa
              ja toimii aktiivisesti kansainvälisissä tutkimushankkeissa.
            </Text>
          </View>

          {/* Research Areas */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Tutkimusalueet
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {['Kognitiivinen neurotiede', 'Muisti', 'Oppiminen', 'Tarkkaavaisuus'].map((area) => (
                <View key={area} className="bg-zinc-100 px-3 py-1.5 rounded-full">
                  <Text className="text-zinc-700 text-sm">{area}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Courses */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-zinc-900 mb-3 tracking-tight">
              Opettamat kurssit
            </Text>
            <View className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
              {courses.map((course, index) => (
                <Pressable
                  key={course.sys.id}
                  onPress={() => router.push(`/courses/${course.fields.courseId || course.sys.id}`)}
                  className={`px-4 py-3 active:bg-zinc-50 ${index < courses.length - 1 ? 'border-b border-zinc-100' : ''}`}
                >
                  <View className="flex-row items-center justify-between">
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
                    <Text className="text-zinc-500 text-sm tabular-nums">{course.fields.ects} op</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
    </>
  );
}
