import { Breadcrumb } from '@/components/Breadcrumb';
import { SEO } from '@/components/SEO';
import { WebActions } from '@/components/WebActions';
import { Field, Hero, Notice, Page, Placeholder, Prose, Row, Section } from '@/components/kit';
import { getCourse, getCourses, majorCourses, type CourseEntry, type TeacherEntry } from '@/lib/contentful';
import { haptics } from '@/lib/haptics';
import { useCourse, useMajorsForCourse } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { toProseBlocks } from '@/lib/richtext';
import { createBreadcrumbSchema, createCourseSchema, ogImage, SITE_URL, summarize } from '@/lib/seo';
import { useFavorites } from '@/lib/stores/favorites';
import { useColors } from '@/lib/stores/theme';
import { avatarThumb, courseCount } from '@/lib/utils';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Heart, Share as ShareIcon } from 'lucide-react-native';
import { Platform, Pressable, Share, View } from 'react-native';

const isWeb = Platform.OS === 'web';

type LoaderData = { course: CourseEntry; teachers: TeacherEntry[] } | null;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const courses = await getCourses();
    return courses.map((course) => ({ id: course.fields.courseId || course.sys.id }));
  } catch {
    return [];
  }
}

export async function loader(_request: unknown, params: Record<string, string | string[]>): Promise<LoaderData> {
  if (!isWeb) return null;
  try {
    return await getCourse(decodeURIComponent(String(params.id)));
  } catch {
    return null;
  }
}

export default function CourseDetailScreen() {
  const { id = '' } = useLocalSearchParams<{ id: string }>();
  const loaderData = useWebLoaderData<LoaderData>(`/courses/${id}`);
  const colors = useColors();
  const { isFavorite, toggleFavorite } = useFavorites();
  const query = useCourse(id);

  const data = query.data ?? loaderData ?? null;
  const course = data?.course;
  const teachers = data?.teachers ?? [];
  const majors = useMajorsForCourse(course?.sys.id);

  const courseId = course?.fields.courseId || id;
  const fav = isFavorite(courseId);
  const url = `${SITE_URL}/courses/${courseId}`;

  const onToggleFavorite = () => {
    haptics.selection();
    toggleFavorite(courseId);
  };

  const onShare = () => {
    haptics.light();
    if (isWeb && typeof navigator !== 'undefined' && !navigator.share) {
      navigator.clipboard?.writeText(url);
      return;
    }
    Share.share({ url, message: `${course?.fields.name} – ${url}`, title: course?.fields.name }).catch(() => {});
  };

  if (!course) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <Page>
          <Hero kicker={`Tiedosto ${id}`} />
          <Section>
            {query.isPending ? (
              <Placeholder rows={3} />
            ) : query.isError ? (
              <Row title="Tietoja ei saatu ladattua" subtitle="Napauta yrittääksesi uudelleen" onPress={() => query.refetch()} />
            ) : (
              <Row title="Tiedostoa ei löytynyt" subtitle="Se on joko poistettu tai luokiteltu uudelleen." />
            )}
          </Section>
        </Page>
      </>
    );
  }

  const { name, ects, description } = course.fields;
  const blocks = toProseBlocks(description);
  const firstParagraph = blocks.find((b) => b.kind === 'paragraph')?.text;
  const pageDescription = summarize(
    `${courseId} ${name.trim()}, ${ects} op. ${firstParagraph ?? 'Salaisen Tiedekunnan opintojakso.'}`
  );
  const image = ogImage('courses', course.sys.id);

  return (
    <>
      <SEO
        title={`${name.trim()} (${courseId})`}
        description={pageDescription}
        path={`/courses/${courseId}`}
        image={image}
        imageAlt={`${courseId} ${name.trim()}`}
        type="article"
        jsonLd={[
          createCourseSchema({
            name,
            courseId,
            description: pageDescription,
            ects,
            image,
            teachers: teachers.filter((t) => t.fields.name).map((t) => ({ name: t.fields.name!, slug: t.fields.slug })),
          }),
          createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Kurssit', url: `${SITE_URL}/courses` },
            { name: courseId, url },
          ]),
        ]}
      />
      <Stack.Screen
        options={{
          title: '',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 6 }}>
              <Pressable
                onPress={onToggleFavorite}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={fav ? 'Poista suosikeista' : 'Lisää suosikiksi'}
              >
                <Heart size={21} color={colors.accent} fill={fav ? colors.accent : 'transparent'} />
              </Pressable>
              <Pressable onPress={onShare} hitSlop={8} accessibilityRole="button" accessibilityLabel="Jaa kurssi">
                <ShareIcon size={20} color={colors.accent} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Breadcrumb items={[{ label: 'Kurssit', href: '/courses' }, { label: courseId }]} />
      <Page onRefresh={query.refetch}>
        <Hero kicker={`Tiedosto ${courseId} · salainen`} title={name.trim()} />
        {isWeb ? <WebActions favorite={fav} onToggleFavorite={onToggleFavorite} onShare={onShare} /> : null}

        <Section title="Perustiedot">
          <Field label="Kurssikoodi" value={courseId} />
          <Field label="Laajuus" value={`${ects} op`} />
          <Field label="Opetuspaikka" redacted />
          <Field label="Aikataulu" redacted />
        </Section>

        {blocks.length ? (
          <Section title="Kuvaus">
            <Prose blocks={blocks} />
          </Section>
        ) : null}

        {teachers.length ? (
          <Section title={teachers.length > 1 ? 'Opettajat' : 'Opettaja'}>
            {teachers.map((t) => (
              <Row
                key={t.sys.id}
                title={t.fields.name || t.fields.slug}
                imageUri={avatarThumb(t.avatarUrl, 40)}
                avatar
                href={`/teachers/${t.fields.slug}`}
              />
            ))}
          </Section>
        ) : null}

        {majors.length ? (
          <Section title="Kuuluu pääaineisiin">
            {majors.map((m) => (
              <Row
                key={m.sys.id}
                title={m.fields.name}
                subtitle={courseCount(majorCourses(m).length)}
                href={`/majors/${m.fields.slug || m.sys.id}`}
              />
            ))}
          </Section>
        ) : null}

        <Notice text="Opetuspaikat ja -ajat ovat salassapitovelvollisuuden piirissä." />
      </Page>
    </>
  );
}
