const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
});

module.exports = upload;
