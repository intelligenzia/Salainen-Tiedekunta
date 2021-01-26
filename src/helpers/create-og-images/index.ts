const path = require('path')
const jimp = require('jimp')

type Card = {
  slug: string
  title: string
}

export const createOGCard = async ({ slug, title }: Card): Promise<void> => {
  const output: string = path.join('./public', slug, 'seo.jpg')
  const titleFont = await jimp.loadFont(path.join(__dirname, 'Title.fnt'))
  // const detailFont = await jimp.loadFont(
  //   path.join(__dirname, 'Montserrat-Medium.ttf.fnt')
  // );
  return Promise.all([jimp.read(path.join(__dirname, 'template.png'))]).then(
    ([image]) => {
      title.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      )
      image
        .print(
          titleFont,
          77,
          15,
          {
            text: title,
            alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
          },
          700,
          300
        )
        .write(output)
    }
  )
}
