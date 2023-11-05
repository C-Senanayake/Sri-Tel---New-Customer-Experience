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
const sendEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: `"Sri Care" <fitzenhighoctane@gmail.com>`,
      to: email,
      subject: "Welcome to Sri Care!",
      html: `<h1>Welcome to Sri Care!</h1>
              <h3>Hi ${name},</h3>  
              <p>Thank you for registering with us.</p>
              <p>Click on the button below to get started!</p>
            <a href="http://localhost:8080/activate_email/${email}"><button>Click here</button></a>`,
    });

    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email.");
    throw error;
  }
};

module.exports = sendEmail;
