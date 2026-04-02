const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;
if (env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

const sendContactNotification = async ({ name, email, subject, message }) => {
  if (!transporter || !env.CONTACT_TO_EMAIL) return;
  await transporter.sendMail({
    from: env.SMTP_USER,
    to: env.CONTACT_TO_EMAIL,
    subject: `[Portfolio Contact] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
};

module.exports = { sendContactNotification };
