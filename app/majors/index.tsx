import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getMajors, type MajorEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';

const placeholderMajors: MajorEntry[] = [
  { sys: { id: '1' }, fields: { name: 'Kognitiotiede', slug: 'kognitiotiede' } },
  { sys: { id: '2' }, fields: { name: 'Tekoäly ja koneoppiminen', slug: 'tekoaly' } },
  { sys: { id: '3' }, fields: { name: 'Neurotiede', slug: 'neurotiede' } },
  { sys: { id: '4' }, fields: { name: 'Kielitiede ja semantiikka', slug: 'kielitiede' } },
];

const isWeb = Platform.OS === 'web';

export async function loader() {
  if (!isWeb) return { majors: [] };
  try {
    const majors = await getMajors();
    return { majors: majors.length > 0 ? majors : placeholderMajors };
  } catch {
    return { majors: placeholderMajors };
  }
}

export default function MajorsScreen({ loaderData }: { loaderData?: { majors: MajorEntry[] } }) {
  const router = useRouter();
  const initialMajors = loaderData?.majors ?? [];
  const [majors, setMajors] = useState<MajorEntry[]>(initialMajors);
  const [loading, setLoading] = useState(!isWeb || initialMajors.length === 0);

  useEffect(() => {
    if (isWeb && initialMajors.length > 0) return;

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
        <ActivityIndicator size="large" color="#71717a" />
      </View>
    );
  }

  const majorListSchema = createItemListSchema(
    'Salaisen Tiedekunnan pääaineet',
    majors.map((major, index) => ({
      name: major.fields.name,
      url: `${SITE_URL}/majors/${major.fields.slug || major.sys.id}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Pääaineet', url: `${SITE_URL}/majors` },
  ]);

  return (
    <>
      <SEO
        title="Pääaineet"
        description="Tutustu Salaisen Tiedekunnan pääaineisiin: kognitiotiede, tekoäly, neurotiede, kielitiede ja filosofia."
        path="/majors"
        jsonLd={[majorListSchema, breadcrumbSchema]}
      />
      <Stack.Screen
        options={{
          title: `Pääaineet (${majors.length})`,
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <View className="max-w-4xl mx-auto w-full p-4">
          {majors.map((major, index) => (
            <Pressable
              key={major.sys.id}
              onPress={() => router.push(`/majors/${major.fields.slug || major.sys.id}`)}
              className="border-b border-zinc-100 py-4 active:bg-zinc-50"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-4">
                  <Text className="text-zinc-900 font-medium text-base underline underline-offset-2 decoration-zinc-300">
                    {major.fields.name}
                  </Text>
                  <Text className="text-zinc-500 text-sm mt-1">
                    {5 + index * 2} kurssia · {25 + index * 10} op
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
