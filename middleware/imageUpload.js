const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  // set destination folder
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // customize the filname
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, '-');
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);

    cb(null, `${nameWithoutExt}_${date}${ext}`);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed'));
  },
});

const imageUpload = {
  upload: async (req, res, next) => {
    const uploadSingle = uploadMiddleware.single('image');

    await new Promise((resolve, reject) => {
      uploadSingle(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    next();
  },
};

module.exports = imageUpload;
