const sharp = require('sharp');
const HttpError = require('./HttpError');

const resizeImg = async ({ body, width, height }) => {
  try {
    return await sharp(body).resize({ width, height }).toBuffer();
  } catch (error) {
    throw HttpError(500, error);
  }
};

module.exports = resizeImg;
