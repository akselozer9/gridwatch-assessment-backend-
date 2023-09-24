import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  if (req.url === '/api/v1/login' && req.method === 'POST') {
   
const users = [
      { 
        email: 'aksel@gridwatchems.com', 
        password: '$2b$10$7fLyFdn18EfnTSN5hczLLezkWuwU9rT0uWqVEWl6HPssd6YzoLqTu', 
        ORG: 'Gridwatchems'
      },
      { 
        email: 'sam@gridwatchems.com', 
        password: '$2b$10$.WHcqjc48SDfHPrySjoIe.gJXY3uCEhJPbq5eGyzKR3w5/hoHZ5x6', 
        ORG: 'Gridwatchems' 
      },
      { 
        email: 'matt.hendrickson@gridwatchems.com', 
        password: '$2b$10$CRajtdWDmOSBhBhNwhH4..5ddb.kp5HBc0dDEP15m3qWo.OGZFnsW',
        ORG: 'Gridwatchems' },
      { 
        email: 'farhdine@gridwatchems.com', 
        password: '$2b$10$jEASYHS/MFx.2ntw3hkGVelEPNHsmudt8xkJQG2hNcuqtrRKU03dG', 
        ORG: 'Gridwatchems' 
      },
      { 
        email: 'romain@gridwatchems.com', 
        password: '$2b$10$kVX.RAox25wulLvtwatV0.sA5uKdn8xunB7GntKf5n6fW0t3AaHfy', 
        ORG: 'Gridwatchems' 
      },
  ];

    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
      const jwtToken = jwt.sign({ email: user.email }, secretKey);
      res.status(200).send({ message: "Welcome Back!", token: jwtToken, ORG: user.ORG });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};
