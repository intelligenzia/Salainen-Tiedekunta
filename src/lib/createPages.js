import path from 'path';

const teacherTemplate = path.resolve('../templates/teacher.tsx');

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allCourses: allContentfulCourse {
        edges {
          node {
            id
            courseId
          }
        }
      }

      allTeachers: allContentfulTeacher {
        edges {
          node {
            id
            slug
          }
        }
      }

      allMajors: allContentfulMajor {
        edges {
          node {
            name
            id
            slug
          }
        }
      }
    }
  `);

  console.log(JSON.stringify(result, null, 4));

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const majors = result.data.allContentfulMajor.edges;
  const teachers = result.data.allTeachers.edges;
  const courses = result.data.allContentfulCourse.edges;

  // majors.forEach((major: any) => {
  //   createPage({
  //     path: `major/${major.node.slug}`,
  //     component: path.resolve('./src/templates/major.tsx'),
  //     context: {
  //       slug: major.node.slug,
  //     },
  //   });
  // });

  teachers.forEach(teacher => {
    createPage({
      path: `teacher/${teacher.node.slug}`,
      component: teacherTemplate,
      context: {
        slug: teacher.node.slug,
      },
    });
  });

  // courses.forEach((course: any) => {
  //   createPage({
  //     path: `course/${course.node.courseId}`,
  //     component: path.resolve('./src/templates/course.tsx'),
  //     context: {
  //       slug: course.node.courseId,
  //     },
  //   });
  // });
};

export default createPages;
