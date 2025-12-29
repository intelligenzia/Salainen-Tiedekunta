import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
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
      <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
        <ScrollView className="flex-1">
          {/* Black Header */}
          <View className="bg-black px-4 py-6">
            <Text className="text-2xl font-bold text-white mb-1">
              Pääaineet
            </Text>
            <Text className="text-white/70 text-sm">
              Valitse opintosuunta ja tutustu tarjolla oleviin kursseihin
            </Text>
          </View>

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
      </SafeAreaView>
    </>
  );
}
