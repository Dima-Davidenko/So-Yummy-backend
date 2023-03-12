const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddbvbv5sp',
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const imgProcess = async ({ imgURL, imgID, width, height }) => {
  try {
    const res = await cloudinary.uploader.upload(imgURL, { public_id: imgID });
    console.log(res);
    console.log(res.secure_url);
  } catch (error) {
    console.log(error);
  }

  const url = cloudinary.url(imgID, {
    width,
    height,
    Crop: 'fill',
  });

  return url;
};

module.exports = imgProcess;
