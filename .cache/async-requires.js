// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-major-tsx": () => import("./../src/templates/major.tsx" /* webpackChunkName: "component---src-templates-major-tsx" */),
  "component---src-templates-teacher-tsx": () => import("./../src/templates/teacher.tsx" /* webpackChunkName: "component---src-templates-teacher-tsx" */),
  "component---src-templates-course-tsx": () => import("./../src/templates/course.tsx" /* webpackChunkName: "component---src-templates-course-tsx" */),
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-index-tsx": () => import("./../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-pages-404-tsx": () => import("./../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-courses-tsx": () => import("./../src/pages/courses.tsx" /* webpackChunkName: "component---src-pages-courses-tsx" */),
  "component---src-pages-majors-tsx": () => import("./../src/pages/majors.tsx" /* webpackChunkName: "component---src-pages-majors-tsx" */),
  "component---src-pages-teachers-tsx": () => import("./../src/pages/teachers.tsx" /* webpackChunkName: "component---src-pages-teachers-tsx" */)
}

