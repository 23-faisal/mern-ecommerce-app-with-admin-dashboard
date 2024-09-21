import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// app
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    Credential: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
