import { SEO } from '@/components/SEO';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { type MajorEntry } from '@/lib/contentful';
import { haptics } from '@/lib/haptics';
import { useMajors, usePrefetch } from '@/lib/hooks/useQueries';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { useTheme } from '@/lib/stores/theme';
import { LegendList } from '@legendapp/list';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { BookOpen, ChevronRight, GraduationCap, Info, Search, X } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, RefreshControl, TextInput, View } from 'react-native';

const isWeb = Platform.OS === 'web';

// Generate some variety in course/credit counts
const getMajorStats = (index: number) => ({
  courses: 5 + index * 2 + (index % 3),
  credits: 25 + index * 10 + (index % 2) * 5,
});


export default function MajorsScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const { data: majors = [], isLoading, refetch, isRefetching } = useMajors();
  const { isDark } = useTheme();
  const { prefetchMajor } = usePrefetch();

  const [searchQuery, setSearchQuery] = useState(q || '');

  // Sync search query from URL params (for native search bar)
  useEffect(() => {
    if (q !== undefined) {
      setSearchQuery(q);
    }
  }, [q]);

  // Filter majors based on search
  const filteredMajors = useMemo(() => {
    if (!searchQuery.trim()) return majors;
    const query = searchQuery.toLowerCase();
    return majors.filter((m) => m.fields.name.toLowerCase().includes(query));
  }, [majors, searchQuery]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    haptics.light();
    refetch();
  }, [refetch]);

  // Handle hover/press for prefetching
  const handleMajorPrefetch = useCallback(
    (major: MajorEntry) => {
      prefetchMajor(major.fields.slug || major.sys.id);
    },
    [prefetchMajor]
  );

  // Render major card
  const renderMajorCard = useCallback(
    ({ item: major, index }: { item: MajorEntry; index: number }) => {
      const stats = getMajorStats(index);
      const majorSlug = major.fields.slug || major.sys.id;

      return (
        <Link href={`/majors/${majorSlug}`} asChild>
          <Link.Trigger>
            <Pressable
              onHoverIn={() => handleMajorPrefetch(major)}
              onPressIn={() => handleMajorPrefetch(major)}
              accessibilityRole="button"
              accessibilityLabel={`${major.fields.name}, ${stats.courses} kurssia, ${stats.credits} opintopistettä`}
              accessibilityHint="Avaa pääaineen tiedot"
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden active:bg-zinc-50 dark:active:bg-zinc-700 mb-3"
            >
              <View className="p-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold tracking-tight">
                      {major.fields.name}
                    </Text>

                    
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
          </Link.Trigger>
          <Link.Preview />
        </Link>
      );
    },
    [handleMajorPrefetch, isDark]
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
      <View className="-mx-4 -mt-4 mb-4">
        
        {isWeb && (
          <View className="px-4 py-4 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-700 rounded-xl px-4 py-3">
              <Search size={20} color={isDark ? '#a1a1aa' : '#71717a'} />
              <TextInput
                className="flex-1 ml-3 text-zinc-900 dark:text-zinc-100 text-base"
                placeholder="Hae pääaineita..."
                placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  router.setParams({ q: text || undefined });
                }}
                accessibilityLabel="Hae pääaineita"
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
              {filteredMajors.length} tulosta
            </Text>
          </View>
        )}
        <View className="px-4 py-6 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
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
      </View>
    ),
    [isDark, searchQuery, filteredMajors.length, router]
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

      {isLoading ? (
        <View className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      ) : (
        <LegendList
          data={filteredMajors}
          renderItem={renderMajorCard}
          keyExtractor={(item) => item.sys.id}
          estimatedItemSize={120}
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
          accessibilityLabel={`Pääainelista, ${filteredMajors.length} pääainetta`}
        />
      )}
    </>
  );
}
