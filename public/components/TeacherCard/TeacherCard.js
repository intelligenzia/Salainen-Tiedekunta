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
var gatsby_1 = require("gatsby");
var TeacherCard = function (props) {
    var name = props.name, slug = props.slug;
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(gatsby_1.Link, { to: "teacher/" + slug },
            react_1.default.createElement(Name, null, name))));
};
exports.default = TeacherCard;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Name = styled_components_1.default.h4(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=TeacherCard.js.map