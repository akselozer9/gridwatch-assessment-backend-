const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'hotmail.com',
  auth: {
    user: 'akselozer9@hotmail.com',
    pass: 'Ronaldo9!',
  },
});

//email post route
app.post('/send-email', (req, res) => {
    console.log(req.body); 
    const { pdfData } = req.body;

  const mailOptions = {
    from: 'akselozer9@hotmail.com',
    to: 'ozeraksel@gmail.com',
    subject: 'Form Submission',
    text: 'Gridwatch Facility Assessment',
    attachments: [
      {
        filename: 'form-data.pdf',
        content: pdfData,
        encoding: 'base64',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

module.exports = app;
