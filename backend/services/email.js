const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, userId) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${userId}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    html: `<p>Please click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendBookingConfirmationEmail = async (email, booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Confirmation',
    html: `<p>Your booking has been confirmed. Booking ID: ${booking._id}</p>
           <p>Check-in: ${new Date(booking.checkIn).toLocaleDateString()}</p>
           <p>Check-out: ${new Date(booking.checkOut).toLocaleDateString()}</p>
           <p>Total Price: $${booking.totalPrice}</p>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendBookingCancellationEmail = async (email, booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Cancellation',
    html: `<p>Your booking has been cancelled. Booking ID: ${booking._id}</p>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendQueryResponseEmail = async (email, subject, response) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Response to your query: ${subject}`,
    html: `<p>We have responded to your query:</p><p>${response}</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
  sendQueryResponseEmail,
};