import { SEO } from '@/components/SEO';
import { SkeletonCourseCard } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { type CourseEntry } from '@/lib/contentful';
import { haptics } from '@/lib/haptics';
import { useSearchShortcut } from '@/lib/hooks/useKeyboardNavigation';
import { useCourses, usePrefetch } from '@/lib/hooks/useQueries';
import { createBreadcrumbSchema, createItemListSchema, SITE_URL } from '@/lib/seo';
import { useFavorites } from '@/lib/stores/favorites';
import { useTheme } from '@/lib/stores/theme';
import { LegendList } from '@legendapp/list';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowUpDown,
    BookOpen,
    ChevronRight,
    Clock,
    Filter,
    Heart,
    Keyboard,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Platform,
    Pressable,
    RefreshControl,
    TextInput,
    View,
} from 'react-native';

const isWeb = Platform.OS === 'web';

type SortOption = 'name' | 'courseId' | 'ects';
type FilterOption = 'all' | 'favorites';

export default function CoursesScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const searchInputRef = useRef<TextInput>(null);
  const { data: courses = [], isLoading, refetch, isRefetching } = useCourses();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();
  const { prefetchCourse } = usePrefetch();

  const [searchQuery, setSearchQuery] = useState(q || '');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Sync search query from URL params (for native search bar)
  useEffect(() => {
    if (q !== undefined) {
      setSearchQuery(q);
    }
  }, [q]);

  // Enable keyboard shortcut to focus search (web only)
  useSearchShortcut(searchInputRef);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Apply favorites filter
    if (filterBy === 'favorites') {
      result = result.filter((c) => isFavorite(c.fields.courseId || c.sys.id));
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.fields.name.toLowerCase().includes(query) ||
          c.fields.courseId?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'courseId':
          return (a.fields.courseId || '').localeCompare(b.fields.courseId || '');
        case 'ects':
          return (b.fields.ects || 0) - (a.fields.ects || 0);
        case 'name':
        default:
          return a.fields.name.localeCompare(b.fields.name);
      }
    });

    return result;
  }, [courses, searchQuery, sortBy, filterBy, isFavorite]);

  // Autocomplete suggestions
  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return courses
      .filter(
        (c) =>
          c.fields.name.toLowerCase().includes(query) ||
          c.fields.courseId?.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [courses, searchQuery]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    haptics.light();
    refetch();
  }, [refetch]);

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(
    (courseId: string) => {
      haptics.selection();
      toggleFavorite(courseId);
    },
    [toggleFavorite]
  );

  // Handle hover for prefetching (web only)
  const handleCourseHover = useCallback(
    (course: CourseEntry) => {
      if (isWeb) {
        prefetchCourse(course.fields.courseId || course.sys.id);
      }
    },
    [prefetchCourse]
  );

  // Render course card
  const renderCourseCard = useCallback(
    ({ item: course }: { item: CourseEntry }) => {
      const courseId = course.fields.courseId || course.sys.id;
      const isFav = isFavorite(courseId);

      return (
        <Link href={`/courses/${courseId}`} asChild>
          <Link.Trigger>
            <Pressable
              onHoverIn={() => handleCourseHover(course)}
              accessibilityRole="button"
              accessibilityLabel={`${course.fields.name}, ${course.fields.ects} opintopistettä${isFav ? ', suosikki' : ''}`}
              accessibilityHint="Avaa kurssin tiedot"
              className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden active:bg-zinc-50 dark:active:bg-zinc-700 mb-3"
            >
              <View className="p-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    {course.fields.courseId && (
                      <Text className="text-zinc-400 dark:text-zinc-500 text-xs mb-1 font-mono tracking-wide">
                        {course.fields.courseId}
                      </Text>
                    )}
                    <Text className="text-zinc-900 dark:text-zinc-100 text-base font-medium leading-snug">
                      {course.fields.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation?.();
                        handleToggleFavorite(courseId);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={isFav ? 'Poista suosikeista' : 'Lisää suosikiksi'}
                      className="p-2 mr-1 active:opacity-70"
                      hitSlop={8}
                    >
                      <Heart
                        size={18}
                        color={isFav ? (isDark ? '#fafafa' : '#18181b') : '#d4d4d8'}
                        fill={isFav ? (isDark ? '#fafafa' : '#18181b') : 'transparent'}
                      />
                    </Pressable>
                    <View className="bg-zinc-900 dark:bg-zinc-100 px-2.5 py-1 rounded-lg mr-2">
                      <Text className="text-white dark:text-zinc-900 text-sm font-medium tabular-nums">
                        {course.fields.ects} op
                      </Text>
                    </View>
                    <ChevronRight size={20} color={isDark ? '#71717a' : '#d4d4d8'} />
                  </View>
                </View>
              </View>
            </Pressable>
          </Link.Trigger>
          <Link.Preview />
        </Link>
      );
    },
    [isFavorite, handleCourseHover, handleToggleFavorite, isDark]
  );

  // SEO schemas
  const courseListSchema = createItemListSchema(
    'Salaisen Tiedekunnan kurssit',
    courses.slice(0, 100).map((course, index) => ({
      name: `${course.fields.courseId} ${course.fields.name}`,
      url: `${SITE_URL}/courses/${course.fields.courseId || course.sys.id}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Etusivu', url: SITE_URL },
    { name: 'Kurssit', url: `${SITE_URL}/courses` },
  ]);

  const favoriteCount = courses.filter((c) =>
    isFavorite(c.fields.courseId || c.sys.id)
  ).length;

  return (
    <>
      <SEO
        title="Kurssit"
        description="Selaa Salaisen Tiedekunnan kursseja. Kognitiotieteen, neurotieteen, tekoälyn ja filosofian opintojaksoja."
        path="/courses"
        jsonLd={[courseListSchema, breadcrumbSchema]}
      />

      
      {isWeb && (
        <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
          <View className="max-w-4xl mx-auto w-full flex-1">
            
            <View className="px-4 py-4 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-700 rounded-xl px-4 py-3">
                <Search size={20} color={isDark ? '#a1a1aa' : '#71717a'} />
                <TextInput
                  ref={searchInputRef}
                  className="flex-1 ml-3 text-zinc-900 dark:text-zinc-100 text-base"
                  placeholder="Hae kursseja... (/ tai ⌘K)"
                  placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    setShowAutocomplete(text.length >= 2);
                    router.setParams({ q: text || undefined });
                  }}
                  onFocus={() => setShowAutocomplete(searchQuery.length >= 2)}
                  onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                  accessibilityLabel="Hae kursseja"
                  accessibilityHint="Kirjoita kurssin nimi tai koodi"
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

              
              {showAutocomplete && autocompleteSuggestions.length > 0 && (
                <View className="absolute left-4 right-4 top-16 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg z-50 overflow-hidden">
                  {autocompleteSuggestions.map((course) => (
                    <Pressable
                      key={course.sys.id}
                      onPress={() => {
                        router.push(`/courses/${course.fields.courseId || course.sys.id}`);
                        setShowAutocomplete(false);
                      }}
                      className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700 active:bg-zinc-50 dark:active:bg-zinc-700"
                    >
                      <Text className="text-zinc-500 dark:text-zinc-400 text-xs font-mono">
                        {course.fields.courseId}
                      </Text>
                      <Text className="text-zinc-900 dark:text-zinc-100 text-sm">
                        {course.fields.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              
              <View className="flex-row items-center justify-between mt-3">
                <Text className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {filteredCourses.length} tulosta
                </Text>
                <Pressable
                  onPress={() => {
                    setShowFilters(!showFilters);
                    haptics.light();
                  }}
                  accessibilityLabel={showFilters ? 'Piilota suodattimet' : 'Näytä suodattimet'}
                  className="flex-row items-center px-3 py-1.5 bg-zinc-100 dark:bg-zinc-700 rounded-lg"
                >
                  <SlidersHorizontal size={14} color={isDark ? '#a1a1aa' : '#71717a'} />
                  <Text className="text-zinc-600 dark:text-zinc-300 text-sm ml-1.5">
                    Suodattimet
                  </Text>
                </Pressable>
              </View>

              
              {showFilters && (
                <View className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  
                  <View className="mb-3">
                    <View className="flex-row items-center mb-2">
                      <ArrowUpDown size={14} color={isDark ? '#a1a1aa' : '#71717a'} />
                      <Text className="text-zinc-600 dark:text-zinc-300 text-sm ml-1.5 font-medium">
                        Järjestä
                      </Text>
                    </View>
                    <View className="flex-row flex-wrap gap-2">
                      {[
                        { value: 'name' as SortOption, label: 'Nimi' },
                        { value: 'courseId' as SortOption, label: 'Koodi' },
                        { value: 'ects' as SortOption, label: 'Opintopisteet' },
                      ].map((option) => (
                        <Pressable
                          key={option.value}
                          onPress={() => {
                            setSortBy(option.value);
                            haptics.selection();
                          }}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: sortBy === option.value }}
                          className={`px-3 py-1.5 rounded-lg ${
                            sortBy === option.value
                              ? 'bg-zinc-900 dark:bg-zinc-100'
                              : 'bg-zinc-100 dark:bg-zinc-700'
                          }`}
                        >
                          <Text
                            className={`text-sm ${
                              sortBy === option.value
                                ? 'text-white dark:text-zinc-900 font-medium'
                                : 'text-zinc-600 dark:text-zinc-300'
                            }`}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  
                  <View>
                    <View className="flex-row items-center mb-2">
                      <Filter size={14} color={isDark ? '#a1a1aa' : '#71717a'} />
                      <Text className="text-zinc-600 dark:text-zinc-300 text-sm ml-1.5 font-medium">
                        Näytä
                      </Text>
                    </View>
                    <View className="flex-row flex-wrap gap-2">
                      {[
                        { value: 'all' as FilterOption, label: 'Kaikki' },
                        { value: 'favorites' as FilterOption, label: `Suosikit (${favoriteCount})` },
                      ].map((option) => (
                        <Pressable
                          key={option.value}
                          onPress={() => {
                            setFilterBy(option.value);
                            haptics.selection();
                          }}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: filterBy === option.value }}
                          className={`px-3 py-1.5 rounded-lg ${
                            filterBy === option.value
                              ? 'bg-zinc-900 dark:bg-zinc-100'
                              : 'bg-zinc-100 dark:bg-zinc-700'
                          }`}
                        >
                          <Text
                            className={`text-sm ${
                              filterBy === option.value
                                ? 'text-white dark:text-zinc-900 font-medium'
                                : 'text-zinc-600 dark:text-zinc-300'
                            }`}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </View>

            
            <View className="flex-row px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <View className="flex-row items-center mr-6">
                <BookOpen size={16} color={isDark ? '#a1a1aa' : '#71717a'} />
                <Text className="text-zinc-600 dark:text-zinc-400 text-sm ml-2">
                  {courses.length} kurssia
                </Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={16} color={isDark ? '#a1a1aa' : '#71717a'} />
                <Text className="text-zinc-600 dark:text-zinc-400 text-sm ml-2">
                  {courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0)} op yhteensä
                </Text>
              </View>
            </View>

            
            {isLoading ? (
              <View className="p-4 gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonCourseCard key={i} />
                ))}
              </View>
            ) : (
              <LegendList
                data={filteredCourses}
                renderItem={renderCourseCard}
                keyExtractor={(item) => item.sys.id}
                estimatedItemSize={88}
                contentContainerStyle={{ padding: 16 }}
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
                accessibilityLabel={`Kurssilista, ${filteredCourses.length} kurssia`}
              />
            )}

            
            <View className="absolute bottom-4 right-4 flex-row items-center bg-zinc-800 dark:bg-zinc-700 px-3 py-2 rounded-lg opacity-80">
              <Keyboard size={14} color="#a1a1aa" />
              <Text className="text-zinc-400 text-xs ml-2">
                j/k navigoi, Enter avaa
              </Text>
            </View>
          </View>
        </View>
      )}

      
      {!isWeb && (
        isLoading ? (
          <View className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-4 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonCourseCard key={i} />
            ))}
          </View>
        ) : (
          <LegendList
            data={filteredCourses}
            renderItem={renderCourseCard}
            keyExtractor={(item) => item.sys.id}
            estimatedItemSize={88}
            contentContainerStyle={{ padding: 16 }}
            style={{ backgroundColor: isDark ? '#18181b' : '#fafafa' }}
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
            accessibilityLabel={`Kurssilista, ${filteredCourses.length} kurssia`}
          />
        )
      )}
    </>
  );
}
