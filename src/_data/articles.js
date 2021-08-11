// eslint-disable-next-line import/no-extraneous-dependencies
const { default: axios } = require('axios');
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
    console.log(res.data);
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
