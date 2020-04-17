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
var primitives_1 = require("./primitives");
var routes = [
    {
        name: 'Suuntaukset',
        to: 'majors',
    },
    {
        name: 'Kurssit',
        to: 'courses',
    },
    {
        name: 'Opettajat',
        to: 'teachers',
    },
];
var Header = function (_a) {
    var siteTitle = _a.siteTitle;
    return (React.createElement(HeaderContainer, null,
        React.createElement(Inner, null,
            React.createElement(Title, null,
                React.createElement(gatsby_1.Link, { to: "/" }, siteTitle)),
            React.createElement(Links, null, routes.map(function (route) { return (React.createElement(LinkItem, { key: route.name },
                React.createElement(Route, { to: route.to }, route.name))); })))));
};
Header.defaultProps = {
    siteTitle: "",
};
exports.default = Header;
var HeaderContainer = styled_components_1.default.header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  margin-top: 1rem;\n"], ["\n  width: 100%;\n  margin-top: 1rem;\n"])));
var Inner = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 100%;\n  padding: 1rem;\n  max-width: ", ";\n  margin: 0rem auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"], ["\n  box-sizing: border-box;\n  width: 100%;\n  padding: 1rem;\n  max-width: ", ";\n  margin: 0rem auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])), primitives_1.maxWidth);
var Title = styled_components_1.default.h3(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1;\n  margin: 0;\n"], ["\n  flex: 1;\n  margin: 0;\n"])));
var Links = styled_components_1.default.ul(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  list-style: none;\n"], ["\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  list-style: none;\n"])));
var LinkItem = styled_components_1.default.li(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin: 0rem 0rem 0rem 1rem;\n"], ["\n  margin: 0rem 0rem 0rem 1rem;\n"])));
var Route = styled_components_1.default(gatsby_1.Link)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  text-decoration: none;\n"], ["\n  text-decoration: none;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=header.js.map