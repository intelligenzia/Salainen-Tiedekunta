import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from '@/components/ui/text';
import { getTeachers, type TeacherEntry } from '@/lib/contentful';

// Placeholder teachers
const placeholderTeachers: TeacherEntry[] = [
  { sys: { id: '1' }, fields: { name: 'Prof. Matti Meikäläinen', slug: 'matti-meikalainen' } },
  { sys: { id: '2' }, fields: { name: 'Dr. Maija Virtanen', slug: 'maija-virtanen' } },
  { sys: { id: '3' }, fields: { name: 'Dr. Pekka Korhonen', slug: 'pekka-korhonen' } },
  { sys: { id: '4' }, fields: { name: 'Prof. Anna Laine', slug: 'anna-laine' } },
  { sys: { id: '5' }, fields: { name: 'Dr. Jukka Nieminen', slug: 'jukka-nieminen' } },
  { sys: { id: '6' }, fields: { name: 'Prof. Liisa Mäkelä', slug: 'liisa-makela' } },
];

const specializations = [
  'Kognitiotiede',
  'Neurotiede',
  'Tekoäly',
  'Kielitiede',
  'Filosofia',
  'Koneoppiminen',
];

export default function TeachersScreen() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<TeacherEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Head>
        <title>Opettajat - Salainen Tiedekunta</title>
        <meta name="description" content="Tutustu Salaisen Tiedekunnan opettajiin ja tutkijoihin. Kognitiotieteen, neurotieteen ja tekoälyn asiantuntijoita." />
        <meta property="og:title" content="Opettajat - Salainen Tiedekunta" />
        <meta property="og:description" content="Tutustu tiedekunnan opettajiin ja tutkijoihin." />
        <link rel="canonical" href="https://tiedekunta.com/teachers" />
      </Head>
      <Stack.Screen
        options={{
          title: `Opettajat (${teachers.length})`,
        }}
      />
      <ScrollView className="flex-1 bg-white">
        {/* Teachers List */}
        <View className="p-4">
          {teachers.map((teacher, index) => (
            <Pressable
              key={teacher.sys.id}
              onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
              className="border-b border-gray-200 py-4 active:bg-gray-50"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-4">
                  <Text className="text-gray-500 font-semibold text-lg">
                    {teacher.fields.name?.charAt(0) || 'O'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-blue-600 font-medium">
                    {teacher.fields.name}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {specializations[index % specializations.length]}
                  </Text>
                </View>
                <Text className="text-gray-400">{'>'}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
