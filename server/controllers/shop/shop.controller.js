import { Product } from "../../models/product.model.js";

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
