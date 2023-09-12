module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).send('OK');
      return;
    }
  
    if (req.url === '/api/v1/login' && req.method === 'POST') {
      // Simple user database
      const users = [
        {
          email: 'aksel@umich.edu',
          password: 'yoyoyy', // You would have hashed passwords in a real application
        },
      ];
      
      const { email, password } = req.body;
      
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        res.status(200).send({ token: 'your_generated_token_here' });
      } else {
        res.status(400).send({ message: 'Invalid email or password' });
      }
    } else {
      res.status(405).send('Method not allowed');
    }
  };
  