const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddbvbv5sp',
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadImageToCloudinary = async (buffer, saveAvatarURL) => {
  const options = { resource_type: 'image' };
  const result = await cloudinary.uploader
    .upload_stream(options, async (error, result) => {
      if (error) {
        throw error;
      }
      await saveAvatarURL(result);
    })
    .end(buffer);
  return result;
};

module.exports = uploadImageToCloudinary;
