const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.get('gmailLogin'),
    pass: config.get('gmailPassword'),
  },
});

module.exports = transporter;
