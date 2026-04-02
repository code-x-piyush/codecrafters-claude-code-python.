const User = require('../models/User');
const Usage = require('../models/Usage');
const ContactMessage = require('../models/ContactMessage');

const users = async (_req, res, next) => {
  try {
    const data = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const usage = async (_req, res, next) => {
  try {
    const data = await Usage.find().sort({ updatedAt: -1 }).limit(200);
    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const messages = async (_req, res, next) => {
  try {
    const data = await ContactMessage.find().sort({ createdAt: -1 }).limit(200);
    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { users, usage, messages };
