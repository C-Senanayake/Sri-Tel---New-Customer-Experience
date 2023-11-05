const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Service = require('./models/Service');
const User = require('./models/User.js');
const app = express();
const PORT = 3003;

app.use(bodyParser.json());

const API_GATEWAY_URL = 'http://localhost:8080'; // API Gateway URL


const availableServices = [
  { id: 1, name: 'International Roaming', monthlyCost: 10 },
  { id: 2, name: 'Ring-in Tone Personalization', monthlyCost: 5 },
  { id: 3, name: 'Data Top-ups', monthlyCost: 8 },
  // Add more available services as needed
];

const monthlyActivations = {}; // In-memory storage for monthly service activations

// Endpoint to get available services
app.get('/services/:id', async(req, res) => {
  const userId  = req.params.id;
  console.log("userId:::",userId);
  try {
    const services = await Service.find(); //Gives most viewed videos. If put 1, gives least viewed videos.
    const user = await User.findOne({_id:userId});
    console.log("USER::",user);
    res.status(200).json({services:services,user:user});
} catch (error) {
    // next(error);
    res.status(500).json("Error getting services");
}
});


// Endpoint to activate a service for the current month
app.post('/activate-service', async (req, res) => { // Added 'async' keyword here
  console.log("activate-service");
  console.log(req.body);
    const { service, customerId } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        customerId,
        {$push:{activePackages: service}});

        const user = User.findById(customerId);
        res.status(200).json({messgae:"Package activated successfully",updatedUser});
    } catch (error) {
      res.status(500).json({ message: 'Error activating service' });
    }
    // Send activation notification to Notification Service via API Gateway
    // const notificationData = {
    //   customerId: customerId,
    //   message: `Service activated: ${service.name}`,
    //   contactInfo: req.user.contactInfo, // Assuming contactInfo is available in the token
    // };
  
    // try {
    //   await axios.post(`${API_GATEWAY_URL}/send-notification`, notificationData);
    //   res.json({ message: 'Service activated successfully for the current month.' });
    // } catch (error) {
    //   console.error('Error sending activation notification:', error);
    //   res.status(500).json({ message: 'Error sending activation notification' });
    // }
  });
  

// Endpoint to deactivate a service for the current month
app.post('/deactivate-service', async(req, res) => {
  console.log(req.body);
    const { service, customerId } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        customerId,
        {$pull:{activePackages: service}});

        const user = User.findById(customerId);
        res.status(200).json({messgae:"Package activated successfully",updatedUser});
    } catch (error) {
      res.status(500).json({ message: 'Error activating service' });
    }
});

mongoose.connect("mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare")
.then(()=>app.listen(PORT, ()=>{console.log("API Gateway is running on port " + PORT)}))
.catch((error)=>{console.log(error.message)})
