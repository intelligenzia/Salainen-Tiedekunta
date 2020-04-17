"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var gatsby_1 = require("gatsby");
var primitives_1 = require("../components/primitives");
var layout_1 = __importDefault(require("../components/layout"));
var seo_1 = __importDefault(require("../components/seo"));
var CourseCard_1 = __importDefault(require("../components/CourseCard/CourseCard"));
var styled_components_1 = __importDefault(require("styled-components"));
var contentfulRichText_1 = __importDefault(require("../components/contentfulRichText"));
var Majors = function () {
    var data = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query allMajorsQuery {\n      allContentfulMajor {\n        edges {\n          node {\n            name\n            id\n            slug\n            introduction {\n              json\n            }\n            courses {\n              name\n              courseId\n              ects\n              teacher {\n                avatar {\n                  fluid(maxWidth: 30) {\n                    srcSet\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "], ["\n    query allMajorsQuery {\n      allContentfulMajor {\n        edges {\n          node {\n            name\n            id\n            slug\n            introduction {\n              json\n            }\n            courses {\n              name\n              courseId\n              ects\n              teacher {\n                avatar {\n                  fluid(maxWidth: 30) {\n                    srcSet\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  "]))));
    var majors = data.allContentfulMajor.edges;
    return (React.createElement(layout_1.default, null,
        React.createElement(seo_1.default, { title: "P\u00E4\u00E4aineet", description: "Kaikki Salaisen Tiedekunnan opetuksessa olevat opintokokonaisuudet" }),
        React.createElement(primitives_1.H1, null, "Opintokokonaisuudet"),
        majors.map(function (_a) {
            var node = _a.node;
            var _b;
            return (React.createElement("div", { key: node.id },
                React.createElement(gatsby_1.Link, { to: "major/" + node.slug },
                    React.createElement("h3", null, node.name)),
                React.createElement(contentfulRichText_1.default, { document: (_b = node.introduction) === null || _b === void 0 ? void 0 : _b.json }),
                React.createElement(Courses, null, node.courses &&
                    node.courses.map(function (course) { return (React.createElement(CourseCard_1.default, { key: course.courseId, name: course.name, courseId: course.courseId, ects: course.ects, teachers: course === null || course === void 0 ? void 0 : course.teacher })); }))));
        })));
};
exports.default = Majors;
var Courses = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  border-bottom: 1px solid var(--secondary-text);\n  margin-bottom: 2rem;\n"], ["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  border-bottom: 1px solid var(--secondary-text);\n  margin-bottom: 2rem;\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=majors.js.map