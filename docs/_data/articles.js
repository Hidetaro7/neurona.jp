// eslint-disable-next-line import/no-extraneous-dependencies
const { default: axios } = require('axios');
const HTMLParser = require('node-html-parser');

require('dotenv').config();

// eslint-disable-next-line consistent-return
module.exports = async () => {
  try {
    const res = await axios.get('https://tuqulore.microcms.io/api/v1/neurona', {
      headers: {
        'X-API-KEY': process.env.XKEY,
      },
    });
    const renderHTML = parsePhohoGallery(res.data);
    return renderHTML;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const parsePhohoGallery = (htmldata) => {
  const resArray = { ...htmldata };
  resArray.contents.forEach((article) => {
    if (article.photoGallery) {
      let images = '';
      HTMLParser.parse(article.photoGallery)
        .querySelector('p')
        .querySelectorAll('img')
        .forEach((img) => {
          const attr = img.attributes;
          images += `<a href="${attr.src}" data-lg-size="${attr.width}-${attr.height}"><img data-src="${attr.src}" class="lazyload" loading="lazy" alt="" width="${attr.width}" height="${attr.height}" /></a>`;
        });
      article.photoGallery = images;
    }
  });
  return resArray;
};
