const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-major-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/templates/major.tsx"))),
  "component---src-templates-teacher-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/templates/teacher.tsx"))),
  "component---src-templates-course-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/templates/course.tsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/.cache/dev-404-page.js"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/index.tsx"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/404.tsx"))),
  "component---src-pages-courses-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/courses.tsx"))),
  "component---src-pages-majors-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/majors.tsx"))),
  "component---src-pages-teachers-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/teachers.tsx"))),
  "component---src-pages-suloinen-tiedekunta-tsx": hot(preferDefault(require("/Users/perttu/Projects/Salainen-Tiedekunta/src/pages/suloinen-tiedekunta.tsx")))
}

