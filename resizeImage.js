const sharp = require("sharp");

const resizeImage = async (imageBuffer, width, height) => {
  return await sharp(imageBuffer)
    .resize(width, height)
    .toFormat("png") // Convert to PNG format
    .toBuffer();
};

module.exports = { resizeImage };
