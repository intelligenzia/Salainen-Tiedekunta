import { Breadcrumb } from '@/components/Breadcrumb';
import { CourseRow } from '@/components/CourseRow';
import { SEO } from '@/components/SEO';
import { Field, Hero, Page, Placeholder, Row, Section } from '@/components/kit';
import { getTeacher, getTeachers } from '@/lib/contentful';
import { useTeacher } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { createBreadcrumbSchema, createPersonSchema, ogImage, SITE_URL, summarize } from '@/lib/seo';
import { avatarThumb, courseCount } from '@/lib/utils';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

type LoaderData = Awaited<ReturnType<typeof getTeacher>>;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const teachers = await getTeachers();
    return teachers.map((teacher) => ({ slug: teacher.fields.slug }));
  } catch {
    return [];
  }
}

export async function loader(_request: unknown, params: Record<string, string | string[]>): Promise<LoaderData> {
  if (!isWeb) return null;
  try {
    return await getTeacher(decodeURIComponent(String(params.slug)));
  } catch {
    return null;
  }
}

export default function TeacherDetailScreen() {
  const loaderData = useWebLoaderData<LoaderData>();
  const { slug = '' } = useLocalSearchParams<{ slug: string }>();
  const query = useTeacher(slug);
  const data = query.data ?? loaderData ?? null;

  if (!data) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <Page>
          <Hero kicker="Henkilöstötiedosto" />
          <Section>
            {query.isPending ? (
              <Placeholder rows={3} />
            ) : query.isError ? (
              <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => query.refetch()} />
            ) : (
              <Row title="Henkilöä ei löytynyt" subtitle="Henkilöllisyys on mahdollisesti salattu." />
            )}
          </Section>
        </Page>
      </>
    );
  }

  const { teacher, courses } = data;
  const name = teacher.fields.name || teacher.fields.slug;
  const credits = courses.reduce((sum, c) => sum + (c.fields.ects || 0), 0);
  const description = summarize(
    `${name} opettaa Salaisessa Tiedekunnassa ${courseCount(courses.length)} (${credits} op)` +
      (courses.length ? `: ${courses.map((c) => c.fields.name.trim()).join(', ')}.` : '.')
  );

  return (
    <>
      <SEO
        title={`${name} – opettaja`}
        description={description}
        path={`/teachers/${teacher.fields.slug}`}
        image={ogImage('teachers', teacher.sys.id)}
        type="profile"
        jsonLd={[
          createPersonSchema({ name, slug: teacher.fields.slug, description, image: teacher.avatarUrl }),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Opettajat', url: `${SITE_URL}/teachers` },
            { name, url: `${SITE_URL}/teachers/${teacher.fields.slug}` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: '' }} />
      <Breadcrumb items={[{ label: 'Opettajat', href: '/teachers' }, { label: name }]} />
      <Page onRefresh={query.refetch}>
        <Hero kicker="Henkilöstötiedosto" title={name} imageUri={avatarThumb(teacher.avatarUrl, 112)} />

        <Section title="Tiedot">
          <Field label="Kurssit" value={courseCount(courses.length)} />
          <Field label="Opintopisteet" value={`${credits} op`} />
          <Field label="Vastaanotto" redacted />
        </Section>

        <Section title="Opettaa">
          {courses.length ? (
            courses.map((c) => <CourseRow key={c.sys.id} course={c} />)
          ) : (
            <Row title="Ei kursseja" subtitle="Opettajan kurssit ovat toistaiseksi salaisia." />
          )}
        </Section>
      </Page>
    </>
  );
}
