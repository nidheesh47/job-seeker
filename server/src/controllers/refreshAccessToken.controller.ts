import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken } from "../utils/token";

interface CustomRequest extends Request {
  cookies: { [key: string]: string };
}

export const refreshAccessToken = (req: CustomRequest, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = verifyRefreshToken(token) as { id: string; role: string };
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
