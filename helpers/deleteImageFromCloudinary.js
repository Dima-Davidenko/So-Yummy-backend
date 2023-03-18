const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddbvbv5sp',
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const deleteImageFromCloudinary = async url => {
  const pathArr = url.split('/');
  const fileName = pathArr.at(-1);
  const imgId = fileName.split('.')[0];
  const userId = pathArr.at(-2);
  const fullImgId = `${userId}/${imgId}`;
  const result = await cloudinary.uploader.destroy(fullImgId, async (error, result) => {
    if (error) {
      throw error;
    }
    // await saveAvatarURL(result);
  });
  return result;
};

module.exports = deleteImageFromCloudinary;
