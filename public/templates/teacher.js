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
var primitives_1 = require("../components/primitives");
var Teacher = function (_a) {
    var contentfulTeacher = _a.data.contentfulTeacher;
    var _b = contentfulTeacher.name, name = _b === void 0 ? 'Perttu Lähteenlahti' : _b, createdAt = contentfulTeacher.createdAt, updatedAt = contentfulTeacher.updatedAt, course = contentfulTeacher.course;
    return (react_1.default.createElement(layout_1.default, null,
        react_1.default.createElement(seo_1.default, { title: name }),
        react_1.default.createElement(primitives_1.H1, null, name),
        react_1.default.createElement("time", { dateTime: createdAt }, createdAt),
        react_1.default.createElement("time", { dateTime: updatedAt }, updatedAt),
        react_1.default.createElement("h3", null, "Opettajan j\u00E4rjest\u00E4m\u00E4 opetus"),
        course &&
            course.map(function (c) { return (react_1.default.createElement(gatsby_1.Link, { to: "course/" + (c === null || c === void 0 ? void 0 : c.courseId), key: c === null || c === void 0 ? void 0 : c.id },
                react_1.default.createElement("h4", null, c === null || c === void 0 ? void 0 :
                    c.courseId,
                    " - ", c === null || c === void 0 ? void 0 :
                    c.name))); })));
};
exports.default = Teacher;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query($slug: String!) {\n    contentfulTeacher(slug: { eq: $slug }) {\n      id\n      slug\n      name\n      course {\n        id\n        name\n        courseId\n      }\n      createdAt(formatString: \"DD.MM.YYYY\")\n      updatedAt(formatString: \"DD.MM.YYYY\")\n    }\n  }\n"], ["\n  query($slug: String!) {\n    contentfulTeacher(slug: { eq: $slug }) {\n      id\n      slug\n      name\n      course {\n        id\n        name\n        courseId\n      }\n      createdAt(formatString: \"DD.MM.YYYY\")\n      updatedAt(formatString: \"DD.MM.YYYY\")\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=teacher.js.map