const multer = require('multer');
const path = require('path');

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Add your allowed file extensions here
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images Only!'), false); // Change this error message as per your requirement
    }
  },
});

module.exports = upload;
