"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gatsby_1 = require("gatsby");
var react_1 = __importDefault(require("react"));
var contentfulRichText_1 = __importDefault(require("../components/contentfulRichText"));
var CourseCard_1 = __importDefault(require("../components/CourseCard/CourseCard"));
var layout_1 = __importDefault(require("../components/layout"));
var primitives_1 = require("../components/primitives");
var seo_1 = __importDefault(require("../components/seo"));
var TeacherCard_1 = __importDefault(require("../components/TeacherCard/TeacherCard"));
var Course = function (props) {
    console.log(props);
    var _a = props.data.contentfulCourse, _b = _a.name, name = _b === void 0 ? '' : _b, teacher = _a.teacher, _c = _a.description, json = _c.json, excerpt = _c.fields.excerpt, _d = props.pageContext, next = _d.next, previous = _d.previous;
    return (react_1.default.createElement(layout_1.default, null,
        react_1.default.createElement(seo_1.default, { title: name, description: excerpt }),
        react_1.default.createElement(primitives_1.H1, null, name),
        react_1.default.createElement("time", null),
        react_1.default.createElement("h3", null, "Luennoitsijat"), teacher === null || teacher === void 0 ? void 0 :
        teacher.map(function (t) { return (react_1.default.createElement(TeacherCard_1.default, { name: t.name, slug: t.slug })); }),
        react_1.default.createElement("h3", null, "Kurssin esittely"),
        react_1.default.createElement(contentfulRichText_1.default, { document: json }),
        react_1.default.createElement("h3", null, "Muita samanlaisia kursseja"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(CourseCard_1.default, { name: next.name, courseId: next.courseId, teachers: [], ects: 3 }),
            react_1.default.createElement(CourseCard_1.default, { name: previous.name, courseId: previous.courseId, teachers: [], ects: 3 }))));
};
exports.default = Course;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query($courseId: String!) {\n    contentfulCourse(courseId: { eq: $courseId }) {\n      name\n      id\n      ects\n      description {\n        json\n        fields {\n          excerpt\n        }\n      }\n      courseId\n      createdAt(fromNow: false)\n      updatedAt\n      teacher {\n        slug\n        name\n      }\n      major {\n        slug\n        name\n      }\n    }\n  }\n"], ["\n  query($courseId: String!) {\n    contentfulCourse(courseId: { eq: $courseId }) {\n      name\n      id\n      ects\n      description {\n        json\n        fields {\n          excerpt\n        }\n      }\n      courseId\n      createdAt(fromNow: false)\n      updatedAt\n      teacher {\n        slug\n        name\n      }\n      major {\n        slug\n        name\n      }\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=course.js.map