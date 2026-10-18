import { Breadcrumb } from '@/components/Breadcrumb';
import { CourseRow, courseSlug } from '@/components/CourseRow';
import { SEO } from '@/components/SEO';
import { Field, Hero, Page, Placeholder, Prose, Row, Section } from '@/components/kit';
import { getMajor, getMajors, type CourseEntry, type MajorEntry } from '@/lib/contentful';
import { useMajor } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { toProseBlocks } from '@/lib/richtext';
import { createBreadcrumbSchema, createStudyProgramSchema, ogImage, SITE_URL, summarize } from '@/lib/seo';
import { courseCount } from '@/lib/utils';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

type LoaderData = { major: MajorEntry; courses: CourseEntry[] } | null;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const majors = await getMajors();
    return majors.map((major) => ({ slug: major.fields.slug || major.sys.id }));
  } catch {
    return [];
  }
}

export async function loader(_request: unknown, params: Record<string, string | string[]>): Promise<LoaderData> {
  if (!isWeb) return null;
  try {
    return await getMajor(decodeURIComponent(String(params.slug)));
  } catch {
    return null;
  }
}

export default function MajorDetailScreen() {
  const loaderData = useWebLoaderData<LoaderData>();
  const { slug = '' } = useLocalSearchParams<{ slug: string }>();
  const query = useMajor(slug);
  const data = query.data ?? loaderData ?? null;

  if (!data) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <Page>
          <Hero kicker="Osasto" />
          <Section>
            {query.isPending ? (
              <Placeholder rows={3} />
            ) : query.isError ? (
              <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => query.refetch()} />
            ) : (
              <Row title="Osastoa ei löytynyt" subtitle="Se on joko lakkautettu tai siirretty." />
            )}
          </Section>
        </Page>
      </>
    );
  }

  const { major, courses } = data;
  const name = major.fields.name;
  const majorSlug = major.fields.slug || slug;
  const totalCredits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);
  const intro = major.fields.introduction;
  const blocks = toProseBlocks(intro);
  const firstParagraph = blocks.find((b) => b.kind === 'paragraph')?.text;
  const description = summarize(
    `${name}: ${courseCount(courses.length)}, ${totalCredits} op. ${firstParagraph ?? 'Salaisen Tiedekunnan pääaine.'}`
  );
  const sorted = [...courses].sort((a, b) => a.fields.name.trim().localeCompare(b.fields.name.trim(), 'fi'));

  return (
    <>
      <SEO
        title={`${name} – pääaine`}
        description={description}
        path={`/majors/${majorSlug}`}
        image={ogImage('majors', major.sys.id)}
        jsonLd={[
          createStudyProgramSchema({
            name,
            slug: majorSlug,
            description,
            totalCredits,
            courses: courses.map((c) => ({ name: c.fields.name, courseId: courseSlug(c) })),
          }),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Pääaineet', url: `${SITE_URL}/majors` },
            { name, url: `${SITE_URL}/majors/${majorSlug}` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: '' }} />
      <Breadcrumb items={[{ label: 'Pääaineet', href: '/majors' }, { label: name }]} />
      <Page onRefresh={query.refetch}>
        <Hero kicker="Osasto · pääaine" title={name} />

        <Section title="Yhteenveto">
          <Field label="Kurssit" value={courseCount(courses.length)} />
          <Field label="Laajuus yhteensä" value={`${totalCredits} op`} />
          <Field label="Johtaja" redacted />
        </Section>

        {blocks.length ? (
          <Section title="Esittely">
            <Prose blocks={blocks} />
          </Section>
        ) : null}

        <Section title="Kurssit">
          {sorted.length ? (
            sorted.map((c) => <CourseRow key={c.sys.id} course={c} />)
          ) : (
            <Row title="Ei kursseja" subtitle="Tähän osastoon ei ole vielä liitetty kursseja." />
          )}
        </Section>
      </Page>
    </>
  );
}
