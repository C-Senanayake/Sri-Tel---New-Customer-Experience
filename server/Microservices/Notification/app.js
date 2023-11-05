const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const app = express();
const PORT = 3004;

app.use(bodyParser.json());

// Initialize NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sachithradaylen@gmail.com', // Replace with your email address
    pass: 'sweatoadeaw1' // Replace with your email password
  }
});

// Initialize Twilio client
const twilioClient = twilio('your_twilio_account_sid', 'your_twilio_auth_token'); // Replace with your Twilio credentials

// Endpoint to send notifications via email and SMS
app.post('/send-notification', (req, res) => {
  const { customerId, message, contactInfo } = req.body;
  
  // Send email notification using NodeMailer
  const mailOptions = {
    from: 'sricare@gmail.com', // Replace with your email address
    to: contactInfo.email,
    subject: 'Sri-Care Notification',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email notification:', error);
    } else {
      console.log('Email notification sent:', info.response);
    }
  });

  // Send SMS notification using Twilio
  twilioClient.messages.create({
    body: message,
    to: contactInfo.phone, // Replace with the recipient's phone number
    from: 'your_twilio_phone_number' // Replace with your Twilio phone number
  })
  .then(message => console.log('SMS notification sent:', message.sid))
  .catch(error => console.error('Error sending SMS notification:', error));

  res.json({ message: 'Notification sent successfully.' });
});

app.listen(PORT, () => {
  console.log(`Notification Service is running on port ${PORT}`);
});
