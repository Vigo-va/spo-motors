const { Router } = require('express');
const transporter = require('../configuration');
const config = require('config');

const router = Router();

router.post('/send-request', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const mailOptions = {
      from: config.get('gmailLogin'),
      to: config.get('gmailLogin'),
      subject: `${phoneNumber}`,
      text: `запрос на звонок`,
      html: `
      <h4>У вас есть запрос на звонок от номера ${phoneNumber}</h4>
      `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'что-то пошло не так, попробуйте снова!',
        });
      } else {
        res.send({
          success: true,
          message: 'Спасибо что связались с нами!',
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong, try again!',
    });
  }
});

router.post('/send-email', async (req, res) => {
  try {
    const { name, phoneNumber, message } = req.body;
    const mailOptions = {
      from: config.get('gmailLogin'),
      to: config.get('gmailLogin'),
      subject: `${name} ${phoneNumber}`,
      text: `${message}`,
      html: `
      <p>У вас есть новое сообщение</p>
      <h3>Детали сообщения</h3>
      <ul>
        <li>Имя: ${name}</li>
        <li>номер телефона: ${phoneNumber}</li>
        <li>сообщение: ${message}</li>
      </ul>
      `,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'что-то пошло не так, попробуйте снова!',
        });
      } else {
        res.send({
          success: true,
          message: 'Спасибо что связались с нами!',
        });
      }
    });
    // console.log(name, phoneNumber, message, mailOptions);
    // res.status(200).json({
    //   message: 'done',
    // });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong, try again!',
    });
  }
});

module.exports = router;
