const path = require('path');
const jimp = require('jimp');

module.exports = async stuff => {
  console.log('STUFF', stuff);
  // try {
  //   const { frontmatter, fields, fileAbsolutePath } = markdownNode;
  //   const isWeekly = fileAbsolutePath.includes('weeklies');
  //   const slug = isWeekly ? `/weekly${fields.slug}` : fields.slug;
  //   const output = path.join('./public', slug, 'seo.jpg');
  //   const hasTags =
  //     frontmatter.tags && frontmatter.tags.length !== 0
  //       ? frontmatter.tags[0]
  //       : 'Article';
  //   const tag = isWeekly ? 'Weekly' : hasTags;
  //   const time = fields.readingTime
  //     ? `${Math.ceil(fields.readingTime.minutes)}m`
  //     : '3m';

  //   const titleFont = await jimp.loadFont(path.join(__dirname, 'Title.fnt'));
  //   const detailFont = await jimp.loadFont(
  //     path.join(__dirname, 'Montserrat-Medium.ttf.fnt')
  //   );

  //   return Promise.all([jimp.read(path.join(__dirname, 'template.png'))]).then(
  //     ([image]) => {
  //       const title = frontmatter.title.replace(
  //         /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
  //         ''
  //       );
  //       image.print(detailFont, 132, 341, time, 1100).write(output);
  //       image.print(detailFont, 315, 341, tag, 1100).write(output);
  //       image
  //         .print(
  //           titleFont,
  //           77,
  //           10,
  //           {
  //             text: title,
  //             alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
  //             alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
  //           },
  //           700,
  //           300
  //         )
  //         .write(output);
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  // }
};
