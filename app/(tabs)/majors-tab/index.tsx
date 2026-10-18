import { SEO } from '@/components/SEO';
import { Hero, Page, Placeholder, Row, Section } from '@/components/kit';
import { SearchField } from '@/components/ui/controls';
import { getMajors, majorCourses, type MajorEntry } from '@/lib/contentful';
import { useMajors } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { createBreadcrumbSchema, createItemListSchema, ogImage, SITE_URL } from '@/lib/seo';
import { courseCount } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';

const majorSlug = (m: MajorEntry) => m.fields.slug || m.sys.id;

export async function loader(): Promise<MajorEntry[] | null> {
  if (Platform.OS !== 'web') return null;
  try {
    return await getMajors();
  } catch {
    return null;
  }
}

export default function MajorsScreen() {
  const router = useRouter();
  const { q = '' } = useLocalSearchParams<{ q?: string }>();
  const { data: majors = [], isPending, isError, refetch } = useMajors(useWebLoaderData<MajorEntry[] | null>());

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query ? majors.filter((m) => m.fields.name.toLowerCase().includes(query)) : majors;
  }, [majors, q]);

  return (
    <>
      <SEO
        title="Pääaineet"
        description={`Salaisen Tiedekunnan ${majors.length || ''} pääainetta ja niiden kurssit, opintopisteet ja esittelyt.`.replace('  ', ' ')}
        path="/majors"
        image={ogImage('majors')}
        jsonLd={[
          createItemListSchema(
            'Salaisen Tiedekunnan pääaineet',
            majors.map((m) => ({ name: m.fields.name, url: `${SITE_URL}/majors/${majorSlug(m)}` }))
          ),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Pääaineet', url: `${SITE_URL}/majors` },
          ]),
        ]}
      />
      <Page onRefresh={refetch}>
        <Hero
          kicker="Arkisto · osastot"
          title={Platform.OS === 'web' ? 'Pääaineet' : undefined}
          lede="Pääaine muodostaa opintojen rungon. Osastojen tarkka määrä ja sijainti ovat salaisia."
        />
        {Platform.OS === 'web' ? (
          <SearchField
            value={q}
            onChangeText={(text) => router.setParams({ q: text || undefined })}
            placeholder="Hae pääaineita"
          />
        ) : null}

        <Section title={isPending ? 'Ladataan' : `${visible.length} pääainetta`}>
          {isPending ? (
            <Placeholder rows={6} />
          ) : isError ? (
            <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => refetch()} />
          ) : visible.length === 0 ? (
            <Row title="Ei osumia" subtitle={`Haulla ”${q}” ei löytynyt pääaineita.`} />
          ) : (
            visible.map((m) => {
              const courses = majorCourses(m);
              const credits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);
              return (
                <Row
                  key={m.sys.id}
                  title={m.fields.name}
                  subtitle={courseCount(courses.length)}
                  trailing={`${credits} op`}
                  href={`/majors/${majorSlug(m)}`}
                />
              );
            })
          )}
        </Section>
      </Page>
    </>
  );
}
