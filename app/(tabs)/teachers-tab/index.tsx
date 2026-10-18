import { SEO } from '@/components/SEO';
import { Hero, Page, Placeholder, Row, Section } from '@/components/kit';
import { SearchField } from '@/components/ui/controls';
import { getTeachers, type TeacherEntry } from '@/lib/contentful';
import { useTeachers } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { createBreadcrumbSchema, createItemListSchema, ogImage, SITE_URL } from '@/lib/seo';
import { avatarThumb } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';

export async function loader(): Promise<TeacherEntry[] | null> {
  if (Platform.OS !== 'web') return null;
  try {
    return await getTeachers();
  } catch {
    return null;
  }
}

export default function TeachersScreen() {
  const router = useRouter();
  const { q = '' } = useLocalSearchParams<{ q?: string }>();
  const { data: teachers = [], isPending, isError, refetch } = useTeachers(useWebLoaderData<TeacherEntry[] | null>());

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return query ? teachers.filter((t) => t.fields.name?.toLowerCase().includes(query)) : teachers;
  }, [teachers, q]);

  return (
    <>
      <SEO
        title="Opettajat"
        description="Salaisen Tiedekunnan opettajat ja heidän opettamansa kurssit. Osa henkilöllisyyksistä on salattu."
        path="/teachers"
        image={ogImage('teachers')}
        jsonLd={[
          createItemListSchema(
            'Salaisen Tiedekunnan opettajat',
            teachers.map((t) => ({
              name: t.fields.name || t.fields.slug,
              url: `${SITE_URL}/teachers/${t.fields.slug}`
            }))
          ),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Opettajat', url: `${SITE_URL}/teachers` },
          ]),
        ]}
      />
      <Page onRefresh={refetch}>
        <Hero
          kicker="Henkilöstötiedostot"
          title={Platform.OS === 'web' ? 'Opettajat' : undefined}
          lede="Osa opettajien henkilöllisyyksistä on salassapitovelvollisuuden piirissä."
        />
        {Platform.OS === 'web' ? (
          <SearchField
            value={q}
            onChangeText={(text) => router.setParams({ q: text || undefined })}
            placeholder="Hae opettajia"
          />
        ) : null}

        <Section title={isPending ? 'Ladataan' : `${visible.length} tunnistettua henkilöä`}>
          {isPending ? (
            <Placeholder rows={6} />
          ) : isError ? (
            <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => refetch()} />
          ) : visible.length === 0 ? (
            <Row title="Ei osumia" subtitle={`Haulla ”${q}” ei löytynyt opettajia.`} />
          ) : (
            visible.map((t) => (
              <Row
                key={t.sys.id}
                title={t.fields.name || t.fields.slug}
                imageUri={avatarThumb(t.avatarUrl, 40)}
                avatar
                href={`/teachers/${t.fields.slug}`}
              />
            ))
          )}
        </Section>
      </Page>
    </>
  );
}
