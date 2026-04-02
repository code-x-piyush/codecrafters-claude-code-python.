const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  filename: (_req, file, cb) => cb(null, `${uuidv4()}-${file.originalname.replace(/\s+/g, '-')}`),
});

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
