import { CourseRow, courseSlug } from '@/components/CourseRow';
import { SEO } from '@/components/SEO';
import { Hero, Notice, Page, Placeholder, Row, Section, Segmented } from '@/components/kit';
import { SearchField } from '@/components/ui/controls';
import { getCourses, type CourseEntry } from '@/lib/contentful';
import { useCourses } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { createBreadcrumbSchema, createItemListSchema, ogImage, SITE_URL } from '@/lib/seo';
import { useFavorites } from '@/lib/stores/favorites';
import { courseCount } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform } from 'react-native';

type Show = 'all' | 'favorites';

export async function loader(): Promise<CourseEntry[] | null> {
  if (Platform.OS !== 'web') return null;
  try {
    return await getCourses();
  } catch {
    return null;
  }
}

export default function CoursesScreen() {
  const router = useRouter();
  const { q = '' } = useLocalSearchParams<{ q?: string }>();
  const { data: courses = [], isPending, isError, refetch } = useCourses(useWebLoaderData<CourseEntry[] | null>());
  const { isFavorite, favorites } = useFavorites();
  const [show, setShow] = useState<Show>('all');

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return courses
      .filter((c) => show === 'all' || isFavorite(courseSlug(c)))
      .filter(
        (c) =>
          !query ||
          c.fields.name.toLowerCase().includes(query) ||
          c.fields.courseId?.toLowerCase().includes(query)
      )
      .sort((a, b) => a.fields.name.trim().localeCompare(b.fields.name.trim(), 'fi'));
  }, [courses, q, show, isFavorite]);

  const credits = visible.reduce((sum, c) => sum + (c.fields.ects || 0), 0);

  return (
    <>
      <SEO
        title="Kurssit"
        description={`Salaisen Tiedekunnan koko opinto-opas: ${courses.length || 'kaikki'} kurssia kuvauksineen, opintopisteineen ja opettajineen. Hae nimellä tai kurssikoodilla.`}
        path="/courses"
        image={ogImage('courses')}
        jsonLd={[
          createItemListSchema(
            'Salaisen Tiedekunnan kurssit',
            courses.slice(0, 100).map((c) => ({
              name: c.fields.name,
              url: `${SITE_URL}/courses/${courseSlug(c)}`
            }))
          ),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Kurssit', url: `${SITE_URL}/courses` },
          ]),
        ]}
      />
      <Page onRefresh={refetch}>
        {Platform.OS === 'web' ? (
          <>
            <Hero kicker="Arkisto · kurssit" title="Kurssit" lede="Koko opinto-opas. Hae nimellä tai kurssikoodilla." />
            <SearchField
              value={q}
              onChangeText={(text) => router.setParams({ q: text || undefined })}
              placeholder="Hae nimellä tai koodilla"
            />
          </>
        ) : null}

        <Segmented
          value={show}
          onChange={setShow}
          options={[
            { value: 'all', label: 'Kaikki' },
            { value: 'favorites', label: favorites.size ? `Suosikit (${favorites.size})` : 'Suosikit' },
          ]}
        />

        <Section title={isPending ? 'Ladataan' : `${courseCount(visible.length)} · ${credits} op`}>
          {isPending ? (
            <Placeholder rows={8} />
          ) : isError ? (
            <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => refetch()} />
          ) : visible.length === 0 ? (
            <Row
              title={show === 'favorites' && !q ? 'Ei vielä suosikkeja' : 'Ei osumia'}
              subtitle={
                show === 'favorites' && !q
                  ? 'Paina kurssia pitkään ja valitse Lisää suosikiksi.'
                  : `Haulla ”${q}” ei löytynyt kursseja.`
              }
            />
          ) : (
            visible.map((c) => <CourseRow key={c.sys.id} course={c} />)
          )}
        </Section>

        <Notice text="Osa kursseista on salaisia. Niitä ei näytetä." />
      </Page>
    </>
  );
}
