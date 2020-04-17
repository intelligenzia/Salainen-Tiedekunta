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
var layout_1 = __importDefault(require("../components/layout"));
var seo_1 = __importDefault(require("../components/seo"));
var Teachers = function () {
    var data = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query AllCoursesQuery {\n      allContentfulCourse {\n        edges {\n          node {\n            name\n            id\n          }\n        }\n      }\n    }\n  "], ["\n    query AllCoursesQuery {\n      allContentfulCourse {\n        edges {\n          node {\n            name\n            id\n          }\n        }\n      }\n    }\n  "]))));
    var courses = data.allContentfulCourse.edges;
    return (React.createElement(layout_1.default, null,
        React.createElement(seo_1.default, { title: "Kaikki Salaisen Tiedekunnan Kurssit" }),
        courses.map(function (_a) {
            var node = _a.node;
            return (React.createElement("div", { key: node.id },
                React.createElement("p", null, node.name)));
        })));
};
exports.default = Teachers;
var templateObject_1;
//# sourceMappingURL=courses.js.map