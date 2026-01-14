import { SEO } from '@/components/SEO';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { type TeacherEntry } from '@/lib/contentful';
import { haptics } from '@/lib/haptics';
import { usePrefetch, useTeachers } from '@/lib/hooks/useQueries';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { useTheme } from '@/lib/stores/theme';
import { LegendList } from '@legendapp/list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronRight, Info, Mail, Search, X } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, RefreshControl, TextInput, View } from 'react-native';

const isWeb = Platform.OS === 'web';


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
  const { q } = useLocalSearchParams<{ q?: string }>();
  const { data: teachers = [], isLoading, refetch, isRefetching } = useTeachers();
  const { isDark } = useTheme();
  const { prefetchTeacher } = usePrefetch();

  const [searchQuery, setSearchQuery] = useState(q || '');

  // Sync search query from URL params (for native search bar)
  useEffect(() => {
    if (q !== undefined) {
      setSearchQuery(q);
    }
  }, [q]);

  // Filter teachers based on search
  const filteredTeachers = useMemo(() => {
    if (!searchQuery.trim()) return teachers;
    const query = searchQuery.toLowerCase();
    return teachers.filter((t) => t.fields.name?.toLowerCase().includes(query));
  }, [teachers, searchQuery]);

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
    ({ item: teacher }: { item: TeacherEntry }) => {
      return (
        <Pressable
          onPress={() => handleTeacherPress(teacher)}
          onHoverIn={() => handleTeacherHover(teacher)}
          accessibilityRole="button"
          accessibilityLabel={teacher.fields.name}
          accessibilityHint="Avaa opettajan tiedot"
          className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden active:bg-zinc-50 dark:active:bg-zinc-700 mb-3"
        >
          <View className="p-4">
            <View className="flex-row items-center">
              
              <View
                className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 items-center justify-center"
                accessibilityLabel={`${teacher.fields.name} avatar`}
              >
                <Text className="text-zinc-50 dark:text-zinc-900 font-semibold text-sm">
                  {getInitials(teacher.fields.name)}
                </Text>
              </View>

              
              <View className="flex-1 ml-3">
                <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-base">
                  {teacher.fields.name}
                </Text>
                <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Opettaja
                </Text>
              </View>

              
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation?.();
                    haptics.light();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Lähetä sähköposti"
                  className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-700 items-center justify-center active:bg-zinc-200 dark:active:bg-zinc-600"
                >
                  <Mail size={16} color={isDark ? '#a1a1aa' : '#71717a'} />
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
      <View className="-mx-4 -mt-4 mb-4">
        
        {isWeb && (
          <View className="px-4 py-4 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-700 rounded-xl px-4 py-3">
              <Search size={20} color={isDark ? '#a1a1aa' : '#71717a'} />
              <TextInput
                className="flex-1 ml-3 text-zinc-900 dark:text-zinc-100 text-base"
                placeholder="Hae opettajia..."
                placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  router.setParams({ q: text || undefined });
                }}
                accessibilityLabel="Hae opettajia"
                returnKeyType="search"
              />
              {searchQuery && (
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    router.setParams({ q: undefined });
                    haptics.light();
                  }}
                  accessibilityLabel="Tyhjennä haku"
                  className="p-1"
                >
                  <X size={18} color={isDark ? '#a1a1aa' : '#71717a'} />
                </Pressable>
              )}
            </View>
            <Text className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
              {filteredTeachers.length} tulosta
            </Text>
          </View>
        )}
      </View>
    ),
    [isDark, searchQuery, filteredTeachers.length, router]
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

      {isLoading ? (
        <View className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-4 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      ) : (
        <LegendList
          data={filteredTeachers}
          renderItem={renderTeacherCard}
          keyExtractor={(item) => item.sys.id}
          estimatedItemSize={88}
          contentContainerStyle={{ padding: 16, maxWidth: 896, marginHorizontal: 'auto', width: '100%' }}
          style={{ backgroundColor: isDark ? '#18181b' : '#fafafa' }}
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
          ListEmptyComponent={
            <View className="py-12 items-center">
              <Search size={48} color={isDark ? '#52525b' : '#d4d4d8'} />
              <Text className="text-zinc-400 dark:text-zinc-500 mt-4">Ei hakutuloksia</Text>
              <Text className="text-zinc-300 dark:text-zinc-600 text-sm mt-1">
                Kokeile toista hakusanaa
              </Text>
            </View>
          }
          accessibilityRole="list"
          accessibilityLabel={`Opettajalista, ${filteredTeachers.length} opettajaa`}
        />
      )}
    </>
  );
}
