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
var styled_components_1 = __importDefault(require("styled-components"));
var layout_1 = __importDefault(require("../components/layout"));
var seo_1 = __importDefault(require("../components/seo"));
var primitives_1 = require("../components/primitives");
var IndexPage = function () {
    var data = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query allTeachersQuery {\n      allContentfulTeacher {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  "], ["\n    query allTeachersQuery {\n      allContentfulTeacher {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  "]))));
    var teachers = data.allContentfulTeacher.edges;
    return (React.createElement(layout_1.default, null,
        React.createElement(seo_1.default, { title: "Opettajat", description: "Kaikki Salaisen Tiedekunnan palveluksessa olevat opettajat" }),
        React.createElement(primitives_1.H1, null, "Opettajat"),
        React.createElement(TeacherCards, null, teachers.map(function (_a) {
            var node = _a.node;
            return (React.createElement(TeacherCard, { key: node.id },
                React.createElement(Name, null, node.name)));
        }))));
};
exports.default = IndexPage;
var TeacherCards = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 2rem;\n  grid-auto-rows: minmax(300px, auto);\n"], ["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 2rem;\n  grid-auto-rows: minmax(300px, auto);\n"])));
var TeacherCard = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1;\n  padding: 1rem;\n  border-radius: 5px;\n  background: #ffffff;\n  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;\n"], ["\n  flex: 1;\n  padding: 1rem;\n  border-radius: 5px;\n  background: #ffffff;\n  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;\n"])));
var Name = styled_components_1.default.h3(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: center;\n"], ["\n  text-align: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=teachers.js.map