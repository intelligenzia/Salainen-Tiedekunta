import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getTeachers, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';

const placeholderTeachers: TeacherEntry[] = [
  { sys: { id: '1' }, fields: { name: 'Prof. Matti Meikäläinen', slug: 'matti-meikalainen' } },
  { sys: { id: '2' }, fields: { name: 'Dr. Maija Virtanen', slug: 'maija-virtanen' } },
  { sys: { id: '3' }, fields: { name: 'Dr. Pekka Korhonen', slug: 'pekka-korhonen' } },
  { sys: { id: '4' }, fields: { name: 'Prof. Anna Laine', slug: 'anna-laine' } },
];

const specializations = [
  'Kognitiotiede',
  'Neurotiede',
  'Tekoäly',
  'Kielitiede',
  'Filosofia',
  'Koneoppiminen',
];

const isWeb = Platform.OS === 'web';

export async function loader() {
  if (!isWeb) return { teachers: [] };
  try {
    const teachers = await getTeachers();
    return { teachers: teachers.length > 0 ? teachers : placeholderTeachers };
  } catch {
    return { teachers: placeholderTeachers };
  }
}

export default function TeachersScreen({ loaderData }: { loaderData?: { teachers: TeacherEntry[] } }) {
  const router = useRouter();
  const initialTeachers = loaderData?.teachers ?? [];
  const [teachers, setTeachers] = useState<TeacherEntry[]>(initialTeachers);
  const [loading, setLoading] = useState(!isWeb || initialTeachers.length === 0);

  useEffect(() => {
    if (isWeb && initialTeachers.length > 0) return;

    async function fetchTeachers() {
      try {
        const data = await getTeachers();
        setTeachers(data.length > 0 ? data : placeholderTeachers);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setTeachers(placeholderTeachers);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#71717a" />
      </View>
    );
  }

  const teacherListSchema = createItemListSchema(
    'Salaisen Tiedekunnan opettajat',
    teachers.map((teacher, index) => ({
      name: teacher.fields.name,
      url: `${SITE_URL}/teachers/${teacher.fields.slug}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Opettajat', url: `${SITE_URL}/teachers` },
  ]);

  return (
    <>
      <SEO
        title="Opettajat"
        description="Tutustu Salaisen Tiedekunnan opettajiin ja tutkijoihin. Kognitiotieteen, neurotieteen ja tekoälyn asiantuntijoita."
        path="/teachers"
        jsonLd={[teacherListSchema, breadcrumbSchema]}
      />
      <Stack.Screen
        options={{
          title: `Opettajat (${teachers.length})`,
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-4xl mx-auto w-full p-4">
          {teachers.map((teacher, index) => (
            <Pressable
              key={teacher.sys.id}
              onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
              className="border-b border-zinc-100 py-4 active:bg-zinc-50"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-zinc-900 items-center justify-center mr-4">
                  <Text className="text-white font-medium text-sm">
                    {teacher.fields.name?.charAt(0) || 'O'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-900 font-medium underline underline-offset-2 decoration-zinc-300">
                    {teacher.fields.name}
                  </Text>
                  <Text className="text-zinc-500 text-sm mt-1">
                    {specializations[index % specializations.length]}
                  </Text>
                </View>
                <Text className="text-zinc-300">→</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
