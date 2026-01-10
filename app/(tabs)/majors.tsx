import { SEO } from '@/components/SEO';
import { Text } from '@/components/ui/text';
import { SkeletonCard } from '@/components/ui/skeleton';
import { type MajorEntry } from '@/lib/contentful';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { useMajors, usePrefetch } from '@/lib/hooks/useQueries';
import { useTheme } from '@/lib/stores/theme';
import { haptics } from '@/lib/haptics';
import { Tabs, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Platform, Pressable, RefreshControl, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { GraduationCap, BookOpen, ChevronRight, Info } from 'lucide-react-native';

const isWeb = Platform.OS === 'web';

// Generate some variety in course/credit counts
const getMajorStats = (index: number) => ({
  courses: 5 + index * 2 + (index % 3),
  credits: 25 + index * 10 + (index % 2) * 5,
});

// Accent colors for major cards
const accentColors = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-violet-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-cyan-600',
];

export default function MajorsScreen() {
  const router = useRouter();
  const { data: majors = [], isLoading, refetch, isRefetching } = useMajors();
  const { isDark } = useTheme();
  const { prefetchMajor } = usePrefetch();

  // Handle refresh
  const handleRefresh = useCallback(() => {
    haptics.light();
    refetch();
  }, [refetch]);

  // Handle major press
  const handleMajorPress = useCallback(
    (major: MajorEntry) => {
      haptics.light();
      router.push(`/majors/${major.fields.slug || major.sys.id}`);
    },
    [router]
  );

  // Handle hover for prefetching (web only)
  const handleMajorHover = useCallback(
    (major: MajorEntry) => {
      if (isWeb) {
        prefetchMajor(major.fields.slug || major.sys.id);
      }
    },
    [prefetchMajor]
  );

  // Render major card
  const renderMajorCard = useCallback(
    ({ item: major, index }: { item: MajorEntry; index: number }) => {
      const stats = getMajorStats(index);
      const accentColor = accentColors[index % accentColors.length];

      return (
        <Pressable
          onPress={() => handleMajorPress(major)}
          onHoverIn={() => handleMajorHover(major)}
          accessibilityRole="button"
          accessibilityLabel={`${major.fields.name}, ${stats.courses} kurssia, ${stats.credits} opintopistettä`}
          accessibilityHint="Avaa pääaineen tiedot"
          className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden active:bg-zinc-50 dark:active:bg-zinc-700 mb-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          {/* Card Header with gradient accent */}
          <View className={`h-2 ${accentColor}`} />

          <View className="p-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold tracking-tight">
                  {major.fields.name}
                </Text>

                {/* Stats Row */}
                <View className="flex-row items-center mt-3 gap-4">
                  <View className="flex-row items-center">
                    <BookOpen size={14} color={isDark ? '#a1a1aa' : '#71717a'} />
                    <Text className="text-zinc-500 dark:text-zinc-400 text-sm ml-1.5">
                      {stats.courses} kurssia
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 mr-2" />
                    <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {stats.credits} op
                    </Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={24} color={isDark ? '#71717a' : '#d4d4d8'} />
            </View>
          </View>
        </Pressable>
      );
    },
    [handleMajorPress, handleMajorHover, isDark]
  );

  // SEO schemas
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

  // List header component
  const ListHeader = useCallback(
    () => (
      <View className="px-4 py-6 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 mb-4">
        <View className="flex-row items-center mb-2">
          <GraduationCap size={24} color={isDark ? '#fafafa' : '#18181b'} />
          <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 ml-2 tracking-tight">
            Opintosuunnat
          </Text>
        </View>
        <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
          Valitse sinua kiinnostava pääaine ja tutustu sen opintokokonaisuuksiin
        </Text>
      </View>
    ),
    [isDark]
  );

  // List footer component
  const ListFooter = useCallback(
    () => (
      <View className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl mt-4 mb-8">
        <View className="flex-row items-start">
          <Info size={18} color={isDark ? '#a1a1aa' : '#71717a'} style={{ marginTop: 2 }} />
          <Text className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed ml-3 flex-1">
            Pääaineet muodostavat opintojen rungon. Jokainen pääaine sisältää perus- ja
            aineopinnot sekä syventävät opinnot, joista koostuu kandidaatin- ja
            maisterintutkinto.
          </Text>
        </View>
      </View>
    ),
    [isDark]
  );

  return (
    <>
      <SEO
        title="Pääaineet"
        description="Tutustu Salaisen Tiedekunnan pääaineisiin: kognitiotiede, tekoäly, neurotiede, kielitiede ja filosofia."
        path="/majors"
        jsonLd={[majorListSchema, breadcrumbSchema]}
      />
      <Tabs.Screen options={{ title: 'Pääaineet' }} />

      <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
        <View className="max-w-4xl mx-auto w-full flex-1">
          {isLoading ? (
            <View className="p-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </View>
          ) : (
            <LegendList
              data={majors}
              renderItem={renderMajorCard}
              keyExtractor={(item) => item.sys.id}
              estimatedItemSize={120}
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
              accessibilityLabel={`Pääainelista, ${majors.length} pääainetta`}
            />
          )}
        </View>
      </View>
    </>
  );
}
