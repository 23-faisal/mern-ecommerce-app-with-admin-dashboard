import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes/auth.route.js";
import { productRoute } from "./routes/admin/product.route.js";
import { ShopRouter } from "./routes/shop/shop.route.js";
import { cartRouter } from "./routes/shop/cart.route.js";
import { addressRouter } from "./routes/shop/address.route.js";

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
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

// routes

app.use("/api/auth", authRouter);
app.use("/api/admin/products", productRoute);

// shop
app.use("/api/shop/products", ShopRouter);

// address
app.use("/api/shop/address", addressRouter);

// cart
app.use("/api/shop/cart", cartRouter);

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
