import { Request, Response } from "express";
import User from "../models/user.model";
import OtpModel from "../models/otp.model";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirmPassword, otp } = req.body;
    if (!email || !name || !password || !confirmPassword || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });

    const payload = { id: user._id.toString(), role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const isDev = process.env.NODE_ENV === "development";

    res
      .cookie("accessToken", accessToken, {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "Signup successful" });

    await OtpModel.deleteOne({ email });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
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
    const isDev = process.env.NODE_ENV === "development";
    res
      .cookie("accessToken", accessToken, {
        httpOnly: false,
        secure: !isDev, // secure = false in dev (localhost), true in production
        sameSite: isDev ? "lax" : "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: !isDev, // secure = false in dev (localhost), true in production
        sameSite: isDev ? "lax" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (error: any) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// export const restPassword = async (req: Request, res: Response) => {
//   try {
//     const { email, newPassword, confirmPassword, otp } = req.body;

//     if (!email || !newPassword || !confirmPassword || !otp) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const otpRecord = await OtpModel.findOne({ email });
//     if (
//       !otpRecord ||
//       otpRecord.otp !== otp ||
//       otpRecord.expiresAt < new Date()
//     ) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     await OtpModel.deleteOne({ email });

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const logoutUser = async (req: Request, res: Response) => {
  const isDev = process.env.NODE_ENV === "development";

  res
    .clearCookie("accessToken", {
      httpOnly: false,
      secure: !isDev,
      sameSite: isDev ? "lax" : "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: false,
      secure: !isDev,
      sameSite: isDev ? "lax" : "strict",
    })
    .json({ message: "Logged out successfully" });
};
