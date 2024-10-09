import { Router } from "express";
import {
  getLatestProduct,
  productDetails,
  shopController,
} from "../../controllers/shop/shop.controller.js";

export const ShopRouter = Router();

// all the product
ShopRouter.get("/", shopController);

// get latest product

ShopRouter.get("/latest-products", getLatestProduct);

// single product
ShopRouter.get("/:id", productDetails);
