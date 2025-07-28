import { Request, Response } from "express";
import OtpModel from "../models/otp.model";
import { generateOTP, otpExpiry } from "../utils/otp";
import { sendOTPEmail } from "../utils/mail";
import otpModel from "../models/otp.model";
import User from "../models/user.model";
export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();
    const expiresAt = otpExpiry();

    await OtpModel.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (error: unknown) {
    console.error("Request OTP Error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const record = await OtpModel.findOne({ email });
    if (!record) return res.status(400).json({ message: "OTP not found" });
    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    await OtpModel.deleteOne({ email });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    console.error("Verify OTP Error:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
