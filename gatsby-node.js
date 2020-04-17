const contentful = require('@contentful/rich-text-plain-text-renderer');
const path = require('path');

require('ts-node').register();
require('source-map-support').install();

// Replacing '/' would result in empty string which is invalid
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const oldPage = { ...page };
  // Remove trailing slash unless page is /
  page.path = replacePath(page.path);
  if (page.path !== oldPage.path) {
    // Replace new page with old page
    deletePage(oldPage);
    createPage(page);
  }
};

exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
  const { internal } = node;
  const { owner, mediaType } = internal;
  if (mediaType !== 'text/richtext' || owner !== 'gatsby-source-contentful') {
    return;
  }
  const doc = JSON.parse(await loadNodeContent(node));
  const text = contentful.documentToPlainTextString(doc);
  const result = text.slice(0, 160);
  console.log('result', result);
  actions.createNodeField({ node, name: 'excerpt', value: result });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allCourses: allContentfulCourse {
        edges {
          node {
            id
            courseId
            name
          }
        }
      }

      allTeachers: allContentfulTeacher {
        edges {
          node {
            id
            slug
            name
          }
        }
      }

      allMajors: allContentfulMajor {
        edges {
          node {
            name
            id
            name
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const majors = result.data.allMajors.edges;
  const teachers = result.data.allTeachers.edges;
  const courses = result.data.allCourses.edges;

  majors.forEach((major, index) => {
    const previous =
      index === majors.length - 1 ? null : majors[index + 1].node;
    const next = index === 0 ? null : majors[index - 1].node;

    createPage({
      path: `major/${major.node.slug}`,
      component: path.resolve('./src/templates/major.tsx'),
      context: {
        next: next,
        previous: previous,
        slug: major.node.slug,
      },
    });
  });

  teachers.forEach((teacher, index) => {
    const previous =
      index === teachers.length - 1 ? null : teachers[index + 1].node;
    const next = index === 0 ? null : teachers[index - 1].node;

    createPage({
      path: `teacher/${teacher.node.slug}`,
      component: path.resolve('./src/templates/teacher.tsx'),
      context: {
        next: next,
        previous: previous,
        slug: teacher.node.slug,
      },
    });
  });

  courses.forEach((course, index) => {
    const previous =
      index === courses.length - 1 ? null : courses[index + 1].node;
    const next = index === 0 ? null : courses[index - 1].node;

    createPage({
      path: `course/${course.node.courseId}`,
      component: path.resolve('./src/templates/course.tsx'),
      context: {
        next: next,
        previous: previous,
        courseId: course.node.courseId,
      },
    });
  });
};
