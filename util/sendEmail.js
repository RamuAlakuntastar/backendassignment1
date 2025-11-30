const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendEmail = async ({ to, subject, html }) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER,
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);

    if (error.response) {
      console.error("SendGrid Error Details:", error.response.body);
    }

    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
