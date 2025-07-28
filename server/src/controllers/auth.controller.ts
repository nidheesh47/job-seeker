import { Request, Response } from "express";
import User from "../models/user.model";
import OtpModel from "../models/otp.model";
import { generateOTP, otpExpiry } from "../utils/otp";
import { sendOTPEmail } from "../utils/mail";

export const requestOTP = async (req: Request, res: Response) => {
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
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const record = await OtpModel.findOne({ email });
  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP expired" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  await OtpModel.deleteOne({ email });

  res.json({
    message: "OTP verified successfully",
    user: {
      _id: user._id,
      email: user.email,
    },
  });
};

const;
