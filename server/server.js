const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes.js");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
