"use strict";
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
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
var prop_types_1 = __importDefault(require("prop-types"));
var gatsby_1 = require("gatsby");
var primitives_1 = require("./primitives");
var header_1 = __importDefault(require("./header"));
require("./layout.css");
var Layout = function (_a) {
    var children = _a.children;
    var data = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query SiteTitleQuery {\n      site {\n        siteMetadata {\n          title\n        }\n      }\n    }\n  "], ["\n    query SiteTitleQuery {\n      site {\n        siteMetadata {\n          title\n        }\n      }\n    }\n  "]))));
    return (React.createElement(React.Fragment, null,
        React.createElement(header_1.default, { siteTitle: data.site.siteMetadata.title }),
        React.createElement(primitives_1.Container, null,
            React.createElement("main", null, children),
            React.createElement("footer", null,
                "\u00A9 ",
                new Date().getFullYear()))));
};
Layout.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
exports.default = Layout;
var templateObject_1;
//# sourceMappingURL=layout.js.map