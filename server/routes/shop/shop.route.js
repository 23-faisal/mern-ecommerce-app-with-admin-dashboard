import { Router } from "express";
import { shopController } from "../../controllers/shop/shop.controller.js";

export const ShopRouter = Router();

ShopRouter.get("/", shopController);
