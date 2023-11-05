const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3004;

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Initialize NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fitzenhighoctane@gmail.com", // Replace with your email address
    pass: "hpgyeefmxpdyvsmn", // Replace with your email password
  },
});

// // Initialize Twilio client
// const twilioClient = twilio(
//   "your_twilio_account_sid",
//   "your_twilio_auth_token"
// ); // Replace with your Twilio credentials

// Endpoint to send notifications via email and SMS
app.post("/notification", (req, res) => {
  console.log("notifications in service");
  // const { customerId, message, contactInfo } = req.body;

  // Send email notification using NodeMailer
  const mailOptions = {
    from: "fitzenhighoctane@gmail.com", // Replace with your email address
    to: "adheesha.1999@gmail.com",
    subject: "Sri-Care Notification Subject",
    text: "Sri-Care Notification Body",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email notification:", error);
    } else {
      console.log("Email notification sent:", info.response);
    }
  });

  // // Send SMS notification using Twilio
  // twilioClient.messages
  //   .create({
  //     body: message,
  //     to: contactInfo.phone, // Replace with the recipient's phone number
  //     from: "your_twilio_phone_number", // Replace with your Twilio phone number
  //   })
  //   .then((message) => console.log("SMS notification sent:", message.sid))
  //   .catch((error) => console.error("Error sending SMS notification:", error));

  res.json({ message: "Notification sent successfully." });
});

mongoose
  .connect(
    "mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log("Notification service is running on port " + PORT);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
