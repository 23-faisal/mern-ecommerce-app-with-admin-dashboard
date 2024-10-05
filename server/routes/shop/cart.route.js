import { Router } from "express";
import {
  addToCart,
  fetchCartItem,
  removeFromCart,
  updateCartItemQuantity,
} from "../../controllers/shop/cart.controller.js";

export const cartRouter = Router();

// add to cart

cartRouter.post("/", addToCart);

// fetch cart item

cartRouter.get("/get/:userId", fetchCartItem);

// update the cart

cartRouter.put("/update-cart", updateCartItemQuantity);

// remove from cart

cartRouter.delete("/:userId/:productId", removeFromCart);
