const nodemailer = require("nodemailer");

// configure the email transport using nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fitzenhighoctane@gmail.com",
    pass: "hpgyeefmxpdyvsmn",
  },
});

// send email using configured transport object
const sendEmail = async (service, email) => {
  console.log("Sending email...");
  console.log("email:::",email);
  console.log("service:::",service);
  try {
    await transporter.sendMail({
      from: `"Sri Care" <fitzenhighoctane@gmail.com>`,
      to: email,
      subject: "Welcome to Sri Care!",
      html: `<h1>Welcome to Sri Care!</h1>
              <h3>Hi,</h3>  
              <p>Thank you for activating package <b>"${service.serviceName}"</b> by paying <b>"${service.price}"</b>.</p>
              <p>Thank you!</p>`
    });

    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email.");
    throw error;
  }
};

module.exports = sendEmail;
