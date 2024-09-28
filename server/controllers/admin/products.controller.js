import { handleUpload } from "../../config/cloudinary.js";
import { Product } from "../../models/product.model.js";

export const handleImageUploads = async (req, res) => {
  try {
    const uploadResult = await handleUpload(req.file);
    res.status(200).json({
      success: true,
      message: "Upload successful",
      uploadResult,
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};

// add a new product

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      brand,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      brand,
      category,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    res.status(201).json({
      success: true,
      message: "Product is created",
      data: newlyCreatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};

// fetch all the product

export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: listOfProducts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};

// edit a product

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      brand,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const productExists = Product.findById(id);
    if (!productExists) {
      return res.status(400).json({
        success: false,
        message: "Product does not exists!",
      });
    }

    productExists.image = image || productExists.image;
    productExists.title = title || productExists.title;
    productExists.description = description || productExists.description;
    productExists.brand = brand || productExists.brand;
    productExists.category = category || productExists.category;
    productExists.price = price || productExists.price;
    productExists.salePrice = salePrice || productExists.salePrice;
    productExists.totalStock = totalStock || productExists.totalStock;

    await productExists.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      products: productExists,
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};

// delete a product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Upload failed",
      details: error.message,
    });
  }
};
