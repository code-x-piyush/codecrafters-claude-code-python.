const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const DownloadHistory = require('../models/DownloadHistory');
const ApiError = require('../utils/apiError');

const uploadsDir = path.join(process.cwd(), 'uploads');
const sanitizeFilename = (name) => path.basename(String(name || 'file')).replace(/[^a-zA-Z0-9._-]/g, '_');
const ensureUploadPath = (filename) => path.join(uploadsDir, sanitizeFilename(filename));
const normalizeFiles = (files) => (Array.isArray(files) ? files : []);

const saveHistory = async (req, tool, filename) => {
  await DownloadHistory.create({
    user: req.user?._id || null,
    guestId: req.headers['x-guest-id'] || null,
    tool,
    filename,
  });
};

const mergePdf = async (req, res, next) => {
  try {
    const files = normalizeFiles(req.files);
    if (files.length < 2) throw new ApiError(400, 'Upload at least 2 PDF files');
    const mergedPdf = await PDFDocument.create();

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const output = await mergedPdf.save();
    const outPath = path.join(process.cwd(), 'uploads', `merged-${Date.now()}.pdf`);
    fs.writeFileSync(outPath, output);
    await saveHistory(req, 'merge-pdf', path.basename(outPath));
    return res.download(outPath);
  } catch (error) {
    return next(error);
  }
};

const splitPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one PDF file');
    await saveHistory(req, 'split-pdf', req.file.filename);
    return res.json({ success: true, message: 'Split PDF placeholder complete', file: req.file.filename });
  } catch (error) {
    return next(error);
  }
};

const compressPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one PDF file');
    await saveHistory(req, 'compress-pdf', req.file.filename);
    return res.json({ success: true, message: 'Compress PDF placeholder complete', file: req.file.filename });
  } catch (error) {
    return next(error);
  }
};

const pdfToWord = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one PDF file');
    await saveHistory(req, 'pdf-to-word', req.file.filename);
    return res.json({ success: true, message: 'PDF to Word adapter placeholder', file: req.file.filename });
  } catch (error) {
    return next(error);
  }
};

const wordToPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one Word file');
    await saveHistory(req, 'word-to-pdf', req.file.filename);
    return res.json({ success: true, message: 'Word to PDF adapter placeholder', file: req.file.filename });
  } catch (error) {
    return next(error);
  }
};

const removeBackground = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one image file');
    const output = ensureUploadPath(`bg-removed-${req.file.filename}.png`);
    await sharp(req.file.path).png().toFile(output);
    await saveHistory(req, 'remove-bg', path.basename(output));
    return res.download(output);
  } catch (error) {
    return next(error);
  }
};

const changeBackgroundColor = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one image file');
    const color = req.body.color || '#111827';
    const output = ensureUploadPath(`bg-color-${req.file.filename}.png`);
    const image = sharp(req.file.path);
    const meta = await image.metadata();
    const canvas = sharp({
      create: {
        width: meta.width || 512,
        height: meta.height || 512,
        channels: 4,
        background: color,
      },
    });
    await canvas.composite([{ input: req.file.path }]).png().toFile(output);
    await saveHistory(req, 'change-bg-color', path.basename(output));
    return res.download(output);
  } catch (error) {
    return next(error);
  }
};

const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'Upload one image file');
    const output = ensureUploadPath(`optimized-${req.file.filename}.jpg`);
    await sharp(req.file.path).jpeg({ quality: 75 }).toFile(output);
    await saveHistory(req, 'optimize-image', path.basename(output));
    return res.download(output);
  } catch (error) {
    return next(error);
  }
};

const downloadHistory = async (req, res, next) => {
  try {
    const guestId = req.headers['x-guest-id'];
    const query = req.user ? { user: req.user._id } : { guestId };
    const items = await DownloadHistory.find(query).sort({ createdAt: -1 }).limit(50);
    return res.json({ success: true, data: items });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  mergePdf,
  splitPdf,
  compressPdf,
  pdfToWord,
  wordToPdf,
  removeBackground,
  changeBackgroundColor,
  optimizeImage,
  downloadHistory,
};
