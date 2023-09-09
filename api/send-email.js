const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail.com',
  auth: {
    user: 'akselozer9@hotmail.com',
    pass: 'Ronaldo9!',
  },
});

module.exports = (req, res) => {
    if (req.method === 'POST') {
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
    } else {
      res.status(405).send('Method not allowed');  // Handle non-POST requests
    }
  };