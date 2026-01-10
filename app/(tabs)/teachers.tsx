import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { getTeachers, type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, View } from 'react-native';
import { Users, ChevronRight, Mail } from 'lucide-react-native';

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

  // Get initials from name
  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      // Skip titles like Prof., Dr.
      const firstName = parts.find(p => !p.endsWith('.')) || parts[0];
      const lastName = parts[parts.length - 1];
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    }
    return name.charAt(0);
  };

  // Generate colors based on index
  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-600',
      'bg-emerald-600',
      'bg-violet-600',
      'bg-amber-600',
      'bg-rose-600',
      'bg-cyan-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <SEO
        title="Opettajat"
        description="Tutustu Salaisen Tiedekunnan opettajiin ja tutkijoihin. Kognitiotieteen, neurotieteen ja tekoälyn asiantuntijoita."
        path="/teachers"
        jsonLd={[teacherListSchema, breadcrumbSchema]}
      />
      <Tabs.Screen
        options={{
          title: 'Opettajat',
        }}
      />
      <ScrollView className="flex-1 bg-zinc-50">
        <View className="max-w-4xl mx-auto w-full">
          {/* Header Section */}
          <View className="px-4 py-6 bg-white border-b border-zinc-200">
            <View className="flex-row items-center mb-2">
              <Users size={24} color="#18181b" />
              <Text className="text-xl font-semibold text-zinc-900 ml-2 tracking-tight">
                Henkilökunta
              </Text>
            </View>
            <Text className="text-zinc-500 text-sm">
              {teachers.length} opettajaa ja tutkijaa
            </Text>
          </View>

          {/* Teacher Cards */}
          <View className="p-4 gap-3">
            {teachers.map((teacher, index) => (
              <Pressable
                key={teacher.sys.id}
                onPress={() => router.push(`/teachers/${teacher.fields.slug}`)}
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
                  <View className="flex-row items-center">
                    {/* Avatar */}
                    <View className={`w-14 h-14 rounded-full ${getAvatarColor(index)} items-center justify-center`}>
                      <Text className="text-white font-semibold text-lg">
                        {getInitials(teacher.fields.name)}
                      </Text>
                    </View>

                    {/* Info */}
                    <View className="flex-1 ml-4">
                      <Text className="text-zinc-900 font-semibold text-base">
                        {teacher.fields.name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <View className="bg-zinc-100 px-2 py-0.5 rounded">
                          <Text className="text-zinc-600 text-xs">
                            {specializations[index % specializations.length]}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Actions */}
                    <View className="flex-row items-center gap-2">
                      <View className="w-10 h-10 rounded-full bg-zinc-100 items-center justify-center">
                        <Mail size={18} color="#71717a" />
                      </View>
                      <ChevronRight size={20} color="#d4d4d8" />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Contact Info */}
          <View className="mx-4 mb-8 p-4 bg-zinc-100 rounded-xl">
            <Text className="text-zinc-900 font-medium text-sm mb-2">
              Yhteystiedot
            </Text>
            <Text className="text-zinc-600 text-sm leading-relaxed">
              Henkilökunnan tavoitat parhaiten sähköpostitse. Vastaanottoajat
              ilmoitetaan erikseen kunkin kurssin yhteydessä.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
