import { Request, Response } from "express";
import User from "../models/user.model";
import OtpModel from "../models/otp.model";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // Check OTP match and expiry
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword, role: "employee" });

    // Remove used OTP
    await OtpModel.deleteOne({ email });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otpRecord = await OtpModel.findOne({ email });
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expiresAt < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { id: user._id.toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 min
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: "Login successful" });

    await OtpModel.deleteOne({ email });
  } catch (error: any) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
