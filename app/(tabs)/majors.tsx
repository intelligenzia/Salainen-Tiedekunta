import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getMajors, type MajorEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';
import { GraduationCap, BookOpen, ChevronRight } from 'lucide-react-native';

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

  // Generate some variety in course/credit counts
  const getMajorStats = (index: number) => ({
    courses: 5 + index * 2 + (index % 3),
    credits: 25 + index * 10 + (index % 2) * 5,
  });

  return (
    <>
      <SEO
        title="Pääaineet"
        description="Tutustu Salaisen Tiedekunnan pääaineisiin: kognitiotiede, tekoäly, neurotiede, kielitiede ja filosofia."
        path="/majors"
        jsonLd={[majorListSchema, breadcrumbSchema]}
      />
      <Tabs.Screen
        options={{
          title: 'Pääaineet',
        }}
      />
      <ScrollView className="flex-1 bg-zinc-50">
        <View className="max-w-4xl mx-auto w-full">
          {/* Header Section */}
          <View className="px-4 py-6 bg-white border-b border-zinc-200">
            <View className="flex-row items-center mb-2">
              <GraduationCap size={24} color="#18181b" />
              <Text className="text-xl font-semibold text-zinc-900 ml-2 tracking-tight">
                Opintosuunnat
              </Text>
            </View>
            <Text className="text-zinc-500 text-sm">
              Valitse sinua kiinnostava pääaine ja tutustu sen opintokokonaisuuksiin
            </Text>
          </View>

          {/* Major Cards */}
          <View className="p-4 gap-4">
            {majors.map((major, index) => {
              const stats = getMajorStats(index);
              return (
                <Pressable
                  key={major.sys.id}
                  onPress={() => router.push(`/majors/${major.fields.slug || major.sys.id}`)}
                  className="bg-white rounded-xl border border-zinc-200 overflow-hidden active:bg-zinc-50"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  {/* Card Header with gradient accent */}
                  <View className="h-2 bg-zinc-900" />

                  <View className="p-4">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-3">
                        <Text className="text-zinc-900 text-lg font-semibold tracking-tight">
                          {major.fields.name}
                        </Text>

                        {/* Stats Row */}
                        <View className="flex-row items-center mt-3 gap-4">
                          <View className="flex-row items-center">
                            <BookOpen size={14} color="#71717a" />
                            <Text className="text-zinc-500 text-sm ml-1.5">
                              {stats.courses} kurssia
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            <View className="w-1.5 h-1.5 rounded-full bg-zinc-300 mr-2" />
                            <Text className="text-zinc-500 text-sm">
                              {stats.credits} op
                            </Text>
                          </View>
                        </View>
                      </View>
                      <ChevronRight size={24} color="#d4d4d8" />
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Info Section */}
          <View className="mx-4 mb-8 p-4 bg-zinc-100 rounded-xl">
            <Text className="text-zinc-600 text-sm leading-relaxed">
              Pääaineet muodostavat opintojen rungon. Jokainen pääaine sisältää perus- ja
              aineopinnot sekä syventävät opinnot, joista koostuu kandidaatin- ja
              maisterintutkinto.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
