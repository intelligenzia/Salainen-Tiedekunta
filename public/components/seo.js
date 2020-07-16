"use strict";
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_helmet_1 = require("react-helmet");
var gatsby_1 = require("gatsby");
var SEO = function (_a) {
    var description = _a.description, lang = _a.lang, meta = _a.meta, title = _a.title;
    var site = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      query {\n        site {\n          siteMetadata {\n            title\n            description\n            author\n          }\n        }\n      }\n    "], ["\n      query {\n        site {\n          siteMetadata {\n            title\n            description\n            author\n          }\n        }\n      }\n    "])))).site;
    var metaDescription = description || site.siteMetadata.description;
    var defaultMeta = [
        {
            name: "description",
            content: metaDescription,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: metaDescription,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            name: "twitter:card",
            content: "summary",
        },
        {
            name: "twitter:creator",
            content: site.siteMetadata.author,
        },
        {
            name: "twitter:title",
            content: title,
        },
        {
            name: "twitter:description",
            content: metaDescription,
        },
    ];
    var propMeta = defaultMeta.concat(meta || []);
    return (React.createElement(react_helmet_1.Helmet, { htmlAttributes: {
            lang: lang,
        }, title: title, titleTemplate: "%s | " + site.siteMetadata.title, meta: defaultMeta.concat(propMeta) }));
};
SEO.defaultProps = {
    lang: "en",
    meta: [],
    description: "",
};
exports.default = SEO;
var templateObject_1;
//# sourceMappingURL=seo.js.map