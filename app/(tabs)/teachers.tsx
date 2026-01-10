import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { SkeletonCard } from '@/components/ui/skeleton';
import { type TeacherEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { useTeachers, usePrefetch } from '@/lib/hooks/useQueries';
import { useTheme } from '@/lib/stores/theme';
import { haptics } from '@/lib/haptics';
import { Tabs, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Platform, Pressable, RefreshControl, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { Users, ChevronRight, Mail, Info } from 'lucide-react-native';

const isWeb = Platform.OS === 'web';

const specializations = [
  'Kognitiotiede',
  'Neurotiede',
  'Tekoäly',
  'Kielitiede',
  'Filosofia',
  'Koneoppiminen',
];

// Avatar colors
const avatarColors = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
];

// Get initials from name
const getInitials = (name: string | undefined) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    // Skip titles like Prof., Dr.
    const firstName = parts.find((p) => !p.endsWith('.')) || parts[0];
    const lastName = parts[parts.length - 1];
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }
  return name.charAt(0);
};

export default function TeachersScreen() {
  const router = useRouter();
  const { data: teachers = [], isLoading, refetch, isRefetching } = useTeachers();
  const { isDark } = useTheme();
  const { prefetchTeacher } = usePrefetch();

  // Handle refresh
  const handleRefresh = useCallback(() => {
    haptics.light();
    refetch();
  }, [refetch]);

  // Handle teacher press
  const handleTeacherPress = useCallback(
    (teacher: TeacherEntry) => {
      haptics.light();
      router.push(`/teachers/${teacher.fields.slug}`);
    },
    [router]
  );

  // Handle hover for prefetching (web only)
  const handleTeacherHover = useCallback(
    (teacher: TeacherEntry) => {
      if (isWeb) {
        prefetchTeacher(teacher.fields.slug || teacher.sys.id);
      }
    },
    [prefetchTeacher]
  );

  // Render teacher card
  const renderTeacherCard = useCallback(
    ({ item: teacher, index }: { item: TeacherEntry; index: number }) => {
      const avatarColor = avatarColors[index % avatarColors.length];
      const specialization = specializations[index % specializations.length];

      return (
        <Pressable
          onPress={() => handleTeacherPress(teacher)}
          onHoverIn={() => handleTeacherHover(teacher)}
          accessibilityRole="button"
          accessibilityLabel={`${teacher.fields.name}, ${specialization}`}
          accessibilityHint="Avaa opettajan tiedot"
          className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden active:bg-zinc-50 dark:active:bg-zinc-700 mb-3"
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
              <View
                className={`w-14 h-14 rounded-full ${avatarColor} items-center justify-center`}
                accessibilityLabel={`${teacher.fields.name} avatar`}
              >
                <Text className="text-white font-semibold text-lg">
                  {getInitials(teacher.fields.name)}
                </Text>
              </View>

              {/* Info */}
              <View className="flex-1 ml-4">
                <Text className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">
                  {teacher.fields.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded">
                    <Text className="text-zinc-600 dark:text-zinc-300 text-xs">
                      {specialization}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    haptics.light();
                    // Could open email client
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Lähetä sähköposti"
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-700 items-center justify-center active:bg-zinc-200 dark:active:bg-zinc-600"
                >
                  <Mail size={18} color={isDark ? '#a1a1aa' : '#71717a'} />
                </Pressable>
                <ChevronRight size={20} color={isDark ? '#71717a' : '#d4d4d8'} />
              </View>
            </View>
          </View>
        </Pressable>
      );
    },
    [handleTeacherPress, handleTeacherHover, isDark]
  );

  // SEO schemas
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

  // List header component
  const ListHeader = useCallback(
    () => (
      <View className="px-4 py-6 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 mb-4">
        <View className="flex-row items-center mb-2">
          <Users size={24} color={isDark ? '#fafafa' : '#18181b'} />
          <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 ml-2 tracking-tight">
            Henkilökunta
          </Text>
        </View>
        <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
          {teachers.length} opettajaa ja tutkijaa
        </Text>
      </View>
    ),
    [isDark, teachers.length]
  );

  // List footer component
  const ListFooter = useCallback(
    () => (
      <View className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl mt-4 mb-8">
        <View className="flex-row items-start">
          <Info size={18} color={isDark ? '#a1a1aa' : '#71717a'} style={{ marginTop: 2 }} />
          <View className="flex-1 ml-3">
            <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-sm mb-2">
              Yhteystiedot
            </Text>
            <Text className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Henkilökunnan tavoitat parhaiten sähköpostitse. Vastaanottoajat
              ilmoitetaan erikseen kunkin kurssin yhteydessä.
            </Text>
          </View>
        </View>
      </View>
    ),
    [isDark]
  );

  return (
    <>
      <SEO
        title="Opettajat"
        description="Tutustu Salaisen Tiedekunnan opettajiin ja tutkijoihin. Kognitiotieteen, neurotieteen ja tekoälyn asiantuntijoita."
        path="/teachers"
        jsonLd={[teacherListSchema, breadcrumbSchema]}
      />
      <Tabs.Screen options={{ title: 'Opettajat' }} />

      <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
        <View className="max-w-4xl mx-auto w-full flex-1">
          {isLoading ? (
            <View className="p-4 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </View>
          ) : (
            <LegendList
              data={teachers}
              renderItem={renderTeacherCard}
              keyExtractor={(item) => item.sys.id}
              estimatedItemSize={88}
              contentContainerStyle={{ padding: 16 }}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListFooter}
              refreshControl={
                <RefreshControl
                  refreshing={isRefetching}
                  onRefresh={handleRefresh}
                  tintColor={isDark ? '#a1a1aa' : '#71717a'}
                  colors={['#71717a']}
                />
              }
              accessibilityRole="list"
              accessibilityLabel={`Opettajalista, ${teachers.length} opettajaa`}
            />
          )}
        </View>
      </View>
    </>
  );
}
