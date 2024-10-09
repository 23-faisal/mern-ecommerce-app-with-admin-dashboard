import { Product } from "../../models/product.model.js";

// all the products in the user UI

export const shopController = async (req, res) => {
  const { categories, brands, sort } = req.query;
  let sortOption = {};

  // Sorting options based on the query parameter (price or title)
  switch (sort) {
    case "price-hightolow":
      sortOption = { price: -1 };
      break;
    case "price-lowtohigh":
      sortOption = { price: 1 };
      break;
    case "title-atoz":
      sortOption = { title: 1 };
      break;
    case "title-ztoa":
      sortOption = { title: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  try {
    const query = {};

    // Filter by multiple categories
    if (categories) query.category = { $in: categories.split(",") };

    // Filter by multiple brands
    if (brands) query.brand = { $in: brands.split(",") };

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// show single product

export const productDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });

    //
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get latest product
export const getLatestProduct = async (req, res) => {
  try {
    const latestProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(4);

    if (!latestProducts || latestProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No latest products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched latest products successfully",
      data: latestProducts, // Corrected here
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
