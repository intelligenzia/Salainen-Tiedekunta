import { GatsbyNode } from 'gatsby';
import path from 'path';
import { createOGCard } from '../helpers/create-og-images';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result: any = await graphql(`
    query createPagesQuery {
      allCourses: allContentfulCourse {
        nodes {
          id
          courseId
          name
        }
      }

      allTeachers: allContentfulTeacher {
        nodes {
          id
          slug
          name
        }
      }

      allMajors: allContentfulMajor {
        nodes {
          name
          id
          name
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const majors = result.data.allMajors.nodes;
  const teachers = result.data.allTeachers.nodes;
  const courses = result.data.allCourses.nodes;

  majors.forEach((major: any, index: number) => {
    const previous = index === majors.length - 1 ? null : majors[index + 1];
    const next = index === 0 ? null : majors[index - 1];

    createPage({
      path: `major/${major.slug}`,
      component: path.resolve('./src/templates/major.tsx'),
      context: {
        next,
        previous,
        slug: major.slug,
      },
    });
  });

  teachers.forEach((teacher: any, index: number) => {
    const previous = index === teachers.length - 1 ? null : teachers[index + 1];
    const next = index === 0 ? null : teachers[index - 1];

    createPage({
      path: `teacher/${teacher.slug}`,
      component: path.resolve('./src/templates/teacher.tsx'),
      context: {
        next,
        previous,
        slug: teacher.slug,
      },
    });
  });

  courses.forEach((course: any, index: number) => {
    const previous = index === courses.length - 1 ? null : courses[index + 1];
    const next = index === 0 ? null : courses[index - 1];

    createPage({
      path: `course/${course.courseId}`,
      component: path.resolve('./src/templates/course.tsx'),
      context: {
        next,
        previous,
        courseId: course.courseId,
      },
    });

    createOGCard({ slug: `course/${course.courseId}`, title: 'Otsikko' });
  });
};
