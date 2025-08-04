import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ sucess: false, message: "No access token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid access token" });
  }
};
