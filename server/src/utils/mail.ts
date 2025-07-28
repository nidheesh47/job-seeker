import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const info = await transporter.sendMail({
    from: `"Zecser" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Login",
    html: `<h3>Your OTP is: <b>${otp}</b></h3><p>It expires in 10 minutes.</p>`,
  });

  console.log("OTP email sent:", info.messageId);
};
