const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",       // use Gmail service
      auth: {
        user: process.env.SMTP_USER,   // your email
        pass: process.env.SMTP_PASS,   // app password
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER, // sender
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendEmail;
