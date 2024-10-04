import { Router } from "express";
import {
  productDetails,
  shopController,
} from "../../controllers/shop/shop.controller.js";

export const ShopRouter = Router();

// all the product
ShopRouter.get("/", shopController);

// single product
ShopRouter.get("/:id", productDetails);
