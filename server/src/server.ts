import express, { Express, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
