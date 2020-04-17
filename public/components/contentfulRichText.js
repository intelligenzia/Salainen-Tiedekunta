"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var rich_text_types_1 = require("@contentful/rich-text-types");
var rich_text_react_renderer_1 = require("@contentful/rich-text-react-renderer");
function getObjectKeyArray(obj) {
    if (typeof obj !== 'object')
        return [];
    var arr = [];
    for (var key in obj) {
        arr.push(key);
    }
    return arr;
}
var ContentfulRichText = function (_a) {
    var _b;
    var document = _a.document;
    var options = {
        renderNode: (_b = {},
            _b[rich_text_types_1.BLOCKS.EMBEDDED_ASSET] = function (node) {
                if (!node.data.target.fields)
                    return;
                var _a = node.data.target.fields, file = _a.file, description = _a.description;
                var locales = getObjectKeyArray(file);
                return locales.map(function (locale) { return (React.createElement("img", { src: file[locale].url, alt: description[locale], "data-locale": locale, key: locale })); });
            },
            _b),
    };
    return React.createElement("div", null, rich_text_react_renderer_1.documentToReactComponents(document, options));
};
exports.default = ContentfulRichText;
//# sourceMappingURL=contentfulRichText.js.map