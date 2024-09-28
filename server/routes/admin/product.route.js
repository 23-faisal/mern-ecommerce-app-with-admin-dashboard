import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  handleImageUploads,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../config/cloudinary.js";

export const productRoute = Router();

// upload a image
productRoute.post(
  "/upload-image",
  upload.single("my_file"),
  handleImageUploads
);

// get all the product

productRoute.get("/all-products", getAllProducts);

// add a product

productRoute.post("/add-product", addProduct);

// edit a product

productRoute.put("/edit-product/:id", editProduct);

// delete a product

productRoute.delete("/delete-product/:id", deleteProduct);
