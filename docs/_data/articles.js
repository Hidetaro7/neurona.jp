// eslint-disable-next-line import/no-extraneous-dependencies
const { default: axios } = require("axios");
const HTMLParser = require('node-html-parser');

require("dotenv").config();

// eslint-disable-next-line consistent-return
module.exports = async () => {
  try {
    const res = await axios.get("https://tuqulore.microcms.io/api/v1/neurona", {
      headers: {
        "X-API-KEY": process.env.XKEY,
      },
    });
    // eslint-disable-next-line no-console
    // console.log(res.data);
    const renderHTML = parsePhohoGallery(res.data);
    console.log(renderHTML);
    console.log('--------------------');
    return renderHTML;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const parsePhohGallery2 = (htmldata) => {
  const resArray = { contents: [] };
  htmldata.contents.forEach((article) => {
    if (article.photoGallery) {
      const newData = { ...article };
      const galleryRoot = HTMLParser.parse(article.photoGallery);
      galleryRoot.querySelectorAll("img").forEach((img) => {
        //console.log(img);
        newData.photoGallery += `<a href="${img.src}"><img src="${img.src}" alt="" /></a>`;
      });
      resArray.contents.push(newData);
    } else {
      resArray.contents.push(article);
    }
    //console.log(resArray.contents);
  });
};

const parsePhohoGallery = (htmldata) => {
  const resArray = { ...htmldata };
  //console.log(resArray);
  resArray.contents.forEach((article) => {
    if (article.photoGallery) {
      let images = "";
      HTMLParser.parse(article.photoGallery)
        .querySelector("p")
        .querySelectorAll("img")
        .forEach((img) => {
          const attr = img.attributes;
          images += `<a href="${attr.src}"><img src="${attr.src}" alt="" width="${attr.width}" height="${attr.height}" /></a>`;
        });
      article.photoGallery = images;
    }
    /* console.log(resArray);
    console.log("--------------------"); */
  });
  return resArray;
};
