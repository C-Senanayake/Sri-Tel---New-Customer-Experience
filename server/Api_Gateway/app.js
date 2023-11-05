const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = 8080;

app.use(express.json());

const SECRET_KEY = 'middleware'; 

const SERVICES = {
  account: 'http://localhost:3001',
  serviceManagement: 'http://localhost:3002', 
  billing: 'http://localhost:3003', 
  notification: 'http://localhost:3004', 
  chat: 'http://localhost:3005', 
};

app.use(cookieParser());
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions));

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
  console.log("register");
  console.log(req.body);
  try {
    const response = await axios.post(`${SERVICES.account}/register`, req.body);
    // res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.response.data.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  console.log("login");
  console.log(req.body);
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


mongoose.connect("mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare")
.then(()=>app.listen(PORT, ()=>{console.log("API Gateway is running on port " + PORT)}))
.catch((error)=>{console.log(error.message)})
