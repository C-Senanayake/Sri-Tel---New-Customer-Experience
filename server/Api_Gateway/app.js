const express = require('express');
const axios = require('axios');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = 3000;

app.use(express.json());

const SECRET_KEY = 'middleware'; 

const SERVICES = {
  account: 'http://localhost:3001',
  serviceManagement: 'http://localhost:3002', 
  billing: 'http://localhost:3003', 
  notification: 'http://localhost:3004', 
  chat: 'http://localhost:3005', 
};



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId; // Add the userId to the request object for further processing
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Apply token verification middleware to specific routes
app.use(['/activate-service', '/deactivate-service', '/bills/:userId', '/pay-bill', '/notifications', '/chat'], verifyToken);




//Server Routes


//1.account creation routes

// User registration
app.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.account}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.account}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Account recovery
app.post('/recover', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.account}/recover`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

//2.Service Management Routes

// Get list of telco services
app.get('/services', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.serviceManagement}/services`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Activate a telco service
app.post('/activate-service', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.serviceManagement}/activate-service`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Deactivate a telco service
app.post('/deactivate-service', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.serviceManagement}/deactivate-service`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});


// View current and past bills
app.get('/bills/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`${SERVICES.billing}/bills/${userId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Pay a bill online
app.post('/pay-bill', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.billing}/pay-bill`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Receive and handle notifications (email/SMS/Push)
app.post('/notifications', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.notification}/notifications`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// Chat with customer care agents
app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.chat}/chat`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});


app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
