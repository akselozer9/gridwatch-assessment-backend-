
import jwt from 'jsonwebtoken';

module.exports = (req, res) => {
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
          password: 'adminbrain',
          id: '1' ,
          ORG: 'Gridwatchems'
        },
        {
          email: 'sam@gridwatchems.com',
          password: 'adminbrain',
          id: '2',
          ORG: 'Gridwatchems'
        },
        {
          email: 'matt.hendrickson@gridwatchems.com',
          password: 'adminbrain',
          id: '3' ,
          ORG: 'Gridwatchems'
        },
        {
          email: 'farhdine@gridwatchems.com',
          password: 'adminbrain',
          id: '4',
          ORG: 'Gridwatchems'
        },
        {
          email: 'romain@gridwatchems.com',
          password: 'adminbrain',
          id: '5',
          ORG: 'Gridwatchems'
        },
      ];
      
      const { email, password } = req.body;
      
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        const jwtToken = jwt.sign(
          { id: user.id, email: user.email },  // Changed user.username to user.email
          'b51255d1d1ba41d0d751fe3e11609d26ae6d4459ba8a415e3a67ada63a67e57d'
        )
        console.log(jwtToken);
      
        res.status(200).send({ message: "Welcome Back!", token: jwtToken, ORG: user.ORG });
      } else {
        res.status(400).send({ message: 'Invalid email or password' });
      }
    } else {
      res.status(405).send('Method not allowed');
    }
  };
  