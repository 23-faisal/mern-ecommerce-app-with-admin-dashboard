import { Router } from "express";
import { handleImageUploads } from "../../controllers/admin/products.controller.js";
import { upload } from "../../config/cloudinary.js";

export const uploadImage = Router();

uploadImage.post("/upload-image", upload.single("my_file"), handleImageUploads);
