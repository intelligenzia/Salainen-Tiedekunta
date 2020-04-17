"use strict";
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
var layout_1 = __importDefault(require("../components/layout"));
var seo_1 = __importDefault(require("../components/seo"));
var NotFoundPage = function () { return (React.createElement(layout_1.default, null,
    React.createElement(seo_1.default, { title: "404: Not found" }),
    React.createElement("h1", null, "NOT FOUND"),
    React.createElement("p", null, "You just hit a route that doesn't exist... the sadness."))); };
exports.default = NotFoundPage;
//# sourceMappingURL=404.js.map