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
var styled_components_1 = __importDefault(require("styled-components"));
var gatsby_image_1 = __importDefault(require("gatsby-image"));
var gatsby_1 = require("gatsby");
var CourseCard = function (props) {
    var name = props.name, courseId = props.courseId, ects = props.ects, teachers = props.teachers;
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(gatsby_1.Link, { to: "course/" + courseId },
            react_1.default.createElement(Name, null,
                courseId,
                " : ",
                name),
            react_1.default.createElement("div", null,
                ects,
                " op"),
            teachers && (react_1.default.createElement(react_1.default.Fragment, null, teachers.map(function (teacher) {
                var _a;
                if (!teacher.avatar || !teacher.avatar.fluid)
                    return null;
                return teacher ? react_1.default.createElement(Teacher, { fluid: (_a = teacher.avatar) === null || _a === void 0 ? void 0 : _a.fluid }) : null;
            }))))));
};
exports.default = CourseCard;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 1rem;\n  box-sizing: border-box;\n  border: 1px solid black;\n  margin: 5px;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  flex-basis: 33%;\n  width: 100%;\n"], ["\n  padding: 1rem;\n  box-sizing: border-box;\n  border: 1px solid black;\n  margin: 5px;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  flex-basis: 33%;\n  width: 100%;\n"])));
var Name = styled_components_1.default.h4(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
var Teacher = styled_components_1.default(gatsby_image_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 30px;\n  width: 30px;\n  border-radius: 30px;\n  border: 2px solid black;\n  box-sizing: border-box;\n  transition: 0.7s ease-in-out transform;\n  &:hover {\n    transform: rotate(1080deg);\n  }\n"], ["\n  height: 30px;\n  width: 30px;\n  border-radius: 30px;\n  border: 2px solid black;\n  box-sizing: border-box;\n  transition: 0.7s ease-in-out transform;\n  &:hover {\n    transform: rotate(1080deg);\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CourseCard.js.map