"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var gatsby_1 = require("gatsby");
var layout_1 = __importDefault(require("../components/layout"));
var seo_1 = __importDefault(require("../components/seo"));
var contentfulRichText_1 = __importDefault(require("../components/contentfulRichText"));
var styled_components_1 = __importDefault(require("styled-components"));
var CourseCard_1 = __importDefault(require("../components/CourseCard/CourseCard"));
var Major = function (props) {
    var _a = props.data.contentfulMajor, slug = _a.slug, name = _a.name, createdAt = _a.createdAt, updatedAt = _a.updatedAt, courses = _a.courses, _b = _a.introduction, json = _b.json, excerpt = _b.fields.excerpt, _c = props.pageContext, next = _c.next, previous = _c.previous;
    console.log(courses);
    return (react_1.default.createElement(layout_1.default, null,
        react_1.default.createElement(seo_1.default, { title: name, description: excerpt }),
        react_1.default.createElement("h1", null, name),
        react_1.default.createElement(TinyInfo, null,
            "Voimassaolo ",
            createdAt,
            " \u2013 "),
        react_1.default.createElement(TinyInfo, null,
            "Tiedot p\u00E4ivitetty ",
            updatedAt,
            " "),
        react_1.default.createElement("h2", null, "Opinto-ohjelman esittely"),
        react_1.default.createElement(contentfulRichText_1.default, { document: json }),
        react_1.default.createElement("h2", null, "Kurssit"),
        react_1.default.createElement("p", null, "Seuraavat kurssit ovat pakollisia"),
        courses &&
            courses.map(function (course, index) {
                var courseId = course.courseId, courseName = course.name, ects = course.ects, teacher = course.teacher;
                return (react_1.default.createElement(CourseCard_1.default, { key: index, name: courseName, courseId: courseId, ects: ects, teachers: teacher }));
            }),
        react_1.default.createElement("h3", null, "Muita Opintosuuntauksia")));
};
exports.default = Major;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query MajorBySlug($slug: String!) {\n    contentfulMajor(slug: { eq: $slug }) {\n      id\n      slug\n      name\n      introduction {\n        json\n        fields {\n          excerpt\n        }\n      }\n      courses {\n        name\n        courseId\n        ects\n        teacher {\n          id\n          avatar {\n            fluid(maxWidth: 30) {\n              srcSet\n            }\n          }\n        }\n      }\n      createdAt(formatString: \"DD.MM.YYYY\")\n      updatedAt(formatString: \"DD.MM.YYYY\")\n      courses {\n        courseId\n      }\n    }\n  }\n"], ["\n  query MajorBySlug($slug: String!) {\n    contentfulMajor(slug: { eq: $slug }) {\n      id\n      slug\n      name\n      introduction {\n        json\n        fields {\n          excerpt\n        }\n      }\n      courses {\n        name\n        courseId\n        ects\n        teacher {\n          id\n          avatar {\n            fluid(maxWidth: 30) {\n              srcSet\n            }\n          }\n        }\n      }\n      createdAt(formatString: \"DD.MM.YYYY\")\n      updatedAt(formatString: \"DD.MM.YYYY\")\n      courses {\n        courseId\n      }\n    }\n  }\n"])));
var TinyInfo = styled_components_1.default.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 0.9rem;\n  color: var(--secondary-text);\n  margin: 0.2rem 0rem;\n"], ["\n  font-size: 0.9rem;\n  color: var(--secondary-text);\n  margin: 0.2rem 0rem;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=major.js.map