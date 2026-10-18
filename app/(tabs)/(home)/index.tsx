import { SEO } from '@/components/SEO';
import { Disclosure, Hero, Notice, Page, Placeholder, Row, Section, Stats } from '@/components/kit';
import { CourseRow } from '@/components/CourseRow';
import { INTRO, dailyPicks, facultyInfo } from '@/lib/content';
import { getCourses, getMajors, type CourseEntry, type MajorEntry } from '@/lib/contentful';
import { useCourses, useMajors } from '@/lib/hooks/useQueries';
import { useWebLoaderData } from '@/lib/hooks/useWebLoaderData';
import { createItemListSchema, ogImage, SITE_URL, summarize } from '@/lib/seo';
import { useMemo } from 'react';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const sections = [
  { title: 'Pääaineet', description: 'Osastot ja niiden opintokokonaisuudet', href: '/majors' },
  { title: 'Kurssit', description: 'Koko opinto-opas, haettavissa', href: '/courses' },
  { title: 'Opettajat', description: 'Henkilöstötiedostot', href: '/teachers' },
] as const;

type LoaderData = { courses: CourseEntry[]; majors: MajorEntry[] } | null;

export async function loader(): Promise<LoaderData> {
  if (!isWeb) return null;
  try {
    const [courses, majors] = await Promise.all([getCourses(), getMajors()]);
    return { courses, majors };
  } catch {
    return null;
  }
}

export default function HomeScreen() {
  const initial = useWebLoaderData<LoaderData>();
  const courses = useCourses(initial?.courses);
  const majors = useMajors(initial?.majors);

  const picks = useMemo(() => dailyPicks(courses.data ?? [], 4), [courses.data]);
  const totalCredits = courses.data?.reduce((sum, c) => sum + (c.fields.ects || 0), 0);

  return (
    <>
      <SEO
        title="Salainen Tiedekunta – kognitiotieteen salainen opinto-opas"
        description={summarize(INTRO)}
        path="/"
        image={ogImage()}
        jsonLd={[
          createItemListSchema(
            'Salaisen Tiedekunnan arkisto',
            sections.map((s) => ({ name: s.title, url: `${SITE_URL}${s.href}` }))
          ),
        ]}
      />
      <Page onRefresh={() => Promise.all([courses.refetch(), majors.refetch()])}>
        <Hero
          kicker="Luokiteltu · vain valtuutetuille"
          title={isWeb ? 'Salainen Tiedekunta' : undefined}
          lede={INTRO}
        />

        <Section>
          <Stats
            items={[
              { value: String(courses.data?.length ?? '—'), label: 'kurssia' },
              { value: String(majors.data?.length ?? '—'), label: 'pääainetta' },
              { value: String(totalCredits ?? '—'), label: 'op' },
            ]}
          />
        </Section>

        <Section title="Päivän kurssit" footer="Valikoima vaihtuu vuorokauden välein.">
          {courses.isPending ? <Placeholder rows={4} /> : picks.map((c) => <CourseRow key={c.sys.id} course={c} />)}
        </Section>

        {isWeb ? (
          <Section title="Arkisto">
            {sections.map((s) => (
              <Row key={s.href} title={s.title} subtitle={s.description} href={s.href} />
            ))}
          </Section>
        ) : null}

        <Section title="Tietoa tiedekunnasta">
          {facultyInfo.map((item) => (
            <Disclosure key={item.id} title={item.title} text={item.content} />
          ))}
        </Section>

        <Notice text="Tämä asiakirja on salainen. Älä levitä." />
      </Page>
    </>
  );
}
