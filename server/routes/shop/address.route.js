import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../controllers/shop/address.controller.js";

export const addressRouter = Router();

// add address


addressRouter.post("/add", addAddress);

addressRouter.get("/get/:userId", fetchAllAddress);

addressRouter.delete("/delete/:userId/:addressId", deleteAddress);

addressRouter.put("/update/:userId/:addressId", editAddress);
