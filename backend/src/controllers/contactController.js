const { z } = require('zod');
const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/mailService');

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(5),
});

const sendMessage = async (req, res, next) => {
  try {
    const payload = contactSchema.parse(req.body);
    const saved = await ContactMessage.create(payload);
    await sendContactNotification(payload);
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    return next(error);
  }
};

module.exports = { sendMessage };
