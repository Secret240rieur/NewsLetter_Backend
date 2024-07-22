// controllers/Mailer.ts
import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log(`Email User: ${emailUser}`);
console.log(`Email Pass: ${emailPass}`);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendTestEmail = async () => {
  const mailOptions = {
    from: emailUser,
    to: "jawharbeliber@gmail.com",
    subject: "test",
    text: "Content of your email",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
