const contentful = require('@contentful/rich-text-plain-text-renderer');
const path = require('path');

require('source-map-support').install();

exports.createPages = require('./src/lib/createPages').createPages;

exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
  const { internal } = node;
  const { owner, mediaType } = internal;
  if (mediaType !== 'text/richtext' || owner !== 'gatsby-source-contentful') {
    return;
  }
  const doc = JSON.parse(await loadNodeContent(node));
  const text = contentful.documentToPlainTextString(doc);
  const result = text.slice(0, 160);
  actions.createNodeField({ node, name: 'excerpt', value: result });
};
