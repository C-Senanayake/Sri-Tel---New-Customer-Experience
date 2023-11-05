const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3003;

app.use(bodyParser.json());

const API_GATEWAY_URL = 'http://localhost:3000'; // API Gateway URL


const availableServices = [
  { id: 1, name: 'International Roaming', monthlyCost: 10 },
  { id: 2, name: 'Ring-in Tone Personalization', monthlyCost: 5 },
  { id: 3, name: 'Data Top-ups', monthlyCost: 8 },
  // Add more available services as needed
];

const monthlyActivations = {}; // In-memory storage for monthly service activations

// Endpoint to get available services
app.get('/services', (req, res) => {
  res.json(availableServices);
});


// Endpoint to activate a service for the current month
app.post('/activate-service', async (req, res) => { // Added 'async' keyword here
    const { serviceId, customerId } = req.body;
    const service = availableServices.find(service => service.id === serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }
  
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
  
    if (!monthlyActivations[customerId]) {
      monthlyActivations[customerId] = {};
    }
  
    if (!monthlyActivations[customerId][currentMonth]) {
      monthlyActivations[customerId][currentMonth] = [];
    }
  
    // Check if the service is already activated for the current month
    if (monthlyActivations[customerId][currentMonth].some(activatedService => activatedService.id === serviceId)) {
      return res.status(400).json({ message: 'Service already activated for the current month' });
    }
  
    // Activate the service for the current month
    monthlyActivations[customerId][currentMonth].push({ id: serviceId, name: service.name });
  
    // Send activation notification to Notification Service via API Gateway
    const notificationData = {
      customerId: customerId,
      message: `Service activated: ${service.name}`,
      contactInfo: req.user.contactInfo, // Assuming contactInfo is available in the token
    };
  
    try {
      await axios.post(`${API_GATEWAY_URL}/send-notification`, notificationData);
      res.json({ message: 'Service activated successfully for the current month.' });
    } catch (error) {
      console.error('Error sending activation notification:', error);
      res.status(500).json({ message: 'Error sending activation notification' });
    }
  });
  

// Endpoint to deactivate a service for the current month
app.post('/deactivate-service', (req, res) => {
  const { serviceId, customerId } = req.body;
  const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

  if (
    !monthlyActivations[customerId] ||
    !monthlyActivations[customerId][currentMonth] ||
    !monthlyActivations[customerId][currentMonth].length
  ) {
    return res.status(400).json({ message: 'Service not found for the current month' });
  }

  const serviceIndex = monthlyActivations[customerId][currentMonth].findIndex(
    activatedService => activatedService.id === serviceId
  );

  if (serviceIndex === -1) {
    return res.status(400).json({ message: 'Service not found for the current month' });
  }

  // Deactivate the service for the current month
  monthlyActivations[customerId][currentMonth].splice(serviceIndex, 1);
  res.json({ message: 'Service deactivated successfully for the current month.' });
});

app.listen(PORT, () => {
  console.log(`Service Management Microservice is running on port ${PORT}`);
});
