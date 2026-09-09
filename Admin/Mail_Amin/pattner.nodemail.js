import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log(
  "ADMIN_EMAIL_PASSWORD:",
  process.env.ADMIN_EMAIL_PASSWORD ? "Password exists" : "Password missing",
);
const Pattner_sendMail = async (to, subject, html) => {
  console.log("Sending mail to:", to);

  try {
    const info = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: to,
      subject: subject,
      html: html,
    });

    console.log("MAIL SUCCESS:", info.messageId);

    return info;
  } catch (error) {
    console.log("MAIL ERROR:", error);
    throw error;
  }
};
export default Pattner_sendMail;
