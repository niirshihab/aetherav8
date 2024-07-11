const nodemailer = require('nodemailer');
const { getContainer } = require('../config/supabaseClient');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send welcome email
 * @param {string} email
 * @param {string} username
 * @param {string} setupLink
 */
const sendWelcomeEmail = async (email, username, setupLink) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to Brodmann10',
    text: `Hello ${username},\n\nWelcome to Brodmann10! Please set up your account using the following link: ${setupLink}\n\nBest regards,\nBrodmann10 Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = {
  sendWelcomeEmail
};
