const nodeMailer = require("nodemailer");

exports.sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
  } catch (error) {
    throw error;
  }
};