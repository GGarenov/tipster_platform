import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://127.0.0.1:5000", "http://localhost:5000"],
    credentials: true, // ⬅ MUST HAVE
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
