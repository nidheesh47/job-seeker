import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db";
import * as dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
connectDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
