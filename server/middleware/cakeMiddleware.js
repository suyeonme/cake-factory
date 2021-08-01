const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error('Please upload a jpg, jpeg, png images'));
    }
    const { image } = req.body;
    req.file = image;
    cb(null, true);
  },
  storage,
}).single('image');

module.exports = { upload };
