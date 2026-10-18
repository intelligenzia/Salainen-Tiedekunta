import { Row } from '@/components/kit';
import type { CourseEntry } from '@/lib/contentful';
import { haptics } from '@/lib/haptics';
import { SITE_URL } from '@/lib/seo';
import { useFavorites } from '@/lib/stores/favorites';
import { Share } from 'react-native';

export function courseSlug(course: CourseEntry) {
  return course.fields.courseId || course.sys.id;
}

/** A course in any list: name, file code, credits, favourite mark and a long-press menu. */
export function CourseRow({ course }: { course: CourseEntry }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const id = courseSlug(course);
  const fav = isFavorite(id);
  const name = course.fields.name.trim();
  const url = `${SITE_URL}/courses/${id}`;

  return (
    <Row
      title={name}
      subtitle={course.fields.courseId}
      mono
      trailing={`${course.fields.ects} op`}
      marked={fav}
      href={`/courses/${id}`}
      menu={[
        {
          title: fav ? 'Poista suosikeista' : 'Lisää suosikiksi',
          systemImage: fav ? 'heart.slash' : 'heart',
          onPress: () => {
            haptics.selection();
            toggleFavorite(id);
          },
        },
        {
          title: 'Jaa',
          systemImage: 'square.and.arrow.up',
          onPress: () => Share.share({ url, message: `${name} – ${url}` }),
        },
      ]}
    />
  );
}
