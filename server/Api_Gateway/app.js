const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const PORT = 8080;

app.use(express.json());

const SECRET_KEY = 'middleware'; 

const SERVICES = {
  account: 'http://localhost:3001',
  billing: 'http://localhost:3002', 
  serviceManagement: 'http://localhost:3003', 
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
// app.use(['/activate-service', '/deactivate-service', '/bills/:userId', '/pay-bill', '/notifications', '/chat'], verifyToken);




//Server Routes


//1.account creation routes

// User registration
app.post('/register', async (req, res) => {
  console.log("register");
  console.log(req.body);
  try {
    const response = await axios.post(`${SERVICES.account}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

app.post('/phone', async (req, res) => {
  console.log("phone");
  console.log(req.body);
  const {telephone,userId} = req.body;
  console.log(userId);
  const otp = Math.floor(100000 + Math.random() * 900000)
  const user = "94722699883";
  const password = "7884";
  // const text = urlencode(`This is your OTP to verify your phone number: ${otp}`);
  const to = telephone;

  const baseurl ="http://www.textit.biz/sendmsg";
  const url = `${baseurl}/?id=${user}&pw=${password}&to=${to}&text=This is your OTP to verify your phone number: ${otp}`;
  const response = await axios.get(url);
  // const ret = file(url);
console.log("URL::::",response);
  const resp= response.data.split(":");
  console.log(resp[0]);
  if(resp[0]=="OK")
  {
    console.log("OTP::::",otp);
    let user = await User.findOneAndUpdate({_id:userId},{otp:otp});
    user = await User.findOneAndUpdate({_id:userId},{telephone:telephone});
    console.log(user);
    res.status(201).json({message:"Message sent", user});
  }
  else
  {
    res.status(400).json({message:"Error", });
  }
});

// User OTP
app.post('/otp', async (req, res) => {
  console.log("OTP");
  console.log(req.body);
  const {otp,userId} = req.body;
  try {
    let user = await User.findById(userId);
    console.log(user.otp);
    if(user.otp == otp){
      console.log("OTP verified");
      user = await User.findOneAndUpdate({_id:userId},{phone_active:true});
      console.log(user);
      res.json(user);
    }else{
      res.status(400).json({message:"Invalid OTP"});
    }
  } catch (error) {
    res.status(error).json({ message: error });
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
    res.status(error).json({ message: error });
  }
});

// Account recovery
app.post('/recover', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.account}/recover`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

//2.Service Management Routes

// Get list of telco services
app.get('/services/:id', async (req, res) => {
  console.log("services:::",req.params.id);
  try {
    const response = await axios.get(`${SERVICES.serviceManagement}/services/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

// Activate a telco service
app.post('/activate-service', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.serviceManagement}/activate-service`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

// Deactivate a telco service
app.post('/deactivate-service', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.serviceManagement}/deactivate-service`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});


// View current and past bills
app.get('/bills/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`${SERVICES.billing}/bills/${userId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

// Pay a bill online
app.post('/pay-bill', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.billing}/pay-bill`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

// Receive and handle notifications (email/SMS/Push)
app.post('/notifications', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.notification}/notifications`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});

// Chat with customer care agents
app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(`${SERVICES.chat}/chat`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error).json({ message: error });
  }
});


mongoose.connect("mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare")
.then(()=>app.listen(PORT, ()=>{console.log("API Gateway is running on port " + PORT)}))
.catch((error)=>{console.log(error.message)})
