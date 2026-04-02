const express = require('express');
const upload = require('../middleware/upload');
const optionalAuth = require('../middleware/optionalAuth');
const enforceUsageLimit = require('../middleware/guestLimit');
const {
  mergePdf,
  splitPdf,
  compressPdf,
  pdfToWord,
  wordToPdf,
  removeBackground,
  changeBackgroundColor,
  optimizeImage,
  downloadHistory,
} = require('../controllers/toolsController');

const router = express.Router();

router.post('/pdf/merge', optionalAuth, enforceUsageLimit('merge-pdf'), upload.array('files', 10), mergePdf);
router.post('/pdf/split', optionalAuth, enforceUsageLimit('split-pdf'), upload.single('file'), splitPdf);
router.post('/pdf/compress', optionalAuth, enforceUsageLimit('compress-pdf'), upload.single('file'), compressPdf);
router.post('/pdf/to-word', optionalAuth, enforceUsageLimit('pdf-to-word'), upload.single('file'), pdfToWord);
router.post('/pdf/from-word', optionalAuth, enforceUsageLimit('word-to-pdf'), upload.single('file'), wordToPdf);

router.post('/image/remove-bg', optionalAuth, enforceUsageLimit('remove-bg'), upload.single('file'), removeBackground);
router.post('/image/change-bg-color', optionalAuth, enforceUsageLimit('change-bg-color'), upload.single('file'), changeBackgroundColor);
router.post('/image/optimize', optionalAuth, enforceUsageLimit('optimize-image'), upload.single('file'), optimizeImage);

router.get('/downloads/history', optionalAuth, downloadHistory);

module.exports = router;
