import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { Text } from '@/components/ui/text';
import { getMajors, type MajorEntry } from '@/lib/contentful';

// Placeholder data if no majors exist in Contentful
const placeholderMajors: MajorEntry[] = [
  {
    sys: { id: 'placeholder-1' },
    fields: {
      name: 'Kognitiotiede',
      slug: 'kognitiotiede',
    },
  },
  {
    sys: { id: 'placeholder-2' },
    fields: {
      name: 'Tekoäly ja koneoppiminen',
      slug: 'tekoaly',
    },
  },
  {
    sys: { id: 'placeholder-3' },
    fields: {
      name: 'Neurotiede',
      slug: 'neurotiede',
    },
  },
  {
    sys: { id: 'placeholder-4' },
    fields: {
      name: 'Kielitiede ja semantiikka',
      slug: 'kielitiede',
    },
  },
  {
    sys: { id: 'placeholder-5' },
    fields: {
      name: 'Filosofia ja logiikka',
      slug: 'filosofia',
    },
  },
];

export default function MajorsScreen() {
  const router = useRouter();
  const [majors, setMajors] = useState<MajorEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMajors() {
      try {
        const data = await getMajors();
        setMajors(data.length > 0 ? data : placeholderMajors);
      } catch (err) {
        console.error('Error fetching majors:', err);
        setMajors(placeholderMajors);
      } finally {
        setLoading(false);
      }
    }

    fetchMajors();
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
        <title>Pääaineet - Salainen Tiedekunta</title>
        <meta name="description" content="Tutustu Salaisen Tiedekunnan pääaineisiin: kognitiotiede, tekoäly, neurotiede, kielitiede ja filosofia." />
        <meta property="og:title" content="Pääaineet - Salainen Tiedekunta" />
        <meta property="og:description" content="Valitse opintosuunta ja tutustu tarjolla oleviin kursseihin." />
        <link rel="canonical" href="https://tiedekunta.com/majors" />
      </Head>
      <Stack.Screen
        options={{
          title: `Pääaineet (${majors.length})`,
        }}
      />
      <ScrollView className="flex-1 bg-white">
        {/* Majors List */}
        <View className="p-4">
          {majors.map((major, index) => (
            <Pressable
              key={major.sys.id}
              onPress={() => router.push(`/majors/${major.fields.slug || major.sys.id}`)}
              className="border-b border-gray-200 py-4 active:bg-gray-50"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-4">
                  <Text className="text-blue-600 font-medium text-base">
                    {major.fields.name}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {5 + index * 2} kurssia, {25 + index * 10} op
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
