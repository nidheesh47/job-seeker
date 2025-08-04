import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expireTime = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    user.resetToken = token;
    user.resetTokenExpiry = expireTime;
    await user.save();

    const resetLink = `${process.env.RESET_PASSWORD_LINK}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"YourApp" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested to reset your password.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset password link sent to email" });
  } catch (error) {
    console.error("Send Reset Password Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
